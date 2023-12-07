import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";

const ViewServices = () => {

    const[services, setServices] = useState([])

    useEffect(() => {
        const fetchServices = async ()=>{
            try{
                const res = await axios.get("/clienthomeservices/getServices") // whatever it is called first in route / function name
                setServices(res.data)
            }catch (err){
                console.log(err)
            }
        }
        fetchServices();
    }, []);

    const serviceRowInTable = services.map((service) => (
        <tr key={service.SID}>
            <td>{service.SName}</td>
            <td>${service.SPrice} & up</td>
        </tr>
    ));

    return (
        <Container fluid>
            <h1 className="mt-3">Services</h1>

            <Table responsive="sm">
                <thead>
                <tr>
                    <th className="header">Service</th>
                    <th className="header">Price</th>
                </tr>
                </thead>
                <tbody>
                    {serviceRowInTable}
                </tbody>
            </Table>
        </Container>
    )
}

export default ViewServices