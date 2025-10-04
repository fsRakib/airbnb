"use client";

import { useState, useEffect, useCallback } from "react";

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

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProperties: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

interface UsePropertiesParams {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export function useProperties(params: UsePropertiesParams = {}) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProperties = useCallback(
    async (searchParams: UsePropertiesParams, append = false) => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock properties data
        const mockProperties: Property[] = [
          {
            _id: "1",
            title: "Luxury Apartment in Manhattan",
            description: "Beautiful luxury apartment with stunning city views in the heart of Manhattan.",
            images: [
              "/placeholder-property.svg",
              "/placeholder-property.svg",
              "/placeholder-property.svg"
            ],
            pricePerNight: 250,
            location: {
              city: "New York",
              state: "NY",
              country: "USA"
            },
            hostName: "Sarah Johnson",
            bedrooms: 2,
            bathrooms: 2,
            maxGuests: 4,
            propertyType: "apartment",
            rating: 4.8,
            reviewCount: 124
          },
          {
            _id: "2",
            title: "Cozy Beach House",
            description: "Charming beach house just steps from the ocean with private deck.",
            images: [
              "/placeholder-property.svg",
              "/placeholder-property.svg",
              "/placeholder-property.svg"
            ],
            pricePerNight: 180,
            location: {
              city: "Malibu",
              state: "CA",
              country: "USA"
            },
            hostName: "Mike Chen",
            bedrooms: 3,
            bathrooms: 2,
            maxGuests: 6,
            propertyType: "house",
            rating: 4.9,
            reviewCount: 89
          },
          {
            _id: "3",
            title: "Modern Downtown Loft",
            description: "Stylish loft in the heart of downtown with exposed brick and modern amenities.",
            images: [
              "/placeholder-property.svg",
              "/placeholder-property.svg",
              "/placeholder-property.svg"
            ],
            pricePerNight: 200,
            location: {
              city: "Chicago",
              state: "IL",
              country: "USA"
            },
            hostName: "Emily Davis",
            bedrooms: 1,
            bathrooms: 1,
            maxGuests: 2,
            propertyType: "loft",
            rating: 4.7,
            reviewCount: 56
          },
          {
            _id: "4",
            title: "Mountain Cabin Retreat",
            description: "Peaceful cabin surrounded by nature with mountain views and fireplace.",
            images: [
              "/placeholder-property.svg",
              "/placeholder-property.svg",
              "/placeholder-property.svg"
            ],
            pricePerNight: 150,
            location: {
              city: "Aspen",
              state: "CO",
              country: "USA"
            },
            hostName: "David Wilson",
            bedrooms: 2,
            bathrooms: 1,
            maxGuests: 4,
            propertyType: "cabin",
            rating: 4.6,
            reviewCount: 42
          }
        ];

        // Mock pagination
        const mockPagination: Pagination = {
          currentPage: searchParams.page || 1,
          totalPages: 3,
          totalProperties: 12,
          hasNextPage: (searchParams.page || 1) < 3,
          hasPrevPage: (searchParams.page || 1) > 1,
          limit: searchParams.limit || 12
        };

        if (append) {
          setProperties((prev) => [...prev, ...mockProperties]);
        } else {
          setProperties(mockProperties);
        }
        setPagination(mockPagination);
        setHasMore(mockPagination.hasNextPage);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadMore = useCallback(() => {
    if (pagination && pagination.hasNextPage && !loading) {
      const nextPageParams = { ...params, page: pagination.currentPage + 1 };
      fetchProperties(nextPageParams, true);
    }
  }, [pagination, params, loading, fetchProperties]);

  const refresh = useCallback(() => {
    fetchProperties(params, false);
  }, [params, fetchProperties]);

  // Initial fetch and when params change
  useEffect(() => {
    fetchProperties(params, false);
  }, [fetchProperties, params]);

  return {
    properties,
    pagination,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
}

// Hook for searching properties with URL synchronization
export function usePropertySearch() {
  const [searchParams, setSearchParams] = useState<UsePropertiesParams>({
    page: 1,
    limit: 12,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { properties, pagination, loading, error, hasMore, loadMore, refresh } =
    useProperties(searchParams);

  const updateSearch = useCallback(
    (newParams: Partial<UsePropertiesParams>) => {
      setSearchParams((prev) => ({
        ...prev,
        ...newParams,
        page: 1, // Reset to first page when search params change
      }));
    },
    []
  );

  const updateFilters = useCallback(
    (filters: {
      propertyType?: string;
      minPrice?: number;
      maxPrice?: number;
      amenities?: string[];
    }) => {
      updateSearch(filters);
    },
    [updateSearch]
  );

  return {
    properties,
    pagination,
    loading,
    error,
    hasMore,
    searchParams,
    updateSearch,
    updateFilters,
    loadMore,
    refresh,
  };
}
