import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import mongoose from 'mongoose';

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { propertyId, guestId, checkIn, checkOut, guests } = body;

    // Validate required fields
    if (!propertyId || !guestId || !checkIn || !checkOut || !guests) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: propertyId, guestId, checkIn, checkOut, guests'
        },
        { status: 400 }
      );
    }

    // Validate MongoDB ObjectId format for propertyId
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid property ID format'
        },
        { status: 400 }
      );
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const now = new Date();

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid date format'
        },
        { status: 400 }
      );
    }

    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        {
          success: false,
          error: 'Check-out date must be after check-in date'
        },
        { status: 400 }
      );
    }

    if (checkInDate <= now) {
      return NextResponse.json(
        {
          success: false,
          error: 'Check-in date must be in the future'
        },
        { status: 400 }
      );
    }

    // Validate guests count
    if (guests < 1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Number of guests must be at least 1'
        },
        { status: 400 }
      );
    }

    // Find the property
    const property = await Property.findById(propertyId);

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          error: 'Property not found'
        },
        { status: 404 }
      );
    }

    if (!property.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: 'Property is not available for booking'
        },
        { status: 400 }
      );
    }

    // Check if property can accommodate the number of guests
    if (guests > property.maxGuests) {
      return NextResponse.json(
        {
          success: false,
          error: `Property can accommodate maximum ${property.maxGuests} guests`
        },
        { status: 400 }
      );
    }

    // Check availability using the property method
    if (!property.isAvailable(checkInDate, checkOutDate)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Property is not available for the selected dates'
        },
        { status: 400 }
      );
    }

    // Calculate total price
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * property.pricePerNight;

    // Create the booking object
    const newBooking = {
      guestId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
      status: 'pending'
    };

    // Add booking to the property
    property.bookings.push(newBooking);
    await property.save();

    // Get the created booking (last item in the array)
    const createdBooking = property.bookings[property.bookings.length - 1];

    return NextResponse.json({
      success: true,
      data: {
        bookingId: createdBooking._id,
        propertyId: property._id,
        propertyTitle: property.title,
        guestId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        nights,
        pricePerNight: property.pricePerNight,
        totalPrice,
        status: 'pending',
        createdAt: createdBooking.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating booking:', error);
    
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
        error: 'Failed to create booking'
      },
      { status: 500 }
    );
  }
}

// GET /api/bookings - Get bookings (with filters)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    const guestId = searchParams.get('guestId');
    const hostId = searchParams.get('hostId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    let matchStage: any = {};

    // Build match conditions
    if (guestId) {
      matchStage['bookings.guestId'] = guestId;
    }

    if (hostId) {
      matchStage['hostId'] = hostId;
    }

    if (status) {
      matchStage['bookings.status'] = status;
    }

    // Aggregate to get bookings with property details
    const pipeline = [
      // Match properties that have bookings matching our criteria
      { $match: matchStage },
      
      // Unwind bookings array
      { $unwind: '$bookings' },
      
      // Match specific booking criteria after unwinding
      {
        $match: {
          ...(guestId && { 'bookings.guestId': guestId }),
          ...(status && { 'bookings.status': status })
        }
      },
      
      // Project the fields we want
      {
        $project: {
          bookingId: '$bookings._id',
          propertyId: '$_id',
          propertyTitle: '$title',
          propertyImages: { $slice: ['$images', 1] }, // Just first image
          location: '$location',
          hostId: '$hostId',
          hostName: '$hostName',
          guestId: '$bookings.guestId',
          checkIn: '$bookings.checkIn',
          checkOut: '$bookings.checkOut',
          guests: '$bookings.guests',
          totalPrice: '$bookings.totalPrice',
          status: '$bookings.status',
          createdAt: '$bookings.createdAt'
        }
      },
      
      // Sort by creation date (newest first)
      { $sort: { createdAt: -1 } },
      
      // Pagination
      { $skip: skip },
      { $limit: limit }
    ];

    const bookings = await Property.aggregate(pipeline);

    // Get total count for pagination
    const totalPipeline = pipeline.slice(0, -2); // Remove skip and limit
    const totalBookings = await Property.aggregate([
      ...totalPipeline,
      { $count: 'total' }
    ]);

    const total = totalBookings[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: {
        bookings,
        pagination: {
          currentPage: page,
          totalPages,
          totalBookings: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
          limit
        }
      }
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch bookings'
      },
      { status: 500 }
    );
  }
}