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
import { MdDelete } from "react-icons/md";



const EditEmployee= () => {

    //**********************EMPLOYEE NAME/SALARYTYPE**************************
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
    //*****************************************************************


    //**********************EMPLOYEE EMAIL**************************
    const [emailsInDB, setEmailsInDB] = useState([]);
    const [newEmails, setNewEmails] = useState([]);
    const [emailsToDelete, setEmailsToDelete] = useState([])


    useEffect(() => {
        const getEmails = async () => {
            try {
                const res = await axios.get(`/viewEmployee/getEmail/${EID}`);
                setEmailsInDB(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getEmails();
    }, []);
    //DELETE: for testing
    console.log(JSON.stringify(emailsInDB));
    console.log(emailsInDB);


    useEffect(() => {
        setNewEmails(
            emailsInDB.map((email, index) => ({
                index: index + 1,
                new: 0,
                ...email,
                OLDEMAIL: {...email}.EMAIL,
            }))
        );
    }, [emailsInDB]);
    //DELETE: for testing
    console.log(JSON.stringify(newEmails));
    console.log(newEmails);


    const arrayLengthEmail = () => emailsInDB.length;
    const [nextIndex, setNextIndex] = useState(0);

    const incrementIndex = () => {
        setNextIndex(nextIndex + 1);
    };

    const handleAddEmail = (e) => {
        e.preventDefault();
        (nextIndex === 0) ? setNextIndex(arrayLengthEmail() + 1) : incrementIndex();
        console.log(nextIndex);
        const newObject = {
            index: nextIndex,
            new: 1,
            EMAIL: '',
            OLDEMAIL: '',
        };
        setNewEmails(oldArray => [...oldArray, newObject]);
    }

    console.log(JSON.stringify(newEmails));
    console.log(newEmails);

    const handleEmailChange = (e, index) => {
        const updatedData = newEmails.map(email =>
            email.index === index ? { ...email, EMAIL: e.target.value } : email
        );
        setNewEmails(updatedData);
    };


    const updateEmployee = async () => {
        try {
            await axios.put(`/viewEmployee/updateEmployee/${EID}`, newEmployeeInfo);
        } catch (err) {
            console.log(err);
        }
    }

    const addEmail = async (EMAIL) => {
        try{
            console.log({email: EMAIL})
            await axios.post(`/viewEmployee/addEmail`, {eid: EID, email: EMAIL});
        } catch (err) {
            console.log(err);
        }
    }

    const updateEmail = async (EMAIL, OLDEMAIL) => {
        try{
            console.log({email: EMAIL});
            await axios.put(`/viewEmployee/updateEmail/${EID}`, {email: EMAIL, oldEmail: OLDEMAIL});
        } catch (err) {
            console.log(err);
        }
    }

    const handleEmailDelete =  (index, NEW, OLDEMAIL)=> {
        setNewEmails((prevArray) => prevArray.filter((email) => email.index !== index));

        //For emails that were already in the db and is now deleted, add the original email addresses of those that the user selected to delete into an arrray.
        //So when 'Update' is pressed, delete all the emails in array in db.
        if (NEW === 0){
            const emailDelete = {
                OLDEMAIL: OLDEMAIL
            }
            const newDeleteEmailArray = [...emailsToDelete, emailDelete];
            setEmailsToDelete(newDeleteEmailArray);
        }
    };

    const deleteEmail = async (OLDEMAIL) => {
        try {
            const res = await axios.delete(`/viewEmployee/deleteEmail`, {data: {eid: EID, oldEmail: OLDEMAIL}});
            console.log(res.data);
            //window.location.reload(); //THIS RELOADING THE WINDOW IS NEEDED, UNLESS THE SECOND DELETE THROWS A 500 ERROR
        } catch (err) {
            console.log(err);
        }
    }
    //*****************************************************************



    //**********************EMPLOYEE PHONE**************************
    const [phonesInDB, setPhoneInDB] = useState([]);
    const [newPhones, setNewPhones] = useState([]);
    const [phonesToDelete, setPhonesToDelete] = useState([])


    useEffect(() => {
        const getPhones = async () => {
            try {
                const res = await axios.get(`/viewEmployee/getPhone/${EID}`);
                setPhoneInDB(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getPhones();
    }, []);
    //DELETE: for testing
    console.log(JSON.stringify(phonesInDB));
    console.log(phonesInDB);


    useEffect(() => {
        setNewPhones(
            phonesInDB.map((phone, index) => ({
                index: index + 1,
                new: 0,
                ...phone,
                OLDPHONE: {...phone}.Phone,
            }))
        );
    }, [phonesInDB]);
    //DELETE: for testing
    console.log(JSON.stringify(newPhones));
    console.log(newPhones);


    const arrayLengthPhone = () => phonesInDB.length;
    const [nextIndexPhone, setNextIndexPhone] = useState(0);

    const incrementPhoneIndex = () => {
        setNextIndexPhone(nextIndexPhone + 1);
    };

    const handleAddPhone = (e) => {
        e.preventDefault();
        (nextIndexPhone === 0) ? setNextIndexPhone(arrayLengthPhone() + 1) : incrementPhoneIndex();
        console.log(nextIndexPhone);
        const newObject = {
            index: nextIndex,
            new: 1,
            Phone: null,
            OLDPHONE: null,
        };
        setNewPhones(oldArray => [...oldArray, newObject]);
    }

    console.log(JSON.stringify(newPhones));
    console.log(newPhones);

    const handlePhoneChange = (e, index) => {
        const updatedData = newPhones.map(phone =>
            phone.index === index ? { ...phone, Phone: e.target.value } : phone
        );
        setNewPhones(updatedData);
    };

    const addPhone = async (PHONE) => {
        try{
            console.log({phone: PHONE});
            await axios.post(`/viewEmployee/addPhone`, {eid: EID, phone: PHONE});
        } catch (err) {
            console.log(err);
        }
    }

    const updatePhone = async (PHONE, OLDPHONE) => {
        try{
            console.log({phone: PHONE});
            await axios.put(`/viewEmployee/updatePhone/${EID}`, {phone: PHONE, oldPhone: OLDPHONE});
        } catch (err) {
            console.log(err);
        }
    }

    const handlePhoneDelete =  (index, NEW, OLDPHONE)=> {
        setNewPhones((prevArray) => prevArray.filter((phone) => phone.index !== index));

        //For phones that were already in the db and is now deleted, add the original phone number of those that the user selected to delete into an arrray.
        //So when 'Update' is pressed, delete all the phones in array in db.
        if (NEW === 0){
            const phoneDelete = {
                OLDPHONE: OLDPHONE
            }
            const newDeletePhoneArray = [...phonesToDelete, phoneDelete];
            setPhonesToDelete(newDeletePhoneArray);
        }
    };

    const deletePhone = async (OLDPHONE) => {
        try {
            const res = await axios.delete(`/viewEmployee/deletePhone`, {data: {eid: EID, oldPhone: OLDPHONE}});
            console.log(res.data);
            //window.location.reload(); //THIS RELOADING THE WINDOW IS NEEDED, UNLESS THE SECOND DELETE THROWS A 500 ERROR
        } catch (err) {
            console.log(err);
        }
    }
    //*****************************************************************


    const handleUpdate = () => {
        updateEmployee();

        emailsToDelete.forEach((email) => {
            deleteEmail(email.OLDEMAIL);
        })

        newEmails.forEach((email) => {
            email.new === 1 ?
                ((email.EMAIL.length===0) ? (console.log("empty email")): addEmail(email.EMAIL)) : updateEmail(email.EMAIL, email.OLDEMAIL);
                //(addEmail(email.EMAIL)) : updateEmail(email.EMAIL, email.OLDEMAIL);
        })

        phonesToDelete.forEach((phone) => {
            deletePhone(phone.OLDPHONE);
        })

        newPhones.forEach((phone) => {
            phone.new === 1 ?
                (addPhone(phone.Phone)) : updatePhone(phone.Phone, phone.OLDPHONE);
        })

        navigate('/adminhome');
    }

    const handleCancel = async () => {
        navigate('/adminhome');
    }

    return(
    <Container className="d-flex align-items-center justify-content-center vh-100">

        <Form onSubmit={handleUpdate}>
            <Form.Label>
                <h1>Edit Employee (EID: {EID})</h1>
            </Form.Label>


            <Form.Group className="mb-3" controlId="FName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={currentEmployeeInfo.FName}
                    defaultValue={currentEmployeeInfo.FName}
                    onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, FName: e.target.value})}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="MName">
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={currentEmployeeInfo.MName}
                    defaultValue={currentEmployeeInfo.MName}
                    onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, MName: e.target.value})}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="LName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={currentEmployeeInfo.LName}
                    defaultValue={currentEmployeeInfo.LName}
                    onChange={(e) => setNewEmployeeInfo({...newEmployeeInfo, LName: e.target.value})}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="SalaryType">
                <Form.Label>Salary Type</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={currentEmployeeInfo.SalaryType}
                    defaultValue={currentEmployeeInfo.SalaryType}
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
                                        placeholder={(email.new === 1) ? "Enter new email" : email.EMAIL}
                                        defaultValue={email.EMAIL}
                                        onChange={(e) => handleEmailChange(e, email.index)}
                                    />
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <MdDelete onClick={() => handleEmailDelete(email.index, email.new, email.OLDEMAIL)} />
                                </Col>
                            </Row>
                        </>
                    )
                })}
            </Form.Group>

            <Form.Group className="mb-3" controlId="Phone">
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
                                        placeholder={(phone.new === 1) ? "Enter new phone" : phone.Phone}
                                        defaultValue={phone.Phone}
                                        onChange={(e) => handlePhoneChange(e, phone.index)}
                                    />
                                </Col>
                                <Col className="d-flex align-items-center">
                                    <MdDelete onClick={() => handlePhoneDelete(phone.index, phone.new, phone.OLDPHONE)} />
                                </Col>
                            </Row>
                        </>
                    )
                })}
            </Form.Group>


            <Button type="submit" variant="success" style={{ marginRight: '10px' }}>
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