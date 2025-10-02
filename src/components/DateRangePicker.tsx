"use client";

import { useState, useRef, useEffect } from "react";

interface DateRangePickerProps {
  checkIn?: string;
  checkOut?: string;
  onDateChange: (checkIn: string, checkOut: string) => void;
  blockedDates?: string[];
  minNights?: number;
  className?: string;
}

export default function DateRangePicker({
  checkIn = "",
  checkOut = "",
  onDateChange,
  blockedDates = [],
  minNights = 1,
  className = "",
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectingCheckIn, setSelectingCheckIn] = useState(true);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatFullDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isDateBlocked = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return blockedDates.includes(dateString) || date < today;
  };

  const isDateInRange = (date: Date) => {
    if (!checkIn || !checkOut) return false;
    const dateStr = date.toISOString().split("T")[0];
    return dateStr >= checkIn && dateStr <= checkOut;
  };

  const isDateHovered = (date: Date) => {
    if (!checkIn || !hoveredDate || selectingCheckIn) return false;
    const dateStr = date.toISOString().split("T")[0];
    const start = checkIn;
    const end = hoveredDate;
    return dateStr > start && dateStr <= end;
  };

  const handleDateClick = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];

    if (isDateBlocked(date)) return;

    if (selectingCheckIn || !checkIn) {
      onDateChange(dateString, "");
      setSelectingCheckIn(false);
    } else {
      if (dateString <= checkIn) {
        // If selected date is before check-in, make it the new check-in
        onDateChange(dateString, "");
        setSelectingCheckIn(false);
      } else {
        // Check if there are any blocked dates between check-in and check-out
        const checkInDate = new Date(checkIn);
        const checkOutDate = date;
        let hasBlockedDates = false;

        for (
          let d = new Date(checkInDate);
          d < checkOutDate;
          d.setDate(d.getDate() + 1)
        ) {
          if (isDateBlocked(new Date(d))) {
            hasBlockedDates = true;
            break;
          }
        }

        if (!hasBlockedDates) {
          const daysDiff = Math.ceil(
            (checkOutDate.getTime() - checkInDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );
          if (daysDiff >= minNights) {
            onDateChange(checkIn, dateString);
            setIsOpen(false);
          }
        }
      }
    }
  };

  const generateCalendarDays = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentMonth(newMonth);
  };

  const renderCalendar = (month: Date, isSecondary = false) => {
    const days = generateCalendarDays(month);
    const monthName = month.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          {!isSecondary && (
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={month <= today}
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
          )}
          <h3 className="font-semibold text-gray-900 flex-1 text-center">
            {monthName}
          </h3>
          {!isSecondary && (
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
          )}
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div
              key={day}
              className="text-xs font-medium text-gray-500 text-center py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const isCurrentMonth = date.getMonth() === month.getMonth();
            const isBlocked = isDateBlocked(date);
            const isSelected =
              checkIn === date.toISOString().split("T")[0] ||
              checkOut === date.toISOString().split("T")[0];
            const isInRange = isDateInRange(date);
            const isHovered = isDateHovered(date);
            const isToday = date.toDateString() === today.toDateString();

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() =>
                  setHoveredDate(date.toISOString().split("T")[0])
                }
                disabled={isBlocked || !isCurrentMonth}
                className={`
                  h-10 w-10 text-sm relative transition-all duration-200
                  ${!isCurrentMonth ? "text-gray-300 cursor-not-allowed" : ""}
                  ${
                    isBlocked
                      ? "text-gray-300 cursor-not-allowed line-through"
                      : ""
                  }
                  ${isSelected ? "bg-gray-900 text-white font-semibold" : ""}
                  ${isInRange && !isSelected ? "bg-gray-100" : ""}
                  ${isHovered && !isSelected ? "bg-gray-50" : ""}
                  ${isToday && !isSelected ? "border-2 border-gray-900" : ""}
                  ${
                    !isBlocked && !isSelected && isCurrentMonth
                      ? "hover:bg-gray-100"
                      : ""
                  }
                  rounded-full flex items-center justify-center
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const clearDates = () => {
    onDateChange("", "");
    setSelectingCheckIn(true);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Date Input Display */}
      <div className="flex border border-gray-300 rounded-full overflow-hidden bg-white">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setSelectingCheckIn(true);
          }}
          className={`flex-1 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
            selectingCheckIn && isOpen ? "bg-gray-50" : ""
          }`}
        >
          <div className="text-xs font-semibold text-gray-900 mb-1">
            CHECK IN
          </div>
          <div className="text-sm text-gray-900">
            {checkIn ? formatDate(checkIn) : "Add date"}
          </div>
        </button>

        <div className="w-px bg-gray-300"></div>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setSelectingCheckIn(false);
          }}
          className={`flex-1 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
            !selectingCheckIn && isOpen ? "bg-gray-50" : ""
          }`}
        >
          <div className="text-xs font-semibold text-gray-900 mb-1">
            CHECK OUT
          </div>
          <div className="text-sm text-gray-900">
            {checkOut ? formatDate(checkOut) : "Add date"}
          </div>
        </button>
      </div>

      {/* Calendar Popup */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 min-w-[600px]">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectingCheckIn
                    ? "Select check-in date"
                    : "Select check-out date"}
                </h3>
                {checkIn && !selectingCheckIn && (
                  <p className="text-sm text-gray-600 mt-1">
                    Minimum stay: {minNights} night{minNights !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5"
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
          </div>

          {/* Selected dates display */}
          {(checkIn || checkOut) && (
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {checkIn && (
                    <div>
                      <div className="text-xs font-medium text-gray-500">
                        Check-in
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatFullDate(checkIn)}
                      </div>
                    </div>
                  )}
                  {checkOut && (
                    <div>
                      <div className="text-xs font-medium text-gray-500">
                        Check-out
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatFullDate(checkOut)}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={clearDates}
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Clear dates
                </button>
              </div>
            </div>
          )}

          {/* Calendar Grid */}
          <div className="flex">
            {renderCalendar(currentMonth)}
            {renderCalendar(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
              true
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
