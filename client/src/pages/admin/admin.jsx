import React from "react";
import EventForm from "../../components/admin/event-form";
import { Link } from "react-router-dom";
import "./admin.css";

export default function Admin() {
  return (
    <div className="nav">
      <Link to="/dashboard">
        <button className="Dashboard">Dashboard</button>
      </Link>
      <div className="main-content-admit">
        <h1 className="title-admin">Admin Page</h1>
        <EventForm />
      </div>
    </div>
  );
}
