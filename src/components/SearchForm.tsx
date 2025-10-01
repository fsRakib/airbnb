'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchFormProps {
  onSearch?: (params: SearchParams) => void;
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
  const [guests, setGuests] = useState(parseInt(searchParams.get('guests') || '1'));
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  // Get today's date for minimum date validation
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests > 1) params.set('guests', guests.toString());

    // Navigate to the same page with query parameters
    router.push(`/?${params.toString()}`);

    // Also call the onSearch callback if provided
    if (onSearch) {
      onSearch({ location, checkIn, checkOut, guests });
    }
  };

  const incrementGuests = () => setGuests(prev => Math.min(prev + 1, 16));
  const decrementGuests = () => setGuests(prev => Math.max(prev - 1, 1));

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-8 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Find your next stay
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Search low prices on hotels, homes and much more...
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-full border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 p-2">
        <div className="flex flex-col md:flex-row md:items-center md:divide-x divide-gray-300">
          
          {/* Location */}
          <div className="flex-1 px-4 py-3 md:py-4">
            <label className="block text-xs font-semibold text-gray-900 mb-1">
              WHERE
            </label>
            <input
              type="text"
              placeholder="Search destinations"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-sm md:text-base text-gray-900 placeholder-gray-500 border-0 p-0 focus:ring-0 focus:outline-none bg-transparent"
            />
          </div>

          {/* Check In */}
          <div className="flex-1 px-4 py-3 md:py-4">
            <label className="block text-xs font-semibold text-gray-900 mb-1">
              CHECK IN
            </label>
            <input
              type="date"
              value={checkIn}
              min={today}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-sm md:text-base text-gray-900 border-0 p-0 focus:ring-0 focus:outline-none bg-transparent"
            />
          </div>

          {/* Check Out */}
          <div className="flex-1 px-4 py-3 md:py-4">
            <label className="block text-xs font-semibold text-gray-900 mb-1">
              CHECK OUT
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || today}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-sm md:text-base text-gray-900 border-0 p-0 focus:ring-0 focus:outline-none bg-transparent"
            />
          </div>

          {/* Guests */}
          <div className="flex-1 px-4 py-3 md:py-4 relative">
            <label className="block text-xs font-semibold text-gray-900 mb-1">
              WHO
            </label>
            <button
              type="button"
              onClick={() => setShowGuestPicker(!showGuestPicker)}
              className="w-full text-left text-sm md:text-base text-gray-900 focus:outline-none bg-transparent"
            >
              {guests} guest{guests !== 1 ? 's' : ''}
            </button>

            {/* Guest Picker Dropdown */}
            {showGuestPicker && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">Guests</span>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={decrementGuests}
                      disabled={guests <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-medium">{guests}</span>
                    <button
                      type="button"
                      onClick={incrementGuests}
                      disabled={guests >= 16}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="px-4 py-3 md:py-4">
            <button
              type="submit"
              className="w-full md:w-12 md:h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200 py-3 md:py-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="md:hidden ml-2">Search</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Hook to close guest picker when clicking outside
export function useClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useState(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}