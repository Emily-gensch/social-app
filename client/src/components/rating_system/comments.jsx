import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddComment from "../rating_system/add-comment";
import "./comments.css";

const Comments = ({ event }) => {
  const [comments, setComments] = useState([]);
  const userId = JSON.parse(localStorage.getItem("currentUser")).userid;
  const [editComment, setEditComment] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [comment, setComment] = useState({
    userid: "",
    username: "",
    eventid: "",
    comment: "",
    rating: 0,
  });
  const [editModes, setEditModes] = useState({});

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/comments/${event.id}`);
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

  const updateEdit = (e) => {
    setEditedComment(e.target.value);
    setComment((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleEdit = async (d) => {
    console.log("previous", comment);
    console.log("updated", editedComment);
    try {
      await axios.put(`http://localhost:8800/comments/${d.commentid}`, comment);
      const updatedComments = comments.map((comment) => {
        if (comment.commentid === d.commentid) {
          return { ...comment, comment: editedComment };
        }
        return comment;
      });
      setComments(updatedComments);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
    setEditComment(false);
  };

  const handleDelete = async (d) => {
    try {
      await axios.delete(`http://localhost:8800/comments/${d.commentid}`, {
        commentid: d.commentid,
      });
      setComments(
        comments.filter((comment) => comment.commentid !== d.commentid)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="displayComments">
      <h1 className="all-comments">All Comments </h1>
      {comments.map((d) => (
        <div className="per-comment">
          <div className="comment-content">
            <p className="username-comment">{d.username}</p>
            <p>{d.comment}</p>
            <p className="rating-comment">{d.rating}/5 Stars</p>
          </div>
          {checkCommentOwnership(d) === true ? (
            <div>
              <div className="um">
                <div className="edit">
                  <button
                    className="edit-button"
                    onClick={() =>
                      setEditModes((prev) => ({ ...prev, [d.commentid]: true }))
                    }
                  >
                    Edit Comment
                  </button>
                </div>
                <div className="delete">
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(d)}
                  >
                    Delete Comment
                  </button>
                </div>
              </div>
              <div>
                {editModes[d.commentid] && (
                  <div className="editing">
                    <input
                      className="comment-text-edit"
                      rows={5}
                      type="text"
                      placeholder="Edit comment here..."
                      name="comment"
                      class="new-comment"
                      onChange={updateEdit}
                    />

                    <button
                      className="activate-edit"
                      onClick={() => handleEdit(d)}
                    >
                      Submit Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p></p>
          )}
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
