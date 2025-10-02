"use client";

import { useState } from "react";

interface SearchFormProps {
  onSearch: (data: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    adults: number;
    children: number;
    infants: number;
    pets: number;
  }) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [formData, setFormData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  const updateGuests = (type: 'adults' | 'children' | 'infants' | 'pets', increment: boolean) => {
    setFormData(prev => {
      const newValue = increment ? prev[type] + 1 : Math.max(0, prev[type] - 1);
      const newData = { ...prev, [type]: newValue };
      
      // Update total guests (adults + children)
      newData.guests = newData.adults + newData.children;
      
      return newData;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Find your next stay
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Discover unique homes and experiences around the world
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {/* Location */}
          <div className="relative">
            <div className="flex items-center p-4 border-r border-gray-200 rounded-l-xl md:rounded-none hover:bg-gray-50 transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Where
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Search destinations"
                  className="w-full text-sm text-gray-600 placeholder-gray-400 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Check In */}
          <div className="relative">
            <div className="flex items-center p-4 border-r border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Check in
                </label>
                <input
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => setFormData(prev => ({ ...prev, checkIn: e.target.value }))}
                  className="w-full text-sm text-gray-600 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Check Out */}
          <div className="relative">
            <div className="flex items-center p-4 border-r border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Check out
                </label>
                <input
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => setFormData(prev => ({ ...prev, checkOut: e.target.value }))}
                  className="w-full text-sm text-gray-600 border-none outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Guests */}
          <div className="relative">
            <div 
              className="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer rounded-r-xl md:rounded-none"
              onClick={() => setShowGuestPicker(!showGuestPicker)}
            >
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Who
                </label>
                <div className="text-sm text-gray-600">
                  {formData.guests === 1 ? '1 guest' : `${formData.guests} guests`}
                  {formData.infants > 0 && `, ${formData.infants} infant${formData.infants > 1 ? 's' : ''}`}
                  {formData.pets > 0 && `, ${formData.pets} pet${formData.pets > 1 ? 's' : ''}`}
                </div>
              </div>
              <button
                type="submit"
                className="ml-4 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Guest Picker Dropdown */}
            {showGuestPicker && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-50">
                <div className="space-y-4">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Adults</div>
                      <div className="text-sm text-gray-500">Ages 13 or above</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => updateGuests('adults', false)}
                        disabled={formData.adults <= 1}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-900 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{formData.adults}</span>
                      <button
                        type="button"
                        onClick={() => updateGuests('adults', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-900 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Children</div>
                      <div className="text-sm text-gray-500">Ages 2-12</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => updateGuests('children', false)}
                        disabled={formData.children <= 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-900 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{formData.children}</span>
                      <button
                        type="button"
                        onClick={() => updateGuests('children', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-900 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Infants</div>
                      <div className="text-sm text-gray-500">Under 2</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => updateGuests('infants', false)}
                        disabled={formData.infants <= 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-900 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{formData.infants}</span>
                      <button
                        type="button"
                        onClick={() => updateGuests('infants', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-900 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Pets */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Pets</div>
                      <div className="text-sm text-gray-500">Bringing a service animal?</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => updateGuests('pets', false)}
                        disabled={formData.pets <= 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-900 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{formData.pets}</span>
                      <button
                        type="button"
                        onClick={() => updateGuests('pets', true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-900 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setShowGuestPicker(false)}
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
