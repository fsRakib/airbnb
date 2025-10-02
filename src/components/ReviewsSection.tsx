"use client";

import { useState } from "react";
import Image from "next/image";

interface Review {
  id: string;
  guestName: string;
  guestAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount?: number;
}

interface ReviewsSectionProps {
  reviews: Review[];
  overallRating: number;
  reviewCount: number;
  ratingBreakdown?: {
    cleanliness: number;
    accuracy: number;
    checkin: number;
    communication: number;
    location: number;
    value: number;
  };
}

export default function ReviewsSection({
  reviews,
  overallRating,
  reviewCount,
  ratingBreakdown,
}: ReviewsSectionProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // Show first 6 reviews by default
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 6);
  const hasMoreReviews = reviews.length > 6;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${sizeClass} ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  const renderRatingBar = (label: string, rating: number) => (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600 w-24 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-900 rounded-full transition-all duration-500"
          style={{ width: `${(rating / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-900 w-8">
        {rating.toFixed(1)}
      </span>
    </div>
  );

  if (reviewCount === 0) {
    return (
      <section className="border-b border-gray-200 pb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Reviews</h2>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No reviews yet
          </h3>
          <p className="text-gray-600">Be the first to leave a review!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-gray-200 pb-8">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-8">
        <svg
          className="w-6 h-6 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900">
          {overallRating.toFixed(1)} · {reviewCount} review
          {reviewCount !== 1 ? "s" : ""}
        </h2>
      </div>

      {/* Rating Breakdown */}
      {ratingBreakdown && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-gray-50 rounded-lg">
          {renderRatingBar("Cleanliness", ratingBreakdown.cleanliness)}
          {renderRatingBar("Accuracy", ratingBreakdown.accuracy)}
          {renderRatingBar("Check-in", ratingBreakdown.checkin)}
          {renderRatingBar("Communication", ratingBreakdown.communication)}
          {renderRatingBar("Location", ratingBreakdown.location)}
          {renderRatingBar("Value", ratingBreakdown.value)}
        </div>
      )}

      {/* Review Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedFilter(null)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            selectedFilter === null
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
          }`}
        >
          All reviews
        </button>
        <button
          onClick={() => setSelectedFilter("recent")}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            selectedFilter === "recent"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
          }`}
        >
          Most recent
        </button>
        <button
          onClick={() => setSelectedFilter("helpful")}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
            selectedFilter === "helpful"
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
          }`}
        >
          Most helpful
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="space-y-4">
            {/* Reviewer Info */}
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                {review.guestAvatar ? (
                  <Image
                    src={review.guestAvatar}
                    alt={review.guestName}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {review.guestName}
                </h4>
                <p className="text-sm text-gray-600">
                  {formatDate(review.date)}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(review.rating)}
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-2">
              <p className="text-gray-700 leading-relaxed line-clamp-4">
                {review.comment}
              </p>

              {/* Helpful Button */}
              {review.helpfulCount && review.helpfulCount > 0 && (
                <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
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
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  <span>Helpful ({review.helpfulCount})</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {hasMoreReviews && !showAllReviews && (
        <button
          onClick={() => setShowAllReviews(true)}
          className="w-full py-3 px-6 border border-gray-900 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
        >
          <span>Show all {reviewCount} reviews</span>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Summary Stats */}
      <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {overallRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Overall rating</div>
            {renderStars(Math.round(overallRating), "md")}
          </div>
          <div className="border-x border-pink-200 md:border-x-0 md:border-l md:border-pink-200">
            <div className="text-2xl font-bold text-gray-900">
              {reviewCount}
            </div>
            <div className="text-sm text-gray-600">Total reviews</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(
                (reviews.filter((r) => r.rating >= 4).length / reviews.length) *
                  100
              )}
              %
            </div>
            <div className="text-sm text-gray-600">4+ star reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}
