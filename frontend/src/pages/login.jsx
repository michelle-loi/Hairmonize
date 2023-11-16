import React from "react";
import { Link } from "react-router-dom";
import "./login.css"

const login = () => {
    return(
        <div className="container min-vh-100 align-items-center d-flex justify-content-center">
            <form className="login">
                <h1>Sign In</h1>
                <div className="mb-3">
                    <input type="email"  placeholder="Enter Email" className="form-control"/>
                </div>

                <div className="mb-3">
                    <input type="password" placeholder="Enter Password" className="form-control"/>
                </div>

                <div className="signInBut">
                    <button className="btn btn-primary">Sign In</button>
                </div>

                <div className="register-link">
                    <p>Don't have an account? <Link to="/registration">Register here</Link></p>
                </div>

            </form>
        </div>
    )
}

export default login