# Airbnb Clone - API Documentation

This document describes the REST API endpoints for the Airbnb clone backend built with Next.js App Router and MongoDB.

## Setup

1. **Install Dependencies**

   ```bash
   npm install mongoose @types/mongoose
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory:

   ```
   MONGODB_URI=mongodb://localhost:27017/airbnb-clone
   # For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/airbnb-clone
   ```

3. **Start MongoDB**

   - Local: Ensure MongoDB is running locally
   - Atlas: Use the connection string in MONGODB_URI

4. **Seed Database (Development Only)**

   ```bash
   # Start the development server
   npm run dev

   # Then make a POST request to seed the database
   curl -X POST http://localhost:3000/api/seed
   ```

## Data Models

### Property Schema

- `title`: String (required, max 200 chars)
- `description`: String (required, max 2000 chars)
- `images`: Array of image URLs
- `pricePerNight`: Number (required, min 0)
- `location`: Object with city, state, country, address, latitude, longitude
- `hostId`: String (required)
- `hostName`: String (required)
- `hostAvatar`: String (optional)
- `amenities`: Array of strings
- `bedrooms`: Number (required, min 0)
- `bathrooms`: Number (required, min 0)
- `maxGuests`: Number (required, min 1)
- `propertyType`: Enum (apartment, house, villa, condo, cabin, loft, townhouse, studio)
- `bookings`: Array of booking objects
- `rating`: Number (0-5, default 0)
- `reviewCount`: Number (default 0)
- `isActive`: Boolean (default true)

### Booking Schema (embedded in Property)

- `guestId`: String (required)
- `checkIn`: Date (required)
- `checkOut`: Date (required)
- `guests`: Number (required, min 1)
- `totalPrice`: Number (required, min 0)
- `status`: Enum (pending, confirmed, cancelled)
- `createdAt`: Date (default now)

## API Endpoints

### Properties

#### GET /api/properties

Fetch properties with filtering, sorting, and pagination.

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 12)
- `city`: Filter by city (case-insensitive partial match)
- `state`: Filter by state (case-insensitive partial match)
- `checkIn`: Check-in date (YYYY-MM-DD) for availability filtering
- `checkOut`: Check-out date (YYYY-MM-DD) for availability filtering
- `guests`: Minimum guest capacity
- `minPrice`: Minimum price per night
- `maxPrice`: Maximum price per night
- `propertyType`: Property type filter
- `sortBy`: Sort field (default: createdAt)
- `sortOrder`: asc/desc (default: desc)

**Example:**

```bash
curl "http://localhost:3000/api/properties?city=New%20York&guests=2&minPrice=100&maxPrice=200&checkIn=2024-12-01&checkOut=2024-12-05"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "properties": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalProperties": 50,
      "hasNextPage": true,
      "hasPrevPage": false,
      "limit": 12
    },
    "filters": { ... }
  }
}
```

#### POST /api/properties

Create a new property listing (for hosts).

**Request Body:**

```json
{
  "title": "Beautiful Downtown Apartment",
  "description": "Modern apartment with city views...",
  "images": ["https://example.com/image1.jpg", "..."],
  "pricePerNight": 150,
  "location": {
    "city": "New York",
    "state": "New York",
    "country": "United States",
    "address": "123 Main St, New York, NY 10001",
    "latitude": 40.7128,
    "longitude": -74.006
  },
  "hostId": "host123",
  "hostName": "John Doe",
  "amenities": ["WiFi", "Kitchen", "TV"],
  "bedrooms": 2,
  "bathrooms": 1,
  "maxGuests": 4,
  "propertyType": "apartment"
}
```

#### GET /api/properties/[id]

Get a single property by ID with full details.

**Example:**

```bash
curl "http://localhost:3000/api/properties/65a1b2c3d4e5f6789abc1234"
```

#### PUT /api/properties/[id]

Update a property (for hosts).

#### DELETE /api/properties/[id]

Soft delete a property by setting `isActive: false`.

### Bookings

#### POST /api/bookings

Create a new booking.

**Request Body:**

```json
{
  "propertyId": "65a1b2c3d4e5f6789abc1234",
  "guestId": "guest456",
  "checkIn": "2024-12-01",
  "checkOut": "2024-12-05",
  "guests": 2
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "bookingId": "65a1b2c3d4e5f6789abc5678",
    "propertyId": "65a1b2c3d4e5f6789abc1234",
    "propertyTitle": "Beautiful Downtown Apartment",
    "guestId": "guest456",
    "checkIn": "2024-12-01T00:00:00.000Z",
    "checkOut": "2024-12-05T00:00:00.000Z",
    "guests": 2,
    "nights": 4,
    "pricePerNight": 150,
    "totalPrice": 600,
    "status": "pending"
  }
}
```

#### GET /api/bookings

Get bookings with optional filtering.

**Query Parameters:**

- `guestId`: Filter by guest ID
- `hostId`: Filter by host ID
- `status`: Filter by booking status
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Example:**

```bash
curl "http://localhost:3000/api/bookings?guestId=guest456&status=confirmed"
```

#### GET /api/bookings/[id]

Get a specific booking by ID.

#### PATCH /api/bookings/[id]

Update booking status (confirm, cancel).

**Request Body:**

```json
{
  "status": "confirmed",
  "updatedBy": "host123"
}
```

#### DELETE /api/bookings/[id]

Delete a booking (only if status is 'pending').

### Utility Endpoints

#### POST /api/seed

Seed the database with sample data (development only).

#### GET /api/seed

Check seeding status and property count.

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details (when available)"
}
```

Common HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error

## Availability Logic

The system implements sophisticated availability checking:

1. **Property.isAvailable(checkIn, checkOut)**: Method to check if a property is available for given dates
2. **Property.findAvailable(filters)**: Static method to find available properties with filters
3. **Booking conflicts**: Prevents overlapping bookings for the same property
4. **Status-aware**: Only considers 'confirmed' and 'pending' bookings for availability (excludes 'cancelled')

## Database Indexes

Optimized indexes for common queries:

- Location (city, state)
- Price range
- Guest capacity
- Property type
- Rating
- Creation date

## Getting Started

1. Start your development server: `npm run dev`
2. Seed the database: `POST http://localhost:3000/api/seed`
3. Test the API: `GET http://localhost:3000/api/properties`

The API is now ready for frontend integration!
