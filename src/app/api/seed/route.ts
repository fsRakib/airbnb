import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { seedDatabase } from "@/data/seedData";

// POST /api/seed - Seed the database with sample data
export async function POST(request: NextRequest) {
  try {
    // Check if we're in development mode
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          success: false,
          error: "Seeding is only allowed in development mode",
        },
        { status: 403 }
      );
    }

    await connectDB();

    const properties = await seedDatabase();

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${properties.length} properties`,
      data: {
        count: properties.length,
        properties: properties.map((p) => ({
          id: p._id,
          title: p.title,
          city: p.location.city,
          pricePerNight: p.pricePerNight,
        })),
      },
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to seed database",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET /api/seed - Get seeding status and sample data info
export async function GET() {
  try {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          success: false,
          error: "Seeding endpoints are only available in development mode",
        },
        { status: 403 }
      );
    }

    await connectDB();

    const Property = (await import("@/models/Property")).default;
    const count = await Property.countDocuments();

    return NextResponse.json({
      success: true,
      data: {
        currentPropertyCount: count,
        message:
          count > 0
            ? "Database has been seeded with sample data"
            : "Database is empty. Use POST /api/seed to add sample data",
      },
    });
  } catch (error) {
    console.error("Error checking seed status:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check seed status",
      },
      { status: 500 }
    );
  }
}
