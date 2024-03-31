import React from "react";
import Body from "../../components/body/body";
import Sidebar from "../../components/sidebar/sidebar";
import "../../components/body/body.css";
import "../../components/sidebar/sidebar.css";

export default function Dashboard() {
  return (
    <div className="nav">
        <Body />
        <Sidebar />
    </div>
  );
}
