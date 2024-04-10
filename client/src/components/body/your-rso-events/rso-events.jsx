import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./rso-events.css";
import flyer from "../../../assets/cultural_flyer.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
};

export default function RSOEvents() {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("currentUser")).userid
  );

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("currentUser")).userid);
    console.log("found user id: ", userId);

    const fetchRsoEvents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/yourrsoevents/${userId}`
        );
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRsoEvents();
  }, []);

  console.log(events);

  return (
    <div className="w-3/4 m-auto">
      <h3 className="public-header">Your RSO Events</h3>
      <div className="mt-5">
        <Slider {...settings}>
          {events.map((d) => (
            <div className="bg-white h-[400px] text-black rounded-xl shadow-[5px_5px_var(--redColor)] ">
              <div className="h-56 rounded-t-xl bg-#CD374F flex justify-center items-center">
                <img src={flyer} alt="" className="h-44 w-44 rounded-md" />
              </div>

              <div className="flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-xl font-semibold">{d.name}</p>
                <p>{d.datetime}</p>
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
}
