import React from "react";
import ApprovalForm from "../../components/superadmin/approval-form";
import { Link } from "react-router-dom";

export default function SuperAdmin() {
  return (
    <div className="nav">
      <Link to="/dashboard">
        <button className="Dashboard">Dashboard</button>
      </Link>
      <div className="main-content">
        <h1 className="title">Super Admin Page</h1>
        <ApprovalForm />
      </div>
    </div>
  );
}
