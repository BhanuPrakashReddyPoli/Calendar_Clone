import React, { useState, useEffect } from "react";
import "./WeekView.css";

const WeekView = ({ selectedDate, events, onTimeSlotClick }) => {
  const [currentWeek, setCurrentWeek] = useState(getWeekDates(selectedDate));
  const [selectedDay, setSelectedDay] = useState(selectedDate);

  useEffect(() => {
    setCurrentWeek(getWeekDates(selectedDate));
    setSelectedDay(selectedDate);
  }, [selectedDate]);

  function getWeekDates(date) {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const newDate = new Date(startOfWeek);
      newDate.setDate(startOfWeek.getDate() + i);
      return newDate;
    });
  }

  const handleDayClick = (date) => {
    setSelectedDay(date);
  };

  const handleTimeSlotClick = (day, time) => {
    if (onTimeSlotClick) {
      onTimeSlotClick(day, time);
    } else {
      console.error("onTimeSlotClick function is not provided.");
    }
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  return (
    <div className="week-view">
      <div className="week-header">
        {currentWeek.map((date, index) => (
          <div
            key={index}
            className={`week-day ${date.toDateString() === selectedDay.toDateString() ? "selected" : ""}`}
            onClick={() => handleDayClick(date)}
          >
            <div className="day-name">{date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}</div>
            <div className="day-date">{date.getDate()}</div>
          </div>
        ))}
      </div>

      <div className="event-section">
        <h3>Events for {selectedDay.toDateString()}</h3>
        <div className="event-container">
          {timeSlots.map((time, index) => {
            const eventKey = `${selectedDay.toDateString()} ${time}`;
            return (
              <div
                key={index}
                className="time-slot"
                onClick={() => handleTimeSlotClick(selectedDay.toDateString(), time)}
              >
                <span className="time-label">{time}</span>
                {events[eventKey] && <div className="event">{events[eventKey]}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
