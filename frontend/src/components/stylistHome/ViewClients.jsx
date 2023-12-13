/**
 * The following code in this file is written with assistance from these YouTube videos:
 * Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE
 * Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10
 * Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
 */

import React, {useContext, useEffect, useState} from "react";
import {Button, Container, Row, Table} from "react-bootstrap";
import axios from "axios";
import {AuthContext} from "../../context/authContext";
import {BsTrash3Fill} from "react-icons/bs";

const ViewClients = () => {
    const {currentUser} = useContext(AuthContext);

    // create default to prevent log out error
    // const EID = currentUser.EID;
    const EID = currentUser?.EID || '';

    const [myClients, setMyClients] = useState([]);

    useEffect(() => {
        const fetchMyClients = async () => {
            try {
                const res = await axios.get(`/stylist/getMyClients/${EID}`);
                setMyClients(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMyClients();
    }, []);
    //console.log(myClients);


    const [emailTable, setEmailTable] = useState([]);
    const [phoneTable, setPhoneTable] = useState([]);

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


    return (
        <Container>
            <h1 className="mt-3">Your Clients</h1>

            <Table responsive="sm">
                <thead>
                <tr>
                    <th className="header">CID</th>
                    <th className="header">Name</th>
                    <th className="header">Phone Number</th>
                    <th className="header">Email</th>
                    <th className="header"></th>
                </tr>
                </thead>

                <tbody>
                {myClients.map((client)=>{
                    return (
                        <tr>
                            <td>{client.CID}</td>
                            <td>{client.FName} {client.MName} {client.LName}</td>

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
                        </tr>
                    )})}
                </tbody>
            </Table>

        </Container>
    )
}

export default ViewClients