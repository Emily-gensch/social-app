import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageDisplay = ({ eventId }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Fetch the image URL from the server based on the eventId
    axios
      .get(`http://localhost:8800/event/${eventId}/cover`)
      .then((response) => {
        setImageUrl(response.data.cover);
        console.log(response.data.cover);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });

    // extrapolate the correct url
    const uploadsIndex = imageUrl.indexOf("\\uploads\\");
    const relativeUrl = imageUrl.substring(uploadsIndex);
    setImageUrl(relativeUrl);
    console.log("HERE", relativeUrl);
  }, [eventId]);

  // display the cover photo
  return <div>{imageUrl && <img src={imageUrl} alt="Event Cover" />}</div>;
};

export default ImageDisplay;
