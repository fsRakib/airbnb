import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';

// GET /api/properties - Fetch properties with filters and pagination
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;
    
    // Filter parameters
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests') ? parseInt(searchParams.get('guests')!) : undefined;
    const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const propertyType = searchParams.get('propertyType');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;

    // Build filter object
    const filters = {
      checkIn,
      checkOut,
      city,
      state,
      minPrice,
      maxPrice,
      guests,
      propertyType
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => {
      if (filters[key as keyof typeof filters] === undefined || filters[key as keyof typeof filters] === null) {
        delete filters[key as keyof typeof filters];
      }
    });

    // Use the static method to find available properties
    let query = Property.findAvailable(filters);
    
    // Apply sorting
    const sortObj: any = {};
    sortObj[sortBy] = sortOrder;
    query = query.sort(sortObj);

    // Execute query with pagination
    const properties = await query
      .skip(skip)
      .limit(limit)
      .select('-bookings') // Exclude bookings from list view for privacy
      .lean();

    // Get total count for pagination
    const totalQuery = Property.findAvailable(filters);
    const total = await totalQuery.countDocuments();

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      success: true,
      data: {
        properties,
        pagination: {
          currentPage: page,
          totalPages,
          totalProperties: total,
          hasNextPage,
          hasPrevPage,
          limit
        },
        filters: {
          city,
          state,
          checkIn,
          checkOut,
          guests,
          minPrice,
          maxPrice,
          propertyType,
          sortBy,
          sortOrder: sortOrder === 1 ? 'asc' : 'desc'
        }
      }
    });

  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch properties'
      },
      { status: 500 }
    );
  }
}

// POST /api/properties - Create a new property (for hosts)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'title', 'description', 'images', 'pricePerNight', 
      'location', 'hostId', 'hostName', 'amenities', 
      'bedrooms', 'bathrooms', 'maxGuests', 'propertyType'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Validate location object
    if (!body.location.city || !body.location.state || !body.location.country || 
        !body.location.address || !body.location.latitude || !body.location.longitude) {
      return NextResponse.json(
        {
          success: false,
          error: 'Location must include city, state, country, address, latitude, and longitude'
        },
        { status: 400 }
      );
    }

    // Validate property type
    const validPropertyTypes = ['apartment', 'house', 'villa', 'condo', 'cabin', 'loft', 'townhouse', 'studio'];
    if (!validPropertyTypes.includes(body.propertyType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Property type must be one of: ${validPropertyTypes.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (body.pricePerNight <= 0 || body.bedrooms < 0 || body.bathrooms < 0 || body.maxGuests < 1) {
      return NextResponse.json(
        {
          success: false,
          error: 'Price must be positive, bedrooms/bathrooms must be non-negative, and maxGuests must be at least 1'
        },
        { status: 400 }
      );
    }

    // Create the property
    const property = new Property(body);
    const savedProperty = await property.save();

    return NextResponse.json({
      success: true,
      data: savedProperty
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating property:', error);
    
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
        error: 'Failed to create property'
      },
      { status: 500 }
    );
  }
}