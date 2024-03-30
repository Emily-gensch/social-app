import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../body/body.css";

const clubs = [
  { id: 1, name: "No RSO" },
  { id: 2, name: "Club A" },
  { id: 3, name: "Club B" },
  { id: 4, name: "Club C" },
];

const EventForm = () => {
  const [event, setEvent] = useState({
    name: "",
    cat: "",
    description: "",
    approved: 0,
    rso: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  /*
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const res = await axios.get("//localhost:8800/events");
        setEvents(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEvents();
  }, []);
  */

  /*
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

  */

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
      <textarea
        rows={5}
        type="text"
        placeholder="Event description"
        name="description"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Event category"
        name="cat"
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
      <Link to="/">See all books</Link>
    </div>

    /*
    <div className="form">
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
            <button type="submit">Submit</button>
          </div>
        )}
      </form>
    </div>
    */
  );
};

export default EventForm;
