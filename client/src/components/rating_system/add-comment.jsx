import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddRating from "./rating";

const AddComment = ({ userId, event, onCommentAdded }) => {
  const [error, setError] = useState(false);
  const [thisUsername, setThisUsername] = useState("");
  const [comment, setComment] = useState({
    userid: userId,
    username: "",
    eventid: event.id,
    comment: "",
    rating: 0,
  });
  const defaultRating = localStorage.getItem("starRating");

  useEffect(() => {
    fetchUsername();
    setComment((prev) => ({
      ...prev,
      username: thisUsername,
    }));
  }, [thisUsername]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setComment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUsername = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/users/${userId}`);
      setThisUsername(res.data[0].username);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleClick = async (e) => {
    await fetchUsername();

    e.preventDefault();
    try {
      console.log(comment);
      await axios.post("http://localhost:8800/comments", comment);
      onCommentAdded();
    } catch (err) {
      console.log(err);
      setError(true);
    }

    document.querySelector(".new-comment").value = "";
  };

  // called from inside the rating component when rating is updated
  const handleRatingChange = (newRating) => {
    setComment((prev) => ({
      ...prev,
      rating: newRating,
    }));
  };

  return (
    <div className="form">
      <h1>Add New Comment</h1>
      <textarea
        rows={5}
        type="text"
        placeholder="Insert comment here..."
        name="comment"
        class="new-comment"
        onChange={handleChange}
      />
      <AddRating
        iconSize={25}
        defaultRating={defaultRating}
        comment={comment}
        handleRatingChange={handleRatingChange}
      />
      <button onClick={handleClick}>Add</button>

      {error && "Something went wrong!"}
    </div>
  );
};

export default AddComment;
