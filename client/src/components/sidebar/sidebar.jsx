import React, { useState, useEffect } from "react";
import "./sidebar.css";
import Calendar from "react-calendar";
import UpcomingEvents from "./upcoming-events";
import "react-calendar/dist/Calendar.css";

const username = JSON.parse(localStorage.getItem("currentUser")).username;

export default function Sidebar() {
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("currentUser")).userid
  );
  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("currentUser")).userid);
  }, []);

  return (
    <div className="sideBar">
      <div className="calendar">
        <Calendar />
      </div>
      <div className="sidebar-content">
        <h2 className="header">Upcoming Events</h2>
        <hr className="line"></hr>
        <UpcomingEvents userId={userId} />
      </div>
    </div>
  );
}
