import React, {useContext, useEffect, useState} from "react";
import NavigationBar from "../../components/navbar/NavBar";
import {FaEnvelope, FaLock, FaPhone, FaUser} from "react-icons/fa";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {AuthContext} from "../../context/authContext";
import axios from "axios";

// Documentation pages referenced:
// https://react-bootstrap.netlify.app/docs/forms/overview/
// https://react-bootstrap.netlify.app/docs/forms/input-group
// https://react-bootstrap.netlify.app/docs/forms/form-text

const AccountEdit = () => {
    // get the current user from authentication (this will be our user's local data generated from the token)
    const {currentUser} = useContext(AuthContext);

    // some storage variables

    // to store the first name from the employee table
    const [firstName, setFirstName] = useState("");
    // to store the Middle name from the employee table
    const [middleName, setMiddleName] = useState("");
    // to store the Last name from the employee table
    const [lastName, setLastName] = useState("");

    // password
    const [password, setPassword] = useState("");

    // phone number
    const [phoneNumber, setPhoneNumber] = useState("");

    // email
    const [emailAddress, setEmailAddress] = useState("");

    // to ensure that all fields are filled in before the user can submit their changes
    const [formValid, setFormValid] = useState(false);

    // to ensure that all fields are filled in before the user can submit their changes
    const [phoneValid, setPhoneValid] = useState(false);

    // to detect whenever the form is changed
    const [isFormChanged, setIsFormChanged] = useState(false);


    // checks if the fields have been changed
    const handleFieldChange = () => {
        // Set the formChanged flag to true
        setIsFormChanged(true);
    };

    // function to update employee's email in the database
    const updateEmployeeEmail = async () => {
        try {
            await axios.put(`/updateAccount/updateEmployeeEmail/${currentUser.EID}`, {email:emailAddress});
        } catch (err) {
            console.log(err);
        }
    }

    // function to update employee's phone number in the database
    const updateEmployeePhone = async () => {
        try {
            await axios.put(`/updateAccount/updateEmployeePhone/${currentUser.EID}`, {phone:phoneNumber});
        } catch (err) {
            console.log(err);
        }
    }

    // function to update employee's phone number in the database
    const updateEmployee = async () => {
        try {
            await axios.put(`/updateAccount/updateEmployee/${currentUser.EID}`, {FName:firstName, MName:middleName, LName:lastName});
        } catch (err) {
            console.log(err);
        }
    }

    // function to update employee's password in the database
    const updateEmployeePassword = async () => {
        try {
            await axios.put(`/updateAccount/updateEmployeePassword/${currentUser.EID}`, {Password:password});
        } catch (err) {
            console.log(err);
        }
    }


    // function to update cleitn's email in the database
    const updateClientEmail = async () => {
        try {
            await axios.put(`/updateAccount/updateClientEmail/${currentUser.CID}`, {email:emailAddress});
        } catch (err) {
            console.log(err);
        }
    }

    // function to update employee's phone number in the database
    const updateClientPhone = async () => {
        try {
            await axios.put(`/updateAccount/updateClientPhone/${currentUser.CID}`, {phone:phoneNumber});
        } catch (err) {
            console.log(err);
        }
    }

    // function to update employee's phone number in the database
    const updateClient = async () => {
        try {
            await axios.put(`/updateAccount/updateClient/${currentUser.CID}`, {FName:firstName, MName:middleName, LName:lastName});
        } catch (err) {
            console.log(err);
        }
    }

    // function to update employee's password in the database
    const updateClientPassword = async () => {
        try {
            await axios.put(`/updateAccount/updateClientPassword/${currentUser.CID}`, {Password:password});
        } catch (err) {
            console.log(err);
        }
    }


    // function to handle the account save changes, aka upon update clicking save changes it will update the account
    // by default this only works if the fields have been filled out correctly
    const handleSaveChanges = () => {
        // check if account type is 0 which signals employees, if so update employee data
        if (currentUser && currentUser.AccountType === 0) {
            updateEmployeeEmail();
            updateEmployeePhone();
            updateEmployee();

            // update the password only if the field is not empty
            // Check if the password field is not empty, and update the password
            if (password.trim() !== "") {
                updateEmployeePassword();
            }
        }


        // check if account type is 1 which is customer so update customer data
        if (currentUser && currentUser.AccountType === 1) {
            updateClientEmail();
            updateClientPhone();
            updateClient();

            // update the password only if the field is not empty
            // Check if the password field is not empty, and update the password
            if (password.trim() !== "") {
                updateClientPassword();
            }

        }

        // check if account type is 2 which signals admins, if so update admin data
        if (currentUser && currentUser.AccountType === 2) {
            updateEmployeeEmail();
            updateEmployeePhone();
            updateEmployee();

            // update the password only if the field is not empty
            // Check if the password field is not empty, and update the password
            if (password.trim() !== "") {
                updateEmployeePassword();
            }


        }
    };


    useEffect(() => {

        const editAll = async () => {
            try {
                // check if account type is 0 which signals employees, if so fetch employee data
                if (currentUser && currentUser.AccountType === 0) {

                    // create post to the backend to get the employee table (path is indexpath/routes path
                    const res = await axios.post('/viewEmployee/getSpecificEMP', {
                        EID: currentUser.EID
                    });

                    // if there is data set the name
                    if (res.data.length > 0) {
                        setFirstName(res.data[0].FName);
                        setMiddleName(res.data[0].MName);
                        setLastName(res.data[0].LName);
                    }

                    // get phone number

                    // create post to the back end to get the employee's phone number table
                    const res2 = await axios.get(`/viewEmployee/getPhone/${currentUser.EID}`)

                    // if there is data in res 2, set the phone number
                    if (res2.data.length > 0) {
                        setPhoneNumber(res2.data[0].Phone);
                    }


                    // get email address

                    // create post to the back end to get the employee's email table
                    const res3 = await axios.get(`/viewEmployee/getEmail/${currentUser.EID}`)

                    // if there is data in res 3, set the email address
                    if (res3.data.length > 0) {
                        setEmailAddress(res3.data[0].EMAIL);
                    }

                }


                // check if account type is 1 which is customer so fetch customer data
                if (currentUser && currentUser.AccountType === 1) {

                    // create post to the backend to get the employee table
                    const res = await axios.get(`/viewCustomer/getCustomer/${currentUser.CID}`)

                    // if there is data set the name
                    if (res.data.length > 0) {
                        setFirstName(res.data[0].FName);
                        setMiddleName(res.data[0].MName);
                        setLastName(res.data[0].LName);
                    }

                    // get phone number

                    // create post to the back end to get the employee's phone number table
                    const res2 = await axios.get(`/viewCustomer/getCustomerPhone/${currentUser.CID}`)

                    // if there is data in res 2, set the phone number
                    if (res2.data.length > 0) {
                        setPhoneNumber(res2.data[0].Phone);
                    }


                    // get email address

                    // create post to the back end to get the employee's email table
                    const res3 = await axios.get(`/viewCustomer/getCustomerEmail/${currentUser.CID}`)

                    // if there is data in res 3, set the email address
                    if (res3.data.length > 0) {
                        setEmailAddress(res3.data[0].EMAIL);
                    }
                }

                // check if account type is 2 which signals admins, if so fetch admin data
                if (currentUser && currentUser.AccountType === 2) {

                    // create post to the backend to get the employee table
                    const res = await axios.post('/viewEmployee/getSpecificEMP', {
                        EID: currentUser.EID
                    });

                    // if there is data set the name
                    if (res.data.length > 0) {
                        setFirstName(res.data[0].FName);
                        setMiddleName(res.data[0].MName);
                        setLastName(res.data[0].LName);
                    }

                    // get phone number

                    // create post to the back end to get the employee's (in this case the admin who is an employee)
                    // phone number table
                    const res2 = await axios.get(`/viewEmployee/getPhone/${currentUser.EID}`)

                    // if there is data in res 2, set the phone number
                    if (res2.data.length > 0) {
                        setPhoneNumber(res2.data[0].Phone);
                    }


                    // get email address

                    // create post to the back end to get the employee's  (in this case the admin who is an employee) email table
                    const res3 = await axios.get(`/viewEmployee/getEmail/${currentUser.EID}`)

                    // if there is data in res 3, set the email address
                    if (res3.data.length > 0) {
                        setEmailAddress(res3.data[0].EMAIL);
                    }

                }

                // --------------------------FINISHED------------------------------------------------------



            } catch (err) {
                console.log(err);
            }
        };
        editAll();

    }, [currentUser]);


    // verifications to ensure that the user has filled in all of the forms before they can submit their new changes
    // also check if the user enters the phone number in correctly
    useEffect(() => {
        // Convert phoneNumber to a string before calling trim()
        const phoneNumberString = String(phoneNumber);

        // check if a valid 10 digit phone number has been entered
        const isPhoneNumberValid = /^[0-9]{10}$/.test(phoneNumberString);

        if(isPhoneNumberValid){
            setPhoneValid(true);
        }else {
            setPhoneValid(false)
        }

        // Check if all fields are filled to enable the form submission
        setFormValid(
            firstName.trim() !== "" && lastName.trim() !== "" && emailAddress.trim() !=="" && phoneNumberString.trim() !=="" &&
             isPhoneNumberValid
        );
    }, [firstName, lastName, emailAddress, phoneNumber]);



    return(
        <div className="accountEditPage">
            <NavigationBar/>

            <Container>
                <Row className="mt-4">
                    <h1>Edit Details</h1>
                    <h6>Fill in the required fields below with your new information and click "Save Changes"</h6>
                    <h6>Optional Fields: Middle Name, Password: (only type into this field if you want to change your password)</h6>
                </Row>

                <Row className="justify-content-md-center mt-4">
                    <Col md="auto">
                        <h4>Personal Information</h4>
                        <Form>

                            {/* First name */}
                            <Form.Group className="mb-3" controlId="formFName">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaUser />
                                    </InputGroup.Text>
                                    <Form.Control type="text" placeholder="First name"
                                                  value={firstName}
                                                  onChange={(e) => {
                                                      setFirstName(e.target.value);
                                                      handleFieldChange();
                                                  }}
                                                  required/>
                                </InputGroup>
                            </Form.Group>

                            {/* Middle Name */}
                            <Form.Group className="mb-3" controlId="formMName">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaUser />
                                    </InputGroup.Text>
                                    <Form.Control type="text" placeholder="Middle name (optional)"
                                                  value={middleName}
                                                  onChange={(e) => {
                                                      setMiddleName(e.target.value);
                                                      handleFieldChange();
                                                  }}/>
                                </InputGroup>
                            </Form.Group>

                            {/* Last Name */}
                            <Form.Group className="mb-3" controlId="formLName">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaUser />
                                    </InputGroup.Text>
                                    <Form.Control type="text" placeholder="Last Name"
                                                  value={lastName}
                                                  onChange={(e) => {
                                                      setLastName(e.target.value);
                                                      handleFieldChange();
                                                  }}
                                                  required/>
                                </InputGroup>
                            </Form.Group>

                            {/* Email */}
                            <Form.Group className="mb-3" controlId="formEmail">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaEnvelope />
                                    </InputGroup.Text>
                                    <Form.Control type="email" placeholder="Email"
                                                  value={emailAddress}
                                                  onChange={(e) => {
                                                      setEmailAddress(e.target.value);
                                                      handleFieldChange();
                                                  }}
                                                  required/>
                                </InputGroup>
                            </Form.Group>

                            {/* Phone */}
                            <Form.Group className="mb-3" controlId="formTel">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaPhone />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Phone number"
                                        pattern="^\(\d{3}\) \d{3}-\d{4}$"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value);
                                            handleFieldChange();
                                        }}
                                        required
                                    />
                                    <Form.Text id="telphoneInfo">
                                        Updated Telephone numbers should be in the format ##########
                                    </Form.Text>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Col>

                    <Col md="auto">
                        <h4>Account Information</h4>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaLock />
                                </InputGroup.Text>
                                <Form.Control type="password" placeholder="Password (Unfilled = Retain Old Password)"
                                              onChange={(e) => {
                                                  setPassword(e.target.value);
                                                  handleFieldChange();
                                              }}
                                              required/>
                            </InputGroup>
                        </Form.Group>
                        {isFormChanged && !formValid && (
                            <p style={{ color: "red" }}>Please fill in all fields.</p>
                        )}

                        {isFormChanged && !phoneValid && (
                            <p style={{ color: "red" }}>Phone Number Invalid!</p>
                        )}
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt-3">
                    <Col md="auto">
                        <Button href="/account" variant="primary" style={{ width: '250px' }} onClick={handleSaveChanges} disabled={!formValid}>Save changes</Button>{' '}
                        <Button href="/account" variant="danger" style={{ width: '250px' }}>Cancel changes</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AccountEdit