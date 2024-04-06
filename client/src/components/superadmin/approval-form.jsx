import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../body/body.css";

const ApprovalForm = () => {
  // singular event
  const [event, setEvent] = useState({
    name: "",
    cat: "",
    description: "",
    datetime: "",
    loc: "",
    rso_phone: "",
    rso_email: "",
    rso: "",
    approved: 0,
    cover: "",
  });
  // array of all unapproved events
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // fetch events from database that are unapproved
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8800/unapprovedevents");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const updateEvent = (d) => {
    const formattedDateTime = new Date(d.datetime)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
    setEvent({
      name: d.name,
      cat: d.cat,
      description: d.description,
      datetime: formattedDateTime,
      loc: d.loc,
      rso_phone: d.rso_phone,
      rso_email: d.rso_email,
      rso: d.rso,
      cover: d.cover
    });
    setEvent((prev) => ({ ...prev, approved: 1 }));
    {handleClick(d)};
  };

  // when approval button is clicked, update the event in the database
  const handleClick = async (d) => {
    try {
      await axios.put(`http://localhost:8800/events/${d.id}`, event);
      // refresh data on page
      fetchEvents();
    } catch (err) {
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
            onClick={() => updateEvent(d)}
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
