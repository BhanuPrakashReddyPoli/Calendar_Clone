import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import WeekView from "./components/WeekView";
import "./App.css";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const goToPrevWeek = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)));
  };

  const goToNextWeek = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)));
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const handleEventClick = (event) => {
    alert(`Event: ${event.title}`);
  };

  return (
    <div className="app">
      <Header
        currentWeek={selectedDate.toDateString()}
        goToPrevWeek={goToPrevWeek}
        goToNextWeek={goToNextWeek}
        goToToday={goToToday}
      />
      <div className="main-content">
        <Sidebar setSelectedDate={setSelectedDate} />
        <WeekView
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate} // ✅ Fix: Pass the function properly
          events={events}
          onEventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default App;
