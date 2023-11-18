import React from "react";
import NavigationBar from "../../components/navbar/NavBar";
import {FaEnvelope, FaLock, FaPhone, FaUser} from "react-icons/fa";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";

// Documentation pages referenced:
// https://react-bootstrap.netlify.app/docs/forms/overview/
// https://react-bootstrap.netlify.app/docs/forms/input-group
// https://react-bootstrap.netlify.app/docs/forms/form-text

const account = () => {
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
                                    <Form.Control type="text" placeholder="First name" />
                                </InputGroup>
                            </Form.Group>

                            {/* Middle Name */}
                            <Form.Group className="mb-3" controlId="formMName">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaUser />
                                    </InputGroup.Text>
                                    <Form.Control type="text" placeholder="Middle name (optional)" />
                                </InputGroup>
                            </Form.Group>

                            {/* Last Name */}
                            <Form.Group className="mb-3" controlId="formLName">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaUser />
                                    </InputGroup.Text>
                                    <Form.Control type="text" placeholder="Last Name" />
                                </InputGroup>
                            </Form.Group>

                            {/* Email */}
                            <Form.Group className="mb-3" controlId="formEmail">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FaEnvelope />
                                    </InputGroup.Text>
                                    <Form.Control type="email" placeholder="Email" />
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
                                <Form.Control type="text" placeholder="Username" />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaLock />
                                </InputGroup.Text>
                                <Form.Control type="password" placeholder="Password" />
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

export default account