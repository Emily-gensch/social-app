import React, { useState } from "react";
import "./login-box.css";

export default function LogInBox() {
    
    const [action, setAction] = useState("Sign Up");

    return (
       <div className="login-page">
            <div className="header">
                <div className="text">{action}</div>
                <div className="inputs">
                    <div className="input">
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Password" />
                    </div>
                </div>
                {action==="Sign Up" ? <div></div> : <div className="forgot-password"><span>Forgot Password?</span></div>}
                <div className="submit-container">
                    <div className={action==="Sign Up" ? "submit gray" : "submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
                    <div className={action==="Login" ? "submit gray" : "submit"} onClick={()=>{setAction("Login")}}>Login</div>
                </div>
            </div>
        </div>
    )
}
