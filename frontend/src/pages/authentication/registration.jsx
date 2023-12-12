import React, {useState, useEffect} from "react";
import "./registration.css"
import {Link, useNavigate} from "react-router-dom";
import {FaUser, FaEnvelope, FaPhone, FaLock} from "react-icons/fa";
import axios from "axios";
import {Dropdown} from "react-bootstrap";

const Registration = () => {
    // states to gather input
    // for account table
    const [inputs, setInputs] = useState({
        Username: "",
        Password: "",
    })

    // for client table
    const [clientData, setClientData] = useState({
        FName: "",
        MName: "",
        LName: "",
        EID: "",
    })

    // for phone number and email multivariables
    const [clientEmailPhone, setClientEmailPhone] = useState({
        CID: "",
        Email: "",
        Phone: "",
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

    // for account table
    const change = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    // for client table
    const clientDataChange = e => {
        setClientData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    // for email and phone tables
    const clientEmailPhoneChange = e => {
        setClientEmailPhone(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    // Store the countdown interval ID in a ref this allows for us to stop the count down when the user moves away from
    // the registration page manually
    const countdownIntervalRef = React.useRef();

    // to get stylists from the database
    const [stylists, setStylists] = useState([])

    // to get who the user selects as their stylist
    const [selectedEID, setSelectedEID] = useState(null)

    // get the stylist name to display
    const [selectedStylist, setSelectedStylist] = useState(null);

    // Get stylists for dropdown menu
    useEffect(() => {
        const fetchStylists = async () => {
            try {
                const res = await axios.get("/registration/getEmployeeNameID")
                setStylists(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchStylists();
    }, []);

    // get the selected stylists eid
    const selectStylist = (EID) => {

        // find the matching stylist name
        const selectedStylist = stylists.find((stylist) => stylist.EID === EID);
        setSelectedStylist(selectedStylist);

        // set their eid
        setSelectedEID(EID);
    };


    // function to allow submission of the username and password
    const Submit = async e => {
        // this prevents the fields from resetting
        e.preventDefault()

        // try catch so if there are any errors it will be caught and dealt with appropriately. Most of the time
        // errors will be users trying to register an already existing username
        try {
            // for any submissions send the data to our auth register function
            const response = await axios.post("/auth/register", inputs)

            // client table data
            const cData = {
                FName: clientData.FName,
                MName: clientData.MName,
                LName: clientData.LName,
                EID: selectedEID,
            }
            const clientRes = await axios.post("/viewClient/addClient", cData)

            // get the CID for the new client
            const newCID = clientRes.data.cid;

            // insert their phone number and emails
            const clientEmailRes = await axios.post(`/viewClient/addEmail`, {
                cid: newCID,
                email: clientEmailPhone.Email
            })
            const clientPhoneRes = await axios.post(`/viewClient/addPhone`, {
                cid: newCID,
                phone: clientEmailPhone.Phone
            })

            // Upon successful creation of a username set success message to be displayed - which is the server message
            // saying account is successfully created
            setSuccess(response.data);

            // success occurs clear all inputs
            setInputs({
                Username: "",
                Password: "",
            })

            setClientData({
                FName: "",
                MName: "",
                LName: "",
                EID: "",
            })

            // for phone number and email multivariables
            setClientEmailPhone({
                CID: "",
                Email: "",
                Phone: "",
            })

            /* below is the count down logic, where upon successful creation of an account it will count down before
            * automatically rerouting the user back to the login page.*/

            // make countdown 5 seconds
            let countdown = 5;

            // set count down timer message
            setTime(`Redirecting to login page in ${countdown} seconds...`)

            // start count down
            countdownIntervalRef.current = setInterval(() => {
                countdown--;

                // update count down timer
                setTime(`Redirecting to login page in ${countdown} seconds...`)


                // Check if the countdown has reached zero, if it has stop the count down
                if (countdown <= 0) {
                    clearInterval(countdownIntervalRef.current);

                    // After the countdown, navigate to the login page
                    navigate("/");
                }
            }, 1000); // Update every second


        } catch (error) {
            setError(error.response.data);
        }
    }

    // Use useEffect to clean up the interval when the component is unmounted - allowing us to stop the countdown
    // if the user navigated away.
    useEffect(() => {
        return () => {
            clearInterval(countdownIntervalRef.current);
        };
    }, []);


    return (
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
                                        <FaUser/>
                                    </span>
                                </div>

                                {/*Field*/}
                                <input
                                    required type="text"
                                    placeholder="First name"
                                    className="form-control"
                                    name="FName"
                                    onChange={clientDataChange}

                                />

                            </div>

                            {/* Middle name */}
                            <div className="input-group mb-3">

                                {/*Icon*/}
                                <div className="input-group-prepend">
                                    <span className="input-group-text icon">
                                        <FaUser/>
                                    </span>
                                </div>

                                {/*Field*/}
                                <input
                                    type="text"
                                    placeholder="Middle name (optional)"
                                    className="form-control"
                                    name="MName"
                                    onChange={clientDataChange}
                                />

                            </div>

                            {/* Last name */}
                            <div className="input-group mb-3">

                                {/*Icon*/}
                                <div className="input-group-prepend">
                                    <span className="input-group-text icon">
                                        <FaUser/>
                                    </span>
                                </div>

                                {/*Field*/}
                                <input
                                    required type="text"
                                    placeholder="Last name"
                                    className="form-control"
                                    name="LName"
                                    onChange={clientDataChange}
                                />

                            </div>

                            {/* Email */}
                            <div className="input-group mb-3">

                                {/*Icon*/}
                                <div className="input-group-prepend">
                                    <span className="input-group-text icon">
                                        <FaEnvelope/>
                                    </span>
                                </div>

                                {/*Field*/}
                                <input
                                    required
                                    type="email"
                                    placeholder="Email address"
                                    className="form-control"
                                    name="Email"
                                    onChange={clientEmailPhoneChange}
                                />

                            </div>

                            {/* Phone */}
                            <div className="input-group mb-3">

                                {/*Icon*/}
                                <div className="input-group-prepend">
                                    <span className="input-group-text icon">
                                        <FaPhone/>
                                    </span>
                                </div>

                                {/*Regex for telephone number (###) ###-####*/}
                                <input
                                    type="phone"
                                    placeholder="Phone number"
                                    className="form-control"
                                    name="Phone"
                                    onChange={clientEmailPhoneChange}
                                />

                            </div>
                        </form>
                    </div>

                    <div className="col">
                        <h1>Select Your Stylist</h1>
                        <Dropdown>
                            <Dropdown.Toggle className="stylist-dropdown-selector" variant="primary"
                                             id="stylist-dropdown">
                                Stylists
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="stylist-dropdown-selections">
                                {stylists.map(stylist => (
                                    <Dropdown.Item
                                        key={stylist.EID}
                                        onClick={() => selectStylist(stylist.EID)}
                                    >
                                        {`${stylist.FName} ${stylist.LName}`}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        {selectedStylist && (
                            <div className="selected-stylist">
                                <h2>My Stylist: {`${selectedStylist.FName} ${selectedStylist.LName}`}</h2>
                            </div>
                        )}
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
                                        <FaUser/>
                                    </span>
                                </div>

                                {/*Field*/}
                                <input required type="username" placeholder="Username" className="form-control"
                                       name='Username' onChange={change}/>

                            </div>

                            {/*Password*/}
                            <div className="input-group mb-3">

                                {/*Icon*/}
                                <div className="input-group-prepend">
                                    <span className="input-group-text icon">
                                        <FaLock/>
                                    </span>
                                </div>

                                {/*Field*/}
                                <input required type="password" placeholder="Password" className="form-control"
                                       name='Password' onChange={change}/>

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