export const sampleProperties = [
  {
    title: "Cozy Downtown Loft with Skyline Views",
    description: "Beautiful modern loft in the heart of downtown with stunning city skyline views. Features exposed brick walls, high ceilings, and floor-to-ceiling windows. Walking distance to restaurants, shopping, and public transportation. Perfect for business travelers and urban explorers.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560449752-bf5ea5dfd8c9?w=800"
    ],
    pricePerNight: 125,
    location: {
      city: "New York",
      state: "New York",
      country: "United States",
      address: "456 Broadway St, New York, NY 10013",
      latitude: 40.7128,
      longitude: -74.0060
    },
    hostId: "host_001",
    hostName: "Sarah Johnson",
    hostAvatar: "https://images.unsplash.com/photo-1494790108755-2616b9593a9c?w=150",
    amenities: ["WiFi", "Kitchen", "Washer", "Dryer", "TV", "Air conditioning", "Elevator", "Gym"],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    propertyType: "loft",
    rating: 4.8,
    reviewCount: 127,
    bookings: [
      {
        guestId: "guest_001",
        checkIn: new Date("2024-11-15"),
        checkOut: new Date("2024-11-18"),
        guests: 2,
        totalPrice: 375,
        status: "confirmed"
      }
    ]
  },
  {
    title: "Beachfront Villa with Private Pool",
    description: "Stunning oceanfront villa with private pool and direct beach access. This luxurious 4-bedroom property features panoramic ocean views, a fully equipped gourmet kitchen, and spacious outdoor entertaining areas. Perfect for families and groups looking for a tropical getaway.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
    ],
    pricePerNight: 350,
    location: {
      city: "Miami Beach",
      state: "Florida",
      country: "United States",
      address: "789 Ocean Drive, Miami Beach, FL 33139",
      latitude: 25.7617,
      longitude: -80.1918
    },
    hostId: "host_002",
    hostName: "Carlos Rodriguez",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    amenities: ["WiFi", "Kitchen", "Pool", "Beach access", "Parking", "TV", "Air conditioning", "BBQ grill", "Hot tub"],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    propertyType: "villa",
    rating: 4.9,
    reviewCount: 89,
    bookings: []
  },
  {
    title: "Mountain Cabin Retreat",
    description: "Rustic mountain cabin surrounded by towering pines and hiking trails. Features a stone fireplace, wraparound deck, and hot tub with mountain views. Ideal for nature lovers seeking tranquility and outdoor adventure. Close to skiing in winter and hiking in summer.",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800",
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800"
    ],
    pricePerNight: 180,
    location: {
      city: "Aspen",
      state: "Colorado",
      country: "United States",
      address: "123 Pine Ridge Road, Aspen, CO 81611",
      latitude: 39.1911,
      longitude: -106.8175
    },
    hostId: "host_003",
    hostName: "Emily Chen",
    hostAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    amenities: ["WiFi", "Kitchen", "Fireplace", "Hot tub", "Parking", "TV", "Heating", "Deck", "Mountain view"],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    propertyType: "cabin",
    rating: 4.7,
    reviewCount: 203,
    bookings: [
      {
        guestId: "guest_002",
        checkIn: new Date("2024-12-20"),
        checkOut: new Date("2024-12-27"),
        guests: 4,
        totalPrice: 1260,
        status: "confirmed"
      }
    ]
  },
  {
    title: "Historic Brownstone Apartment",
    description: "Charming 2-bedroom apartment in a beautifully restored 19th-century brownstone. Features original hardwood floors, ornate moldings, and period details combined with modern amenities. Located in a quiet tree-lined neighborhood with easy access to museums and parks.",
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800"
    ],
    pricePerNight: 95,
    location: {
      city: "Boston",
      state: "Massachusetts",
      country: "United States",
      address: "321 Commonwealth Ave, Boston, MA 02115",
      latitude: 42.3601,
      longitude: -71.0589
    },
    hostId: "host_004",
    hostName: "Michael O'Brien",
    hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    amenities: ["WiFi", "Kitchen", "Washer", "TV", "Heating", "Workspace", "Coffee maker"],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    propertyType: "apartment",
    rating: 4.6,
    reviewCount: 156,
    bookings: []
  },
  {
    title: "Modern Studio in Arts District",
    description: "Sleek and stylish studio apartment in the vibrant Arts District. Features contemporary furnishings, a murphy bed, and a small but efficient kitchen. Perfect for solo travelers and couples who want to be in the heart of the cultural scene with galleries, theaters, and trendy restaurants nearby.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800",
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800"
    ],
    pricePerNight: 85,
    location: {
      city: "Los Angeles",
      state: "California",
      country: "United States",
      address: "567 Spring St, Los Angeles, CA 90013",
      latitude: 34.0522,
      longitude: -118.2437
    },
    hostId: "host_005",
    hostName: "Jessica Kim",
    hostAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    amenities: ["WiFi", "Kitchen", "TV", "Air conditioning", "Workspace", "Coffee maker"],
    bedrooms: 0,
    bathrooms: 1,
    maxGuests: 2,
    propertyType: "studio",
    rating: 4.4,
    reviewCount: 92,
    bookings: []
  },
  {
    title: "Lakefront House with Dock",
    description: "Peaceful lakefront house with private dock and boat access. This 3-bedroom home offers stunning water views, a spacious deck perfect for morning coffee or evening sunsets, and direct lake access for swimming, fishing, and water sports. Includes kayaks and fishing equipment.",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
    ],
    pricePerNight: 220,
    location: {
      city: "Lake Tahoe",
      state: "California",
      country: "United States",
      address: "890 Lakeshore Drive, Lake Tahoe, CA 96150",
      latitude: 39.0968,
      longitude: -120.0324
    },
    hostId: "host_006",
    hostName: "David Thompson",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    amenities: ["WiFi", "Kitchen", "Dock", "Kayaks", "Fishing gear", "TV", "Fireplace", "Deck", "Lake view", "Parking"],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    propertyType: "house",
    rating: 4.8,
    reviewCount: 174,
    bookings: [
      {
        guestId: "guest_003",
        checkIn: new Date("2024-11-22"),
        checkOut: new Date("2024-11-25"),
        guests: 5,
        totalPrice: 660,
        status: "confirmed"
      }
    ]
  },
  {
    title: "Urban Penthouse with Rooftop Terrace",
    description: "Luxurious penthouse with a private rooftop terrace offering 360-degree city views. Features 2 bedrooms, 2 bathrooms, premium appliances, and contemporary design throughout. The rooftop space includes outdoor furniture, a BBQ area, and is perfect for entertaining.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"
    ],
    pricePerNight: 275,
    location: {
      city: "Seattle",
      state: "Washington",
      country: "United States",
      address: "101 Pike Street, Seattle, WA 98101",
      latitude: 47.6062,
      longitude: -122.3321
    },
    hostId: "host_007",
    hostName: "Amanda Foster",
    hostAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150",
    amenities: ["WiFi", "Kitchen", "Rooftop terrace", "City view", "BBQ grill", "TV", "Air conditioning", "Elevator", "Gym"],
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    propertyType: "apartment",
    rating: 4.9,
    reviewCount: 68,
    bookings: []
  },
  {
    title: "Countryside Farmhouse",
    description: "Charming renovated farmhouse on 5 acres of rolling countryside. Features original wood beams, a farmhouse kitchen, and wraparound porch with rocking chairs. Surrounded by pastures and gardens, this property offers a peaceful retreat from city life with hiking trails nearby.",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800",
      "https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=800",
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800"
    ],
    pricePerNight: 150,
    location: {
      city: "Nashville",
      state: "Tennessee",
      country: "United States",
      address: "456 Country Road, Nashville, TN 37203",
      latitude: 36.1627,
      longitude: -86.7816
    },
    hostId: "host_008",
    hostName: "Robert Miller",
    hostAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
    amenities: ["WiFi", "Kitchen", "Fireplace", "Porch", "Garden", "TV", "Parking", "Pet friendly", "Country view"],
    bedrooms: 4,
    bathrooms: 2,
    maxGuests: 8,
    propertyType: "house",
    rating: 4.7,
    reviewCount: 134,
    bookings: []
  }
];

// Function to seed the database with sample data
export async function seedDatabase() {
  try {
    const Property = (await import('../models/Property')).default;
    
    // Clear existing data (optional - remove in production)
    await Property.deleteMany({});
    
    // Insert sample properties
    const insertedProperties = await Property.insertMany(sampleProperties);
    
    console.log(`Successfully seeded ${insertedProperties.length} properties`);
    return insertedProperties;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}