import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";



const EditEmployee= () => {

    const location = useLocation();
    const navigate = useNavigate();
    const EID = location.pathname.split("/")[3];
    const [currentEmployeeInfo, setCurrentEmployeeInfo] = useState({});
    const [newEmployeeInfo, setNewEmployeeInfo] = useState({
        FName:'',
        MName:'',
        LName:'',
        SalaryType:''
    });

    useEffect(() => {
        const fetchEmployeeInfo = async () => {
            try {
                const res = await axios.get(`/viewEmployee/getOneEmployee/${EID}`);
                setCurrentEmployeeInfo(res.data[0]); //Doing data[0] instead of data so in currentEmployeeInfo, it gets stored as an object, not an array.
                setNewEmployeeInfo(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };
        fetchEmployeeInfo()
    }, []);
    //DELETE: for testing
    console.log(JSON.stringify(currentEmployeeInfo));
    console.log(currentEmployeeInfo);


    const handleUpdate = async () => {
        try{
            await axios.put(`/viewEmployee/updateEmployee/${EID}`, newEmployeeInfo);
            navigate('/adminhome');
        } catch (err) {
            console.log(err);
        }
    }

    const handleCancel = async () => {
        navigate('/adminhome');
    }

    return(
    <Container>

        <h1>Edit Employee (EID: {EID})</h1>

        <Form>
            <Form.Group controlId="FName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={currentEmployeeInfo.FName}
                    defaultValue={currentEmployeeInfo.FName}
                    onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, FName: e.target.value})}
                />
            </Form.Group>

            <Form.Group controlId="MName">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={currentEmployeeInfo.MName}
                    defaultValue={currentEmployeeInfo.MName}
                    onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, MName: e.target.value})}
                />
            </Form.Group>

            <Form.Group controlId="LName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={currentEmployeeInfo.LName}
                    defaultValue={currentEmployeeInfo.LName}
                    onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, LName: e.target.value})}
                />
            </Form.Group>

            <Form.Group controlId="SalaryType">
                <Form.Label>Salary Type</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={currentEmployeeInfo.SalaryType}
                    defaultValue={currentEmployeeInfo.SalaryType}
                    onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, SalaryType: e.target.value})}
                />
            </Form.Group>


            <Form.Group controlId="EMAIL">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    //value='email'
                    //onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="Phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="phone"
                    placeholder="Enter your email"
                    //value='phone'
                    //onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>


            <Button onClick={handleUpdate} variant="success">
                Update
            </Button>
            <Button onClick={handleCancel} variant="secondary">
                Cancel
            </Button>

        </Form>
    </Container>
    );
}

export default EditEmployee;