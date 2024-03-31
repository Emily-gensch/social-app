import React, { useState } from "react";
import Body from "../../components/body/body";
import Sidebar from "../../components/sidebar/sidebar";
import {Link} from "react-router-dom";
import "../../components/body/body.css";
import "../../components/sidebar/sidebar.css";

export default function Dashboard() {
  return (
    <div className="nav">
      <Link to="/admin"><button className="admin">
          Admin
      </button></Link>
      <div className="site">
        <Body />
        <Sidebar />
    </div>
    </div>
  );
}
