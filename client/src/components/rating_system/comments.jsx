import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddComment from "../rating_system/add-comment";

const Comments = ({ event }) => {
  const [comments, setComments] = useState([]);
  const userId = JSON.parse(localStorage.getItem("currentUser")).userid;

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/comments/${event.id}`);
      console.log("res.data: ", res.data);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkCommentOwnership = (comment) => {
    if (comment.userid === userId) {
      return true;
    }
    return false;
  };

  const handleCommentAdded = () => {
    fetchComments();
  };

  const handleEdit = () => {
    console.log("editing the comment");
  };

  const handleDelete = () => {
    console.log("deleting the comment");
  };

  return (
    <div className="displayComments">
      <h1>All Comments </h1>
      {comments.map((d) => (
        <div className="per-comment">
          {checkCommentOwnership(d) === true ? (
            <div>
              <div className="um">
                <div className="edit-button">
                  <button onClick={handleEdit}>Edit Comment</button>
                </div>
                <div className="delete-button">
                  <button onClick={handleDelete}>Delete Comment</button>
                </div>
              </div>
            </div>
          ) : (
            <p>Empty</p>
          )}

          <div className="comment-content">
            <p>{d.username}</p>
            <p>{d.comment}</p>
            <p>{d.rating}</p>
          </div>
        </div>
      ))}
      <AddComment
        userId={userId}
        event={event}
        onCommentAdded={handleCommentAdded}
      />
    </div>
  );
};

export default Comments;
