import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";

const dateTime = () => {
  return (
    <DateTimePicker
      className="date-time"
      onChange={(value) => {
        const formattedDateTime = new Date(value)
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
        const syntheticEvent = {
          target: { name: "datetime", value: formattedDateTime },
        };
        handleChange(syntheticEvent);
      }}
    />
  );
};

export default dateTime;
