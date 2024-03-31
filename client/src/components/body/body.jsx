import React from "react";
import "./body.css";
import PublicEvents from "./public-events/public-events";
import PrivateEvents from "./private-events/private-events";
import RSOEvents from "./your-rso-events/rso-events";
import {Link} from "react-router-dom";

const username = "Rachel";

export default function Body() {

  const loc = "University of Central Florida";

  return (

    <>

    <div className="wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 320">
      <path fill="#9EC4EA" fill-opacity="1" d="M0,96L48,133.3C96,171,192,245,288,277.3C384,309,480,299,576,277.3C672,256,768,224,864,218.7C960,213,1056,235,1152,213.3C1248,192,1344,128,1392,96L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>
    </div>

    <div className="main-content">
      <div className="admin-button">
        <Link to="/admin"><button className="admin">
            Add an Event 
        </button></Link>
        <span><div className="location">Currently viewing</div>  <span className="custom-loc">{loc}</span></span>
      </div>
      <h1 className="title">Welcome to EventCo, <span className="custom-user">{username}</span></h1>
      <div className="public-pos"><PublicEvents/></div>
      <PrivateEvents/>
      <RSOEvents/>
    </div>

    </>
  );
}
