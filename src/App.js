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
    setModalData({ day, time, eventText: events[`${day} ${time}:00`] || "" });
  };

  const closeModal = () => {
    setModalData(null);
  };

  const addOrEditEvent = (day, time, eventText) => {
    setEvents({ ...events, [`${day} ${time}:00`]: eventText });
    closeModal();
  };

  const deleteEvent = (day, time) => {
    const updatedEvents = { ...events };
    delete updatedEvents[`${day} ${time}:00`];
    setEvents(updatedEvents);
    closeModal();
  };

  return (
    <div className="app">
      <Header currentWeek={selectedDate.toDateString()} />
      <div className="main-content">
        <Sidebar setSelectedDate={handleDateClick} />
        <WeekView
          selectedDate={selectedDate}
          events={events}
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
