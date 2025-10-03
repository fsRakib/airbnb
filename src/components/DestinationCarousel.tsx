"use client";

import { useRef } from "react";
import AirbnbPropertyCard from "./AirbnbPropertyCard";

interface AirbnbProperty {
  id: string;
  title: string;
  location: string;
  images: string[];
  rating: number;
  reviewCount: number;
  price: number;
  isGuestFavorite?: boolean;
  nights?: number;
}

interface DestinationCarouselProps {
  title: string;
  properties: AirbnbProperty[];
}

export default function DestinationCarousel({
  title,
  properties,
}: DestinationCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-gray-900">{title}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={scrollLeft}
              className="p-2 border border-gray-300 rounded-full hover:border-gray-900 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="p-2 border border-gray-300 rounded-full hover:border-gray-900 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Property Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {properties.map((property) => (
            <div key={property.id} className="flex-none w-72">
              <AirbnbPropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// Sample data for different destinations
export const sampleDestinations = [
  {
    title: "Popular homes in Kuala Lumpur",
    properties: [
      {
        id: "1",
        title: "Apartment in Bukit Bintang",
        location: "Kuala Lumpur, Malaysia",
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720&h=720&fit=crop",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720&h=720&fit=crop",
        ],
        rating: 4.95,
        reviewCount: 67,
        price: 185,
        nights: 2,
        isGuestFavorite: true,
      },
      {
        id: "2",
        title: "Modern Condo in KLCC",
        location: "Kuala Lumpur, Malaysia",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720&h=720&fit=crop",
        ],
        rating: 4.87,
        reviewCount: 89,
        price: 220,
        nights: 2,
        isGuestFavorite: false,
      },
      {
        id: "3",
        title: "Cozy Studio near Pavilion",
        location: "Kuala Lumpur, Malaysia",
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720&h=720&fit=crop",
        ],
        rating: 4.92,
        reviewCount: 45,
        price: 150,
        nights: 2,
        isGuestFavorite: true,
      },
      {
        id: "4",
        title: "Luxury Penthouse in Mont Kiara",
        location: "Kuala Lumpur, Malaysia",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720&h=720&fit=crop",
        ],
        rating: 4.98,
        reviewCount: 34,
        price: 350,
        nights: 2,
        isGuestFavorite: false,
      },
    ],
  },
  {
    title: "Available next month in Bangkok",
    properties: [
      {
        id: "5",
        title: "Apartment in Khet Ratchathewi",
        location: "Bangkok, Thailand",
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720&h=720&fit=crop",
        ],
        rating: 4.95,
        reviewCount: 123,
        price: 83,
        nights: 2,
        isGuestFavorite: true,
      },
      {
        id: "6",
        title: "Stylish Loft in Sukhumvit",
        location: "Bangkok, Thailand",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720&h=720&fit=crop",
        ],
        rating: 4.89,
        reviewCount: 67,
        price: 95,
        nights: 2,
        isGuestFavorite: false,
      },
      {
        id: "7",
        title: "River View Condo in Saphan Phut",
        location: "Bangkok, Thailand",
        images: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=720&h=720&fit=crop",
        ],
        rating: 4.93,
        reviewCount: 89,
        price: 120,
        nights: 2,
        isGuestFavorite: true,
      },
      {
        id: "8",
        title: "Boutique Hotel Suite in Silom",
        location: "Bangkok, Thailand",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=720&h=720&fit=crop",
        ],
        rating: 4.96,
        reviewCount: 156,
        price: 140,
        nights: 2,
        isGuestFavorite: false,
      },
    ],
  },
];
