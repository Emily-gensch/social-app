import React, { useState, useEffect } from "react";
import "./body.css";
import PublicEvents from "./public-events/public-events";
import PrivateEvents from "./private-events/private-events";
import RSOEvents from "./your-rso-events/rso-events";
import { Link } from "react-router-dom";

const username = JSON.parse(localStorage.getItem("currentUser")).username;

export default function Body() {
  const loc = "University of Central Florida";
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("currentUser")).admin
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("currentUser")).userid
  );

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("currentUser")).userid);
    setIsAdmin(JSON.parse(localStorage.getItem("currentUser")).admin);
    // BUG FIX HERE: WRONG VALUE BEING ASSIGNED FOR "isAdmin"
    // TEST CASE: make a user that has admin set to "1". Then access their dashboard and see "Create Event" button does not appear because isAdmin is set to "0"
    console.log("found user id: ", userId);
    console.log("the user isadmin? ", isAdmin);
  }, []);

  return (
    <>
      <div className="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 320">
          <path
            fill="#9EC4EA"
            fill-opacity="1"
            d="M0,96L48,133.3C96,171,192,245,288,277.3C384,309,480,299,576,277.3C672,256,768,224,864,218.7C960,213,1056,235,1152,213.3C1248,192,1344,128,1392,96L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="main-content">
        <div className="dash-header">
          <div className="rso-button-container">
            <div className="create-rso-button">
              <Link to="/create-rso">
                <button className="create-rso">Create an RSO</button>
              </Link>
            </div>
          </div>

          <div className="location">
            <span>
              <div>Currently viewing</div>{" "}
              <span className="custom-loc">{loc}</span>
            </span>
          </div>

          <div className="admin-button-container">
            {isAdmin === 0 ? (
              <div></div>
            ) : (
              <div className="admin-button">
                <Link to="/admin">
                  <button className="admin">Add an Event</button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <h1 className="title">
          Welcome to EventCo, <span className="custom-user">{username}</span>
        </h1>
        <div className="public-pos">
          <PublicEvents />
        </div>
        <div className="private-pos">
          <PrivateEvents />
        </div>
        <div className="rso-pos">
          <RSOEvents />
        </div>
      </div>
    </>
  );
}
