import React, {useEffect, useState} from "react";
import {Button, Container, Form, Modal} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./ViewOrders.css"
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Alert from "react-bootstrap/Alert";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const ViewOrders = () => {
    // Suppliers
    const [suppliers, setSuppliers] = useState([]);

    // supplier selected in the modal
    const [selectedSupplier, setSelectedSupplier] = useState('');

    // getting list of suppliers
    useEffect(() => {
        const getSuppliers = async () => {
            try {
                const res = await axios.get('/viewOrders/suppliers');
                setSuppliers(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        getSuppliers();
    }, []);

    // Extracting supplier name
    const getSupplierName = (suID) => {
        const supplier = suppliers.find((supplier) => supplier.SuID === suID);
        return supplier ? supplier.SName : 'Unknown Supplier';
    };


    // Handle date change in the date picker
    const handleDateChange = (date) => {
        setNewOrders((prev) => ({ ...prev, selectedDate: date }));
    };

    // Services
    const[orders, setOrders] = useState([])

    // For deleting orders
    const handleDelete = async (SID)=> {
        try{
            console.log(`Deleting service with SID: ${SID}`);
            await axios.delete(`/employeeServices/deleteService/${SID}`);
        }catch (err){
            console.log(err);
        }
    }

    // Get all orders
    useEffect(() => {
        const fetchOrders = async ()=>{
            try{
                const res = await axios.get("/viewOrders/getOrders")
                setOrders(res.data)
            }catch (err){
                console.log(err)
            }
        }
        fetchOrders();
    }, []);

    // Display Orders
    const OrderRowInTable = orders.map((order) => (
        <tr key={order.Order_ID}>
            <td>
                <Button className="order-trash-icon" variant="light" onClick={()=>handleDelete(order.Order_ID)}>
                    <BsTrash3Fill/>
                </Button>
            </td>
            <td>{order.Order_ID}</td>
            <td>{order.Date.split('T')[0]}</td>
            <td>{order.Time}</td>
            <td>{order.SuID} / {getSupplierName(order.SuID)}</td>
            <td>{order.EID} </td>
        </tr>
    ));

    // Insert into order table
    const [newOrders, setNewOrders] = useState({
        Order_ID:"",
        SuID:"",
        EID:"",
        selectedDate: new Date(),
    })

    // For errors when inserting
    // for showing errors
    const [error, setError] = useState('');

    // for input fields to read them
    const handleChange = e =>{
        setNewOrders(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    //  for submitting new order
    const handleSubmit = async (e) => {
        if (selectedSupplier === '') {
            setError('Please select a supplier');
            return;
        }

        // getting the time and date components
        const year = newOrders.selectedDate.getFullYear();
        const month = newOrders.selectedDate.getMonth() + 1;
        const day = newOrders.selectedDate.getDate();
        const hours = newOrders.selectedDate.getHours();
        const minutes = newOrders.selectedDate.getMinutes();
        const seconds = newOrders.selectedDate.getSeconds();

        // making it SQL compatible so we can insert into the table without issues
        const FormattedDate = `${year}-${month}-${day}`;
        const FormattedTime = `${hours}:${minutes}:${seconds}`;


        setError('');
        try{
            const res = await axios.post("/employeeServices/addService", newOrders)
            // clear the fields for next time
            newOrders.Order_ID = '';
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
        newOrders.Order_ID = '';
        newOrders.SuID = '';
        newOrders.E_ID = '';
    }

    const handleShow = () => setShow(true);

    return(
        <Container className="view-Orders-page" fluid>
            <h1 className="mt-3">Orders</h1>

            <div className="add-new-order-b">
                <Button variant="primary" onClick={handleShow}> Add New Order </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Order Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="supplier-dropdown">
                            <Form.Label>Supplier:</Form.Label>
                            <Form.Control
                                as="select"
                                name="SuID"
                                value={selectedSupplier}
                                onChange={(e) => setSelectedSupplier(e.target.value)}
                                className="order-drop-down-arrow"
                            >
                                <option value="">Select a Supplier</option>
                                {suppliers.map((supplier) => (
                                    <option key={supplier.SuID} value={supplier.SuID}>
                                        {supplier.SName}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="date-picker">
                            <Form.Label>Select Order Date: </Form.Label>
                            <DatePicker
                                selected={newOrders.selectedDate}
                                onChange={handleDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="form-control"
                            />
                        </Form.Group>
                        {error && <Alert variant="danger">{error}</Alert>}

                        {/* Credit for the down arrow */}
                        <p style={{ marginTop: '20px', fontSize: '8px', color: '#888', textAlign: 'center' }}>
                            <a href="https://www.flaticon.com/free-icons/down-arrow" title="down arrow icons">Down arrow icons created by Google - Flaticon</a>
                        </p>
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
            <Table className="orders-table" responsive="sm">
                <thead>
                <tr>
                    <th></th>
                    <th className="header">Order ID</th>
                    <th className="header">Date</th>
                    <th className="header">Time</th>
                    <th className="header">Supplier ID / Supplier Name</th>
                    <th className="header">Employee ID</th>
                </tr>
                </thead>
                <tbody>
                {OrderRowInTable}
                </tbody>
            </Table>
        </Container>
    )
}

export default ViewOrders;