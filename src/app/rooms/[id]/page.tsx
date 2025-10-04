"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Link from "next/link";
import Header from "@/components/Header";
import { Property } from "@/components/PropertyCard";
import ImageGallery from "@/components/ImageGallery";
import PropertyInfo from "@/components/PropertyInfo";
import AmenitiesSection from "@/components/AmenitiesSection";
import ReviewsSection from "@/components/ReviewsSection";
import BookingWidget from "@/components/BookingWidget";
import PropertyMap from "@/components/PropertyMap";
import SleepingArrangements from "@/components/SleepingArrangements";

export default function PropertyPage() {
  const params = useParams();
  const propertyId = params?.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch property data (using mock data)
  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) return;

      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock property data based on ID
        const mockProperty: Property = {
          _id: propertyId,
          title: `Beautiful Property ${propertyId}`,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          images: [
            "/placeholder-property.svg",
            "/placeholder-property.svg",
            "/placeholder-property.svg",
            "/placeholder-property.svg",
            "/placeholder-property.svg"
          ],
          pricePerNight: 180 + Math.floor(Math.random() * 200),
          location: {
            city: "San Francisco",
            state: "CA",
            country: "USA",
            address: "123 Main Street"
          },
          hostName: "John Doe",
          hostAvatar: "/placeholder-property.svg",
          amenities: ["WiFi", "Kitchen", "Parking", "Pool", "Air conditioning", "Heating"],
          bedrooms: 2 + Math.floor(Math.random() * 3),
          bathrooms: 1 + Math.floor(Math.random() * 2),
          maxGuests: 4 + Math.floor(Math.random() * 4),
          propertyType: "apartment",
          rating: 4.5 + Math.random() * 0.5,
          reviewCount: 20 + Math.floor(Math.random() * 100)
        };

        setProperty(mockProperty);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (loading) {
    return <PropertyPageSkeleton />;
  }

  if (error || !property) {
    return <PropertyPageError error={error} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 overflow-x-auto">
            <Link
              href="/"
              className="hover:text-gray-700 transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href="/"
              className="hover:text-gray-700 transition-colors whitespace-nowrap"
            >
              {property.location.city}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 truncate font-medium">
              {property.title}
            </span>
          </nav>
        </div>

        {/* Image Gallery */}
        <div className="px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <ImageGallery images={property.images} title={property.title} />
        </div>

        {/* Property Title and Actions */}
        <div className="px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2 leading-tight">
                {property.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                {property.rating > 0 && (
                  <>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-400 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="font-medium text-gray-900">
                        {property.rating.toFixed(1)}
                      </span>
                    </div>
                    <span>•</span>
                  </>
                )}
                {property.reviewCount > 0 && (
                  <>
                    <button className="hover:underline font-medium text-gray-900">
                      {property.reviewCount.toLocaleString()} review
                      {property.reviewCount !== 1 ? "s" : ""}
                    </button>
                    <span>•</span>
                  </>
                )}
                <span className="font-medium text-gray-900">
                  {property.location.city}, {property.location.state},{" "}
                  {property.location.country}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-4 sm:px-6 lg:px-8 grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 xl:gap-12">
          {/* Left Column - Property Details */}
          <div className="xl:col-span-2 space-y-6 sm:space-y-8">
            {/* Property Info */}
            <PropertyInfo property={property} />

            {/* Mobile Booking Widget - Show above content on small screens */}
            <div className="xl:hidden">
              <BookingWidget property={property} />
            </div>

            {/* Amenities */}
            <AmenitiesSection amenities={property.amenities || []} />

            {/* Sleeping Arrangements */}
            <SleepingArrangements
              bedrooms={property.bedrooms}
              beds={property.bedrooms + 1}
              bathrooms={property.bathrooms}
            />

            {/* Description */}
            <section className="border-b border-gray-200 pb-6 sm:pb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                About this place
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {property.description}
                </p>
              </div>
            </section>

            {/* Reviews */}
            <ReviewsSection
              reviews={[
                {
                  id: "1",
                  guestName: "Sarah Johnson",
                  rating: 5,
                  date: "2024-01-15",
                  comment:
                    "Amazing place! The location was perfect and the host was super responsive. Would definitely stay here again.",
                  helpfulCount: 12,
                },
                {
                  id: "2",
                  guestName: "Mike Chen",
                  rating: 4,
                  date: "2024-01-10",
                  comment:
                    "Great space with all the amenities we needed. The kitchen was well-equipped and the beds were comfortable.",
                  helpfulCount: 8,
                },
                {
                  id: "3",
                  guestName: "Emma Davis",
                  rating: 5,
                  date: "2024-01-05",
                  comment:
                    "Loved staying here! The property exceeded our expectations. Clean, cozy, and in a fantastic neighborhood.",
                  helpfulCount: 15,
                },
              ]}
              overallRating={property.rating}
              reviewCount={property.reviewCount}
              ratingBreakdown={{
                cleanliness: 4.8,
                accuracy: 4.9,
                checkin: 4.7,
                communication: 4.9,
                location: 4.6,
                value: 4.5,
              }}
            />

            {/* Map */}
            <PropertyMap location={property.location} title={property.title} />
          </div>

          {/* Right Column - Booking Widget (Desktop Only) */}
          <div className="xl:col-span-1 hidden xl:block">
            <div className="sticky top-6">
              <BookingWidget property={property} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Loading skeleton with improved responsive design and animations
function PropertyPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb skeleton */}
        <div className="py-3 sm:py-4">
          <div className="h-3 sm:h-4 bg-gray-200 rounded w-48 sm:w-64 relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        {/* Image gallery skeleton */}
        <div className="mb-6 sm:mb-8">
          <div className="aspect-[16/10] sm:aspect-[2/1] bg-gray-200 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Title section */}
            <div className="space-y-3 sm:space-y-4">
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

            {/* Amenities skeleton */}
            <div className="space-y-3 sm:space-y-4">
              <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {[...Array(8)].map((_: unknown, i) => (
                  <div
                    key={i}
                    className="h-10 sm:h-12 bg-gray-200 rounded relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"
                      style={{ animationDelay: `${i * 100}ms` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description skeleton */}
            <div className="space-y-3 sm:space-y-4">
              <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {[...Array(4)].map((_: unknown, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-200 rounded relative overflow-hidden"
                    style={{ width: `${100 - i * 10}%` }}
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"
                      style={{ animationDelay: `${i * 150}ms` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews skeleton */}
            <div className="space-y-3 sm:space-y-4">
              <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                {[...Array(3)].map((_: unknown, i) => (
                  <div key={i} className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"
                          style={{ animationDelay: `${i * 200}ms` }}
                        ></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-24 relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"
                          style={{ animationDelay: `${i * 200}ms` }}
                        ></div>
                      </div>
                    </div>
                    <div className="h-16 sm:h-20 bg-gray-200 rounded relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"
                        style={{ animationDelay: `${i * 200}ms` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking widget skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 lg:sticky lg:top-24">
              <div className="space-y-4 sm:space-y-6">
                <div className="h-6 sm:h-8 bg-gray-200 rounded w-2/3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {[...Array(4)].map((_: unknown, i) => (
                    <div
                      key={i}
                      className="h-12 sm:h-14 bg-gray-200 rounded-lg relative overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"
                        style={{ animationDelay: `${i * 100}ms` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="h-12 sm:h-14 bg-gray-200 rounded-lg w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-50 to-gray-200 animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Error state with improved responsive design and interactivity
function PropertyPageError({ error }: { error: string | null }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center animate-[fadeIn_0.6s_ease-out]">
          <div className="text-5xl sm:text-6xl lg:text-7xl mb-4 sm:mb-6 opacity-60">
            🏠
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Property not found
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto">
            {error ||
              "The property you're looking for doesn't exist or has been removed."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Back to Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-sm sm:text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>
          </div>
          <div className="mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500">
            <p>
              Having trouble?{" "}
              <a
                href="mailto:support@airbnb.com"
                className="text-gray-700 hover:text-gray-900 underline"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
