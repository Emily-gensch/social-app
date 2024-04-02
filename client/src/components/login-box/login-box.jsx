import React, { useState } from "react";
import {Link} from "react-router-dom";
import "./login-box.css";

export default function LogInBox() {
    
    const [action, setAction] = useState("Sign Up");
    const [submit, setSubmit] = useState("Submit");

    return (
       <div className="login-page">
            <div className="header">
                <div className="submit-container">
                    <div className={action==="Sign Up" ? "submit gray" : "submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                    <div className={action==="Login" ? "submit gray" : "submit"} onClick={()=>{setAction("Login")}}>Login</div>
                </div>
                <div className="inputs">
                    {action==="Login" ? <div></div> : <div className="input">
                        <input type="name" placeholder="Name" />
                    </div>}
                    {action==="Login" ? <div></div> : <div className="input">
                        <input type="university" placeholder="University" />
                    </div>}
                    <div className="input">
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Password" />
                    </div>
                </div>
                {action==="Sign Up" ? <div className="buffer"></div> : <div className="forgot-password"><span>Forgot Password?</span></div>}
                <div className="buffer"></div>
                <Link to="/dashboard"><button className="submit-button">
                    Submit
                </button></Link>
                <div className="buffer"></div>
            </div>
        </div>
    )
}
