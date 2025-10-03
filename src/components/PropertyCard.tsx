"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Enhanced Property interface with optional fields for flexibility
export interface Property {
  _id: string;
  title: string;
  description?: string;
  images: string[];
  pricePerNight: number;
  location: {
    city: string;
    state: string;
    country: string;
    address?: string;
  };
  hostName: string;
  hostAvatar?: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  propertyType: string;
  rating: number;
  reviewCount: number;
  amenities?: string[];
  isWishlisted?: boolean;
}

interface PropertyCardProps {
  property: Property;
  loading?: boolean;
  className?: string;
  showHost?: boolean;
  showDescription?: boolean;
  imageAspectRatio?: "square" | "video" | "wide";
  onWishlistToggle?: (propertyId: string, isWishlisted: boolean) => void;
  priority?: boolean; // For Next.js Image priority loading
}

export default function PropertyCard({
  property,
  loading,
  className = "",
  showHost = true,
  showDescription = false,
  imageAspectRatio = "square",
  onWishlistToggle,
  priority = false,
}: PropertyCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(
    property?.isWishlisted || false
  );

  if (loading) {
    return <PropertyCardSkeleton imageAspectRatio={imageAspectRatio} />;
  }

  const {
    _id,
    title,
    description,
    images,
    pricePerNight,
    location,
    hostName,
    bedrooms,
    bathrooms,
    maxGuests,
    propertyType,
    rating,
    reviewCount,
  } = property;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    onWishlistToggle?.(property._id, newWishlistState);
  };

  const getImageAspectClass = () => {
    switch (imageAspectRatio) {
      case "video":
        return "aspect-video";
      case "wide":
        return "aspect-[4/3]";
      default:
        return "aspect-square";
    }
  };

  const getImageUrl = () => {
    if (imageError || !images?.[0]) {
      return "/placeholder-property.svg";
    }
    return images[0];
  };

  return (
    <Link
      href={`/rooms/${_id}`}
      className={`group block transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] ${className}`}
    >
      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
        {/* Image Container */}
        <div
          className={`relative ${getImageAspectClass()} overflow-hidden bg-gray-100`}
        >
          <Image
            src={getImageUrl()}
            alt={title}
            fill
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            onError={() => setImageError(true)}
          />

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Wishlist Heart Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md z-10"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 ${
                isWishlisted
                  ? "text-red-500 fill-current scale-110"
                  : "text-gray-600 hover:text-red-500"
              }`}
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={isWishlisted ? 0 : 2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Property Type Badge */}
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 py-1 rounded-full capitalize shadow-sm">
              {propertyType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 lg:p-5">
          {/* Location & Rating Row */}
          <div className="flex items-start justify-between mb-1 sm:mb-2">
            <div className="flex-1 min-w-0">
              <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">
                {location.city}, {location.state}
              </p>
            </div>
            {rating > 0 && (
              <div className="flex items-center text-xs sm:text-sm ml-2 flex-shrink-0">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-gray-900 font-semibold">
                  {rating.toFixed(1)}
                </span>
                {reviewCount > 0 && (
                  <span className="text-gray-500 ml-1 text-xs hidden sm:inline">
                    ({reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 line-clamp-2 group-hover:text-gray-700 leading-tight transition-colors duration-200">
            {title}
          </h3>

          {/* Description - Optional */}
          {showDescription && description && (
            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
              {description}
            </p>
          )}

          {/* Property Details */}
          <div className="text-gray-500 text-xs mb-2 sm:mb-3 flex flex-wrap gap-1">
            <span>
              {maxGuests} guest{maxGuests !== 1 ? "s" : ""}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              {bedrooms} bedroom{bedrooms !== 1 ? "s" : ""}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              {bathrooms} bathroom{bathrooms !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Host - Optional */}
          {showHost && (
            <div className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center">
              <span>Hosted by {hostName}</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                ${pricePerNight}
              </span>
              <span className="text-gray-500 text-xs sm:text-sm ml-1">
                / night
              </span>
            </div>

            {/* Quick action button - visible on hover */}
            <button className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gray-900 text-white text-xs px-2 py-1 sm:px-3 sm:py-1.5 rounded-full hover:bg-gray-800 hover:scale-105 transform">
              <span className="hidden sm:inline">View</span>
              <svg
                className="w-3 h-3 sm:hidden"
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
      </div>
    </Link>
  );
}

// Enhanced loading skeleton component
function PropertyCardSkeleton({
  imageAspectRatio = "square",
}: {
  imageAspectRatio?: "square" | "video" | "wide";
}) {
  const getSkeletonImageClass = () => {
    switch (imageAspectRatio) {
      case "video":
        return "aspect-video";
      case "wide":
        return "aspect-[4/3]";
      default:
        return "aspect-square";
    }
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Image skeleton with shimmer effect */}
      <div
        className={`${getSkeletonImageClass()} bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 relative overflow-hidden`}
      >
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-16 h-5 bg-gray-300 rounded-full animate-pulse"></div>
      </div>

      {/* Content skeleton with staggered animation */}
      <div className="p-3 sm:p-4 lg:p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-24 sm:w-32 animate-pulse"></div>
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16 animate-pulse"></div>
        </div>

        <div className="space-y-2">
          <div
            className="h-4 sm:h-5 bg-gray-200 rounded w-full animate-pulse"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="h-4 sm:h-5 bg-gray-200 rounded w-4/5 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        <div
          className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>

        <div className="flex justify-between items-center pt-1">
          <div
            className="h-5 sm:h-6 bg-gray-200 rounded w-20 sm:w-24 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="h-5 sm:h-6 bg-gray-200 rounded w-10 sm:w-12 animate-pulse"
            style={{ animationDelay: "0.6s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Property grid component with responsive design
interface PropertyGridProps {
  properties: Property[];
  loading?: boolean;
  loadingCount?: number;
  gridCols?: "auto" | "1" | "2" | "3" | "4" | "5";
  gap?: "sm" | "md" | "lg";
  showHost?: boolean;
  showDescription?: boolean;
  imageAspectRatio?: "square" | "video" | "wide";
  onWishlistToggle?: (propertyId: string, isWishlisted: boolean) => void;
  className?: string;
}

export function PropertyGrid({
  properties,
  loading,
  loadingCount = 12,
  gridCols = "auto",
  gap = "md",
  showHost = true,
  showDescription = false,
  imageAspectRatio = "square",
  onWishlistToggle,
  className = "",
}: PropertyGridProps) {
  // Get responsive grid classes based on gridCols prop
  const getGridClasses = () => {
    const gapClass = {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    }[gap];

    if (gridCols === "auto") {
      // Responsive grid: 1 col mobile, 2 cols tablet, 3+ cols desktop
      return `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ${gapClass}`;
    } else {
      // Fixed grid based on prop
      const colClass = {
        "1": "grid-cols-1",
        "2": "grid-cols-1 sm:grid-cols-2",
        "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        "5": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
      }[gridCols];

      return `grid ${colClass} ${gapClass}`;
    }
  };

  // Loading state with skeletons
  if (loading && properties.length === 0) {
    return (
      <div className={`${getGridClasses()} ${className}`}>
        {Array.from({ length: loadingCount }).map((_, index) => (
          <PropertyCardSkeleton
            key={index}
            imageAspectRatio={imageAspectRatio}
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (properties.length === 0 && !loading) {
    return (
      <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-md mx-auto animate-[fadeIn_0.6s_ease-out]">
          <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6 opacity-50">
            🏠
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
            No properties found
          </h3>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
            Try adjusting your search criteria or explore different locations to
            find the perfect stay.
          </p>
          <div className="flex flex-wrap gap-2 justify-center text-xs sm:text-sm text-gray-500">
            <span className="bg-gray-100 hover:bg-gray-200 px-2 sm:px-3 py-1 rounded-full cursor-pointer transition-colors">
              Clear filters
            </span>
            <span className="bg-gray-100 hover:bg-gray-200 px-2 sm:px-3 py-1 rounded-full cursor-pointer transition-colors">
              Try different dates
            </span>
            <span className="bg-gray-100 hover:bg-gray-200 px-2 sm:px-3 py-1 rounded-full cursor-pointer transition-colors">
              Expand search
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Main grid with properties
  return (
    <div className={`${getGridClasses()} ${className}`}>
      {properties.map((property, index) => (
        <PropertyCard
          key={property._id}
          property={property}
          showHost={showHost}
          showDescription={showDescription}
          imageAspectRatio={imageAspectRatio}
          onWishlistToggle={onWishlistToggle}
          priority={index < 4} // Priority loading for first 4 images
        />
      ))}
      {/* Loading more cards */}
      {loading &&
        Array.from({ length: Math.min(4, loadingCount) }).map((_, index) => (
          <PropertyCardSkeleton
            key={`loading-${index}`}
            imageAspectRatio={imageAspectRatio}
          />
        ))}
    </div>
  );
}

// Error state component
export function PropertyGridError({
  error,
  onRetry,
}: {
  error?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
      <div className="max-w-md mx-auto animate-[fadeIn_0.6s_ease-out]">
        <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6 opacity-50">
          ⚠️
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
          Something went wrong
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
          {error || "We couldn't load the properties. Please try again."}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base font-medium"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

// Empty state component for no results
export function PropertyGridEmpty({
  title = "No stays found",
  message = "Try adjusting your search or filters to find what you're looking for.",
  actionButton,
}: {
  title?: string;
  message?: string;
  actionButton?: React.ReactNode;
}) {
  return (
    <div className="text-center py-12 sm:py-16 lg:py-20 px-4">
      <div className="max-w-md mx-auto animate-[fadeIn_0.6s_ease-out]">
        <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6 opacity-60">
          🏠
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
          {title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
          {message}
        </p>
        <div className="space-y-3 sm:space-y-4">
          {actionButton || (
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm sm:text-base font-medium hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear filters
            </button>
          )}
          <div className="text-xs sm:text-sm text-gray-500 space-y-2">
            <p className="font-medium">Try:</p>
            <ul className="space-y-1 text-left max-w-xs mx-auto">
              <li>• Changing your dates</li>
              <li>• Removing some filters</li>
              <li>• Searching a nearby area</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact grid variant for smaller spaces
export function PropertyGridCompact({
  properties,
  loading,
  maxItems = 6,
  onWishlistToggle,
}: {
  properties: Property[];
  loading?: boolean;
  maxItems?: number;
  onWishlistToggle?: (propertyId: string, isWishlisted: boolean) => void;
}) {
  const displayProperties = properties.slice(0, maxItems);

  return (
    <PropertyGrid
      properties={displayProperties}
      loading={loading}
      loadingCount={maxItems}
      gridCols="3"
      gap="sm"
      showHost={false}
      showDescription={false}
      imageAspectRatio="wide"
      onWishlistToggle={onWishlistToggle}
      className="max-w-4xl"
    />
  );
}

// Property details loading skeleton
export function PropertyDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero image skeleton */}
      <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-200 rounded-lg mb-6 sm:mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
      </div>

      {/* Title and details skeleton */}
      <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
        <div className="h-6 sm:h-8 bg-gray-200 rounded w-3/4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
        </div>
        <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
        </div>
        <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>

      {/* Description skeleton */}
      <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
        <div className="h-4 bg-gray-200 rounded w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-5/6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-4/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>

      {/* Amenities skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-10 sm:h-12 bg-gray-200 rounded relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
          </div>
        ))}
      </div>

      {/* Booking widget skeleton */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
        <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/3 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-12 sm:h-14 bg-gray-200 rounded relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
            </div>
          ))}
        </div>
        <div className="h-10 sm:h-12 bg-gray-200 rounded w-full mt-4 sm:mt-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
    </div>
  );
}
