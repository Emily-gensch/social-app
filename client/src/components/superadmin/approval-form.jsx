import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../body/body.css";

const ApprovalForm = () => {
  const [event, setEvent] = useState({});
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const eventId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:8800/unapprovedevents");
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEvents();
  }, []);

  const handleClick = async (e) => {
    setEvent((prev) => ({ ...prev, [e.target.name]: 1 }));
    console.log(event);
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/events/${eventId}`, event);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      {events.map((d) => (
        <div className="flex flex-col justify-center items-center gap-4 p-4">
          <p className="text-xl font-semibold">{d.name}</p>
          <button
            className="bg-[#1D6AB5] text-white text-lg px-6 py-1 rounded xl"
            onClick={handleClick}
            name="approved"
          >
            Approve
          </button>
        </div>
      ))}
      ;
    </div>
  );
};

export default ApprovalForm;
