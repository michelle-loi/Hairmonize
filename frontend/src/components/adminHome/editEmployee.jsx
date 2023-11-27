import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";


const EditEmployee= () => {

    const location = useLocation();
    const EID = location.pathname.split("/")[3];


    return(
    <Container>

        <h1>Edit Employee (EID: {EID})</h1>

        <h2>Registration</h2>
        <Form>
            <Form.Group controlId="FName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    value='first name'
                    //onChange={(e) => setFirstName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="MName">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    value='middle name'
                    //onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="LName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    value='last name'
                    //onChange={(e) => setLastName(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="SalaryType">
                <Form.Label>Salary Type</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your email"
                    value='salary type'
                    //onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>


            <Form.Group controlId="EMAIL">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value='email'
                    //onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="Phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="phone"
                    placeholder="Enter your email"
                    value='phone'
                    //onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>


            <Button variant="primary">
                Register
            </Button>
        </Form>


    </Container>
    );
}

export default EditEmployee;