import React, { useState } from "react";
import Body from "../../components/body/body";
import Sidebar from "../../components/sidebar/sidebar";
import {Link} from "react-router-dom";
import "../../components/body/body.css";
import "../../components/sidebar/sidebar.css";
import "./dashboard.css"

export default function Dashboard() {
  return (
    <div className="nav">
      <div className="dashboard-container">
        <Body />
        <Sidebar />
    </div>
    </div>
  );
}
