import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import Map from "./Map";
import ImageUploader from "./image-uploader";
import "react-datetime-picker/dist/DateTimePicker.css";
import "../body/body.css";
import "./event-form.css";

const EventForm = () => {
  const [Rsos, setRsos] = useState([]);
  const [marker, setMarker] = useState(null);
  const [eventId, setEventId] = useState();
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("currentUser")).userid
  );

  const [event, setEvent] = useState({
    name: "",
    cat: "",
    description: "",
    datetime: new Date(),
    loc: "",
    rso_phone: "",
    rso_email: "",
    rso: "",
    approved: 0,
    cover: "",
  });

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("currentUser")).userid);
    console.log("found user id: ", userId);

    const fetchRsos = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/yourrsos/${userId}`);
        setRsos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRsos();
  }, []);

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
      const res = await axios.post("http://localhost:8800/events", event);
      console.log(res.data.insertId);
      setEventId(res.data.insertId);
      //navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleMapClick = (e) => {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarker(newMarker);

    const location = `${newMarker.lat}, ${newMarker.lng}`;
    setEvent((prev) => ({
      ...prev,
      loc: location,
    }));
  };

  return (
    <div className="form">
      <h1>Add New Event</h1>
      <div className="clubDropdown">
        <label className="clubSelect" htmlFor="clubSelect">
          Select RSO:
        </label>
        <select
          type="select"
          placeholder="Select RSO"
          name="rso"
          onChange={handleChange}
        >
          <option className="select-a-club" value="">
            Select a club
          </option>
          {Rsos.map((club) => (
            <option key={club.id} value={club.rso_name}>
              {club.rso_name}
            </option>
          ))}
          <option value="No RSO">No RSO</option>
        </select>
      </div>
      <input
        className="input-admin"
        type="text"
        placeholder="Event name"
        name="name"
        onChange={handleChange}
      />
      <input
        className="input-admin"
        type="text"
        placeholder="Event category"
        name="cat"
        onChange={handleChange}
      />
      <textarea
        className="input-admin"
        rows={5}
        type="text"
        placeholder="Event description"
        name="description"
        onChange={handleChange}
      />
      <DateTimePicker
        className="date-time-container"
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
      <div className="buffer-admin"></div>
      <input
        className="input-admin"
        type="text"
        placeholder="Contact phone number"
        name="rso_phone"
        onChange={handleChange}
      />
      <input
        className="input-admin"
        type="text"
        placeholder="Contact email address"
        name="rso_email"
        onChange={handleChange}
      />
      <h1>Pick a location</h1>
      <Map handleMapClick={handleMapClick}></Map>
      {marker && (
        <div>
          Latitude: {marker.lat}, Longitude: {marker.lng}
        </div>
      )}
      <button className="admin-buttons" onClick={handleClick}>
        Add
      </button>
      <div className="choose-file">
        <ImageUploader eventId={eventId} />{" "}
      </div>
      {error && "Something went wrong!"}
      <Link to="/dashboard">See all events</Link>
    </div>
  );
};

export default EventForm;
