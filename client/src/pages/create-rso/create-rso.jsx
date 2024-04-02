import React from "react";
import {Link} from "react-router-dom";

export default function CreateRSO() {
  return (
    <div className="nav">
      <Link to="/dashboard"><button className="Dashboard">
          Dashboard
      </button></Link>
      <div className="main-content">
        <h1 className="title">Create RSO</h1>
    </div>
    </div>
  );
}
