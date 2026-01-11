import React, { useState, useEffect, useRef } from "react";
import "../Datetime.css";

export default function DatePicker({ value, onChange, label }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const datePickerRef = useRef(null);

  const formatDate = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
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
    return `${days[date.getDay()]}, ${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const generateCalendarDays = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];
    const prevMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );
    const prevMonthDays = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    ).getDate();

    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(
          prevMonth.getFullYear(),
          prevMonth.getMonth(),
          prevMonthDays - i
        ),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i),
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1,
          i
        ),
      });
    }

    return days;
  };

  const isSelectedDate = (calendarDate) => {
    if (!value) return false;
    return (
      calendarDate.getDate() === value.getDate() &&
      calendarDate.getMonth() === value.getMonth() &&
      calendarDate.getFullYear() === value.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDateSelect = (selectedDate) => {
    onChange(selectedDate);
    setShowCalendar(false);
  };

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    }

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div className="date-picker-field" ref={datePickerRef}>
      {label && <label className="date-picker-label">{label}</label>}
      <div className="date-picker-container">
        <button
          type="button"
          className="date-picker-trigger"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <svg
            className="calendar-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          {value ? formatDate(value) : "Select a date"}
          <svg
            className="chevron-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {showCalendar && (
          <div className="calendar-dropdown">
            <div className="calendar-header">
              <button
                type="button"
                className="calendar-nav-btn"
                onClick={handlePrevMonth}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <span className="calendar-month-year">
                {monthNames[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </span>
              <button
                type="button"
                className="calendar-nav-btn"
                onClick={handleNextMonth}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            <div className="calendar-grid">
              <div className="calendar-weekdays">
                <div className="calendar-weekday">Su</div>
                <div className="calendar-weekday">Mo</div>
                <div className="calendar-weekday">Tu</div>
                <div className="calendar-weekday">We</div>
                <div className="calendar-weekday">Th</div>
                <div className="calendar-weekday">Fr</div>
                <div className="calendar-weekday">Sa</div>
              </div>

              <div className="calendar-days">
                {generateCalendarDays().map((dayInfo, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`calendar-day ${
                      !dayInfo.isCurrentMonth ? "calendar-day-outside" : ""
                    } ${
                      isSelectedDate(dayInfo.date)
                        ? "calendar-day-selected"
                        : ""
                    }`}
                    onClick={() => handleDateSelect(dayInfo.date)}
                  >
                    {dayInfo.day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Usage Example:
// import DatePicker from './DatePicker';
//
// function App() {
//   const [date, setDate] = useState(new Date());
//
//   return (
//     <DatePicker
//       value={date}
//       onChange={setDate}
//       label="Date"
//     />
//   );
// }
