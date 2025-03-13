import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ setSelectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Generate calendar grid
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = getDaysInMonth(year, month);
    let days = [];

    // Add empty spaces before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add actual days
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  };

  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(newDate);
    }
  };

  const changeMonth = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const changeYear = (offset) => {
    setCurrentDate(new Date(currentDate.getFullYear() + offset, currentDate.getMonth(), 1));
  };

  return (
    <div className="sidebar">
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="nav-btn" onClick={() => changeYear(-1)}>«</button>
          <button className="nav-btn" onClick={() => changeMonth(-1)}>‹</button>
          <h3>
            {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
          </h3>
          <button className="nav-btn" onClick={() => changeMonth(1)}>›</button>
          <button className="nav-btn" onClick={() => changeYear(1)}>»</button>
        </div>

        <div className="calendar-grid">
          {daysOfWeek.map((day, i) => (
            <div key={i} className="calendar-day">{day}</div>
          ))}
          {generateCalendar().map((day, index) => {
            const isToday =
              day &&
              new Date().toDateString() ===
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
            
            return (
              <div
                key={index}
                className={`calendar-cell ${day ? "clickable" : "empty"} ${isToday ? "today" : ""}`}
                onClick={() => handleDateClick(day)}
              >
                {day || ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
