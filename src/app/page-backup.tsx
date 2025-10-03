"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchFormNew";

interface SearchFormParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  adults: number;
  children: number;
  infants: number;
  pets: number;
}
import FilterChips, { type FilterState } from "@/components/FilterChips";
import {
  PropertyGrid,
  PropertyGridError,
  PropertyGridEmpty,
} from "@/components/PropertyCard";
import { LoadMoreButton } from "@/components/Pagination";
import { usePropertySearch } from "@/hooks/useProperties";

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
    loadMore,
  } = usePropertySearch();

  // Update search params when URL changes
  useEffect(() => {
    const params = {
      location: searchParams.get("location") || undefined,
      checkIn: searchParams.get("checkIn") || undefined,
      checkOut: searchParams.get("checkOut") || undefined,
      guests: searchParams.get("guests")
        ? parseInt(searchParams.get("guests")!)
        : undefined,
      propertyType: searchParams.get("propertyType") || undefined,
      minPrice: searchParams.get("minPrice")
        ? parseInt(searchParams.get("minPrice")!)
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? parseInt(searchParams.get("maxPrice")!)
        : undefined,
      amenities:
        searchParams.get("amenities")?.split(",").filter(Boolean) || undefined,
    };

    // Only update if there are actual search parameters
    const hasParams = Object.values(params).some(
      (value) => value !== undefined
    );
    if (hasParams) {
      updateSearch(params);
    }
  }, [searchParams, updateSearch]);

  const handleSearch = (searchData: SearchFormParams) => {
    updateSearch({
      location: searchData.location || undefined,
      checkIn: searchData.checkIn || undefined,
      checkOut: searchData.checkOut || undefined,
      guests: searchData.guests > 1 ? searchData.guests : undefined,
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Search Section */}
      <section className="bg-white py-6">
        <div className="max-w-7xl mx-auto">
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {/* Property Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Popular homes in Kuala Lumpur */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular homes in Kuala Lumpur</h2>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 overflow-x-auto">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="flex-shrink-0">
                <div className="group cursor-pointer">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + index * 1000}?w=400&h=400&fit=crop&crop=center`}
                      alt={`Property ${index}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 w-7 h-7 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </button>
                    <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-xs font-medium">
                      Guest favorite
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {index === 1 ? "Apartment in Bukit Bintang" :
                         index === 2 ? "Place to stay in Cheras" :
                         index === 3 ? "Condo in PULAPOL" :
                         index === 4 ? "Condo in Bukit Bintang" :
                         index === 5 ? "Apartment in Bukit Bintang" :
                         "Condo in Kampung Datuk Keramat"}
                      </p>
                      <div className="flex items-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="text-gray-900">
                          <path d="M6 1l1.5 3h3.5l-2.5 2 1 3.5L6 7.5 2.5 9.5l1-3.5L1 4.5h3.5L6 1z"/>
                        </svg>
                        <span className="text-xs font-medium ml-1">
                          {index === 1 ? "4.95" :
                           index === 2 ? "4.95" :
                           index === 3 ? "4.87" :
                           index === 4 ? "4.83" :
                           index === 5 ? "4.85" :
                           "5.0"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      ${index === 1 ? "185" :
                        index === 2 ? "44" :
                        index === 3 ? "76" :
                        index === 4 ? "65" :
                        index === 5 ? "61" :
                        "101"} for 2 nights
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available next month in Bangkok */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Available next month in Bangkok</h2>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 overflow-x-auto">
            {[7, 8, 9, 10, 11, 12].map((index) => (
              <div key={index} className="flex-shrink-0">
                <div className="group cursor-pointer">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + index * 1000}?w=400&h=400&fit=crop&crop=center`}
                      alt={`Property ${index}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 w-7 h-7 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </button>
                    <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-xs font-medium">
                      Guest favorite
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {index === 7 ? "Apartment in Khet Ratchathewi" :
                         index === 8 ? "Apartment in Bangkok" :
                         index === 9 ? "Hotel room in Khet Phra Nakhon" :
                         index === 10 ? "Room in Khet Phra Nakhon" :
                         index === 11 ? "Apartment in Phra Khanong" :
                         "Hotel room in Phra Nakhon"}
                      </p>
                      <div className="flex items-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="text-gray-900">
                          <path d="M6 1l1.5 3h3.5l-2.5 2 1 3.5L6 7.5 2.5 9.5l1-3.5L1 4.5h3.5L6 1z"/>
                        </svg>
                        <span className="text-xs font-medium ml-1">
                          {index === 7 ? "4.95" :
                           index === 8 ? "4.81" :
                           index === 9 ? "4.79" :
                           index === 10 ? "4.94" :
                           index === 11 ? "5.0" :
                           "4.86"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      ${index === 7 ? "85" :
                        index === 8 ? "60" :
                        index === 9 ? "22" :
                        index === 10 ? "58" :
                        index === 11 ? "168" :
                        "18"} for 2 nights
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stay in London */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Stay in London</h2>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          <div className="flex items-center mb-4">
            <span className="mr-2">❤️</span>
            <span className="font-medium">Prices include all fees</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 overflow-x-auto">
            {[13, 14, 15, 16, 17, 18].map((index) => (
              <div key={index} className="flex-shrink-0">
                <div className="group cursor-pointer">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + index * 1000}?w=400&h=400&fit=crop&crop=center`}
                      alt={`Property ${index}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 w-7 h-7 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </button>
                    <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-xs font-medium">
                      Guest favorite
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {index === 13 ? "Apartment in London" :
                         index === 14 ? "Flat in London" :
                         index === 15 ? "Apartment in London" :
                         index === 16 ? "House in London" :
                         index === 17 ? "Flat in London" :
                         "Apartment in London"}
                      </p>
                      <div className="flex items-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="text-gray-900">
                          <path d="M6 1l1.5 3h3.5l-2.5 2 1 3.5L6 7.5 2.5 9.5l1-3.5L1 4.5h3.5L6 1z"/>
                        </svg>
                        <span className="text-xs font-medium ml-1">
                          {index === 13 ? "4.8" :
                           index === 14 ? "4.9" :
                           index === 15 ? "4.7" :
                           index === 16 ? "4.95" :
                           index === 17 ? "4.85" :
                           "4.9"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      ${index === 13 ? "120" :
                        index === 14 ? "95" :
                        index === 15 ? "110" :
                        index === 16 ? "150" :
                        index === 17 ? "88" :
                        "105"} per night
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {pagination.totalProperties > 0
                  ? `${pagination.totalProperties} stay${
                      pagination.totalProperties !== 1 ? "s" : ""
                    } found`
                  : "No stays found"}
              </h2>
              {pagination.totalProperties > 0 && (
                <p className="text-gray-600 text-sm mt-1">
                  Showing {(pagination.currentPage - 1) * pagination.limit + 1}-
                  {Math.min(
                    pagination.currentPage * pagination.limit,
                    pagination.totalProperties
                  )}{" "}
                  of {pagination.totalProperties}
                </p>
              )}
            </div>

            {/* Sort Options */}
            {pagination.totalProperties > 1 && (
              <div className="mt-4 sm:mt-0">
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split(":");
                    updateSearch({
                      sortBy: sortBy as any,
                      sortOrder: sortOrder as "asc" | "desc",
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
          <PropertyGridError
            error={error}
            onRetry={() => window.location.reload()}
          />
        )}

        {/* Empty State */}
        {!error && !loading && properties.length === 0 && pagination && (
          <PropertyGridEmpty
            title="No stays found"
            message="Try adjusting your search or filters to find what you're looking for."
            actionButton={
              <button
                onClick={() => {
                  // Clear all filters and search
                  updateSearch({});
                  updateFilters({});
                }}
                className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm sm:text-base font-medium hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Clear all filters
              </button>
            }
          />
        )}

        {/* Properties Grid */}
        {!error && (properties.length > 0 || loading) && (
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
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Safety information
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cancellation options
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Diversity & Belonging
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Against Discrimination
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Invite friends
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Host</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Host your home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Host an Online Experience
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Responsible hosting
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Newsroom
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    New features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
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
