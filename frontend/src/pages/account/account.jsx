import React, {useContext, useEffect, useState} from "react";
import NavigationBar from "../../components/navbar/NavBar";
import {FaEnvelope, FaLock, FaPhone, FaUser} from "react-icons/fa";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import axios from "axios";
import {AuthContext} from "../../context/authContext";

// Documentation pages referenced:
// https://react-bootstrap.netlify.app/docs/forms/overview/
// https://react-bootstrap.netlify.app/docs/forms/input-group
// https://react-bootstrap.netlify.app/docs/forms/form-text

const Account = () => {
    // get the current user from authentication (this will be our user's local data generated from the token)
    const {currentUser} = useContext(AuthContext);

    // some storage variables

    // to store the first name from the employee table
    const [firstName, setFirstName] = useState("");
    // to store the Middle name from the employee table
    const [middleName, setMiddleName] = useState("");
    // to store the Last name from the employee table
    const [lastName, setLastName] = useState("");

    // store username
    const [userName, setUsername] = useState("");

    // account type
    const [accountType, setAccountType] = useState("");

    useEffect(() => {

        const fetchAllEmployees = async () => {
            try {
                // check if account type is 0 which signals employees, if so fetch employee data
                if (currentUser && currentUser.AccountType === 0) {
                    // get username
                    setUsername(currentUser.Username);
                    // set account type
                    setAccountType("Employee")

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
                }

                // ----------------------------TO DO ----------------------------

                // check if account type is 1 which is customer so fetch customer data
                if (currentUser && currentUser.AccountType === 1) {
                    // get username
                    setUsername(currentUser.Username);
                    // set account type
                    setAccountType("Customer")

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
                }

                // check if account type is 2 which signals admins, if so fetch admin data
                if (currentUser && currentUser.AccountType === 2) {
                    // get username
                    setUsername(currentUser.Username);
                    // set account type
                    setAccountType("Admin")

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
                }

                // --------------------------FINISHED------------------------------------------------------



            } catch (err) {
                console.log(err);
            }
        };
        fetchAllEmployees();

    }, [currentUser]);



    return(
        <div className="accountPage">
            <NavigationBar/>
            <Container className="accountPageContainer">
                {/* Change top and bottom margin */}
                <Row className="mb-3 mt-4">
                    <h1>Profile</h1>
                </Row>

                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h4>Personal Information</h4>
                        <Form>

                            {/* First name */}
                            <Form.Group className="mb-3" controlId="formFName">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaUser />
                                    </InputGroup.Text>
                                    <InputGroup.Text> First Name:</InputGroup.Text>
                                    <Form.Control type="text" placeholder="First name" value={firstName} />
                                </InputGroup>
                            </Form.Group>

                            {/* Middle Name */}
                            <Form.Group className="mb-3" controlId="formMName">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaUser />
                                    </InputGroup.Text>
                                    <InputGroup.Text> Middle Name:</InputGroup.Text>
                                    <Form.Control type="text" placeholder="Middle name (optional)" value={middleName} />
                                </InputGroup>
                            </Form.Group>

                            {/* Last Name */}
                            <Form.Group className="mb-3" controlId="formLName">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaUser />
                                    </InputGroup.Text>
                                    <InputGroup.Text> Last Name:</InputGroup.Text>
                                    <Form.Control type="text" placeholder="Last Name" value={lastName}/>
                                </InputGroup>
                            </Form.Group>

                            {/* Email */}
                            <Form.Group className="mb-3" controlId="formEmail">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaEnvelope />
                                    </InputGroup.Text>
                                    <InputGroup.Text> Email:</InputGroup.Text>
                                    <Form.Control type="email" placeholder="Email" />
                                </InputGroup>
                            </Form.Group>

                            {/* Phone */}
                            <Form.Group className="mb-3" controlId="formTel">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaPhone />
                                    </InputGroup.Text>
                                    <InputGroup.Text> Phone:</InputGroup.Text>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Phone number"
                                        pattern="^\(\d{3}\) \d{3}-\d{4}$"
                                    />
                                    <Form.Text id="telphoneInfo">
                                        Your telephone number should be in the for (###) ###-####
                                    </Form.Text>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Col>

                    <Col md="auto">
                        <h4>Account Information</h4>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaUser />
                                </InputGroup.Text>
                                <InputGroup.Text>Username:</InputGroup.Text>
                                <Form.Control type="text" placeholder="Username" value={userName}/>
                            </InputGroup>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formAccountType">
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaUser />
                                </InputGroup.Text>
                                <InputGroup.Text>Account:</InputGroup.Text>
                                <Form.Control type="text" placeholder="Account Type" value={accountType}/>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-md-center mt-3">
                    <Col md="auto">
                        <Button href="/accountEdit" variant="success" style={{ width: '250px' }}>Edit account details</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Account