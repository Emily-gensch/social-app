import React from "react";
import EventForm from "../../components/admin/event-form";

const username = "Rachel";

export default function Admin() {
  return (
    <div className="main-content">
      <h1 className="title">{username}'s Admin Page</h1>
      <EventForm />
    </div>
  );
}
