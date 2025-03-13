import React, { useState } from "react";
import "./WeekView.css";

const WeekView = ({ selectedDate, onDateSelect, events, onEventClick }) => {
  const [currentWeek, setCurrentWeek] = useState(getWeekDates(selectedDate));

  function getWeekDates(date) {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Get Sunday of the week
    return Array.from({ length: 7 }, (_, i) => {
      const newDate = new Date(startOfWeek);
      newDate.setDate(startOfWeek.getDate() + i);
      return newDate;
    });
  }

  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  return (
    <div className="week-view">
      {/* Header Row: Days + Dates */}
      <div className="week-header">
        {currentWeek.map((date, index) => (
          <div
            key={index}
            className={`week-day ${date.toDateString() === selectedDate.toDateString() ? "selected" : ""}`}
            onClick={() => onDateSelect(date)} // ✅ Fix: Clicking a date now works
          >
            <div className="day-name">{date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}</div>
            <div className="day-date">{date.getDate()}</div>
          </div>
        ))}
      </div>

      {/* Time Slots + Events Grid */}
      <div className="week-grid">
        {/* Time Column */}
        <div className="time-column">
          {timeSlots.map((time, index) => (
            <div key={index} className="time-slot">{time}</div>
          ))}
        </div>

        {/* Events Grid with Clickable Time Slots */}
        <div className="event-container">
          {timeSlots.map((_, timeIndex) => (
            <div key={timeIndex} className="week-row">
              {currentWeek.map((date, dayIndex) => (
                <div
                  key={dayIndex}
                  className="event-cell"
                  onClick={() => alert(`Clicked on ${date.toDateString()} at ${timeIndex}:00`)}
                >
                  {events[`${date.toDateString()} ${timeIndex}:00`] && (
                    <div
                      className="event"
                      onClick={() => onEventClick(events[`${date.toDateString()} ${timeIndex}:00`])}
                    >
                      {events[`${date.toDateString()} ${timeIndex}:00`].title}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
