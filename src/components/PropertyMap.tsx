"use client";

import { useState, useEffect } from "react";

interface Location {
  city: string;
  state: string;
  country: string;
  coordinates?: [number, number]; // [longitude, latitude]
}

interface PropertyMapProps {
  location: Location;
  title: string;
  hideExactLocation?: boolean;
}

export default function PropertyMap({
  location,
  title,
  hideExactLocation = true,
}: PropertyMapProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock coordinates for demo (in real app, these would come from backend)
  const demoCoordinates: [number, number] = location.coordinates || [
    -74.006, 40.7128,
  ]; // Default to NYC

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleGetDirections = () => {
    const [lng, lat] = demoCoordinates;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(mapsUrl, "_blank");
  };

  const handleExpandMap = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) {
    return (
      <section className="border-b border-gray-200 pb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Where you&apos;ll be
        </h2>
        <div className="h-96 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-gray-200 pb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Where you&apos;ll be
      </h2>

      {/* Map Container */}
      <div
        className={`relative rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 ${
          isExpanded ? "h-96 md:h-[500px]" : "h-80"
        }`}
      >
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-100 to-green-200">
          {/* Grid overlay for map-like appearance */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Mock roads */}
          <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-400 opacity-60" />
          <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-400 opacity-60" />
          <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400 opacity-60" />
          <div className="absolute right-1/3 top-0 bottom-0 w-1 bg-gray-400 opacity-60" />

          {/* Property marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Marker pin */}
              <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              {/* Marker shadow */}
              <div className="absolute top-6 left-1/2 w-4 h-2 -translate-x-1/2 bg-black opacity-20 rounded-full blur-sm" />
            </div>
          </div>

          {/* Approximate area circle (if hiding exact location) */}
          {hideExactLocation && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 border-2 border-pink-500 rounded-full opacity-30 bg-pink-200" />
            </div>
          )}

          {/* Mock landmarks */}
          <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-green-600 rounded opacity-80" />
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-600 rounded opacity-80" />
          <div className="absolute top-3/4 right-1/2 w-2 h-2 bg-yellow-600 rounded opacity-80" />
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button
            onClick={handleExpandMap}
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            title={isExpanded ? "Collapse map" : "Expand map"}
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isExpanded ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              )}
            </svg>
          </button>

          <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors border-b border-gray-200">
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Location info overlay */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h3 className="font-medium text-gray-900 mb-1">
            {location.city}, {location.state}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {hideExactLocation
              ? "Exact location provided after booking"
              : `${title} is located in ${location.city}`}
          </p>
          <button
            onClick={handleGetDirections}
            className="text-sm font-medium text-pink-600 hover:text-pink-700 flex items-center space-x-1"
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
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <span>Get directions</span>
          </button>
        </div>
      </div>

      {/* Location Details */}
      <div className="mt-6 space-y-6">
        {/* Main location info */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {location.city}, {location.state}, {location.country}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {hideExactLocation ? (
              <>
                This is a popular area known for its vibrant local scene and
                convenient access to key attractions. The exact address will be
                shared once your reservation is confirmed to protect the
                host&apos;s privacy.
              </>
            ) : (
              <>
                Experience the best of {location.city} from this centrally
                located property. You&apos;ll be within walking distance of
                local attractions, restaurants, and public transportation.
              </>
            )}
          </p>
        </div>

        {/* Getting around */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Getting around</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <div>
                <h5 className="font-medium text-gray-900">Public transport</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Easy access to buses and trains
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h5 className="font-medium text-gray-900">Walkable area</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Most errands can be accomplished on foot
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Neighborhood highlights */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Explore the area</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-gray-900">Downtown area</span>
              </div>
              <span className="text-sm text-gray-600">5 min walk</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-gray-900">Local restaurants</span>
              </div>
              <span className="text-sm text-gray-600">3 min walk</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <span className="text-gray-900">Public transport</span>
              </div>
              <span className="text-sm text-gray-600">2 min walk</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-gray-900">Airport</span>
              </div>
              <span className="text-sm text-gray-600">25 min drive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
