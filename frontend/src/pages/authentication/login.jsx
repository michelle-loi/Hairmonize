import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./login.css"
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import {AuthContext} from "../../context/authContext";

const Login = () => {

    // states to gather input
    const [inputs, setInputs] = useState({
        Username:"",
        Password:"",
    })

    // error handling message function
    const [error, setError] = useState(null)

    // create a navigate function from react dom
    const navigate = useNavigate()

    // current user for the login
    const {login} = useContext(AuthContext);

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
            // calling our login function in the authContext.js file
            const user = await login(inputs)



            // navigate to the appropriate page depending on login credentials
            if (user && user.AccountType === 0) {
                navigate("/stylistHome");

            }else if (user && user.AccountType === 1) {
                navigate("/clientHome");

            }else if (user && user.AccountType === 2) {
                navigate("/adminHome");
            }

        }catch (error){
            setError(error.response.data);
        }

    }




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
                        <input required type="text"  placeholder="Email" className="form-control" name = 'Username' onChange={change}/>
                    </div>

                    {/* Password field */}
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text icon">
                                <FaLock />
                            </span>
                        </div>
                        <input required type="password" placeholder="Password" className="form-control" name = 'Password' onChange={change}/>
                    </div>

                    {/* Sign in button */}
                    <div className="signInBut">
                        <button className="btn btn-primary" onClick={Submit}>Sign In</button>
                    </div>

                    <div className="loginErrorMSG">
                        {error && <p>Error: {error}</p>}
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

export default Login