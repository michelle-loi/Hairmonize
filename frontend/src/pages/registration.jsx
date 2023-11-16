import React from "react";
import "./registration.css"
import {Link} from "react-router-dom";
const registration = () => {
    return(
        <div className="container min-vh-100 align-items-center d-flex justify-content-center">
            <form className="register">
                <h1>Register</h1>
                <div className="mb-3">
                    <input type="fname"  placeholder="First name" className="form-control"/>
                </div>

                <div className="mb-3">
                    <input type="mname" placeholder="Middle name (optional)" className="form-control"/>
                </div>

                <div className="mb-3">
                    <input type="lname" placeholder="Last name" className="form-control"/>
                </div>

                <div className="mb-3">
                    <input type="email" placeholder="Email address" className="form-control"/>
                </div>

                <div className="mb-3">
                    <input type="phone" placeholder="Phone number" className="form-control"/>
                </div>

                <div className="mb-3">
                    <input type="username" placeholder="Username" className="form-control"/>
                </div>

                <div className="mb-3">
                    <input type="password" placeholder="Password" className="form-control"/>
                </div>

                <div className="submitInfo">
                    <button className="btn btn-primary">Submit</button>
                </div>

                <div className="login-link">
                    <p>Already have an account? <Link to="/">Return to login page</Link></p>
                </div>
            </form>
        </div>
    )
}

export default registration