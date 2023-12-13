/**
 * The following code in this file is written with assistance from these YouTube videos:
 * Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE
 * Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10
 * Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
 */

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

            //Trigger adding account to database
            addAccount(newlyAddedEID);

            //Trigger adding employee as admin or stylist or both
            addAdminOrStylist(newlyAddedEID);
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

    //**********************ADDING ACCOUNT**************************
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const addAccount = async (EID) => {
        let accountTypeNum = null;
        if(selectedEmployeetype === 'Admin'){
            accountTypeNum = 2;
        } else if (selectedEmployeetype === 'Stylist'){
            accountTypeNum = 0;
        } else{
            accountTypeNum = 3;
        }

        const currentDate = new Date();
        const partiallyFormattedDate = currentDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const withSpacesFormattedDate = partiallyFormattedDate.replace(/\./g, '-');
        const withLastDotFormattedDate = withSpacesFormattedDate.replace(/\s/g, '');
        const mysqlFormattedDate = withLastDotFormattedDate.slice(0, -1);
        console.log(mysqlFormattedDate);

        try{
            await axios.post(`/viewEmployee/addAccount`, {Username: newUsername, Password: newPassword, CreationDate: mysqlFormattedDate, CID: null, EID: EID, AccountType: accountTypeNum});
        } catch (err) {
            console.log(err);
        }
    }
    //*****************************************************************

    //**********************ADMIN OR STYLIST**************************
    const [selectedEmployeetype, setSelectedEmployeeType] = useState('');

    const addAdminOrStylist = async (EID) => {
        if (selectedEmployeetype === 'Admin' || selectedEmployeetype === 'Admin + Stylist') {
            try{
                await axios.post(`/viewEmployee/addAdministrator`, {eid: EID});
            } catch (err) {
                console.log(err);
            }
        }

        if (selectedEmployeetype === 'Stylist' || selectedEmployeetype === 'Admin + Stylist'){
            try{
                await axios.post(`/viewEmployee/addStylist`, {eid: EID});
            } catch (err) {
                console.log(err);
            }
        }
    }

    //*****************************************************************

    const handleAdd = (e) => {
        //e.preventDefault();
        addEmployee();

        navigate('/adminhome');
    }

    const handleCancel = async () => {
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
                    <Form.Label>First Name <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, FName: e.target.value})}
                        required
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
                    <Form.Label>Last Name <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, LName: e.target.value})}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="AccountType">
                    <Form.Label>Employee Type <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedEmployeetype}
                        onChange={(e) => setSelectedEmployeeType(e.target.value)}
                        required
                    >
                        <option value="">Select employee type</option>
                        <option value="Admin">Admin</option>
                        <option value="Stylist">Stylist</option>
                        <option value="Admin + Stylist">Admin + Stylist</option>
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
                    <Form.Label>Username <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Password">
                    <Form.Label>Password <span style={{ color: 'red'}}>*</span></Form.Label>
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
                <Button onClick={handleCancel} variant="secondary">
                    Cancel
                </Button>

            </Form>

        </Container>
    )
}

export default AddEmployee;