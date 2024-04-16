import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../body/body.css";

const UniversityForm = () => {
  // the university information
  const [university, setUniversity] = useState({
    id: 1,
    name: "",
    loc: "",
    description: "",
    num_of_students: "",
    cover: "",
  });

  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUniversity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/university", university);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <input
        type="text"
        placeholder="University Name"
        name="name"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="University Location"
        name="loc"
        onChange={handleChange}
      />

      <input
        type="text"
        placeholder="University Description"
        name="description"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Number of Students"
        name="num_of_students"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Cover Image"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update University</button>
    </div>
  );
};

export default UniversityForm;
