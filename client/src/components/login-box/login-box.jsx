import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login-box.css";
import axios from "axios";

export default function LogInBox() {
  const [user, setUser] = useState({
    username: "",
    university: "",
    email: "",
    admin: false,
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/users", user);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const [action, setAction] = useState("Sign Up");
  const [submit, setSubmit] = useState("Submit");

  return (
    <div className="login-page">
      <div className="header">
        <div className="submit-container">
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Sign Up");
            }}
          >
            Sign Up
          </div>
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Login");
            }}
          >
            Login
          </div>
        </div>
        <div className="inputs">
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input">
              <input
                type="name"
                name="username"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
          )}
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input">
              <input
                type="university"
                name="university"
                placeholder="University"
                onChange={handleChange}
              />
            </div>
          )}
          <div className="input">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
        </div>
        {action === "Sign Up" ? (
          <div className="buffer"></div>
        ) : (
          <div className="forgot-password">
            <span>Forgot Password?</span>
          </div>
        )}
        <div className="buffer"></div>
        <Link to="/dashboard">
          <button className="submit-button" onClick={handleClick}>
            Submit
          </button>
        </Link>
        {error && "Something went wrong!"}
        <div className="buffer"></div>
      </div>
    </div>
  );
}
