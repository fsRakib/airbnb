import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import mongoose from "mongoose";

// GET /api/bookings/[id] - Get a specific booking
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
          error: "Invalid booking ID format",
        },
        { status: 400 }
      );
    }

    // Find the property that contains this booking
    const property = (await Property.findOne({
      "bookings._id": id,
    }).lean()) as any;

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found",
        },
        { status: 404 }
      );
    }

    // Find the specific booking
    const booking = property.bookings.find((b: any) => b._id.toString() === id);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found",
        },
        { status: 404 }
      );
    }

    // Return booking with property details
    const bookingWithProperty = {
      bookingId: booking._id,
      propertyId: property._id,
      propertyTitle: property.title,
      propertyImages: property.images,
      location: property.location,
      hostId: property.hostId,
      hostName: property.hostName,
      hostAvatar: property.hostAvatar,
      guestId: booking.guestId,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      totalPrice: booking.totalPrice,
      status: booking.status,
      createdAt: booking.createdAt,
    };

    return NextResponse.json({
      success: true,
      data: bookingWithProperty,
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch booking",
      },
      { status: 500 }
    );
  }
}

// PATCH /api/bookings/[id] - Update booking status (confirm, cancel)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;
    const body = await request.json();
    const { status, updatedBy } = body;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid booking ID format",
        },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ["pending", "confirmed", "cancelled"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Status must be one of: ${validStatuses.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Find the property that contains this booking
    const property = await Property.findOne({ "bookings._id": id });

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found",
        },
        { status: 404 }
      );
    }

    // Find the booking index
    const bookingIndex = property.bookings.findIndex(
      (b: any) => b._id.toString() === id
    );

    if (bookingIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Booking not found",
        },
        { status: 404 }
      );
    }

    const booking = property.bookings[bookingIndex];

    // Check if the booking can be updated
    if (booking.status === "cancelled" && status !== "cancelled") {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot update a cancelled booking",
        },
        { status: 400 }
      );
    }

    // If confirming a booking, check if dates are still available
    if (status === "confirmed" && booking.status !== "confirmed") {
      // Temporarily remove this booking to check availability
      const tempBookings = property.bookings.filter(
        (_: any, index: number) => index !== bookingIndex
      );
      const tempProperty = { ...property.toObject(), bookings: tempBookings };

      // Check if the dates are still available (considering other bookings)
      const isAvailable = !tempBookings.some((otherBooking: any) => {
        if (otherBooking.status === "cancelled") return false;

        const otherStart = new Date(otherBooking.checkIn);
        const otherEnd = new Date(otherBooking.checkOut);
        const bookingStart = new Date(booking.checkIn);
        const bookingEnd = new Date(booking.checkOut);

        return bookingStart < otherEnd && bookingEnd > otherStart;
      });

      if (!isAvailable) {
        return NextResponse.json(
          {
            success: false,
            error: "Property is no longer available for the selected dates",
          },
          { status: 400 }
        );
      }
    }

    // Check if booking is in the past (can't cancel past bookings that are confirmed)
    const now = new Date();
    const checkInDate = new Date(booking.checkIn);

    if (
      status === "cancelled" &&
      booking.status === "confirmed" &&
      checkInDate <= now
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot cancel a booking that has already started",
        },
        { status: 400 }
      );
    }

    // Update the booking status
    property.bookings[bookingIndex].status = status;
    property.updatedAt = new Date();

    await property.save();

    const updatedBooking = property.bookings[bookingIndex];

    return NextResponse.json({
      success: true,
      data: {
        bookingId: updatedBooking._id,
        propertyId: property._id,
        propertyTitle: property.title,
        status: updatedBooking.status,
        message: `Booking ${status} successfully`,
      },
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update booking",
      },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id] - Delete a booking (only if pending)
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
          error: "Invalid booking ID format",
        },
        { status: 400 }
      );
    }

    // Find and update the property to remove the booking
    const property = await Property.findOneAndUpdate(
      {
        "bookings._id": id,
        "bookings.status": "pending", // Only allow deletion of pending bookings
      },
      {
        $pull: { bookings: { _id: id } },
        $set: { updatedAt: new Date() },
      },
      { new: true }
    );

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Booking not found or cannot be deleted (only pending bookings can be deleted)",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully",
      data: { id },
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete booking",
      },
      { status: 500 }
    );
  }
}
