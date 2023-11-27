import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";






const EditEmployee= () => {

    //Employee info
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


    //Employee email
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


    // useEffect(() => {
    //     const setArray= async () => {
    //         setNewEmails(
    //             emailsInDB.map((email, index) => ({
    //                 index: index + 1,
    //                 new: 0,
    //                 ...email,
    //             }))
    //         );
    //     }
    //     setArray();
    // }, []);

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

    console.log(JSON.stringify(newEmails));
    console.log(newEmails);


    const arrayLength = () => emailsInDB.length;
    const [nextIndex, setNextIndex] = useState(0);

    const incrementIndex = () => {
        setNextIndex(nextIndex + 1);
    };

    const handleAddEmail = (e) => {
        e.preventDefault();
        (nextIndex === 0) ? setNextIndex(arrayLength() + 1) : incrementIndex();
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

    const handleUpdate = () => {
        updateEmployee();

        emailsToDelete.forEach((email) => {
            deleteEmail(email.OLDEMAIL);
        })

        newEmails.forEach((email) => {
            email.new === 1 ?
                addEmail(email.EMAIL) : updateEmail(email.EMAIL, email.OLDEMAIL);
        })

        navigate('/adminhome');
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

            <Form.Group controlId="Email">
                <Form.Label>Email</Form.Label>
                <Button onClick={handleAddEmail} type="success">Add new email</Button>
                {newEmails.map((email)=>{
                    return(
                        <>
                            <Row>
                                <Col>
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