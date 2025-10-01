'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Property {
  _id: string;
  title: string;
  description: string;
  images: string[];
  pricePerNight: number;
  location: {
    city: string;
    state: string;
    country: string;
  };
  hostName: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  propertyType: string;
  rating: number;
  reviewCount: number;
}

interface PropertyCardProps {
  property: Property;
  loading?: boolean;
}

export default function PropertyCard({ property, loading }: PropertyCardProps) {
  if (loading) {
    return <PropertyCardSkeleton />;
  }

  const {
    _id,
    title,
    images,
    pricePerNight,
    location,
    hostName,
    bedrooms,
    bathrooms,
    maxGuests,
    propertyType,
    rating,
    reviewCount
  } = property;

  return (
    <Link href={`/rooms/${_id}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={images[0] || '/placeholder-property.jpg'}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Heart Icon */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // TODO: Add to favorites functionality
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
          >
            <svg className="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Location & Host */}
          <div className="flex items-center justify-between mb-1">
            <div className="text-gray-600 text-sm">
              {location.city}, {location.state}
            </div>
            {rating > 0 && (
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-gray-900 font-medium">
                  {rating.toFixed(1)}
                </span>
                {reviewCount > 0 && (
                  <span className="text-gray-500 ml-1">
                    ({reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-medium text-gray-900 text-lg mb-1 line-clamp-2 group-hover:text-gray-700">
            {title}
          </h3>

          {/* Property Details */}
          <div className="text-gray-500 text-sm mb-2 capitalize">
            {propertyType} • {maxGuests} guest{maxGuests !== 1 ? 's' : ''} • {bedrooms} bedroom{bedrooms !== 1 ? 's' : ''} • {bathrooms} bathroom{bathrooms !== 1 ? 's' : ''}
          </div>

          {/* Host */}
          <div className="text-gray-500 text-sm mb-3">
            Hosted by {hostName}
          </div>

          {/* Price */}
          <div className="flex items-baseline">
            <span className="text-xl font-semibold text-gray-900">
              ${pricePerNight}
            </span>
            <span className="text-gray-500 text-sm ml-1">
              / night
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Loading skeleton component
function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
}

// Property grid component
interface PropertyGridProps {
  properties: Property[];
  loading?: boolean;
  loadingCount?: number;
}

export function PropertyGrid({ properties, loading, loadingCount = 12 }: PropertyGridProps) {
  if (loading && properties.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: loadingCount }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (properties.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏠</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
        <p className="text-gray-600">Try adjusting your search or filters to find more properties.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
      {loading && Array.from({ length: 4 }).map((_, index) => (
        <PropertyCardSkeleton key={`loading-${index}`} />
      ))}
    </div>
  );
}