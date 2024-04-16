import React, { useState, useEffect } from "react";
import axios from "axios";

const UpcomingEvents = ({ userId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/userevents/${userId}`
        );
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUpcomingEvents();
  }, [userId]);

  return (
    <div>
      <div>
        {events.map((event) => (
          <div key={event.id}>{event.name}</div>
        ))}
        {events.length === 0 && <div>No upcoming events</div>}
      </div>
    </div>
  );
};

export default UpcomingEvents;
