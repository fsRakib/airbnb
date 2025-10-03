"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/aircover"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  AirCover
                </Link>
              </li>
              <li>
                <Link
                  href="/anti-discrimination"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Anti-discrimination
                </Link>
              </li>
              <li>
                <Link
                  href="/disability-support"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Disability support
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-options"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancellation options
                </Link>
              </li>
              <li>
                <Link
                  href="/neighborhood-support"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Report neighborhood concern
                </Link>
              </li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Hosting
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/host/homes"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Airbnb your home
                </Link>
              </li>
              <li>
                <Link
                  href="/aircover-for-hosts"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  AirCover for Hosts
                </Link>
              </li>
              <li>
                <Link
                  href="/hosting-resources"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Hosting resources
                </Link>
              </li>
              <li>
                <Link
                  href="/community-forum"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Community forum
                </Link>
              </li>
              <li>
                <Link
                  href="/hosting-responsibly"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Hosting responsibly
                </Link>
              </li>
              <li>
                <Link
                  href="/airbnb-friendly"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Airbnb-friendly apartments
                </Link>
              </li>
            </ul>
          </div>

          {/* Airbnb */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Airbnb</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Newsroom
                </Link>
              </li>
              <li>
                <Link
                  href="/new-features"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  New features
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/investors"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Investors
                </Link>
              </li>
              <li>
                <Link
                  href="/gift-cards"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Gift cards
                </Link>
              </li>
              <li>
                <Link
                  href="/emergency-stays"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Airbnb.org emergency stays
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & App Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Follow us
            </h3>
            <div className="flex space-x-4 mb-6">
              <Link
                href="https://facebook.com/airbnb"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link
                href="https://twitter.com/airbnb"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
              <Link
                href="https://instagram.com/airbnb"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.33-1.297C4.198 14.81 3.708 13.659 3.708 12.362c0-1.297.49-2.448 1.297-3.33c.881-.881 2.033-1.371 3.33-1.371c1.297 0 2.448.49 3.33 1.297c.881.881 1.371 2.033 1.371 3.33c0 1.297-.49 2.448-1.297 3.33c-.881.881-2.033 1.371-3.33 1.371zm7.718 0c-1.297 0-2.448-.49-3.33-1.297c-.881-.881-1.371-2.033-1.371-3.33c0-1.297.49-2.448 1.297-3.33c.881-.881 2.033-1.371 3.33-1.371c1.297 0 2.448.49 3.33 1.297c.881.881 1.371 2.033 1.371 3.33c0 1.297-.49 2.448-1.297 3.33c-.881.881-2.033 1.371-3.33 1.371z" />
                </svg>
              </Link>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-900">Get the app</h4>
              <div className="flex flex-col space-y-2">
                <Link
                  href="https://apps.apple.com/app/airbnb/id401626263"
                  className="inline-block px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors text-center"
                >
                  📱 Download on the App Store
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.airbnb.android"
                  className="inline-block px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors text-center"
                >
                  🤖 Get it on Google Play
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Left side - Legal Links */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-600">
              <span>© 2023 Airbnb, Inc.</span>
              <div className="flex items-center space-x-4">
                <Link
                  href="/terms"
                  className="hover:text-gray-900 transition-colors"
                >
                  Terms
                </Link>
                <span>·</span>
                <Link
                  href="/sitemap"
                  className="hover:text-gray-900 transition-colors"
                >
                  Sitemap
                </Link>
                <span>·</span>
                <Link
                  href="/privacy"
                  className="hover:text-gray-900 transition-colors"
                >
                  Privacy
                </Link>
                <span>·</span>
                <Link
                  href="/privacy-choices"
                  className="hover:text-gray-900 transition-colors"
                >
                  Your Privacy Choices
                </Link>
              </div>
            </div>

            {/* Right side - Language & Currency */}
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
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
                <span>English (US)</span>
              </button>
              <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <span>$</span>
                <span>USD</span>
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
