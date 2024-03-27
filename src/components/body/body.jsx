import React from "react";
import "./body.css";
import PublicEvents from "./public-events/public-events";
import PrivateEvents from "./private-events/private-events";
import RSOEvents from "./your-rso-events/rso-events";

const username = "Rachel";

export default function Body() {
  return (
    <div className="main-content">
      <h1 className="title">Welcome to EventCo, <h1 className="title" style={{color: '#CD374F'}}>{username}.</h1></h1>
      <PublicEvents/>
      <PrivateEvents/>
      <RSOEvents/>
    </div>
  );
}
