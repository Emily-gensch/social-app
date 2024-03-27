import React from "react";
import "./sidebar.css";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function Sidebar() {
  return (
    <div className="sideBar">
      <h1>Hello</h1>
      <Calendar/>
      <div className="main-content">
        <h2 className="header">Upcoming Events</h2>
        <hr className="line"></hr>
      </div>
    </div>
  );
}
