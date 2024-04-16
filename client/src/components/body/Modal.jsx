import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Comments from "../rating_system/comments";
import "./Modal.css";

const Modal = ({ open, onClose, event }) => {
  // this determines whether "join" or "leave" button appears
  const [isRSOMember, setIsRSOMember] = useState(false);
  // finds current user id
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("currentUser")).userid
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Run the effect only when the modal is opened
    if (open) {
      // Check if user is in the rso of the selected event
      setIsRSOMember(false);
      setUserId(JSON.parse(localStorage.getItem("currentUser")).userid);
      checkRSOMembership();
    }
  }, [open]);

  // queries whether user.id corresponds to event.rso_name
  const checkRSOMembership = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/isinrso/${userId}/${event.rso}`
      );
      setIsRSOMember(res.data[0].is_member);
    } catch (error) {
      console.error("Error checking RSO membership:", error);
    }
  };

  // adds userid and rsoid to the userrso joint table
  const joinRSO = async () => {
    try {
      await axios.post(`http://localhost:8800/userrso/${userId}/${event.rso}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error joining RSO:", error);
    }

    setIsRSOMember(true);
  };

  // removes userid and rsoid from the userrso joint table
  const leaveRSO = async () => {
    try {
      await axios.delete(
        `http://localhost:8800/userrso/${userId}/${event.rso}`
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Error leaving RSO:", error);
    }

    setIsRSOMember(false);
  };

  if (open) {
    console.log("MODAL OPEN");
    document.body.classList.add("modal-open");
  }

  if (!open) {
    console.log("MODAL CLOSED");
    document.body.classList.remove("modal-open");
    return null;
  }

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p className="closeBtn" onClick={onClose}>
            X
          </p>
          <div className="content">
            <h1 className="event-name">{event.name}</h1>
            <p className="event-rso-name">{event.rso}</p>
            <p>Description: {event.description}</p>
            <p>Date/Time: {event.datetime}</p>
            <p>Location: {event.loc}</p>
          </div>
          <div className="comments">
            <Comments event={event} />
          </div>
          <div className="btnContainer">
            {isRSOMember ? (
              <button onClick={leaveRSO}>Leave RSO</button>
            ) : (
              <button onClick={joinRSO}>Join RSO</button>
            )}
          </div>
          <div className="add-to-calendar">
            <button>Add to Calendar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
