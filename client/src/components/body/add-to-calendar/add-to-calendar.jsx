import React from "react";
import axios from "axios";

const AddToCalendarButton = ({ userId, eventId }) => {
  const handleAddToCalendar = async (e) => {
    try {
      await axios.post(`http://localhost:8800/userevents/${eventId}/${userId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={handleAddToCalendar}>Add event to calendar</button>;
};

export default AddToCalendarButton;
