"use client";

import { useState, useEffect } from "react";
import { Property } from "./PropertyCard";

interface BookingWidgetProps {
  property: Property;
  onBookingSubmit?: (bookingData: BookingData) => void;
}

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  nights: number;
}

export default function BookingWidget({
  property,
  onBookingSubmit,
}: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const { pricePerNight, maxGuests, rating, reviewCount } = property;

  // Calculate derived values
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const subtotal = nights * pricePerNight;
  const cleaningFee = subtotal > 0 ? Math.round(subtotal * 0.12) : 0; // 12% cleaning fee
  const serviceFee = subtotal > 0 ? Math.round(subtotal * 0.14) : 0; // 14% service fee
  const taxes = subtotal > 0 ? Math.round(subtotal * 0.08) : 0; // 8% taxes
  const totalPrice = subtotal + cleaningFee + serviceFee + taxes;

  // Update guests count when picker changes
  useEffect(() => {
    const totalGuests = guestCounts.adults + guestCounts.children;
    setGuests(totalGuests);
  }, [guestCounts]);

  // Get today's date for minimum check-in
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || nights <= 0) return;

    setIsLoading(true);

    const bookingData: BookingData = {
      checkIn,
      checkOut,
      guests,
      totalPrice,
      nights,
    };

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (onBookingSubmit) {
        onBookingSubmit(bookingData);
      } else {
        // Default behavior - redirect to booking page
        const queryParams = new URLSearchParams({
          checkIn,
          checkOut,
          guests: guests.toString(),
          propertyId: property._id,
        });
        window.location.href = `/book?${queryParams.toString()}`;
      }
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateGuestCount = (
    type: keyof typeof guestCounts,
    increment: boolean
  ) => {
    setGuestCounts((prev) => {
      const newCount = increment ? prev[type] + 1 : Math.max(0, prev[type] - 1);

      // Ensure adults count is at least 1
      if (type === "adults" && newCount < 1) return prev;

      // Check max guests limit
      const totalAfterChange =
        type === "adults"
          ? newCount + prev.children
          : type === "children"
          ? prev.adults + newCount
          : prev.adults + prev.children;

      if (totalAfterChange > maxGuests && increment) return prev;

      return { ...prev, [type]: newCount };
    });
  };

  const canBook =
    checkIn && checkOut && nights > 0 && guests > 0 && guests <= maxGuests;

  return (
    <div className="xl:sticky xl:top-8">
      <div className="border border-gray-300 rounded-xl shadow-xl bg-white overflow-hidden">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-semibold text-gray-900">
                ${pricePerNight.toLocaleString()}
              </span>
              <span className="text-base text-gray-600 font-normal">night</span>
            </div>
            {rating > 0 && (
              <div className="flex items-center space-x-1 text-sm">
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="font-medium text-gray-900">
                  {rating.toFixed(1)}
                </span>
                {reviewCount > 0 && (
                  <>
                    <span className="text-gray-400 mx-1">•</span>
                    <button className="text-gray-600 hover:underline font-medium">
                      {reviewCount.toLocaleString()} review
                      {reviewCount !== 1 ? "s" : ""}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Booking Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 sm:p-6 space-y-3 sm:space-y-4"
          >
            {/* Date Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 border border-gray-300 rounded-lg overflow-hidden">
              <div className="sm:border-r border-gray-300 border-b sm:border-b-0">
                <label className="block text-xs font-medium text-gray-700 p-2 sm:p-3 pb-1">
                  CHECK-IN
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={today}
                  className="w-full px-2 sm:px-3 pb-2 sm:pb-3 text-sm border-none focus:outline-none focus:ring-0"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 p-2 sm:p-3 pb-1">
                  CHECKOUT
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || today}
                  className="w-full px-2 sm:px-3 pb-2 sm:pb-3 text-sm border-none focus:outline-none focus:ring-0"
                  required
                />
              </div>
            </div>

            {/* Guests Picker */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowGuestPicker(!showGuestPicker)}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 text-left hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              >
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  GUESTS
                </label>
                <span className="text-sm text-gray-900">
                  {guests} guest{guests !== 1 ? "s" : ""}
                </span>
                <svg
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showGuestPicker && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-4 space-y-4">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Adults</div>
                      <div className="text-sm text-gray-600">
                        Ages 13 or above
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => updateGuestCount("adults", false)}
                        disabled={guestCounts.adults <= 1}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
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
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-medium">
                        {guestCounts.adults}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateGuestCount("adults", true)}
                        disabled={
                          guestCounts.adults + guestCounts.children >= maxGuests
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Children</div>
                      <div className="text-sm text-gray-600">Ages 2-12</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => updateGuestCount("children", false)}
                        disabled={guestCounts.children <= 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
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
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-medium">
                        {guestCounts.children}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateGuestCount("children", true)}
                        disabled={
                          guestCounts.adults + guestCounts.children >= maxGuests
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Infants</div>
                      <div className="text-sm text-gray-600">Under 2</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => updateGuestCount("infants", false)}
                        disabled={guestCounts.infants <= 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
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
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-medium">
                        {guestCounts.infants}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateGuestCount("infants", true)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowGuestPicker(false)}
                    className="w-full py-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* Reserve Button */}
            <button
              type="submit"
              disabled={!canBook || isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Reserve"
              )}
            </button>

            {/* Price Breakdown */}
            {nights > 0 && (
              <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-900 text-sm sm:text-base">
                  <span>
                    ${pricePerNight} × {nights} night{nights !== 1 ? "s" : ""}
                  </span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-900 text-sm sm:text-base">
                  <span>Cleaning fee</span>
                  <span>${cleaningFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-900 text-sm sm:text-base">
                  <span>Service fee</span>
                  <span>${serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-900 text-sm sm:text-base">
                  <span>Taxes</span>
                  <span>${taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-900 pt-2 sm:pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-xs text-gray-600 text-center pt-2 leading-relaxed">
              You won&apos;t be charged yet
            </p>
          </form>
        </div>

        {/* Mobile Booking Bar - Show on small screens when widget is in main content */}
        <div className="xl:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-3 sm:p-4 z-50 shadow-lg">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="text-base sm:text-lg font-semibold text-gray-900">
                  ${pricePerNight}
                </span>
                <span className="text-gray-600 text-xs sm:text-sm">night</span>
              </div>
              {totalPrice > 0 && (
                <div className="text-xs sm:text-sm text-gray-600">
                  ${totalPrice.toLocaleString()} total
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!canBook || isLoading}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? "Processing..." : "Reserve"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
