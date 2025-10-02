"use client";

import Image from "next/image";
import { Property } from "./PropertyCard";

interface PropertyInfoProps {
  property: Property;
}

export default function PropertyInfo({ property }: PropertyInfoProps) {
  const {
    title,
    location,
    hostName,
    hostAvatar,
    bedrooms,
    bathrooms,
    maxGuests,
    propertyType,
    rating,
    reviewCount,
  } = property;

  return (
    <section className="border-b border-gray-200 pb-6 sm:pb-8">
      {/* Title and Location */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight">
          {title}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-0">
          <div className="flex items-center flex-wrap gap-1">
            {rating > 0 && (
              <>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="font-medium text-gray-900">
                  {rating.toFixed(1)}
                </span>
                <span className="mx-1 hidden sm:inline">•</span>
              </>
            )}
            {reviewCount > 0 && (
              <>
                <button className="hover:underline font-medium text-gray-900 transition-colors">
                  {reviewCount.toLocaleString()} review
                  {reviewCount !== 1 ? "s" : ""}
                </button>
                <span className="mx-1 hidden sm:inline">•</span>
              </>
            )}
          </div>
          <span className="font-medium text-gray-900 sm:text-gray-600">
            {location.city}, {location.state}, {location.country}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-gray-900 space-y-3 sm:space-y-0">
          <div className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:space-x-6">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 119.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="font-medium text-xs sm:text-sm">
                {maxGuests} guest{maxGuests !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z"
                />
              </svg>
              <span className="font-medium text-xs sm:text-sm">
                {bedrooms} bed{bedrooms !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
              <span className="font-medium text-xs sm:text-sm">
                {bathrooms} bath{bathrooms !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-100 text-gray-800 capitalize">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2l-2 2m2-2H10a1 1 0 00-1 1v3m-6 0h6m-6 0a1 1 0 001 1v4a1 1 0 001 1h2m10-6v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4a1 1 0 00-1-1H10"
              />
            </svg>
            {propertyType}
          </span>
        </div>
      </div>

      {/* Host Information */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
            {hostAvatar ? (
              <Image
                src={hostAvatar}
                alt={hostName}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
              Hosted by {hostName}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Superhost • Hosting since 2020
            </p>
          </div>
        </div>

        <button className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 hover:scale-[1.02] active:scale-[0.98]">
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="hidden sm:inline">Contact Host</span>
          <span className="sm:hidden">Contact</span>
        </button>
      </div>

      {/* Additional Host Stats */}
      <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-3 sm:gap-4 text-center">
        <div className="py-2">
          <div className="text-lg sm:text-xl font-semibold text-gray-900">
            4.9
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">
            Rating
          </div>
        </div>
        <div className="py-2 border-x border-gray-200">
          <div className="text-lg sm:text-xl font-semibold text-gray-900">
            {reviewCount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">
            Reviews
          </div>
        </div>
        <div className="py-2">
          <div className="text-lg sm:text-xl font-semibold text-gray-900">
            2+
          </div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">
            Years hosting
          </div>
        </div>
      </div>
    </section>
  );
}
