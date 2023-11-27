//import React from "react";
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './viewClient.css';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import AdminHome from "../../pages/admin/adminHome"


const ViewEmployees=()=>{
    //DELETE:An array with example employee data
    // const employees=[
    //     {EID:1,Fname:'John',Mname:'William',Lname:'Doe',Phone:'123-456-7890',Email:'JohnDoe@gmail.com', SalaryType: 'A'},
    //     {EID:2,Fname:'Jane',Mname:'Allison',Lname:'Doe',Phone:'987-654-3210',Email:'JaneDoe@gmail.com', SalaryType: 'B'},
    // ];

    const [employeeTable, setEmployeeTable] = useState([]);
    const [emailTable, setEmailTable] = useState([]);
    const [phoneTable, setPhoneTable] = useState([]);

    useEffect(() => {
        const fetchAllEmployees = async () => {
            try {
                const res = await axios.get('/viewEmployee/employeeTable');
                setEmployeeTable(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllEmployees();
    }, []);

    //DELETE: for testing
    console.log(employeeTable);


    useEffect(() => {
        const fetchAllEmails = async () => {
            try {
                const res = await axios.get('/viewEmployee/emailTable');
                setEmailTable(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllEmails();
    }, []);

    //DELETE: for testing
    console.log(JSON.stringify(emailTable));
    console.log(emailTable);


    useEffect(() => {
        const fetchAllPhones = async () => {
            try {
                const res = await axios.get('/viewEmployee/phoneTable');
                setPhoneTable(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPhones();
    }, []);

    //DELETE: for testing
    console.log(JSON.stringify(phoneTable));
    console.log(phoneTable);


    const handleDelete = async (EID)=>{
        try {
            const res = await axios.delete(`/viewEmployee/deleteEmployee/${EID}`);
            console.log(res.data);
            window.location.reload(); //THIS RELOADING THE WINDOW IS NEEDED, UNLESS THE SECOND DELETE THROWS A 500 ERROR
        } catch (err) {
            console.log(err);
        }
    };





    // let EID = null;
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             console.log("I got here")
    //             //console.log(`${EID}`);
    //             const res = await axios.get(`/viewEmployee/${EID}`);
    //             setEmail(res.data);
    //             console.log(email)
    //             console.log(JSON.stringify(email));
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     fetchData();
    // }, [EID]);


    // const fetchEmail = async (EID) =>{
    //     try {
    //         const res = await axios.get(`/viewEmployee/${EID}`);
    //         setEmail(res.data);
    //     } catch (err){
    //         console.log(err);
    //     }
    // }



    // const [editMode, setEditMode] = useState(false);
    //
    //
    //     const handleEditClick = () => {
    //         setEditMode(!editMode);
    //     };
    //
    //     const handleInputChange = (e, EID, field) => {
    //         const updatedData = employeeTable.map(employee =>
    //             employee.EID === EID ? { ...employee, [field]: e.target.value } : employee
    //         );
    //         setEmployeeTable(updatedData);
    //     };

        return(
            <div>
                <h1 className="mt-3">Employees</h1>


                {/*{editMode ? (*/}
                {/*    <Button variant="success" onClick={handleEditClick}>Save</Button>*/}
                {/*) : (*/}
                {/*    <Button variant="warning" onClick={handleEditClick}>Edit</Button>*/}
                {/*)}*/}

                <Table>
                    <thead>
                    <tr>
                        <th>EID</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email Address</th>
                        <th>Salary Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employeeTable.map((employee)=>{

                        //EID = employee.EID;

                        //fetchEmail(employee.EID);

                        //console.log(email);

                        return(
                            <tr key={employee.EID}>
                                <td>{employee.EID}</td>
                                {/*<td>*/}
                                {/*    {editMode ? (*/}
                                {/*        <input*/}
                                {/*            type="text"*/}
                                {/*            value={employee.FName}*/}
                                {/*            onChange={(e) => handleInputChange(e, employee.EID, 'Fname')}*/}
                                {/*        />*/}
                                {/*    ) : (*/}
                                {/*        employee.FName*/}
                                {/*    )}*/}
                                {/*</td>*/}
                                <td>{employee.FName}</td>
                                <td>{employee.MName}</td>
                                <td>{employee.LName}</td>

                                <td>
                                    {phoneTable.map((phone, i)=>{
                                        return(
                                            phone.EID === employee.EID && <p key={i}>{phone.Phone}</p>
                                        )
                                    })}
                                </td>

                                <td>
                                    {emailTable.map((email, i)=>{
                                        return(
                                        email.EID === employee.EID && <p key={i}>{email.EMAIL}</p>
                                        )
                                    })}
                                </td>
                                <td>{employee.SalaryType}</td>

                                <td>
                                    <Link className="link" to={`/adminhome/editEmployee/${employee.EID}`}>
                                        <Button variant="warning">Edit</Button>
                                    </Link>
                                </td>
                                <td className="button"><Button onClick={() => handleDelete(employee.EID)} variant="danger">Delete</Button>{''}</td>
                            </tr>
                        )})}
                    </tbody>
                </Table>
            </div>
        );
}

export default ViewEmployees;