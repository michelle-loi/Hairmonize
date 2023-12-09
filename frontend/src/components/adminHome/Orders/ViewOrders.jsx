import React, {useContext, useEffect, useState} from "react";
import {Button, Container, Form, Modal} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./ViewOrders.css"
import { BsTrash3Fill } from "react-icons/bs";
import Alert from "react-bootstrap/Alert";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {AuthContext} from "../../../context/authContext";

const ViewOrders = () => {
    // get the current user from authentication (this will be our user's local data generated from the token)
    const {currentUser} = useContext(AuthContext);

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

    // Orders
    const[orders, setOrders] = useState([])

    // For deleting orders
    const handleDelete = async (Order_ID)=> {
        try{
            console.log(`Deleting Order with Order_ID: ${Order_ID}`);
            await axios.delete(`/viewOrders/deleteOrder/${Order_ID}`);

            // update page after delete
            setOrders((prevOrders) => prevOrders.filter(order => order.Order_ID !== Order_ID));
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
            <td>{order.Date ? order.Date.split('T')[0] : ''}</td>
            <td>{order.Time}</td>
            <td>{order.SuID} / {getSupplierName(order.SuID)}</td>
            <td>{order.EID}</td>
        </tr>
    ));

    // For insertion into order table
    const [newOrders, setNewOrders] = useState({
        SuID:"",
        // setting current user's EID into EID, we get this from currentUser's auth context aka the login cookie
        EID: currentUser ? currentUser.EID : "",
        selectedDate: new Date(),
    })

    // For errors when inserting
    // for showing errors
    const [error, setError] = useState('');

    // updates order info base on input fields in the form
    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewOrders((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        if (selectedSupplier === '') {
            setError('Please select a supplier');
            return;
        }

        setError('');
        try {
            // Add the new order
            const res = await axios.post("/viewOrders/addOrder", newOrders);

            // Update the local state with the new order
            setOrders((prevOrders) => [...prevOrders, res.data]);

            // Clear the selected supplier after successful submission
            setSelectedSupplier('');

            // Clear the fields for next time
            setNewOrders({
                SuID: "",
                EID: currentUser ? currentUser.EID : "",
                selectedDate: new Date(),
            });

            // Close the submission page
            setShow(false);

            // Fetch updated orders from the server and update the state so the table shows latest and most up to date orders
            const updatedOrders = await axios.get("/viewOrders/getOrders");
            setOrders(updatedOrders.data);
        } catch (err) {
            console.error('Error adding order:', err);
            setError('Error could not add order');
        }
    };


    // Deals with modal to add a service
    // Template from React bootstrap website
    // https://react-bootstrap.netlify.app/docs/components/modal/
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        // Clear the selected supplier
        setSelectedSupplier("");
        // clear the fields for next time
        newOrders.Order_ID = '';
        newOrders.SuID = '';
        newOrders.E_ID = '';
    }

    const handleShow = () =>
        setShow(true);

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
                                onChange={(e) => {
                                    setSelectedSupplier(e.target.value);
                                    handleChange(e);
                                }}
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