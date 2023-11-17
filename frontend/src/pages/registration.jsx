import React from "react";
import "./registration.css"
import {Link} from "react-router-dom";
import { FaUser,  FaEnvelope, FaPhone, FaLock} from "react-icons/fa";

const registration = () => {
    return(
        <div className="container min-vh-100 align-items-center d-flex justify-content-center">

            <div className="row">

                {/* Column for information */}
                <div className="col">
                    <form className="information">
                        <h1>Information</h1>

                        {/* First name */}
                        <div className="input-group mb-3">

                            {/*Icon*/}
                            <div className="input-group-prepend">
                                <span className="input-group-text icon">
                                    <FaUser />
                                </span>
                            </div>

                            {/*Field*/}
                            <input required type="text"  placeholder="First name" className="form-control"/>

                        </div>

                        {/* Middle name */}
                        <div className="input-group mb-3">

                            {/*Icon*/}
                            <div className="input-group-prepend">
                                <span className="input-group-text icon">
                                    <FaUser />
                                </span>
                            </div>

                            {/*Field*/}
                            <input type="text" placeholder="Middle name (optional)" className="form-control"/>

                        </div>

                        {/* Last name */}
                        <div className="input-group mb-3">

                            {/*Icon*/}
                            <div className="input-group-prepend">
                                <span className="input-group-text icon">
                                    <FaUser />
                                </span>
                            </div>

                            {/*Field*/}
                            <input required type="text" placeholder="Last name" className="form-control"/>

                        </div>

                        {/* Email */}
                        <div className="input-group mb-3">

                            {/*Icon*/}
                            <div className="input-group-prepend">
                                <span className="input-group-text icon">
                                    <FaEnvelope />
                                </span>
                            </div>

                            {/*Field*/}
                            <input required type="email" placeholder="Email address" className="form-control"/>

                        </div>

                        {/* Phone */}
                        <div className="input-group mb-3">

                            {/*Icon*/}
                            <div className="input-group-prepend">
                                <span className="input-group-text icon">
                                    <FaPhone />
                                </span>
                            </div>

                            {/*Regex for telephone number (###) ###-####*/}
                            <input type="tel" placeholder="Phone number (###) ###-####"  pattern="^\(\d{3}\) \d{3}-\d{4}$" className="form-control"/>

                        </div>
                    </form>
                </div>

                {/* Column for Account */}
                <div className="col">
                    <form className="account">
                        <h1>Account</h1>

                        {/*Username*/}
                        <div className="input-group mb-3">

                            {/*Icon*/}
                            <div className="input-group-prepend">
                                <span className="input-group-text icon">
                                    <FaUser />
                                </span>
                            </div>

                            {/*Field*/}
                            <input required type="username" placeholder="Username" className="form-control"/>

                        </div>

                        {/*Password*/}
                        <div className="input-group mb-3">

                            {/*Icon*/}
                            <div className="input-group-prepend">
                                <span className="input-group-text icon">
                                    <FaLock />
                                </span>
                            </div>

                            {/*Field*/}
                            <input required type="password" placeholder="Password" className="form-control"/>

                        </div>

                        {/*Submit*/}
                        <div className="submitInfo">
                            <button className="btn btn-primary">Submit</button>
                        </div>

                        {/*Return*/}
                        <div className="login-link">
                            <p>Already have an account? <Link to="/">Return to login page</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default registration