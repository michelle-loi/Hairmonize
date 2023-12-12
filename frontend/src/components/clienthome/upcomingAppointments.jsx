import React, {useContext, useEffect, useState} from "react";
import {Container, Row} from "react-bootstrap";
import axios from "axios";
import {AuthContext} from "../../context/authContext";

const UpcomingAppointments = () => {
    const {currentUser} = useContext(AuthContext);
    const CID = currentUser.CID;

    const [myAppts, setMyAppts] = useState([]);
    const [availableServices, setAvailableServices] = useState([]);


    useEffect(() => {
        const fetchMyAppts = async () => {
            try {
                const res = await axios.get(`/clientAppointment/getMyAppts/${CID}`);
                setMyAppts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchMyAppts();
    }, [CID]);
    console.log(myAppts);

    useEffect(() => {
        const fetchAvailableServices = async () => {
            try {
                const res = await axios.get(`/clientAppointment/getAvailableServices`);
                setAvailableServices(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAvailableServices ();
    }, []);
    console.log(availableServices);

    // const createApptServicesNames = (myAppts, availableServices) => {
    //     return myAppts.map((appt) => {
    //         const serviceObject = availableServices.find((service) => service.SID === appt.Service_SID);
    //         console.log(appt)
    //         console.log(serviceObject)
    //
    //         // if (employeeObject) {
    //         //     const { EID, FName, MName, LName } = employeeObject;
    //         //     return { EID, FName, MName, LName };
    //         // }
    //
    //         return null;
    //     }).filter(Boolean);
    // };
    //
    // const apptServicesNames = createApptServicesNames(myAppts, availableServices);





    return (
            <Container>
                <h1 className="mt-3">Upcoming Appointments</h1>
            </Container>
        )
}

export default UpcomingAppointments