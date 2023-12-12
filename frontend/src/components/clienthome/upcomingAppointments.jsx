import React, {useContext, useEffect, useState} from "react";
import {Button, Container, Row, Table} from "react-bootstrap";
import axios from "axios";
import {AuthContext} from "../../context/authContext";
import {BsTrash3Fill} from "react-icons/bs";

const UpcomingAppointments = () => {
    const {currentUser} = useContext(AuthContext);
    const CID = currentUser.CID;

    const [myAppts, setMyAppts] = useState([]);


    useEffect(() => {
        const fetchMyAppts = async () => {
            try {
                const res = await axios.get(`/clientAppointment/getMyApptsServiceName/${CID}`);
                setMyAppts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMyAppts();
    }, [CID]);
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
                                <td><Button onClick={() => handleDelete(appointment.CID, (appointment.Date || '').split('T')[0], appointment.Time)} variant="danger">Cancel Appointment</Button>{''}</td>
                            </tr>
                        )})}
                    </tbody>
                </Table>

            </Container>
        )
}

export default UpcomingAppointments