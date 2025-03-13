import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ setSelectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // First day of the month (0 = Sunday)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the month

    const weeks = [];
    let currentWeek = new Array(firstDay).fill(null);
    let dayCounter = 1;

    while (dayCounter <= daysInMonth) {
      while (currentWeek.length < 7 && dayCounter <= daysInMonth) {
        currentWeek.push(dayCounter++);
      }
      weeks.push([...currentWeek]);
      currentWeek = [];
    }

    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    if (currentWeek.some((day) => day !== null)) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(newDate);
    }
  };

  return (
    <div className="sidebar">
      <h3>
        {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
      </h3>

      <div className="calendar">
        <div className="calendar-row calendar-header">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
            <div key={i} className="calendar-cell header-cell">
              {day}
            </div>
          ))}
        </div>

        {generateCalendar().map((week, i) => (
          <div key={i} className="calendar-row">
            {week.map((day, j) => (
              <div
                key={j}
                className={`calendar-cell ${day ? "clickable" : "empty"}`}
                onClick={() => handleDateClick(day)}
              >
                {day || ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
