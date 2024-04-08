import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login-box.css";
import axios from "axios";

export default function LogInBox() {
  const [user, setUser] = useState({
    username: "",
    university: "",
    email: "",
    password: "",
    admin: false,
  });

  const [error, setError] = useState(false);

  const [logInState, setLogInState] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/users", user);
      setAction("Login");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/login", {
        email: user.email, 
        password: user.password
      });
      if (response.data.message==="Incorrect email/password.") {
        setLogInState("Incorrect email/password.");
      } else {
        const userData = response.data.user;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        const userId = userData.userid;
        navigate("/dashboard");
      }
      console.log(response.data);
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

        {action === "Sign Up" ? (
          <div className="buffer"></div>
        ) : (
          <div></div>
        )}

        <div className="inputs">
          {action === "Login" ? (
            <div></div>
          ) : (
            <div className="input">
              <input
                type="text"
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
                type="text"
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
          <div></div>
        ) : (
          <div className="forgot-password">
            <span>Forgot Password?</span>
          </div>
        )}

        <div className="buffer"></div>

        <button className="submit-button" onClick={action==="Sign Up" ? handleSignUp : handleLogin}>
          {action === "Sign Up" ? "Sign Up" : "Login"}
        </button>

        <div className="buffer"></div>

        <div className="incorrect">{logInState}</div>
        
      </div>

    </div>
  );
}
