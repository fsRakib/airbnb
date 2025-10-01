import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import mongoose from 'mongoose';

// GET /api/properties/[id] - Fetch a single property by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid property ID format'
        },
        { status: 400 }
      );
    }

    // Find the property by ID
    const property = await Property.findById(id).lean();

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          error: 'Property not found'
        },
        { status: 404 }
      );
    }

    // Check if property is active
    if (!property.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: 'Property is not available'
        },
        { status: 404 }
      );
    }

    // Remove sensitive booking information but keep availability info
    const sanitizedProperty = {
      ...property,
      bookings: property.bookings.map((booking: any) => ({
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        status: booking.status
      }))
    };

    return NextResponse.json({
      success: true,
      data: sanitizedProperty
    });

  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch property'
      },
      { status: 500 }
    );
  }
}

// PUT /api/properties/[id] - Update a property (for hosts)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;
    const body = await request.json();

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid property ID format'
        },
        { status: 400 }
      );
    }

    // Find the property first to check if it exists
    const existingProperty = await Property.findById(id);
    
    if (!existingProperty) {
      return NextResponse.json(
        {
          success: false,
          error: 'Property not found'
        },
        { status: 404 }
      );
    }

    // Remove fields that shouldn't be updated directly
    const { _id, createdAt, bookings, rating, reviewCount, ...updateData } = body;

    // Validate property type if provided
    if (updateData.propertyType) {
      const validPropertyTypes = ['apartment', 'house', 'villa', 'condo', 'cabin', 'loft', 'townhouse', 'studio'];
      if (!validPropertyTypes.includes(updateData.propertyType)) {
        return NextResponse.json(
          {
            success: false,
            error: `Property type must be one of: ${validPropertyTypes.join(', ')}`
          },
          { status: 400 }
        );
      }
    }

    // Validate numeric fields if provided
    if (updateData.pricePerNight !== undefined && updateData.pricePerNight <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Price must be positive'
        },
        { status: 400 }
      );
    }

    if (updateData.bedrooms !== undefined && updateData.bedrooms < 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bedrooms must be non-negative'
        },
        { status: 400 }
      );
    }

    if (updateData.bathrooms !== undefined && updateData.bathrooms < 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bathrooms must be non-negative'
        },
        { status: 400 }
      );
    }

    if (updateData.maxGuests !== undefined && updateData.maxGuests < 1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Max guests must be at least 1'
        },
        { status: 400 }
      );
    }

    // Update the property
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();

    return NextResponse.json({
      success: true,
      data: updatedProperty
    });

  } catch (error) {
    console.error('Error updating property:', error);
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.message
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update property'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/properties/[id] - Delete a property (for hosts)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid property ID format'
        },
        { status: 400 }
      );
    }

    // Find the property and check for active bookings
    const property = await Property.findById(id);
    
    if (!property) {
      return NextResponse.json(
        {
          success: false,
          error: 'Property not found'
        },
        { status: 404 }
      );
    }

    // Check if there are any confirmed future bookings
    const now = new Date();
    const activeFutureBookings = property.bookings.filter((booking: any) => 
      booking.status === 'confirmed' && new Date(booking.checkOut) > now
    );

    if (activeFutureBookings.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cannot delete property with active future bookings. Please cancel all bookings first.'
        },
        { status: 400 }
      );
    }

    // Soft delete by setting isActive to false instead of actual deletion
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Property deactivated successfully',
      data: { id: updatedProperty?._id }
    });

  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete property'
      },
      { status: 500 }
    );
  }
}