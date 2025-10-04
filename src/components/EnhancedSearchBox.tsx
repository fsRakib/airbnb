"use client";

import { useState, useEffect, useRef } from "react";

interface SearchBoxProps {
  onSearch?: (data: unknown) => void;
}

export default function EnhancedSearchBox({ onSearch }: SearchBoxProps) {
  const [activeTab, setActiveTab] = useState("stays");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const searchFormRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
        setShowDatePicker(false);
        setShowGuestPicker(false);
        setActiveField(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const suggestedDestinations = [
    {
      name: "Nearby",
      description: "Find what's around you",
      icon: (
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "Toronto, Canada",
      description: "For sights like CN Tower",
      icon: (
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "Bangkok, Thailand",
      description: "For its bustling nightlife",
      icon: (
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "London, United Kingdom",
      description: "For its stunning architecture",
      icon: (
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 14v3a2 2 0 002 2h4a2 2 0 002-2v-3M8 14V9a2 2 0 012-2h4a2 2 0 012 2v5M8 14H6a2 2 0 00-2 2v3a2 2 0 002 2h12a2 2 0 002-2v-3a2 2 0 00-2-2h-2"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "New York, NY",
      description: "For its top-notch dining",
      icon: (
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "Vancouver, Canada",
      description: "For sights like Stanley Park",
      icon: (
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        </div>
      ),
    },
    {
      name: "Calgary, Canada",
      description: "For nature-lovers",
      icon: (
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
        </div>
      ),
    },
  ];

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getNextDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  // Calendar Date Picker Component
  const CalendarDatePicker = ({
    checkIn,
    checkOut,
    onDateChange,
    onClose,
  }: {
    checkIn: string;
    checkOut: string;
    onDateChange: (checkIn: string, checkOut: string) => void;
    onClose: () => void;
  }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday

      const days = [];
      for (let i = 0; i < 42; i++) {
        // 6 rows × 7 days
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        days.push(currentDate);
      }
      return days;
    };

    const isDateInCurrentMonth = (date: Date, month: Date) => {
      return (
        date.getMonth() === month.getMonth() &&
        date.getFullYear() === month.getFullYear()
      );
    };

    const isDateSelected = (date: Date) => {
      const dateStr = date.toISOString().split("T")[0];
      return dateStr === checkIn || dateStr === checkOut;
    };

    const isDateInRange = (date: Date) => {
      if (!checkIn || !checkOut) return false;
      const dateStr = date.toISOString().split("T")[0];
      return dateStr > checkIn && dateStr < checkOut;
    };

    const handleDateClick = (date: Date) => {
      const dateStr = date.toISOString().split("T")[0];
      const today = getCurrentDate();

      if (dateStr < today) return; // Don't allow past dates

      if (!checkIn || (checkIn && checkOut)) {
        // Start new selection
        onDateChange(dateStr, "");
      } else if (checkIn && !checkOut) {
        // Set checkout date
        if (dateStr > checkIn) {
          onDateChange(checkIn, dateStr);
        } else {
          // If earlier date selected, make it check-in
          onDateChange(dateStr, "");
        }
      }
    };

    const nextMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      );
    };

    const prevMonth = () => {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
      );
    };

    const nextMonth2 = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      1
    );

    return (
      <div className="p-6">
        {/* Header with navigation */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-full">
              Dates
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full">
              Months
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full">
              Flexible
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="flex space-x-8">
          {/* First Month */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h3 className="text-lg font-semibold">
                {monthNames[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </h3>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
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
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div
                  key={index}
                  className="text-center text-xs font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentMonth).map((date, index) => {
                const isCurrentMonth = isDateInCurrentMonth(date, currentMonth);
                const isSelected = isDateSelected(date);
                const isInRange = isDateInRange(date);
                const isPastDate =
                  date.toISOString().split("T")[0] < getCurrentDate();

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    disabled={isPastDate}
                    className={`
                      w-10 h-10 text-sm rounded-full transition-all duration-200
                      ${!isCurrentMonth ? "text-gray-300" : ""}
                      ${
                        isPastDate
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }
                      ${
                        isSelected
                          ? "bg-gray-900 text-white hover:bg-gray-800"
                          : ""
                      }
                      ${isInRange ? "bg-gray-100" : ""}
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Second Month */}
          <div className="flex-1">
            <div className="flex justify-center items-center mb-4">
              <h3 className="text-lg font-semibold">
                {monthNames[nextMonth2.getMonth()]} {nextMonth2.getFullYear()}
              </h3>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div
                  key={index}
                  className="text-center text-xs font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(nextMonth2).map((date, index) => {
                const isCurrentMonth = isDateInCurrentMonth(date, nextMonth2);
                const isSelected = isDateSelected(date);
                const isInRange = isDateInRange(date);
                const isPastDate =
                  date.toISOString().split("T")[0] < getCurrentDate();

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    disabled={isPastDate}
                    className={`
                      w-10 h-10 text-sm rounded-full transition-all duration-200
                      ${!isCurrentMonth ? "text-gray-300" : ""}
                      ${
                        isPastDate
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }
                      ${
                        isSelected
                          ? "bg-gray-900 text-white hover:bg-gray-800"
                          : ""
                      }
                      ${isInRange ? "bg-gray-100" : ""}
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer with quick options */}
        <div className="flex space-x-2 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => {
              onDateChange(getCurrentDate(), getNextDate(1));
            }}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-900 transition-colors"
          >
            ± 1 day
          </button>
          <button
            onClick={() => {
              onDateChange(getCurrentDate(), getNextDate(2));
            }}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-900 transition-colors"
          >
            ± 2 days
          </button>
          <button
            onClick={() => {
              onDateChange(getCurrentDate(), getNextDate(3));
            }}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-900 transition-colors"
          >
            ± 3 days
          </button>
          <button
            onClick={() => {
              onDateChange(getCurrentDate(), getNextDate(7));
            }}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-900 transition-colors"
          >
            ± 7 days
          </button>
          <button
            onClick={() => {
              onDateChange(getCurrentDate(), getNextDate(14));
            }}
            className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-gray-900 transition-colors"
          >
            ± 14 days
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white">
      {/* Navigation Tabs */}
      <div className="flex items-center justify-center py-6">
        <div className="flex items-center space-x-8">
          <button
            onClick={() => setActiveTab("stays")}
            className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-200 ${
              activeTab === "stays"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">🏠</span>
            <span className="font-medium">Homes</span>
          </button>
          <button
            onClick={() => setActiveTab("experiences")}
            className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-200 ${
              activeTab === "experiences"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">🎈</span>
            <span className="font-medium">Experiences</span>
            <span className="bg-[#FF385C] text-white text-xs px-2 py-0.5 rounded-full font-medium">
              NEW
            </span>
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`flex items-center space-x-2 pb-3 border-b-2 transition-all duration-200 ${
              activeTab === "services"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <span className="text-lg">🎩</span>
            <span className="font-medium">Services</span>
            <span className="bg-[#FF385C] text-white text-xs px-2 py-0.5 rounded-full font-medium">
              NEW
            </span>
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          ref={searchFormRef}
          className="flex items-center bg-white border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative"
        >
          {/* Where */}
          <div className="relative flex-1">
            <button
              onClick={() => {
                setShowLocationDropdown(!showLocationDropdown);
                setShowDatePicker(false);
                setShowGuestPicker(false);
                setActiveField("where");
              }}
              className={`w-full text-left px-6 py-4 rounded-l-full transition-all duration-200 ${
                activeField === "where" || showLocationDropdown
                  ? "bg-white shadow-lg"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="text-xs font-semibold text-gray-900 mb-1">
                Where
              </div>
              <div className="text-sm text-gray-500">
                {searchData.location || "Search destinations"}
              </div>
            </button>

            {/* Location Dropdown */}
            {showLocationDropdown && (
              <div className="absolute top-full left-0 mt-3 w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="p-6">
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Search destinations"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF385C] focus:border-transparent text-gray-700 placeholder-gray-500"
                      value={searchData.location}
                      onChange={(e) =>
                        setSearchData({
                          ...searchData,
                          location: e.target.value,
                        })
                      }
                      autoFocus
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Suggested destinations
                    </h3>
                    <div className="space-y-1">
                      {suggestedDestinations.map((destination, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchData({
                              ...searchData,
                              location: destination.name,
                            });
                            setShowLocationDropdown(false);
                            setActiveField(null);
                          }}
                          className="w-full flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-all duration-200 text-left"
                        >
                          {destination.icon}
                          <div>
                            <div className="font-medium text-gray-900 text-sm">
                              {destination.name}
                            </div>
                            <div className="text-sm text-gray-500 mt-0.5">
                              {destination.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Check in */}
          <div className="relative flex-1">
            <button
              onClick={() => {
                setShowDatePicker(!showDatePicker);
                setShowLocationDropdown(false);
                setShowGuestPicker(false);
                setActiveField("checkin");
              }}
              className={`w-full text-left px-6 py-4 transition-all duration-200 ${
                activeField === "checkin" || showDatePicker
                  ? "bg-white shadow-lg"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="text-xs font-semibold text-gray-900 mb-1">
                Check in
              </div>
              <div className="text-sm text-gray-500">
                {searchData.checkIn || "Add dates"}
              </div>
            </button>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Check out */}
          <div className="relative flex-1">
            <button
              onClick={() => {
                setShowDatePicker(!showDatePicker);
                setShowLocationDropdown(false);
                setShowGuestPicker(false);
                setActiveField("checkout");
              }}
              className={`w-full text-left px-6 py-4 transition-all duration-200 ${
                activeField === "checkout" || showDatePicker
                  ? "bg-white shadow-lg"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="text-xs font-semibold text-gray-900 mb-1">
                Check out
              </div>
              <div className="text-sm text-gray-500">
                {searchData.checkOut || "Add dates"}
              </div>
            </button>

            {/* Date Picker */}
            {showDatePicker && (
              <div className="absolute top-full left-0 mt-3 w-[650px] bg-white rounded-3xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <CalendarDatePicker
                  checkIn={searchData.checkIn}
                  checkOut={searchData.checkOut}
                  onDateChange={(checkIn, checkOut) => {
                    setSearchData({
                      ...searchData,
                      checkIn,
                      checkOut,
                    });
                  }}
                  onClose={() => {
                    setShowDatePicker(false);
                    setActiveField(null);
                  }}
                />
              </div>
            )}
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          {/* Who */}
          <div className="relative flex-1">
            <button
              onClick={() => {
                setShowGuestPicker(!showGuestPicker);
                setShowLocationDropdown(false);
                setShowDatePicker(false);
                setActiveField("who");
              }}
              className={`w-full text-left px-6 py-4 transition-all duration-200 ${
                activeField === "who" || showGuestPicker
                  ? "bg-white shadow-lg"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="text-xs font-semibold text-gray-900 mb-1">
                Who
              </div>
              <div className="text-sm text-gray-500">
                {searchData.adults + searchData.children > 0
                  ? `${searchData.adults + searchData.children} guest${
                      searchData.adults + searchData.children > 1 ? "s" : ""
                    }`
                  : "Add guests"}
              </div>
            </button>

            {/* Guest Picker */}
            {showGuestPicker && (
              <div className="absolute top-full right-0 mt-3 w-96 bg-white rounded-3xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="p-8">
                  <div className="space-y-8">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 text-base">
                          Adults
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Ages 13 or above
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() =>
                            setSearchData({
                              ...searchData,
                              adults: Math.max(0, searchData.adults - 1),
                            })
                          }
                          className={`w-8 h-8 border rounded-full flex items-center justify-center transition-all duration-200 ${
                            searchData.adults === 0
                              ? "border-gray-200 text-gray-300 cursor-not-allowed"
                              : "border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900"
                          }`}
                          disabled={searchData.adults === 0}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900 text-base">
                          {searchData.adults}
                        </span>
                        <button
                          onClick={() =>
                            setSearchData({
                              ...searchData,
                              adults: searchData.adults + 1,
                            })
                          }
                          className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:border-gray-900 hover:text-gray-900 transition-all duration-200 text-gray-600"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 text-base">
                          Children
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Ages 2–12
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() =>
                            setSearchData({
                              ...searchData,
                              children: Math.max(0, searchData.children - 1),
                            })
                          }
                          className={`w-8 h-8 border rounded-full flex items-center justify-center transition-all duration-200 ${
                            searchData.children === 0
                              ? "border-gray-200 text-gray-300 cursor-not-allowed"
                              : "border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900"
                          }`}
                          disabled={searchData.children === 0}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900 text-base">
                          {searchData.children}
                        </span>
                        <button
                          onClick={() =>
                            setSearchData({
                              ...searchData,
                              children: searchData.children + 1,
                            })
                          }
                          className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:border-gray-900 hover:text-gray-900 transition-all duration-200 text-gray-600"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 text-base">
                          Infants
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Under 2
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() =>
                            setSearchData({
                              ...searchData,
                              infants: Math.max(0, searchData.infants - 1),
                            })
                          }
                          className={`w-8 h-8 border rounded-full flex items-center justify-center transition-all duration-200 ${
                            searchData.infants === 0
                              ? "border-gray-200 text-gray-300 cursor-not-allowed"
                              : "border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900"
                          }`}
                          disabled={searchData.infants === 0}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900 text-base">
                          {searchData.infants}
                        </span>
                        <button
                          onClick={() =>
                            setSearchData({
                              ...searchData,
                              infants: searchData.infants + 1,
                            })
                          }
                          className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:border-gray-900 hover:text-gray-900 transition-all duration-200 text-gray-600"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Pets */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 text-base">
                          Pets
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          <button className="underline hover:no-underline transition-all duration-200">
                            Bringing a service animal?
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() =>
                            setSearchData({
                              ...searchData,
                              pets: Math.max(0, searchData.pets - 1),
                            })
                          }
                          className={`w-8 h-8 border rounded-full flex items-center justify-center transition-all duration-200 ${
                            searchData.pets === 0
                              ? "border-gray-200 text-gray-300 cursor-not-allowed"
                              : "border-gray-400 text-gray-600 hover:border-gray-900 hover:text-gray-900"
                          }`}
                          disabled={searchData.pets === 0}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900 text-base">
                          {searchData.pets}
                        </span>
                        <button
                          onClick={() =>
                            setSearchData({
                              ...searchData,
                              pets: searchData.pets + 1,
                            })
                          }
                          className="w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:border-gray-900 hover:text-gray-900 transition-all duration-200 text-gray-600"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={() => {
              if (onSearch) {
                onSearch(searchData);
              }
              // Close all dropdowns
              setShowLocationDropdown(false);
              setShowDatePicker(false);
              setShowGuestPicker(false);
              setActiveField(null);
            }}
            className="bg-[#FF385C] hover:bg-[#E31C5F] text-white p-4 rounded-full ml-4 mr-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
