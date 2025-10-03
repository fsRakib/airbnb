"use client";

import { useState } from "react";
import SearchForm from "./SearchForm";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState("stays");

  return (
    <div className="relative min-h-[600px] md:min-h-[700px] bg-gradient-to-b from-gray-900/50 to-transparent">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg?im_w=2560')",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center bg-white rounded-full p-1 shadow-lg">
            <button
              onClick={() => setActiveTab("stays")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "stays"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="flex items-center gap-2">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Stays
              </span>
            </button>
            <button
              onClick={() => setActiveTab("experiences")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "experiences"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="flex items-center gap-2">
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
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-10-4V9a1 1 0 011-1h8a1 1 0 011 1v1M9 16v1a1 1 0 001 1h4a1 1 0 001-1v-1M9 16h6"
                  />
                </svg>
                Experiences
              </span>
            </button>
            <button
              onClick={() => setActiveTab("online")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "online"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Online Experiences
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center text-white mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Not sure where to go?
            <br />
            Perfect.
          </h1>
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            I'm flexible
          </button>
        </div>

        {/* Search Form Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-full shadow-xl p-2">
            <SearchForm
              onSearch={(data) => {
                // Handle search - redirect to results page
                const params = new URLSearchParams({
                  location: data.location,
                  checkIn: data.checkIn,
                  checkOut: data.checkOut,
                  guests: data.guests.toString(),
                  adults: data.adults.toString(),
                  children: data.children.toString(),
                  infants: data.infants.toString(),
                  pets: data.pets.toString(),
                });
                window.location.href = `/?${params.toString()}`;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
