'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import SearchForm, { type SearchParams } from '@/components/SearchForm';
import FilterChips, { type FilterState } from '@/components/FilterChips';
import { PropertyGrid } from '@/components/PropertyCard';
import { LoadMoreButton } from '@/components/Pagination';
import { usePropertySearch } from '@/hooks/useProperties';

export default function Home() {
  const searchParams = useSearchParams();
  const [showLoadMore, setShowLoadMore] = useState(true);
  
  const {
    properties,
    pagination,
    loading,
    error,
    hasMore,
    updateSearch,
    updateFilters,
    loadMore
  } = usePropertySearch();

  // Update search params when URL changes
  useEffect(() => {
    const params = {
      location: searchParams.get('location') || undefined,
      checkIn: searchParams.get('checkIn') || undefined,
      checkOut: searchParams.get('checkOut') || undefined,
      guests: searchParams.get('guests') ? parseInt(searchParams.get('guests')!) : undefined,
      propertyType: searchParams.get('propertyType') || undefined,
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
      amenities: searchParams.get('amenities')?.split(',').filter(Boolean) || undefined,
    };

    // Only update if there are actual search parameters
    const hasParams = Object.values(params).some(value => value !== undefined);
    if (hasParams) {
      updateSearch(params);
    }
  }, [searchParams, updateSearch]);

  const handleSearch = (searchParams: SearchParams) => {
    updateSearch({
      location: searchParams.location || undefined,
      checkIn: searchParams.checkIn || undefined,
      checkOut: searchParams.checkOut || undefined,
      guests: searchParams.guests > 1 ? searchParams.guests : undefined,
    });
  };

  const handleFiltersChange = (filters: FilterState) => {
    updateFilters({
      propertyType: filters.propertyType || undefined,
      minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
      maxPrice: filters.maxPrice < 1000 ? filters.maxPrice : undefined,
      amenities: filters.amenities.length > 0 ? filters.amenities : undefined,
    });
  };

  const handleLoadMore = () => {
    loadMore();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero & Search Section */}
      <section className="bg-gradient-to-br from-red-50 to-pink-50 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {/* Filters */}
      <FilterChips onFiltersChange={handleFiltersChange} />

      {/* Results Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Results Header */}
        {pagination && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {pagination.totalProperties > 0 
                  ? `${pagination.totalProperties} stay${pagination.totalProperties !== 1 ? 's' : ''} found`
                  : 'No stays found'
                }
              </h2>
              {pagination.totalProperties > 0 && (
                <p className="text-gray-600 text-sm mt-1">
                  Showing {((pagination.currentPage - 1) * pagination.limit) + 1}-{Math.min(pagination.currentPage * pagination.limit, pagination.totalProperties)} of {pagination.totalProperties}
                </p>
              )}
            </div>
            
            {/* Sort Options */}
            {pagination.totalProperties > 1 && (
              <div className="mt-4 sm:mt-0">
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split(':');
                    updateSearch({ 
                      sortBy: sortBy as any, 
                      sortOrder: sortOrder as 'asc' | 'desc' 
                    });
                  }}
                >
                  <option value="createdAt:desc">Newest first</option>
                  <option value="pricePerNight:asc">Price: Low to High</option>
                  <option value="pricePerNight:desc">Price: High to Low</option>
                  <option value="rating:desc">Best Rated</option>
                  <option value="reviewCount:desc">Most Reviewed</option>
                </select>
              </div>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {/* Properties Grid */}
        {!error && (
          <>
            <PropertyGrid 
              properties={properties} 
              loading={loading && properties.length === 0}
              loadingCount={12}
            />

            {/* Load More */}
            {pagination && properties.length > 0 && showLoadMore && (
              <LoadMoreButton
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                loading={loading}
                currentCount={properties.length}
                totalCount={pagination.totalProperties}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety information</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cancellation options</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Diversity & Belonging</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Against Discrimination</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Invite friends</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Host</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Host your home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Host an Online Experience</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Responsible hosting</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Newsroom</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Airbnb Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
