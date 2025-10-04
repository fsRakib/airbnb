"use client";

interface SleepingArrangementsProps {
  bedrooms: number;
  beds?: number;
  bathrooms: number;
}

export default function SleepingArrangements({
  bedrooms,
  beds,
  bathrooms,
}: SleepingArrangementsProps) {
  const bedroomConfig = [
    { type: "Bedroom 1", beds: "1 queen bed" },
    { type: "Bedroom 2", beds: "1 double bed" },
    { type: "Living room", beds: "1 sofa bed" },
  ].slice(0, bedrooms);

  return (
    <section className="border-b border-gray-200 pb-6 sm:pb-8">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
        Where you&apos;ll sleep
      </h2>

      {/* Bedroom Configuration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {bedroomConfig.map((room, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{room.type}</h3>
                <p className="text-sm text-gray-600 mt-1">{room.beds}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 119.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Sleeps {bedrooms * 2}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z"
              />
            </svg>
            <span>
              {bedrooms} bedroom{bedrooms !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z"
              />
            </svg>
            <span>
              {beds || bedrooms + 1} bed
              {(beds || bedrooms + 1) !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>
            <span>
              {bathrooms} bathroom{bathrooms !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
