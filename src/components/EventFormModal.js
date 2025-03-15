import ". ./components/EventFormModal.css";
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

const EventFormModal = ({ modalData, addOrEditEvent, deleteEvent, closeModal }) => {
  const [eventText, setEventText] = useState(modalData.eventText || "");
  const [location, setLocation] = useState("");

  useEffect(() => {
    setEventText(modalData.eventText || "");
  }, [modalData]);

  const handleSave = () => {
    if (eventText.trim() === "") return;
    addOrEditEvent(modalData.day, modalData.time, eventText);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ backgroundColor: "red" }}>  {/* TEMPORARY BACKGROUND TEST */}
        <button className="close-btn" onClick={closeModal}>
          <FaTimes />
        </button>
        <h2>Create Event</h2>
        
        <div className="input-group">
          <FaCalendarAlt className="icon" />
          <input type="text" value={modalData.day} disabled className="input-field" />
        </div>

        <div className="input-group">
          <FaClock className="icon" />
          <input type="text" value={modalData.time} disabled className="input-field" />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Event Title"
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <FaMapMarkerAlt className="icon" />
          <input
            type="text"
            placeholder="Location (Optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="button-group">
          {modalData.eventText && (
            <button className="delete-btn" onClick={() => deleteEvent(modalData.day, modalData.time)}>
              Delete
            </button>
          )}
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFormModal;
