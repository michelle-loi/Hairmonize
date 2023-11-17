import React from "react";
import { Link } from "react-router-dom";
import "./login.css"
import { FaUser, FaLock } from "react-icons/fa";

const login = () => {
    return(
        <div className="loginPage">
            <div className="container min-vh-100 align-items-center d-flex justify-content-center">
                <form className="login">
                    <h1>Sign In</h1>

                    {/* Email field */}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text icon">
                                <FaUser />
                            </span>
                        </div>
                        <input required type="text"  placeholder="Email" className="form-control"/>
                    </div>

                    {/* Password field */}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text icon">
                                <FaLock />
                            </span>
                        </div>
                        <input required type="password" placeholder="Password" className="form-control"/>
                    </div>

                    {/* Sign in button */}
                    <div className="signInBut">
                        <button className="btn btn-primary">Sign In</button>
                    </div>

                    {/* Register */}
                    <div className="register-link">
                        <p>Don't have an account? <Link to="/registration">Register here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default login