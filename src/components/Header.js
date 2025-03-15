import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventModal from "./EventModal";
import "./Header.css";

const Header = ({ currentWeek, addOrEditEvent }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <header className="header">
        {/* Left: "+" Icon and Calendar Title */}
        <div className="header-left">
          <IconButton onClick={openModal}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
          <h1 className="header-title">IQ Tree Calendar</h1>
        </div>

        {/* Center: Search Bar */}
        <div className="search-container">
          <TextField
            variant="outlined"
            placeholder="Search events..."
            size="small"
            className="search-bar"
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
        </div>

        {/* Right: Profile Icon */}
        <div className="header-icons">
          <IconButton>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </div>
      </header>

      {/* Event Modal */}
      {modalOpen && (
        <EventModal
          closeModal={closeModal}
          addOrEditEvent={addOrEditEvent}
          isNewEvent={true}
        />
      )}
    </>
  );
};

export default Header;
