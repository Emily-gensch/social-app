import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datetime-picker/dist/DateTimePicker.css";
import "../body/body.css";

const ApprovalForm = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchUnapprovedEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8800/unapprovedevents");
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUnapprovedEvents();
  }, []);

  return <div className="form"></div>;
  // query events where approved = 0
  // have them listed
  // have a approve button
  // if button clicked, then edit event to approved = 1
};

export default ApprovalForm;
