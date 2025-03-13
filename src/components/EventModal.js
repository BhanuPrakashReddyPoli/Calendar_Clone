import React, { useState } from "react";
import "./EventModal.css";

const EventModal = ({ modalData, addOrEditEvent, deleteEvent, closeModal }) => {
  const [eventText, setEventText] = useState(modalData.eventText);

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{modalData.day} - {modalData.time}:00</h3>
        <input
          type="text"
          placeholder="Event Title"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
        />
        <button onClick={() => addOrEditEvent(modalData.day, modalData.time, eventText)}>
          Save
        </button>
        <button onClick={() => deleteEvent(modalData.day, modalData.time)}>Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default EventModal;
