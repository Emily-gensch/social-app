import React from "react";
import { useState } from "react";
import "./public-events.css";
import flyer from "../../../assets/cultural_flyer.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import mysql connection
/*
var config = require("../../../database.js");
var connection = config.connection;
*/
// select public events from table of events
/*
const selectQuery =
  "SELECT name, cat, description FROM events WHERE cat = 'Public'";

// query the events and print results
con.query(selectQuery, (err, results, fields) => {
  if (err) {
    console.error("Error selcting events: ", err.message);
    return;
  }

  results.forEach((event) => {
    console.log("Name:", event.name);
    console.log("Category:", event.cat);
  });
});
*/

const data = [
  {
    name: "Cultural Event",
    img: { flyer },
    date: "October 12, 2024",
  },
  {
    name: "Gardening Event",
    img: { flyer },
    date: "October 30, 2024",
  },
  {
    name: "Sporting Event",
    img: { flyer },
    date: "October 20, 2024",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
};

const PublicEvents = () => {
  return (
    <div className="w-3/4 m-auto">
      <h3>Public Events</h3>
      <div className="mt-10">
        <Slider {...settings}>
          {data.map((d) => (
            <div className="bg-white h-[400px] text-black rounded-xl /*shadow-[5px_5px_var(--redColor)]*/ "> 
              <div className="h-56 rounded-t-xl bg-#CD374F flex justify-center items-center">
                <img src={flyer} alt="" className="h-44 w-44 rounded-md" />
              </div>

              <div className="flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-xl font-semibold">{d.name}</p>
                <p>{d.date}</p>
                <button className="bg-[#CD374F] text-white text-lg px-6 py-1 rounded xl">
                  Details
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PublicEvents;
