'use client';

import { useState, useEffect, useCallback } from 'react';

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

interface PropertiesResponse {
  success: boolean;
  data: {
    properties: Property[];
    pagination: Pagination;
    filters: Record<string, any>;
  };
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
  sortOrder?: 'asc' | 'desc';
}

export function useProperties(params: UsePropertiesParams = {}) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const buildQueryString = useCallback((searchParams: UsePropertiesParams) => {
    const query = new URLSearchParams();
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            query.set(key, value.join(','));
          }
        } else {
          query.set(key, value.toString());
        }
      }
    });

    return query.toString();
  }, []);

  const fetchProperties = useCallback(async (searchParams: UsePropertiesParams, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const queryString = buildQueryString(searchParams);
      const response = await fetch(`/api/properties?${queryString}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PropertiesResponse = await response.json();

      if (data.success) {
        if (append) {
          setProperties(prev => [...prev, ...data.data.properties]);
        } else {
          setProperties(data.data.properties);
        }
        setPagination(data.data.pagination);
        setHasMore(data.data.pagination.hasNextPage);
      } else {
        throw new Error('Failed to fetch properties');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  }, [buildQueryString]);

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
    refresh
  };
}

// Hook for searching properties with URL synchronization
export function usePropertySearch() {
  const [searchParams, setSearchParams] = useState<UsePropertiesParams>({
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const { properties, pagination, loading, error, hasMore, loadMore, refresh } = useProperties(searchParams);

  const updateSearch = useCallback((newParams: Partial<UsePropertiesParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...newParams,
      page: 1 // Reset to first page when search params change
    }));
  }, []);

  const updateFilters = useCallback((filters: {
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
  }) => {
    updateSearch(filters);
  }, [updateSearch]);

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
    refresh
  };
}