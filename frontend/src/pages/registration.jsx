import React, {useState} from "react";
import "./registration.css"
import {Link} from "react-router-dom";
import { FaUser,  FaEnvelope, FaPhone, FaLock} from "react-icons/fa";
import axios from "axios";

const Registration = () => {
    // states to gather input
    const [inputs, setInputs] = useState({
        Username:"",
        password:"",
    })

    // function to get input
    const change = e => {
        setInputs(prev=> ({...prev, [e.target.name]: e.target.value}))
    }

    // function to allow submission of the username and password
    const Submit = async e => {
        // this prevents the fields from resetting
        e.preventDefault()
        // error handle
        try{
            const res = await axios.post("/auth/register", inputs)
            console.log(res)
        }catch (error){
            console.log(error)
        }
    }



    return(
        <div className="registerPage">
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
                                <input required type="username" placeholder="Username" className="form-control" name='Username' onChange={change}/>

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
                                <input required type="password" placeholder="Password" className="form-control" name='password' onChange={change}/>

                            </div>

                            {/*Submit*/}
                            <div className="submitInfo">
                                <button className="btn btn-primary" onClick={Submit}>Submit</button>
                            </div>

                            {/*Return*/}
                            <div className="login-link">
                                <p>Already have an account? <Link to="/">Return to login page</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration