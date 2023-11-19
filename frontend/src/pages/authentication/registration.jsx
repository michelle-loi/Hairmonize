import React, {useState} from "react";
import "./registration.css"
import {Link, useNavigate} from "react-router-dom";
import { FaUser,  FaEnvelope, FaPhone, FaLock} from "react-icons/fa";
import axios from "axios";

const Registration = () => {
    // states to gather input
    const [inputs, setInputs] = useState({
        Username:"",
        password:"",
    })

    // error handling message function
    const [error, setError] = useState(null)

    // success message function
    const [success, setSuccess] = useState(null)

    // count down timer message
    const [time, setTime] = useState(null)

    // create a navigate function from react dom
    const navigate = useNavigate()

    // function to get input
    const change = e => {
        setInputs(prev=> ({...prev, [e.target.name]: e.target.value}))
    }

    // function to allow submission of the username and password
    const Submit = async e => {
        // this prevents the fields from resetting
        e.preventDefault()
        // try catch so if there are any errors it will be caught and dealt with appropriately. Most of the time
        // errors will be users trying to register an already existing username
        try{
            // for any submissions send the data to our auth register function
            const response = await axios.post("/auth/register", inputs)


            // Upon successful creation of a username set success message to be displayed - which is the server message
            // saying account is successfully created
            setSuccess(response.data);


            /* below is the count down logic, where upon successful creation of an account it will count down before
            * automatically rerouting the user back to the login page.*/

            // make countdown 5 seconds
            let countdown = 5;

            // set count down timer message
            setTime(`Redirecting to login page in ${countdown} seconds...`)

            // start count down
            const countdownInterval = setInterval(() => {
                countdown--;

                // update count down timer
                setTime(`Redirecting to login page in ${countdown} seconds...`)

                // Check if the user has manually gone back, if they have no need to count down anymore and end the loop
                // and stop the countdown
                window.onpopstate = function (event) {
                    clearInterval(countdownInterval);
                };

                // Check if the countdown has reached zero, if it has stop the count down
                if (countdown <= 0) {
                    clearInterval(countdownInterval);

                    // After the countdown, navigate to the login page
                    navigate("/");
                }
            }, 1000); // Update every second


        }catch (error){
            setError(error.response.data);
        }
    }



    return(
        <div className="registerPage">
            <div className="container min-vh-100 align-items-center d-flex justify-content-center">

                <div className="registerRow row">

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

                            {/*Submit button, after an account has been successfully created disable the button*/}

                            {!success && (
                            <div className="submitInfo">
                                <button className="btn btn-primary" onClick={Submit}>Submit</button>
                            </div>
                                )}

                            {/*Error message, most of the time this will be for duplicate accounts*/}
                            <div className="submitErrorMSG">
                                {error && <p>Error: {error}</p>}
                            </div>

                            {/*Success message, to be displayed upon successful creation of the account*/}
                            <div className="submitSuccessMSG">
                                {success && <p>{success}</p>}
                            </div>

                            {/*Count down timer message, to be displayed upon successful creation of the account*/}
                            <div className="submitSuccessCountDownTimer">
                                {time && <p>{time}</p>}
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