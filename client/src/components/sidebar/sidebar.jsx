import React from "react";
import "./sidebar.css";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function Sidebar() {
  return (
    <div className="sideBar">
      <div className="calendar"><Calendar/></div>
      <div className="sidebar-content">
        <h2 className="header">Upcoming Events</h2>
        <hr className="line"></hr>
      </div>
    </div>
  );
}
