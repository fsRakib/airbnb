import mongoose from "mongoose";

// Booking subdocument schema
const BookingSchema = new mongoose.Schema({
  guestId: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Location subdocument schema
const LocationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
});

// Main Property schema
const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  pricePerNight: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: LocationSchema,
    required: true,
  },
  hostId: {
    type: String,
    required: true,
  },
  hostName: {
    type: String,
    required: true,
  },
  hostAvatar: {
    type: String,
    default: "",
  },
  amenities: [
    {
      type: String,
      required: true,
    },
  ],
  bedrooms: {
    type: Number,
    required: true,
    min: 0,
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0,
  },
  maxGuests: {
    type: Number,
    required: true,
    min: 1,
  },
  propertyType: {
    type: String,
    required: true,
    enum: [
      "apartment",
      "house",
      "villa",
      "condo",
      "cabin",
      "loft",
      "townhouse",
      "studio",
    ],
  },
  bookings: [BookingSchema],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for better query performance
PropertySchema.index({ "location.city": 1, "location.state": 1 });
PropertySchema.index({ pricePerNight: 1 });
PropertySchema.index({ maxGuests: 1 });
PropertySchema.index({ propertyType: 1 });
PropertySchema.index({ rating: -1 });
PropertySchema.index({ createdAt: -1 });

// Virtual for average nightly price calculation
PropertySchema.virtual("averageRating").get(function () {
  return this.reviewCount > 0 ? this.rating : 0;
});

// Method to check availability for a date range
PropertySchema.methods.isAvailable = function (checkIn: Date, checkOut: Date) {
  const requestStart = new Date(checkIn);
  const requestEnd = new Date(checkOut);

  return !this.bookings.some((booking: any) => {
    if (booking.status === "cancelled") return false;

    const bookingStart = new Date(booking.checkIn);
    const bookingEnd = new Date(booking.checkOut);

    // Check for date overlap
    return requestStart < bookingEnd && requestEnd > bookingStart;
  });
};

// Static method to find available properties
PropertySchema.statics.findAvailable = function (filters: any) {
  const {
    checkIn,
    checkOut,
    city,
    state,
    minPrice,
    maxPrice,
    guests,
    propertyType,
  } = filters;

  let query: any = { isActive: true };

  // Location filter
  if (city) {
    query["location.city"] = new RegExp(city, "i");
  }
  if (state) {
    query["location.state"] = new RegExp(state, "i");
  }

  // Price filter
  if (minPrice || maxPrice) {
    query.pricePerNight = {};
    if (minPrice) query.pricePerNight.$gte = minPrice;
    if (maxPrice) query.pricePerNight.$lte = maxPrice;
  }

  // Guests filter
  if (guests) {
    query.maxGuests = { $gte: guests };
  }

  // Property type filter
  if (propertyType) {
    query.propertyType = propertyType;
  }

  let queryBuilder = this.find(query);

  // If date range is provided, filter out unavailable properties
  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    queryBuilder = queryBuilder.where({
      $nor: [
        {
          bookings: {
            $elemMatch: {
              $and: [
                { status: { $ne: "cancelled" } },
                { checkIn: { $lt: checkOutDate } },
                { checkOut: { $gt: checkInDate } },
              ],
            },
          },
        },
      ],
    });
  }

  return queryBuilder;
};

// Update the updatedAt field before saving
PropertySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Define interface for the static methods
interface PropertyModel extends mongoose.Model<any> {
  findAvailable(filters: any): mongoose.Query<any[], any>;
}

const Property =
  (mongoose.models.Property as PropertyModel) ||
  mongoose.model<any, PropertyModel>("Property", PropertySchema);

export default Property;
