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

const AddClient = () => {
    const location = useLocation();
    const navigate = useNavigate();

    //**********************EMPLOYEE INFO**************************
    const [newClientInfo, setNewClientInfo] = useState({
        FName:'',
        MName:'',
        LName:'',
        EID: null,
    });


    const addClient = async () => {
        try{
            const response = await axios.post(`/viewClient/addClient`, {FName: newClientInfo.FName, MName: newClientInfo.MName, LName: newClientInfo.LName, EID: selectedStylist});

            const newlyAddedCID = response.data.cid;

            //DELETE
            console.log(`Newly added CID: ${newlyAddedCID}`);

            //Trigger adding emails to database
            newEmails.forEach((email) => {
                ((email.Email.length===0) ? (console.log("empty email")): addEmail(email.Email, newlyAddedCID));
            })

            //Trigger adding phones to database
            newPhones.forEach((phone) => {
                ((phone.Phone.length===0) ? (console.log("empty phone")): addPhone(phone.Phone, newlyAddedCID));
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
            Email: '',
        };
        setNewEmails(oldArray => [...oldArray, newObject]);
    };

    const handleEmailChange = (e, index) => {
        const updatedData = newEmails.map(email =>
            email.index === index ? { ...email, Email: e.target.value } : email
        );
        setNewEmails(updatedData);
    };

    const handleEmailDelete =  (index)=> {
        setNewEmails((prevArray) => prevArray.filter((email) => email.index !== index));
    };

    const addEmail = async (Email, CID) => {
        try{
            console.log({email: Email})
            await axios.post(`/viewClient/addEmail`, {cid: CID, email: Email});
            window.location.reload(); //Without this refresh, when when adding employee for the second time, only 1 email will be displayed once back on the clients page
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

    const addPhone = async (Phone, CID) => {
        try{
            console.log({phone: Phone})
            await axios.post(`/viewClient/addPhone`, {cid: CID, phone: Phone});
            window.location.reload(); //Without this refresh, when adding clients for the second time, only 1 phone will be displayed once back on the clients page
        } catch (err) {
            console.log(err);
        }
    }

    //*****************************************************************

    //**********************SELECTING THEIR STYLIST**************************
    const [stylistsEID, setStylistsEID] = useState([]);
    const [employeeEIDName, setEmployeeEIDName] = useState([]);
    const [selectedStylist, setSelectedStylist] = useState('');

    useEffect(() => {
        const fetchAllStylistEID = async () => {
            try {
                const res = await axios.get('/viewClient/getStylistEID');
                setStylistsEID(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllStylistEID();
    }, []);
    //console.log(stylistsEID);

    useEffect(() => {
        const fetchAllEmployeeEIDFname = async () => {
            try {
                const res = await axios.get('/viewClient/getEmployeeEIDName');
                setEmployeeEIDName(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllEmployeeEIDFname();
    }, []);
    //console.log(employeeEIDName);

    const createStylistsEIDName = (stylistsEID, employeeEIDName) => {
        return stylistsEID.map((stylistEID) => {
            const employeeObject = employeeEIDName.find((employee) => employee.EID === stylistEID.EID);

            if (employeeObject) {
                const { EID, FName, MName, LName } = employeeObject;
                return { EID, FName, MName, LName };
            }

            return null;
        }).filter(Boolean);
    };

    const stylistsEIDName = createStylistsEIDName(stylistsEID, employeeEIDName);
    //console.log(stylistsEIDName);

    // //*****************************************************************



    const handleAdd = (e) => {
        //e.preventDefault();
        addClient();

        navigate('/adminhome');
    }

    const handleCancel = async () => {
        navigate('/adminhome');
    }


    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">

            <Form onSubmit={handleAdd}>
                <Form.Label>
                    <h1>Add new client</h1>
                </Form.Label>

                <h3>Personal Information</h3>

                <Form.Group className="mb-3" controlId="FName">
                    <Form.Label>First Name <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        onChange={(e) => setNewClientInfo({...newClientInfo, FName: e.target.value})}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="MName">
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter middle name"
                        onChange={(e) => setNewClientInfo({...newClientInfo, MName: e.target.value})}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="LName">
                    <Form.Label>Last Name <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        onChange={(e) => setNewClientInfo({...newClientInfo, LName: e.target.value})}
                        required
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
                                            defaultValue={email.Email}
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

                <Form.Group className="mb-3" controlId="Stylist">
                    <Form.Label>Stylist for Client <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedStylist}
                        onChange={(e) => setSelectedStylist(e.target.value)}
                        required
                    >
                        <option value=''>Select stylist</option>
                        {stylistsEIDName.map((stylist, i)=>{
                            return(
                                <option value={stylist.EID}>{stylist.FName} {stylist.MName} {stylist.LName} (EID: {stylist.EID})</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>




                <Button type="submit" variant="success" style={{ marginRight: '10px' }}>
                    Add client
                </Button>
                <Button onClick={handleCancel} variant="secondary">
                    Cancel
                </Button>

            </Form>

        </Container>
    )
}

export default AddClient;