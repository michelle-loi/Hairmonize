/**
 * The following code in this file is written with assistance from these YouTube videos:
 * Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE
 * Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10
 * Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
 */

//import React from "react";
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Table } from 'react-bootstrap';
import './viewClient.css';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import AdminHome from "../../pages/admin/adminHome"
import { BsTrash3Fill } from "react-icons/bs";


const ViewClients=()=>{

    const [clientTable, setClientTable] = useState([]);
    const [emailTable, setEmailTable] = useState([]);
    const [phoneTable, setPhoneTable] = useState([]);
    const [employeeEIDName, setEmployeeEIDName] = useState([]);


    useEffect(() => {
        const fetchAllClients = async () => {
            try {
                const res = await axios.get('/viewClient/ClientTable');
                setClientTable(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllClients();
    }, []);

    //DELETE: for testing
    console.log(clientTable);


    useEffect(() => {
        const fetchAllEmails = async () => {
            try {
                const res = await axios.get('/viewClient/emailTable');
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
                const res = await axios.get('/viewClient/phoneTable');
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

    useEffect(() => {
        const fetchAllEmployeeEIDName = async () => {
            try {
                const res = await axios.get('/viewClient/getEmployeeEIDName');
                setEmployeeEIDName(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllEmployeeEIDName();
    }, []);
    //console.log(employeeEIDFname);


    const handleDelete = async (CID)=>{
        try {
            const res = await axios.delete(`/viewClient/deleteClient/${CID}`);
            console.log(res.data);
            window.location.reload(); //THIS RELOADING THE WINDOW IS NEEDED, UNLESS THE SECOND DELETE THROWS A 500 ERROR
        } catch (err) {
            console.log(err);
        }
    };



    return(
        <div>

            <div className="d-flex align-items-center mt-3 justify-content-start">
                <h1 className="mt-3">Clients</h1>

                <Link className="link" to={`/adminhome/addClient`}>
                    <Button variant="success" style={{ marginTop: '20px' , marginLeft: '20px'}}>Add new client</Button>
                </Link>
            </div>


            <Table>
                <thead>
                <tr>
                    <th>CID</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email Address</th>
                    <th>Stylist</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {clientTable.map((client)=>{

                    return(
                        <tr key={client.CID}>
                            <td>{client.CID}</td>
                            <td>{client.FName}</td>
                            <td>{client.MName}</td>
                            <td>{client.LName}</td>

                            <td>
                                {phoneTable.map((phone, i)=>{
                                    return(
                                        phone.CID === client.CID && <p key={i}>{phone.Phone}</p>
                                    )
                                })}
                            </td>

                            <td>
                                {emailTable.map((email, i)=>{
                                    return(
                                        email.CID === client.CID && <p key={i}>{email.Email}</p>
                                    )
                                })}
                            </td>

                            <td>
                                {employeeEIDName.map((employee, i)=>{
                                    return(
                                        employee.EID === client.EID && <p key={i}>EID: {client.EID}<br></br>Name: {employee.FName} {employee.MName} {employee.LName}</p>
                                    )
                                })}
                            </td>

                            <td><Button onClick={() => handleDelete(client.CID)} variant="danger"><BsTrash3Fill/></Button>{''}</td>
                        </tr>
                    )})}
                </tbody>
            </Table>
        </div>
    );
}

export default ViewClients;