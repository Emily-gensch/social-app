import React, { useState } from "react";
import {Link} from "react-router-dom";
import PublicEvents from "../../components/body/public-events/public-events";
import LogIn from "../../components/login-box/login-box";
import "./home.css";

export default function Home() {
  const loc = "University of Central Florida";

  return (
    <>
      <div className="home-container">
        <div className="heading">
          <span className="main">EventCo: </span>
          <span className="subheading">A University Event Website</span> 
          <div className="desc">
            Welcome to EventCo! Showing events for <span className="underline2">{loc}</span>
          </div>
        </div>
      </div>

      <div className="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#CD374F" fill-opacity="1" d="M0,64L40,58.7C80,53,160,43,240,32C320,21,400,11,480,26.7C560,43,640,85,720,112C800,139,880,149,960,133.3C1040,117,1120,75,1200,58.7C1280,43,1360,53,1400,58.7L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
        </svg>
      </div>

      <div className="content">
        <PublicEvents/>
        <div className="join">
          Join our site for access to private and RSO-created events!
        </div>
        <div className="button-container">
          <div className="login">
            <LogIn />
          </div>
          </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
      <path fill="#CD374F" fill-opacity="1" d="M0,0L48,26.7C96,53,192,107,288,128C384,149,480,139,576,112C672,85,768,43,864,32C960,21,1056,43,1152,42.7C1248,43,1344,21,1392,10.7L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>

    </>
  )
}
