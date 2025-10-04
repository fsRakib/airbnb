"use client";

import { useState, useEffect, useCallback } from "react";

interface UseBlockedDatesParams {
  propertyId?: string;
  checkIn?: string;
  checkOut?: string;
}

export function useBlockedDates(params: UseBlockedDatesParams = {}) {
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlockedDates = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate some sample blocked dates for all properties
      const sampleBlockedDates = generateSampleBlockedDates();
      setBlockedDates(sampleBlockedDates);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error fetching blocked dates:", err);
    } finally {
      setLoading(false);
    }
  }, [params.propertyId]);

  useEffect(() => {
    fetchBlockedDates();
  }, [fetchBlockedDates]);

  return {
    blockedDates,
    loading,
    error,
    refresh: fetchBlockedDates,
  };
}

// Generate sample blocked dates for demonstration
function generateSampleBlockedDates(): string[] {
  const blockedDates: string[] = [];
  const today = new Date();

  // Add some random blocked dates in the next 3 months
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    // Randomly block about 15% of dates
    if (Math.random() < 0.15) {
      blockedDates.push(date.toISOString().split("T")[0]);
    }
  }

  // Add some specific blocked periods (like holidays)
  const holidays = [
    // Christmas period
    "2024-12-24",
    "2024-12-25",
    "2024-12-26",
    // New Year period
    "2024-12-31",
    "2025-01-01",
    // Add some weekend blocks
    ...getWeekendDates(today, 30),
  ];

  holidays.forEach((date) => {
    if (!blockedDates.includes(date)) {
      blockedDates.push(date);
    }
  });

  return blockedDates.sort();
}

// Helper function to get some weekend dates
function getWeekendDates(startDate: Date, days: number): string[] {
  const weekends: string[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Block some Saturdays and Sundays randomly
    if ((date.getDay() === 0 || date.getDay() === 6) && Math.random() < 0.3) {
      weekends.push(date.toISOString().split("T")[0]);
    }
  }

  return weekends;
}

// Hook for fetching property-specific availability
export function usePropertyAvailability(
  propertyId: string,
  checkIn?: string,
  checkOut?: string
) {
  const [availability, setAvailability] = useState<{
    available: boolean;
    blockedDates: string[];
    conflictingBookings: unknown[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAvailability = useCallback(async () => {
    if (!propertyId || !checkIn || !checkOut) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Mock availability data - most dates are available
      const mockAvailability = {
        available: Math.random() > 0.2, // 80% chance of being available
        blockedDates: generateSampleBlockedDates().slice(0, 5), // Just a few blocked dates
        conflictingBookings: []
      };

      setAvailability(mockAvailability);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error checking availability:", err);
    } finally {
      setLoading(false);
    }
  }, [propertyId, checkIn, checkOut]);

  useEffect(() => {
    checkAvailability();
  }, [checkAvailability]);

  return {
    availability,
    loading,
    error,
    refresh: checkAvailability,
  };
}
