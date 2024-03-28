import React, { useState } from "react";
import LogInBox from "../login-box/login-box";
import "./login-page.css";

export default function LogIn() {
    return (
        <div className="site">
            { /* <div className="login-title">
                Welcome to EventCo!
    </div> */ }
            <LogInBox />
        </div>
    )
}
