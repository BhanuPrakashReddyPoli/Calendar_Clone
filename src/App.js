import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import WeekView from "./components/WeekView";
import EventModal from "./components/EventModal";
import "./App.css";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [modalData, setModalData] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const openEventModal = (day, time) => {
    setModalData({ day, time, eventText: events[`${day} ${time}`] || "" });
  };

  const closeModal = () => {
    setModalData(null);
  };

  const addOrEditEvent = (day, time, eventText) => {
    const formattedDay = new Date(day).toDateString(); // Ensure consistent format
    const eventKey = `${formattedDay} ${time}`;

    setEvents((prevEvents) => ({
      ...prevEvents,
      [eventKey]: eventText,
    }));

    console.log("Event Saved:", eventKey, eventText); // Debugging log
    closeModal();
  };

  const deleteEvent = (day, time) => {
    const formattedDay = new Date(day).toDateString();
    const eventKey = `${formattedDay} ${time}`;

    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      delete updatedEvents[eventKey];
      return updatedEvents;
    });

    console.log("Event Deleted:", eventKey); // Debugging log
    closeModal();
  };

  return (
    <div className="app">
      <Header currentWeek={selectedDate.toDateString()} addOrEditEvent={addOrEditEvent} />
      <div className="main-content">
        <Sidebar setSelectedDate={handleDateClick} />
        <WeekView
          selectedDate={selectedDate}
          events={events} // Pass updated events state
          onTimeSlotClick={openEventModal}
        />
      </div>
      {modalData && (
        <EventModal
          modalData={modalData}
          addOrEditEvent={addOrEditEvent}
          deleteEvent={deleteEvent}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default App;
