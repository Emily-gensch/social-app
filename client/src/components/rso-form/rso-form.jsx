import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-datetime-picker/dist/DateTimePicker.css";
import "./rso-form.css"

export default function RsoForm() {
  // constants
  const [rso, setRso] = useState({
    rso_name: "",
    owner: 0,
  });

  const [user, setUser] = useState({
    username: "",
    university: "",
    email: "",
    password: "",
    admin: 1,
  });

  const [clubAdmin, setClubAdmin] = useState(true);
  const [userId, setUserId] = useState("");
  const [userExists, setUserExists] = useState("");
  const [submitFailed, setSubmitFailed] = useState(false);
  const [currentIsAdmin, setCurrentIsAdmin] = useState(false);
  const [numEmails, setNumEmails] = useState(4);
  const [emailToAdd, setEmailToAdd] = useState("");
  const [error, setError] = useState(false);
  const [rsoId, setRsoId] = useState(0);
  const [names, setNames] = useState([]);
  const navigate = useNavigate();

  // executes when rso name is filled in
  const handleChange = (e) => {
    console.log("insie handleChange, e.target.value: ", e.target.value);
    setRso((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // executes when new member email is input
  const handleAddChange = (event) => {
    setEmailToAdd(event.target.value);
  };

  // executes on submit
  const handleClick = async (e) => {
    e.preventDefault();
    if (userExists === "User exists.") {
      setSubmitFailed(false);
      try {
        console.log("handling submit, this is userId sending to db:", userId);
        // sets admin to 1 for the chosen admin
        setUser((prev) => ({ ...prev, admin: 1 }));
        await axios.put(`http://localhost:8800/users/${userId}`, user);

        // create rso
        console.log("posting rso", rso);
        const res = await axios.post("http://localhost:8800/rsos", rso);
        console.log("rso id", res);
        setRsoId(res.data.rsoid);

        console.log("names", names);

        // add members
        for (let i = 0; i < names.length; i++) {
          const response = await axios.post("http://localhost:8800/useremail", {
            email: names[i],
          });

          console.log(
            "RACHEL I AM HERE line 77!!!!!!!",
            response.data.user.userid
          );
          setUserId(response.data.user.userid);

          console.log("sending this userId: ", userId);
          console.log("sending rsoId: ", rsoId);

          await axios.post("http://localhost:8800/rsomembers", {
            userid: userId,
            rsoid: rso.rsoid,
          });
        }

        /*
        await axios.put("http://localhost:8800/users/", {
          username: userData.data.username,
          university: userData.data.university,
          email: userData.data.email,
          password: userData.data.password,
          admin: 1,
        });
        */

        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        setError(true);
      }
    } else {
      setSubmitFailed(true);
    }
  };

  // executes when admin email is inputted
  const handleNewAdmin = async (e) => {
    e.preventDefault();
    console.log("given email:", e.target.value);
    const email = e.target.value;
    try {
      const response = await axios.post("http://localhost:8800/useremail", {
        email: email,
      });
      if (response.data.message === "Unregistered user.") {
        setUserExists("Unregistered user.");
      } else {
        setUserExists("User exists.");
        console.log("RACHEL I AM HERE!!!!!!!", response.data.user.userid);
        setUserId(response.data.user.userid);
        console.log("setUserId: ", userId);
        setRso((prev) => ({ ...prev, owner: userId }));
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  // executes when yes
  const handleCurrentIsAdmin = async (e) => {
    e.preventDefault();
    setClubAdmin(true);
    setUserExists("User exists.");
    setCurrentIsAdmin(true);

    const current = JSON.parse(localStorage.getItem("currentUser")).userid;
    setUserId(current);
    console.log("handlecurrent userid:", userId);
    setRso((prev) => ({ ...prev, owner: userId }));
    console.log("current rso", rso);
  };

  // executes when add email is clicked
  const addEmail = () => {
    setNumEmails(numEmails + 1);
  };

  const addToList = () => {
    console.log("email: ", emailToAdd);
    setNames((prev) => [...prev, emailToAdd]);
  };

  return (
    
    <div className="rso-form">
      <div className="create-title">Enter Name of the RSO</div> 

      <div className="club-name">
        <div className="input-mem">
          <input
            type="text"
            name="rso_name"
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="add-members">
        <div className="create-title">Enter the members of your club:</div>

        <div className="input-stuff">
          {[...Array(numEmails)].map((_, index) => (
            <div key={index}>
              <div className="input-mem">
                <input
                  type="text"
                  name={`newemail #${index + 1}`}
                  placeholder={`Email #${index + 1}`}
                  onChange={handleAddChange}
                />

                <button className="add-button" onClick={addToList}>
                  Add
                </button>

              </div>
            </div>
          ))}

          <button className="add-email" onClick={addEmail}>
            Add Additional Member
          </button>

          <div className="choose-admin">
            <div className="create-title">Are you the admin of this club?</div>

            <button className="yes" onClick={handleCurrentIsAdmin}>
              Yes
            </button>

            <button className="no" onClick={() => setClubAdmin(false)}>
              No
            </button>

            {clubAdmin === true ? (
              <div></div>
            ) : (
              <div className="no-condition">
                <h1>Enter the admin's email:</h1>
                <div className="input">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleNewAdmin}
                  />
                </div>
              </div>
            )}
          </div>

          <button className="submit-rso-form" onClick={handleClick}>
            Submit
          </button>

          {submitFailed === false ? (
            <div></div>
          ) : (
            <div className="failed-submit">Failed to Submit</div>
          )}

          {currentIsAdmin === false ? (
            <div className="exists">{userExists}</div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
