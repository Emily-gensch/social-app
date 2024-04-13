import React from "react";
import { Link } from "react-router-dom";
import RsoForm from "../../components/rso-form/rso-form";
import "./create-rso.css";

export default function CreateRSO() {
  return (
    <>
      <div>
        <Link to="/dashboard">
          <button className="dash-button">Dashboard</button>
        </Link>
      </div>

      <div className="nav">
        <div className="main-content-create-rso">
          <h1 className="title-create-rso">Create RSO</h1>
          <RsoForm />
        </div>
      </div>
    </>
  );
}
