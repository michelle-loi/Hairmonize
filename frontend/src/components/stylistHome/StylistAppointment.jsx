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

const StylistAppointment = () => {
    const {currentUser} = useContext(AuthContext);

    // create default to prevent logout error
    // const EID = currentUser.EID;
    const EID = currentUser?.EID || '';

    const [myAppts, setMyAppts] = useState([]);

    useEffect(() => {
        const fetchMyAppts = async () => {
            try {
                const res = await axios.get(`/stylist/getMyAppts/${EID}`);
                setMyAppts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMyAppts();
    }, [EID]);
    //console.log(myAppts);

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1) //This is needed to show today's appointments
    const upcomingAppointments = myAppts.filter(appointment => new Date(appointment.Date) > currentDate);


    const handleDelete = async (CID, Date, Time)=>{
        try {
            console.log(CID);
            console.log(`${Date}`);
            console.log(Time);
            const res = await axios.delete(`clientAppointment/deleteAppt/${CID}/${Time}/${Date}`);
            //console.log(res.data);
            window.location.reload(); //THIS RELOADING THE WINDOW IS NEEDED, UNLESS THE SECOND DELETE THROWS A 500 ERROR
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <Container>
            <h1 className="mt-3">Upcoming Appointments</h1>

            <Table responsive="sm">
                <thead>
                <tr>
                    <th className="header">Date</th>
                    <th className="header">Time</th>
                    <th className="header">Service</th>
                    <th className="header">Client</th>
                    <th className="header"></th>
                </tr>
                </thead>

                <tbody>
                {upcomingAppointments.map((appointment)=>{
                    return (
                        <tr>
                            <td>{(appointment.Date || '').split('T')[0]}</td>
                            <td>{appointment.Time}</td>
                            <td>{appointment.SName}</td>
                            <td>Name: {appointment.FName} {appointment.MName} {appointment.LName} <br></br>CID: {appointment.CID}</td>
                            <td><Button onClick={() => handleDelete(appointment.CID, (appointment.Date || '').split('T')[0], appointment.Time)} variant="danger">Cancel Appointment</Button>{''}</td>
                        </tr>
                    )})}
                </tbody>
            </Table>

        </Container>
    )
}

export default StylistAppointment