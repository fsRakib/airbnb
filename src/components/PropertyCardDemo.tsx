"use client";

import { Property, PropertyGrid, PropertyGridCompact } from "./PropertyCard";

// Sample property data for demonstration
const sampleProperties: Property[] = [
  {
    _id: "1",
    title: "Cozy Downtown Loft with City Views",
    description:
      "Beautiful modern loft in the heart of downtown with stunning city skyline views.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    pricePerNight: 125,
    location: {
      city: "New York",
      state: "New York",
      country: "United States",
    },
    hostName: "Sarah Johnson",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    propertyType: "loft",
    rating: 4.8,
    reviewCount: 127,
    isWishlisted: false,
  },
  {
    _id: "2",
    title: "Beachfront Villa with Private Pool",
    description:
      "Stunning oceanfront villa with private pool and direct beach access.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    ],
    pricePerNight: 350,
    location: {
      city: "Miami Beach",
      state: "Florida",
      country: "United States",
    },
    hostName: "Carlos Rodriguez",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    propertyType: "villa",
    rating: 4.9,
    reviewCount: 89,
    isWishlisted: true,
  },
  {
    _id: "3",
    title: "Mountain Cabin Retreat",
    description:
      "Rustic mountain cabin surrounded by towering pines and hiking trails.",
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
    ],
    pricePerNight: 180,
    location: {
      city: "Aspen",
      state: "Colorado",
      country: "United States",
    },
    hostName: "Emily Chen",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    propertyType: "cabin",
    rating: 4.7,
    reviewCount: 203,
    isWishlisted: false,
  },
];

interface PropertyCardDemoProps {
  variant?: "default" | "compact" | "wide" | "loading";
}

export default function PropertyCardDemo({
  variant = "default",
}: PropertyCardDemoProps) {
  const handleWishlistToggle = (propertyId: string, isWishlisted: boolean) => {
    console.log(`Property ${propertyId} wishlist status: ${isWishlisted}`);
    // In a real app, this would update the backend and local state
  };

  switch (variant) {
    case "compact":
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Compact Grid Demo
          </h2>
          <PropertyGridCompact
            properties={sampleProperties}
            maxItems={6}
            onWishlistToggle={handleWishlistToggle}
          />
        </div>
      );

    case "wide":
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Wide Aspect Ratio Demo
          </h2>
          <PropertyGrid
            properties={sampleProperties}
            gridCols="3"
            imageAspectRatio="wide"
            showDescription={true}
            onWishlistToggle={handleWishlistToggle}
          />
        </div>
      );

    case "loading":
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Loading State Demo
          </h2>
          <PropertyGrid properties={[]} loading={true} loadingCount={8} />
        </div>
      );

    default:
      return (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Responsive Grid Demo
          </h2>
          <p className="text-gray-600">
            Resize your browser to see the responsive grid in action:
            <br />
            • Mobile (&lt; 640px): 1 column
            <br />
            • Tablet (640px - 1024px): 2 columns
            <br />
            • Desktop (1024px - 1280px): 3 columns
            <br />• Large Desktop (&gt; 1280px): 4+ columns
          </p>

          <PropertyGrid
            properties={sampleProperties}
            showDescription={true}
            onWishlistToggle={handleWishlistToggle}
          />
        </div>
      );
  }
}

// Usage examples component
export function PropertyCardExamples() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          PropertyCard Component Examples
        </h1>
        <p className="text-xl text-gray-600">
          Showcasing different variations and responsive behavior
        </p>
      </div>

      <PropertyCardDemo variant="default" />
      <PropertyCardDemo variant="wide" />
      <PropertyCardDemo variant="compact" />
      <PropertyCardDemo variant="loading" />

      <div className="bg-gray-50 rounded-lg p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">Responsive Design</h4>
            <ul className="space-y-1 text-sm">
              <li>• 1 column on mobile (&lt; 640px)</li>
              <li>• 2 columns on tablet (640px - 1024px)</li>
              <li>• 3+ columns on desktop (&gt; 1024px)</li>
              <li>• Flexible grid system with custom column counts</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Interactive Features</h4>
            <ul className="space-y-1 text-sm">
              <li>• Hover effects with scale and shadow</li>
              <li>• Touch-friendly interactions on mobile</li>
              <li>• Wishlist toggle functionality</li>
              <li>• Image error handling with fallbacks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Customization Options</h4>
            <ul className="space-y-1 text-sm">
              <li>• Multiple image aspect ratios</li>
              <li>• Optional host and description display</li>
              <li>• Configurable grid gaps and columns</li>
              <li>• Loading states with skeletons</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Performance</h4>
            <ul className="space-y-1 text-sm">
              <li>• Next.js Image optimization</li>
              <li>• Priority loading for above-the-fold images</li>
              <li>• Responsive image sizing</li>
              <li>• Efficient skeleton loading states</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
