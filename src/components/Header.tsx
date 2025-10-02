"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl md:text-3xl font-bold text-red-500">
              airbnb
            </div>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/stays"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Stays
            </Link>
            <Link
              href="/experiences"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Experiences
            </Link>
            <Link
              href="/online-experiences"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Online Experiences
            </Link>
          </nav>

          {/* Right side - Host and Profile */}
          <div className="flex items-center space-x-4">
            {/* Become a Host */}
            <Link
              href="/host"
              className="hidden sm:block text-gray-700 hover:text-gray-900 font-medium text-sm hover:bg-gray-50 px-3 py-2 rounded-full transition-colors"
            >
              Become a Host
            </Link>

            {/* Language/Currency */}
            <button className="hidden sm:flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-full transition-colors">
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
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                />
              </svg>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center space-x-2 border border-gray-300 rounded-full py-2 px-3 hover:shadow-md transition-shadow">
                {/* Menu Icon */}
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                {/* Avatar */}
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
