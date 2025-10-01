'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterChipsProps {
  onFiltersChange?: (filters: FilterState) => void;
}

export interface FilterState {
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  amenities: string[];
}

export default function FilterChips({ onFiltersChange }: FilterChipsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Initialize filters from URL
  const [selectedType, setSelectedType] = useState(searchParams.get('propertyType') || '');
  const [minPrice, setMinPrice] = useState(parseInt(searchParams.get('minPrice') || '0'));
  const [maxPrice, setMaxPrice] = useState(parseInt(searchParams.get('maxPrice') || '1000'));
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    searchParams.get('amenities')?.split(',').filter(Boolean) || []
  );

  const propertyTypes = [
    { id: 'apartment', name: 'Apartment', icon: '🏢' },
    { id: 'house', name: 'House', icon: '🏠' },
    { id: 'villa', name: 'Villa', icon: '🏖️' },
    { id: 'cabin', name: 'Cabin', icon: '🏕️' },
    { id: 'loft', name: 'Loft', icon: '🏙️' },
    { id: 'studio', name: 'Studio', icon: '🏠' },
    { id: 'condo', name: 'Condo', icon: '🏢' },
    { id: 'townhouse', name: 'Townhouse', icon: '🏘️' }
  ];

  const amenitiesList = [
    'WiFi', 'Kitchen', 'Pool', 'Parking', 'Air conditioning', 
    'TV', 'Washer', 'Dryer', 'Hot tub', 'Gym', 'Beach access',
    'Fireplace', 'BBQ grill', 'Elevator', 'Pet friendly'
  ];

  const applyFilters = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    
    if (selectedType) {
      currentParams.set('propertyType', selectedType);
    } else {
      currentParams.delete('propertyType');
    }

    if (minPrice > 0) {
      currentParams.set('minPrice', minPrice.toString());
    } else {
      currentParams.delete('minPrice');
    }

    if (maxPrice < 1000) {
      currentParams.set('maxPrice', maxPrice.toString());
    } else {
      currentParams.delete('maxPrice');
    }

    if (selectedAmenities.length > 0) {
      currentParams.set('amenities', selectedAmenities.join(','));
    } else {
      currentParams.delete('amenities');
    }

    router.push(`/?${currentParams.toString()}`);

    if (onFiltersChange) {
      onFiltersChange({
        propertyType: selectedType,
        minPrice,
        maxPrice,
        amenities: selectedAmenities
      });
    }
  };

  const clearFilters = () => {
    setSelectedType('');
    setMinPrice(0);
    setMaxPrice(1000);
    setSelectedAmenities([]);

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete('propertyType');
    currentParams.delete('minPrice');  
    currentParams.delete('maxPrice');
    currentParams.delete('amenities');

    router.push(`/?${currentParams.toString()}`);
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const hasActiveFilters = selectedType || minPrice > 0 || maxPrice < 1000 || selectedAmenities.length > 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Filter Chips */}
      <div className="flex flex-wrap gap-3 items-center">
        
        {/* Property Type Filter */}
        <div className="relative">
          <button
            onClick={() => setShowTypeFilter(!showTypeFilter)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              selectedType 
                ? 'bg-gray-900 text-white border-gray-900' 
                : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
            }`}
          >
            Type
            {selectedType && (
              <span className="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                {propertyTypes.find(t => t.id === selectedType)?.name}
              </span>
            )}
          </button>

          {showTypeFilter && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4 min-w-[280px]">
              <h3 className="font-semibold text-gray-900 mb-3">Property Type</h3>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(selectedType === type.id ? '' : type.id)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selectedType === type.id
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">{type.icon}</div>
                    <div className="text-sm font-medium">{type.name}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  Apply
                </button>
                <button
                  onClick={() => setSelectedType('')}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-gray-900"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="relative">
          <button
            onClick={() => setShowPriceFilter(!showPriceFilter)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              minPrice > 0 || maxPrice < 1000
                ? 'bg-gray-900 text-white border-gray-900' 
                : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
            }`}
          >
            Price
            {(minPrice > 0 || maxPrice < 1000) && (
              <span className="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                ${minPrice}-${maxPrice}
              </span>
            )}
          </button>

          {showPriceFilter && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4 min-w-[300px]">
              <h3 className="font-semibold text-gray-900 mb-3">Price Range (per night)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Minimum Price</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="25"
                    value={minPrice}
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-900 mt-1">${minPrice}</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Maximum Price</label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="25"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-900 mt-1">${maxPrice}+</div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  Apply
                </button>
                <button
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(1000);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-gray-900"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* More Filters */}
        <div className="relative">
          <button
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              selectedAmenities.length > 0
                ? 'bg-gray-900 text-white border-gray-900' 
                : 'bg-white text-gray-900 border-gray-300 hover:border-gray-900'
            }`}
          >
            More filters
            {selectedAmenities.length > 0 && (
              <span className="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                {selectedAmenities.length}
              </span>
            )}
          </button>

          {showMoreFilters && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4 min-w-[320px]">
              <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
              <div className="max-h-60 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  {amenitiesList.map(amenity => (
                    <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <span className="text-sm text-gray-900">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  Apply
                </button>
                <button
                  onClick={() => setSelectedAmenities([])}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-gray-900"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Clear All Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 underline"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}