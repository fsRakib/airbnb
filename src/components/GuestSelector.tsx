"use client";

import { useState, useRef, useEffect } from "react";

interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface GuestSelectorProps {
  guests: GuestCounts;
  onGuestsChange: (guests: GuestCounts) => void;
  maxGuests?: number;
  allowPets?: boolean;
  allowInfants?: boolean;
  className?: string;
}

export default function GuestSelector({
  guests,
  onGuestsChange,
  maxGuests = 16,
  allowPets = true,
  allowInfants = true,
  className = "",
}: GuestSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalGuests = guests.adults + guests.children;
  const canAddGuests = totalGuests < maxGuests;

  const updateGuests = (type: keyof GuestCounts, delta: number) => {
    const newGuests = { ...guests };
    const newValue = Math.max(0, newGuests[type] + delta);

    // Ensure at least 1 adult
    if (type === "adults" && newValue === 0 && guests.children > 0) {
      return;
    }

    // Check total guest limit (adults + children only)
    if (type === "adults" || type === "children") {
      const otherType = type === "adults" ? "children" : "adults";
      const newTotal = newValue + newGuests[otherType];
      if (newTotal > maxGuests) {
        return;
      }
    }

    newGuests[type] = newValue;
    onGuestsChange(newGuests);
  };

  const formatGuestCount = () => {
    const parts = [];

    if (totalGuests === 1) {
      parts.push("1 guest");
    } else if (totalGuests > 1) {
      parts.push(`${totalGuests} guests`);
    } else {
      parts.push("Add guests");
    }

    if (guests.infants > 0) {
      parts.push(`${guests.infants} infant${guests.infants !== 1 ? "s" : ""}`);
    }

    if (guests.pets > 0) {
      parts.push(`${guests.pets} pet${guests.pets !== 1 ? "s" : ""}`);
    }

    return parts.join(", ");
  };

  const guestTypes = [
    {
      key: "adults" as keyof GuestCounts,
      title: "Adults",
      subtitle: "Ages 13 or above",
      value: guests.adults,
      min: 1,
      max: maxGuests,
    },
    {
      key: "children" as keyof GuestCounts,
      title: "Children",
      subtitle: "Ages 2–12",
      value: guests.children,
      min: 0,
      max: maxGuests - guests.adults,
    },
    ...(allowInfants
      ? [
          {
            key: "infants" as keyof GuestCounts,
            title: "Infants",
            subtitle: "Under 2",
            value: guests.infants,
            min: 0,
            max: 5,
          },
        ]
      : []),
    ...(allowPets
      ? [
          {
            key: "pets" as keyof GuestCounts,
            title: "Pets",
            subtitle: "Bringing a service animal?",
            value: guests.pets,
            min: 0,
            max: 5,
          },
        ]
      : []),
  ];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Guest Input Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left border border-gray-300 rounded-full bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="text-xs font-semibold text-gray-900 mb-1">WHO</div>
        <div className="text-sm text-gray-900">{formatGuestCount()}</div>
      </button>

      {/* Guest Selector Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 min-w-[380px]">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Guests</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Guest Types */}
          <div className="p-4 space-y-6">
            {guestTypes.map((guestType) => (
              <div
                key={guestType.key}
                className="flex items-center justify-between"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {guestType.title}
                  </h4>
                  <p className="text-sm text-gray-600">{guestType.subtitle}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateGuests(guestType.key, -1)}
                    disabled={guestType.value <= guestType.min}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
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

                  <span className="w-8 text-center font-medium text-gray-900">
                    {guestType.value}
                  </span>

                  <button
                    onClick={() => updateGuests(guestType.key, 1)}
                    disabled={
                      guestType.value >= guestType.max ||
                      ((
                        ["adults", "children"] as (keyof GuestCounts)[]
                      ).includes(guestType.key) &&
                        !canAddGuests)
                    }
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Guest Limit Warning */}
          {totalGuests >= maxGuests && (
            <div className="px-4 py-3 bg-amber-50 border-t border-amber-200">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.96-.833-2.73 0L5.084 15.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <span className="text-sm text-amber-800">
                  This property has a maximum of {maxGuests} guests.
                </span>
              </div>
            </div>
          )}

          {/* Pet Policy */}
          {allowPets && guests.pets > 0 && (
            <div className="px-4 py-3 bg-blue-50 border-t border-blue-200">
              <div className="flex items-start space-x-2">
                <svg
                  className="w-4 h-4 text-blue-600 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm text-blue-800 font-medium">
                    Pet Policy
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Make sure to check the property&apos;s pet policy and any
                    additional fees.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <button
              onClick={() => {
                onGuestsChange({ adults: 1, children: 0, infants: 0, pets: 0 });
              }}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Clear
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to convert guest counts to total for API
export function getTotalGuests(guests: GuestCounts): number {
  return guests.adults + guests.children;
}

// Helper function to parse URL guest params
export function parseGuestParams(searchParams: URLSearchParams): GuestCounts {
  return {
    adults: parseInt(searchParams.get("adults") || "1"),
    children: parseInt(searchParams.get("children") || "0"),
    infants: parseInt(searchParams.get("infants") || "0"),
    pets: parseInt(searchParams.get("pets") || "0"),
  };
}

// Helper function to build guest query params
export function buildGuestParams(guests: GuestCounts): Record<string, string> {
  const params: Record<string, string> = {};

  if (guests.adults !== 1) params.adults = guests.adults.toString();
  if (guests.children > 0) params.children = guests.children.toString();
  if (guests.infants > 0) params.infants = guests.infants.toString();
  if (guests.pets > 0) params.pets = guests.pets.toString();

  // Also add total guests for API compatibility
  const total = getTotalGuests(guests);
  if (total > 1) params.guests = total.toString();

  return params;
}
