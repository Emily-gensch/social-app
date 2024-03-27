import React from "react";
import "./body.css";

const username = "Rachel";

export default function Body() {
  return (
    <div className="container">
      <h1 className="title">Welcome to EventCo, <h1 className="title" style={{color: '#CD374F'}}>{username}.</h1></h1>
    </div>
  );
}
