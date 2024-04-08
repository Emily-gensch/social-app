import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";


export default function RsoForm() {
  const [clubAdmin, setClubAdmin] = useState(true);
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

  const [rsoMembers, setRsoMembers] = useState({
    userid: 0,
    rsoid: 0,
  })

  const [userId, setUserId] = useState(""); 

  const [userExists, setUserExists] = useState("");

  const [submitFailed, setSubmitFailed] = useState(false);

  const [yes, setYes] = useState(false);

  const [numEmails, setNumEmails] = useState(4);

  useEffect(() => {
      setRso((prev) => ({ ...prev, owner: userId}));
  }, [clubAdmin, userId], []);
  
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRso((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (userExists==="User exists.") {
      setSubmitFailed(false);
      try {
        handleAddMember(e);
        // **FIX** adds empty admin instead of updating
        const userData = await axios.get(`http://localhost:8800/users/${userId}`);
        await axios.post("http://localhost:8800/users/", {
          username: userData.data.username,
          university: userData.data.university,
          email: userData.data.email,
          password: userData.data.password,
          admin: 1,
        });

        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        setError(true);
      }
    } else {
      setSubmitFailed(true);
    }
  };

  const handleAddMember = async(e) => {
    // **FIX** not properly updating id
    const email = e.target.value;
    const response = await axios.post("http://localhost:8800/useremail", {
        email: email
      });

    setUserId(response.data.user.userid);
    // **FIX** currently creates rso for every member
    const rsoId = await axios.post("http://localhost:8800/rsos", rso);
    await axios.post("http://localhost:8800/rsomembers", {
          userid: userId,
          rsoid: rsoId.data.rsoid,
        });
  }

  const handleNewAdmin = async(e) => {
    e.preventDefault();
    const email = e.target.value;
    try {
      const response = await axios.post("http://localhost:8800/useremail", {
        email: email
      });
      if (response.data.message==="Unregistered user.") {
        setUserExists("Unregistered user.");
      } else {
        setUserExists("User exists.");
        setUserId(response.data.user.userid);
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  const handleCurrentIsAdmin = () => {
    setClubAdmin(true);
    setUserExists("User exists.");
    setYes(true);
    setUserId(JSON.parse(localStorage.getItem('currentUser')).userid);
  }

  const addEmail = () => {
    setNumEmails(numEmails + 1);
  }

  return (

    <div className="rso-form">
      <h1>Create New RSO</h1>

      <div className="club-name">
        <div className="input">
          <input
            type="text"
            name="rso_name"
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="add-members">
        <h1>Enter the members of your club:</h1>

        <div className="input-mem">

          {[...Array(numEmails)].map((_, index) => (
            <div key={index}>
              <input
                type="text"
                name={`newemail${index + 1}`}
                placeholder={`Email #${index + 1}`}
                // add checking for user
              />

              <button className="check" onClick={handleAddMember}>
                Add
              </button>
            </div>
          ))}

          <button className="add-email" onClick={addEmail}>
            Add Email
          </button>
        </div>


      </div>

      <div className="choose-admin">
        <h1>Are you the admin of this club?</h1>

        <button className="yes" onClick={() => handleCurrentIsAdmin()}>
          Yes
        </button>

        <button className="no" onClick={() => setClubAdmin(false)}>
          No
        </button>

        {clubAdmin===true ? <div></div> : <div className="no-condition">
          <h1>Enter the admin's email:</h1>
            <div className="input">
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleNewAdmin}
              />
            </div>

        </div>}

      </div>

      <button className="submit-rso-form" onClick={handleClick}>
        Submit
      </button>

      {submitFailed===false ? <div></div> : <div className="failed-submit">Failed to Submit</div>}

      {yes===false ? <div className="exists">{userExists}</div> : <div></div> }

    </div>
  );
}
