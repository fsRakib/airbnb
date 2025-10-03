"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

interface AirbnbPropertyCardProps {
  property: AirbnbProperty;
}

export default function AirbnbPropertyCard({
  property,
}: AirbnbPropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link href={`/rooms/${property.id}`} className="block group">
      <div className="w-full">
        {/* Image Container */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 mb-3">
          {/* Main Image */}
          <Image
            src={property.images[currentImageIndex] || property.images[0]}
            alt={property.title}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}

          {/* Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
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
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
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
            </>
          )}

          {/* Wishlist Heart */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center"
          >
            <svg
              className={`w-6 h-6 transition-colors ${
                isWishlisted
                  ? "text-[#FF385C] fill-current"
                  : "text-white hover:text-gray-200 fill-none stroke-2"
              }`}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Image Dots */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Guest Favorite Badge */}
          {property.isGuestFavorite && (
            <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg text-xs font-medium shadow-sm">
              Guest favorite
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="space-y-1">
          {/* Location and Rating */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
                {property.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-1 mt-0.5">
                {property.location}
              </p>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
              <svg
                className="w-3 h-3 text-gray-900 fill-current"
                viewBox="0 0 32 32"
              >
                <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z" />
              </svg>
              <span className="text-gray-900 text-sm">{property.rating}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-1 pt-1">
            <span className="text-gray-900 font-semibold text-sm">
              ${property.price}
            </span>
            {property.nights && (
              <span className="text-gray-500 text-sm">
                for {property.nights} nights
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
