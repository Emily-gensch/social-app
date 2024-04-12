import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({ open, onClose, event }) => {
  // this determines whether "join" or "leave" button appears
  const [isRSOMember, setIsRSOMember] = useState(false);
  // finds current user id
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("currentUser")).userid
  );

  // on rendering, check whether the user is part of the rso for the event
  useEffect(() => {
    setIsRSOMember(false);
    setUserId(JSON.parse(localStorage.getItem("currentUser")).userid);
    checkRSOMembership();
  }, []);

  // queries whether user.id corresponds to event.rso_name
  const checkRSOMembership = async () => {
    try {
      console.log(
        "checking rso membershit with user ",
        userId,
        "and event ",
        event.name
      );
      const res = await axios.get(
        `http://localhost:8800/isinrso/${userId}/${event.rso}`
      );
      setIsRSOMember(res.data[0].is_member);
      console.log("result on whether user is in rso: ", res.data[0].is_member);
    } catch (error) {
      console.error("Error checking RSO membership:", error);
    }
  };

  // adds userid and rsoid to the userrso joint table
  const joinRSO = async () => {
    try {
      await axios.post(`http://localhost:8800/userrso/${userId}/${event.rso}`);
    } catch (error) {
      console.error("Error joining RSO:", error);
    }
  };

  // removes userid and rsoid from the userrso joint table
  const leaveRSO = async () => {
    try {
      await axios.delete(
        `http://localhost:8800/userrso/${userId}/${event.rso}`
      );
    } catch (error) {
      console.error("Error leaving RSO:", error);
    }
  };

  if (!open) return null;
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
            <h1>{event.name}</h1>
            <p>Description: {event.description}</p>
            <p>Date/Time: {event.datetime}</p>
            <p>Location: {event.loc}</p>
            <p>RSO: {event.rso}</p>
          </div>
          <div className="btnContainer">
            {isRSOMember ? (
              <button onClick={leaveRSO}>Leave RSO</button>
            ) : (
              <button onClick={joinRSO}>Join RSO</button>
            )}
          </div>
          /* ADD RATING COMPONENT */ /* ADD COMMENTS COMPONENT */
        </div>
      </div>
    </div>
  );
};

export default Modal;
