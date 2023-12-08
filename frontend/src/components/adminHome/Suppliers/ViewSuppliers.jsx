import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import {Button, Container, Form, Modal} from "react-bootstrap";

import "./ViewSuppliers.css"
import Alert from "react-bootstrap/Alert";


const ViewSuppliers = () => {

    // To get suppliers
    const[suppliers, setSuppliers] = useState([])

    // For deleting suppliers
    const handleDelete = async (SuID)=> {
        try{
            await axios.delete(`/viewSuppliers/deleteSupplier/${SuID}`);
        }catch (err){
            console.log(err);
        }
    }

    // Get Suppliers
    useEffect(() => {
        const fetchSuppliers = async ()=>{
            try{
                const res = await axios.get("/viewSuppliers/getSuppliers") // whatever it is called first in route / function name
                setSuppliers(res.data)
            }catch (err){
                console.log(err)
            }
        }
        fetchSuppliers();
    }, []);

    // Function to display suppliers by mapping through them
    const supplierRowInTable = suppliers.map((supplier) => (
        <tr key={supplier.SuID}>
            <td>
                <Button className="supplier-trash-icon" variant="light" onClick={()=>handleDelete(supplier.SuID)}>
                    <BsTrash3Fill/>
                </Button>
                <Button className="service-edit-icon " variant="light">
                    <FaEdit />
                </Button>
            </td>
            <td>{supplier.SuID}</td>
            <td>{supplier.SName}</td>
            <td>{supplier.Email}</td>
            <td>{supplier.Address}</td>
            <td>{supplier.Phone}</td>
            <td>{supplier.Fax}</td>
        </tr>
    ));

    // Insert into supplier table
    const [newSuppliers, setNewSuppliers] = useState({
        SuID:"",
        SName:"",
        Email:"",
        Address:"",
        Phone:"",
        Fax:"",
    })

    // for showing errors
    const [error, setError] = useState('');

    // for input fields to read them
    const handleChange = e =>{
        setNewSuppliers(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    //  for submitting new suppliers
    const handleSubmit = async e =>{
        //Check if a valid option is selected
        if(newSuppliers.SName === ''){
            setError('Please enter the supplier name');
            return; // do not submit the information
        } else if(newSuppliers.Email === ''){
            setError('Please enter the supplier email');
            return; // do not submit the information
        } else if(newSuppliers.Address === ''){
            setError('Please enter the supplier address');
            return; // do not submit the information
        } else if (newSuppliers.Phone === '') {
            setError('Please enter the suppliers phone number');
            return; // do not submit the information
        }
        setError('');

        try{
            const res = await axios.post("/viewSuppliers/addSupplier", newSuppliers)
            // clear the fields for next time
            newSuppliers.SName = '';
            newSuppliers.Email = '';
            newSuppliers.Address = '';
            newSuppliers.Phone = '';
            newSuppliers.Fax = '';
            setShow(false); // on success close the submission page
        }catch (err){
            setError('Supplier already in database and cannot be added again');
        }
    }

    // Deals with modal to add a supplier
    // Template from React bootstrap website
    // https://react-bootstrap.netlify.app/docs/components/modal/
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setError(''); // close remove the error message
        // clear the fields for next time
        newSuppliers.SName = '';
        newSuppliers.Email = '';
        newSuppliers.Address = '';
        newSuppliers.Phone = '';
        newSuppliers.Fax = '';
    }

    const handleShow = () => setShow(true); // to show modal

    return(
        <Container className="view-supplier-page" fluid>
            <h1 className="mt-3">Suppliers</h1>

            {/* to add supplier*/}
            <div className="add-new-supplier-b">
                <Button variant="primary" onClick={handleShow}> Add New Supplier </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Supplier Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="supplier-name-textarea">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Name"
                                autoFocus
                                name = 'SName'
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="supplier-Email-textarea">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder="example@gmail.com"
                                name = 'Email'
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="supplier-address-textarea">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="2500 University Dr NW, Calgary, AB T2N 1N4"
                                name = 'Address'
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="supplier-phone-textarea">
                            <Form.Label>Phone: (###) ###-####</Form.Label>
                            <Form.Control
                                name = 'Phone'
                                type="text"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="supplier-fax-textarea">
                            <Form.Label>Fax: (###) ###-####</Form.Label>
                            <Form.Control
                                type="text"
                                name = 'Fax'
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

            {/* The table for displaying information */}
            <Table className="suppliers-table" responsive="sm">
                <thead>
                <tr>
                    <th></th>
                    <th className="header">SuID</th>
                    <th className="header">Name</th>
                    <th className="header">Email</th>
                    <th className="header">Address</th>
                    <th className="header">Phone</th>
                    <th className="header">Fax</th>
                </tr>
                </thead>
                <tbody>
                    {supplierRowInTable}
                </tbody>
            </Table>
        </Container>
    )
}

export default ViewSuppliers;