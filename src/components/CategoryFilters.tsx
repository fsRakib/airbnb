"use client";

export default function CategoryFilters() {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8 py-4">
          <button className="flex flex-col items-center space-y-2 text-gray-500 hover:text-gray-900 transition-colors">
            <div className="text-2xl">🏠</div>
            <span className="text-xs font-medium">Stays</span>
          </button>
          <button className="flex flex-col items-center space-y-2 text-gray-500 hover:text-gray-900 transition-colors">
            <div className="text-2xl">🏞️</div>
            <span className="text-xs font-medium">Amazing views</span>
          </button>
          <button className="flex flex-col items-center space-y-2 text-gray-500 hover:text-gray-900 transition-colors">
            <div className="text-2xl">🏖️</div>
            <span className="text-xs font-medium">Beachfront</span>
          </button>
          <button className="flex flex-col items-center space-y-2 text-gray-500 hover:text-gray-900 transition-colors">
            <div className="text-2xl">🏔️</div>
            <span className="text-xs font-medium">Mountains</span>
          </button>
        </div>
      </div>
    </div>
  );
}
