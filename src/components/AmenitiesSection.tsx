"use client";

import { useState } from "react";

interface AmenitiesSectionProps {
  amenities: string[];
  allAmenities?: string[];
}

// Default amenities with icons
const amenityIcons: Record<string, string> = {
  WiFi: "📶",
  Kitchen: "🍳",
  Washer: "🧺",
  Dryer: "🌪️",
  "Air conditioning": "❄️",
  Heating: "🔥",
  "Dedicated workspace": "💻",
  TV: "📺",
  "Hair dryer": "💨",
  Iron: "👔",
  Pool: "🏊‍♂️",
  "Hot tub": "🛁",
  "Free parking": "🚗",
  Gym: "🏋️‍♂️",
  "BBQ grill": "🔥",
  Patio: "🪴",
  "Garden view": "🌳",
  "Mountain view": "⛰️",
  "Beach access": "🏖️",
  Balcony: "🏠",
  Fireplace: "🔥",
  Piano: "🎹",
  Crib: "👶",
  "High chair": "🪑",
  "Pack n Play": "🛏️",
  Babysitting: "👨‍👩‍👧‍👦",
  "Smoke detector": "🚨",
  "Carbon monoxide detector": "⚠️",
  "Fire extinguisher": "🧯",
  "First aid kit": "🏥",
  "Security cameras": "📹",
  Lockbox: "🔐",
};

// Amenity categories
const amenityCategories = {
  essentials: [
    "WiFi",
    "Kitchen",
    "Washer",
    "Dryer",
    "Air conditioning",
    "Heating",
  ],
  features: ["Dedicated workspace", "TV", "Hair dryer", "Iron"],
  location: [
    "Pool",
    "Hot tub",
    "Free parking",
    "Gym",
    "BBQ grill",
    "Patio",
    "Garden view",
    "Mountain view",
    "Beach access",
    "Balcony",
    "Fireplace",
  ],
  family: ["Crib", "High chair", "Pack n Play", "Babysitting"],
  safety: [
    "Smoke detector",
    "Carbon monoxide detector",
    "Fire extinguisher",
    "First aid kit",
    "Security cameras",
    "Lockbox",
  ],
};

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const [showAll, setShowAll] = useState(false);

  // Show first 10 amenities by default, all if showAll is true
  const displayedAmenities = showAll ? amenities : amenities.slice(0, 10);
  const hasMoreAmenities = amenities.length > 10;

  const getAmenityIcon = (amenity: string) => {
    return amenityIcons[amenity] || "✓";
  };

  const getCategoryAmenities = (category: keyof typeof amenityCategories) => {
    return amenities.filter((amenity) =>
      amenityCategories[category].includes(amenity)
    );
  };

  const renderAmenityItem = (amenity: string, index: number) => (
    <div
      key={index}
      className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
    >
      <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform">
        {getAmenityIcon(amenity)}
      </span>
      <span className="text-gray-900 font-medium text-sm sm:text-base">
        {amenity}
      </span>
    </div>
  );

  if (showAll) {
    const categories = [
      {
        key: "essentials",
        title: "Essentials",
        amenities: getCategoryAmenities("essentials"),
      },
      {
        key: "features",
        title: "Features",
        amenities: getCategoryAmenities("features"),
      },
      {
        key: "location",
        title: "Location features",
        amenities: getCategoryAmenities("location"),
      },
      {
        key: "family",
        title: "Family",
        amenities: getCategoryAmenities("family"),
      },
      {
        key: "safety",
        title: "Safety features",
        amenities: getCategoryAmenities("safety"),
      },
    ].filter((category) => category.amenities.length > 0);

    return (
      <section className="border-b border-gray-200 pb-6 sm:pb-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            What this place offers
          </h2>
          <button
            onClick={() => setShowAll(false)}
            className="text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 underline transition-colors"
          >
            Show less
          </button>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {categories.map((category) => (
            <div key={category.key} className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                {category.amenities.map((amenity, index) =>
                  renderAmenityItem(amenity, index)
                )}
              </div>
            </div>
          ))}

          {/* Uncategorized amenities */}
          {(() => {
            const categorizedAmenities =
              Object.values(amenityCategories).flat();
            const uncategorized = amenities.filter(
              (amenity) => !categorizedAmenities.includes(amenity)
            );

            if (uncategorized.length > 0) {
              return (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">
                    Other amenities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                    {uncategorized.map((amenity, index) =>
                      renderAmenityItem(amenity, index)
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })()}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-gray-200 pb-6 sm:pb-8">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
        What this place offers
      </h2>

      {/* Desktop/Tablet Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-6">
        {displayedAmenities.map((amenity, index) =>
          renderAmenityItem(amenity, index)
        )}
      </div>

      {/* Mobile Amenity Chips */}
      <div className="sm:hidden mb-4">
        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 8).map((amenity, index) => (
            <span
              key={index}
              className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
            >
              <span>{getAmenityIcon(amenity)}</span>
              <span>{amenity}</span>
            </span>
          ))}
          {amenities.length > 8 && (
            <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
              +{amenities.length - 8} more
            </span>
          )}
        </div>
      </div>

      {hasMoreAmenities && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full py-2.5 sm:py-3 px-4 sm:px-6 border border-gray-900 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Show all {amenities.length} amenities</span>
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
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
      )}
    </section>
  );
}
