import React, { useState, useEffect } from "react";
import "./EventModal.css";

const EventModal = ({ modalData, addOrEditEvent, deleteEvent, closeModal, isNewEvent = false }) => {
  const [eventText, setEventText] = useState(modalData?.eventText || "");
  const [eventDate, setEventDate] = useState(modalData?.day || "");
  const [eventTime, setEventTime] = useState(modalData?.time || "");

  useEffect(() => {
    setEventText(modalData?.eventText || "");
    setEventDate(modalData?.day || "");
    setEventTime(modalData?.time || "");
  }, [modalData]);

  const handleSave = () => {
    if (!eventText || !eventDate || !eventTime) {
      alert("Please fill in all fields.");
      return;
    }
    addOrEditEvent(eventDate, eventTime, eventText);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={closeModal}>✖</button>
        <h2>{isNewEvent ? "Create Event" : "Edit Event"}</h2>
        
        <div className="input-group">
          <label>Event Title</label>
          <input
            type="text"
            placeholder="Enter event name"
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Time</label>
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>

        <div className="modal-buttons">
          <button className="save-btn" onClick={handleSave}>
            {isNewEvent ? "Create" : "Save"}
          </button>
          {!isNewEvent && (
            <button className="delete-btn" onClick={() => deleteEvent(eventDate, eventTime)}>
              Delete
            </button>
          )}
          <button className="cancel-btn" onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
