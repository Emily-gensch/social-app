import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";

const clubs = [
  { id: 1, name: "No RSO" },
  { id: 2, name: "Club A" },
  { id: 3, name: "Club B" },
  { id: 4, name: "Club C" },
];

export default function RsoForm() {
  const [rso, setRso] = useState({
    rso_name: "",
    owner: 0,
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the changed input is the club select
    if (name === "rso") {
      // Update the approved property based on the selected club
      const approvedValue = value === "No RSO" ? 0 : 1;
      setEvent((prevEvent) => ({
        ...prevEvent,
        [name]: value,
        approved: approvedValue,
      }));
    } else {
      // For other inputs, update as usual
      console.log("changed other input");
      setEvent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    //setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/events", event);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add New Event</h1>
      <div className="clubDropdown">
        <label htmlFor="clubSelect">Select RSO:</label>
        <select
          type="select"
          placeholder="Select RSO"
          name="rso"
          onChange={handleChange}
        >
          <option value="">Select a club</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.name}>
              {club.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        placeholder="Event name"
        name="name"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Event category"
        name="cat"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Event description"
        name="description"
        onChange={handleChange}
      />
      <DateTimePicker
        onChange={(value) => {
          const formattedDateTime = new Date(value)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
          const syntheticEvent = {
            target: { name: "datetime", value: formattedDateTime },
          };
          handleChange(syntheticEvent);
        }}
        value={event.datetime}
      />
      <input
        type="text"
        placeholder="Contact phone number"
        name="rso_phone"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Contact email address"
        name="rso_email"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Cover image"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/dashboard">See all books</Link>
    </div>
  );
}
