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
    const [newOrders, setNewOrders] = useState({
        O_ID:"",
        SuID:"",
        EID:"",
    })

    // For errors when inserting
    // for showing errors
    const [error, setError] = useState('');

    // for input fields to read them
    const handleChange = e =>{
        setNewOrders(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    //  for submitting new service
    const handleSubmit = async e =>{
        if(newOrders.SuID === ''){
            setError('Please enter the supplier ID');
            return; // do not submit the information
        }

        setError('');
        try{
            const res = await axios.post("/employeeServices/addService", newOrders)
            // clear the fields for next time
            newOrders.O_ID = '';
            newOrders.SuID = '';
            newOrders.E_ID = '';
            setShow(false); // on success close the submission page
        }catch (err){
            setError('Order already in database and cannot be added again');
        }
    }

    // Deals with modal to add a service
    // Template from React bootstrap website
    // https://react-bootstrap.netlify.app/docs/components/modal/
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        // clear the fields for next time
        newOrders.O_ID = '';
        newOrders.SuID = '';
        newOrders.E_ID = '';
    }

    const handleShow = () => setShow(true);

    return(
        <Container className="view-Orders-page" fluid>
            <h1 className="mt-3">Orders</h1>

            <div className="add-new-order-b">
                <Button variant="primary" onClick={handleShow}> Add New Service </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Order Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="order-id-textarea">
                            <Form.Label>Order ID</Form.Label>
                            <Form.Control
                                type='int'
                                placeholder="Enter a Order ID"
                                autoFocus
                                name = 'O_ID'
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