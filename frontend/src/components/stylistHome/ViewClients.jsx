import React, {useContext, useEffect, useState} from "react";
import {Button, Container, Row, Table} from "react-bootstrap";
import axios from "axios";
import {AuthContext} from "../../context/authContext";
import {BsTrash3Fill} from "react-icons/bs";

const ViewClients = () => {
    const {currentUser} = useContext(AuthContext);
    const EID = currentUser.EID;

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

            <Table>
                <thead>
                <tr>
                    <th>CID</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th></th>
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