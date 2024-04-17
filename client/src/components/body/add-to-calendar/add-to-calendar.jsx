import { useState, useEffect } from "react";
import axios from "axios";
import "./add-to-calendar.css";
import { Link, useNavigate } from "react-router-dom";

const AddToCalendarButton = ({ userId, eventId }) => {
  const navigate = useNavigate();

  const handleAddToCalendar = async (e) => {
    try {
      await axios.post(`http://localhost:8800/userevents/${eventId}/${userId}`);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  return (
    <button className="btnContainer-add" onClick={handleAddToCalendar}>
      Add event to calendar
    </button>
  );
};

export default AddToCalendarButton;
