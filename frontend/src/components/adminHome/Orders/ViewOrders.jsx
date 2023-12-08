import React, {useEffect, useState} from "react";
import {Button, Container, Form, Modal} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./ViewOrders.css"
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Alert from "react-bootstrap/Alert";

const ViewOrders = () => {
    const[services, setServices] = useState([])

    // For deleting services
    const handleDelete = async (SID)=> {
        try{
            console.log(`Deleting service with SID: ${SID}`);
            await axios.delete(`/employeeServices/deleteService/${SID}`);
        }catch (err){
            console.log(err);
        }
    }

    // Get Services
    useEffect(() => {
        const fetchServices = async ()=>{
            try{
                const res = await axios.get("/employeeServices/getServices") // whatever it is called first in route / function name
                setServices(res.data)
            }catch (err){
                console.log(err)
            }
        }
        fetchServices();
    }, []);

    // Display Services
    const serviceRowInTable = services.map((service) => (
        <tr key={service.SID}>
            <td>
                <Button className="service-trash-icon" variant="light" onClick={()=>handleDelete(service.SID)}>
                    <BsTrash3Fill/>
                </Button>
                <Button className="service-edit-icon " variant="light">
                    <FaEdit />
                </Button>
            </td>
            <td>{service.SName}</td>
            <td>${service.SPrice} & up</td>
        </tr>
    ));

    // Insert into service table
    const [newServices, setNewServices] = useState({
        SID:"",
        SName:"",
        SPrice:"",
    })

    // For errors when inserting
    // for showing errors
    const [error, setError] = useState('');

    // for input fields to read them
    const handleChange = e =>{
        setNewServices(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    //  for submitting new service
    const handleSubmit = async e =>{
        if(newServices.SName === ''){
            setError('Please enter the service name');
            return; // do not submit the information
        } else if(newServices.SPrice === ''){
            setError('Please enter the service price');
            return; // do not submit the information
        }

        setError('');
        try{
            const res = await axios.post("/employeeServices/addService", newServices)
            // clear the fields for next time
            newServices.SName = '';
            newServices.SPrice = ''
            setShow(false); // on success close the submission page
        }catch (err){
            setError('Service already in database and cannot be added again');
        }
    }

    // Deals with modal to add a service
    // Template from React bootstrap website
    // https://react-bootstrap.netlify.app/docs/components/modal/
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        // clear the fields for next time
        newServices.SName = '';
        newServices.SPrice = ''
    }

    const handleShow = () => setShow(true);

    return(
        <Container className="view-services-page" fluid>
            <h1 className="mt-3">Services</h1>

            <div className="add-new-service-b">
                <Button variant="primary" onClick={handleShow}> Add New Service </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Service Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="service-name-textarea">
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="E.g., Men's Haircut"
                                autoFocus
                                name = 'SName'
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="service-price-textarea">
                            <Form.Label>Service Price</Form.Label>
                            <Form.Control
                                type='number'
                                step='0.01'
                                min='0'
                                max='1000'
                                placeholder='$'
                                name = 'SPrice'
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* The table to display information */}
            <Table className="services-table" responsive="sm">
                <thead>
                <tr>
                    <th></th>
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

export default ViewOrders;