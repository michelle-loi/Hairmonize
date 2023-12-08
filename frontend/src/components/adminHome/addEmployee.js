import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {MdDelete} from "react-icons/md";

const AddEmployee = () => {
    const location = useLocation();
    const navigate = useNavigate();

    //**********************EMPLOYEE INFO**************************
    const [newEmployeeInfo, setNewEmployeeInfo] = useState({
        FName:'',
        MName:'',
        LName:'',
        SalaryType:''
    });


    const addEmployee = async () => {
        try{
            const response = await axios.post(`/viewEmployee/addEmployee`, {FName: newEmployeeInfo.FName, MName: newEmployeeInfo.MName, LName: newEmployeeInfo.LName, SalaryType: newEmployeeInfo.SalaryType});

            const newlyAddedEID = response.data.eid;

            //DELETE
            console.log(`Newly added EID: ${newlyAddedEID}`);

            //Trigger adding emails to database
            newEmails.forEach((email) => {
                ((email.EMAIL.length===0) ? (console.log("empty email")): addEmail(email.EMAIL, newlyAddedEID));
            })

            //Trigger adding phones to database
            newPhones.forEach((phone) => {
                ((phone.Phone.length===0) ? (console.log("empty phone")): addPhone(phone.Phone, newlyAddedEID));
            })
        } catch (err) {
            console.log(err);
        }
    }
    //*****************************************************************


    //**********************EMPLOYEE EMAIL**************************
    const [newEmails, setNewEmails] = useState([]);
    const [nextIndexEmail, setNextIndexEmail] = useState(0);

    const incrementIndexEmail = () => {
        setNextIndexEmail(nextIndexEmail + 1);
    };

    const handleAddEmail = (e) => {
        e.preventDefault();
        incrementIndexEmail();
        const newObject = {
            index: nextIndexEmail,
            EMAIL: '',
        };
        setNewEmails(oldArray => [...oldArray, newObject]);
    };

    const handleEmailChange = (e, index) => {
        const updatedData = newEmails.map(email =>
            email.index === index ? { ...email, EMAIL: e.target.value } : email
        );
        setNewEmails(updatedData);
    };

    const handleEmailDelete =  (index)=> {
        setNewEmails((prevArray) => prevArray.filter((email) => email.index !== index));
    };

    const addEmail = async (EMAIL, EID) => {
        try{
            console.log({email: EMAIL})
            await axios.post(`/viewEmployee/addEmail`, {eid: EID, email: EMAIL});
            window.location.reload(); //Without this refresh, when when adding employee for the second time, only 1 email will be displayed once back on the employees page
        } catch (err) {
            console.log(err);
        }
    }
    //*****************************************************************


    //**********************EMPLOYEE PHONE**************************
    const [newPhones, setNewPhones] = useState([]);
    const [nextIndexPhone, setNextIndexPhone] = useState(0);

    const incrementIndexPhone = () => {
        setNextIndexPhone(nextIndexPhone + 1);
    };

    const handleAddPhone = (e) => {
        e.preventDefault();
        incrementIndexPhone();
        const newObject = {
            index: nextIndexPhone,
            Phone: '',
        };
        setNewPhones(oldArray => [...oldArray, newObject]);
    };

    const handlePhoneChange = (e, index) => {
        const updatedData = newPhones.map(phone =>
            phone.index === index ? { ...phone, Phone: e.target.value } : phone
        );
        setNewPhones(updatedData);
    };

    const handlePhoneDelete =  (index)=> {
        setNewPhones((prevArray) => prevArray.filter((phone) => phone.index !== index));
    };

    const addPhone = async (Phone, EID) => {
        try{
            console.log({phone: Phone})
            await axios.post(`/viewEmployee/addPhone`, {eid: EID, phone: Phone});
            window.location.reload(); //Without this refresh, when adding employee for the second time, only 1 phone will be displayed once back on the employees page
        } catch (err) {
            console.log(err);
        }
    }

    //*****************************************************************
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const addAccount = async (EID) => {
        // const accountTypeNum = null;
        // // if(selectedEmployeetype == 'Admin'){
        // //     accountTypeNum =
        // // }
        //
        // try{
        //     // await axios.post(`/viewEmployee/addAccount`, {Username: newUsername, Password: newPassword, CreationDate: , CID: null, EID: EID, AccountType: });
        //
        //     const newlyAddedEID = response.data.eid;
        //
        //     //DELETE
        //     console.log(`Newly added EID: ${newlyAddedEID}`);
        //
        //     //Trigger adding emails to database
        //     newEmails.forEach((email) => {
        //         ((email.EMAIL.length===0) ? (console.log("empty email")): addEmail(email.EMAIL, newlyAddedEID));
        //     })
        //
        //     //Trigger adding phones to database
        //     newPhones.forEach((phone) => {
        //         ((phone.Phone.length===0) ? (console.log("empty phone")): addPhone(phone.Phone, newlyAddedEID));
        //     })
        // } catch (err) {
        //     console.log(err);
        // }
    }
    //**********************ADDING ACCOUNT**************************


    //*****************************************************************

    //**********************ADMIN OR STYLIST**************************
    const [selectedEmployeetype, setSelectedEmployeeType] = useState('');


    //*****************************************************************

    const handleAdd = (e) => {
        //e.preventDefault();
        addEmployee();

        navigate('/adminhome');
    }


    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">

            <Form onSubmit={handleAdd}>
                <Form.Label>
                    <h1>Add new employee</h1>
                </Form.Label>

                <h3>Personal Information</h3>

                <Form.Group className="mb-3" controlId="FName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, FName: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="MName">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter middle name"
                        onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, MName: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="LName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, LName: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="AccountType">
                    <Form.Label>Employee Type</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedEmployeetype}
                        onChange={(e) => setSelectedEmployeeType(e.target.value)}
                        required
                    >
                        <option value="">Select employee type</option>
                        <option value="option1">Admin</option>
                        <option value="option2">Stylist</option>
                        <option value="option3">Addmin + Stylist</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="SalaryType">
                    <Form.Label>Salary Type</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter salary type"
                        onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, SalaryType: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Button onClick={handleAddEmail} type="success" size="sm" style={{ margin: '5px 10px' }}>Add new email</Button>
                    {newEmails.map((email)=>{
                        return(
                            <>
                                <Row>
                                    <Col xs={10}>
                                        <Form.Control
                                            key={email.index}
                                            type="text"
                                            placeholder="Enter new email"
                                            defaultValue={email.EMAIL}
                                            onChange={(e) => handleEmailChange(e, email.index)}
                                        />
                                    </Col>
                                    <Col className="d-flex align-items-center">
                                        <MdDelete onClick={() => handleEmailDelete(email.index)} />
                                    </Col>
                                </Row>
                            </>
                        )
                    })}
                </Form.Group>

                <Form.Group className="mb-3" controlId="Email">
                    <Form.Label>Phone</Form.Label>
                    <Button onClick={handleAddPhone} type="success" size="sm" style={{ margin: '5px 10px' }}>Add new phone</Button>
                    {newPhones.map((phone)=>{
                        return(
                            <>
                                <Row>
                                    <Col xs={10}>
                                        <Form.Control
                                            key={phone.index}
                                            type="number"
                                            placeholder="Enter new phone"
                                            defaultValue={phone.Phone}
                                            onChange={(e) => handlePhoneChange(e, phone.index)}
                                        />
                                    </Col>
                                    <Col className="d-flex align-items-center">
                                        <MdDelete onClick={() => handlePhoneDelete(phone.index)} />
                                    </Col>
                                </Row>
                            </>
                        )
                    })}
                </Form.Group>

                <h3>Account Information</h3>
                <h5>Create an account for this employee</h5>

                <Form.Group className="mb-3" controlId="Username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </Form.Group>


                <Button type="submit" variant="success" style={{ marginRight: '10px' }}>
                    Add employee
                </Button>

            </Form>

        </Container>
    )
}

export default AddEmployee;