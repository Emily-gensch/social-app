import React, { useState, useEffect } from "react";
import axios from "axios";
import "../body/body.css";

const clubs = [
  { id: 1, name: "No RSO" },
  { id: 2, name: "Club A" },
  { id: 3, name: "Club B" },
  { id: 4, name: "Club C" },
];

const EventForm = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const res = await axios.get("http:localhost:8800/events");
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEvents();
  }, []);

  const [selectedClub, setSelectedClub] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const handleClubChange = (event) => {
    setSelectedClub(event.target.value);
  };

  const handleMapLocationChange = (event) => {
    // Handle location change from map
    // This function will be implemented based on the map API being used
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log({
      selectedClub,
      eventName,
      eventCategory,
      description,
      time,
      date,
      location,
      contactPhone,
      contactEmail,
    });
    // Clear form fields
    setSelectedClub("");
    setEventName("");
    setEventCategory("");
    setDescription("");
    setTime("");
    setDate("");
    setLocation("");
    setContactPhone("");
    setContactEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="clubSelect">Select Club:</label>
        <select
          id="clubSelect"
          value={selectedClub}
          onChange={handleClubChange}
        >
          <option value="">Select a club</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.name}>
              {club.name}
            </option>
          ))}
        </select>
      </div>
      {selectedClub && (
        <div>
          <div>
            <label htmlFor="eventName">Event Name:</label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="eventCategory">Event Category:</label>
            <input
              type="text"
              id="eventCategory"
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Event Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contactPhone">Contact Phone:</label>
            <input
              type="text"
              id="contactPhone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contactEmail">Contact Email:</label>
            <input
              type="text"
              id="contactEmail"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          {/* Add map component for selecting location */}
          <button type="submit">Submit</button>
        </div>
      )}
    </form>
  );
};

export default EventForm;
