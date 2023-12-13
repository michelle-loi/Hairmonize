/**
 * The following code in this file is written with assistance from these YouTube videos:
 * Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE
 * Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10
 * Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
 */

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
                <Button className="service-edit-icon " variant="light" onClick={() => handleShowEdit(supplier.SuID, supplier.SName, supplier.Email, supplier.Address, supplier.Phone, supplier.Fax)}>
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


    //************************* Edit ************************************
    const [showEdit, setShowEdit] = useState(false);
    const [supplierBeingEdited, setSupplierBeingEdited] = useState({});
    const [editedSupplier, setEditedSupplier] = useState({});

    // for showing errors
    const [errorEdit, setErrorEdit] = useState('');

    const handleShowEdit = (SuID, SName, Email, Address, Phone, Fax) => {
        setShowEdit(true)

        setSupplierBeingEdited({SuID: SuID, SName: SName, Email: Email, Address: Address, Phone: Phone, Fax: Fax});
        setEditedSupplier({SuID: SuID, SName: SName, Email: Email, Address: Address, Phone: Phone, Fax: Fax});

    };

    // for input fields to read them
    const handleChangeEdit = e =>{
        setEditedSupplier(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    //  for submitting new suppliers
    const handleSubmitEdit = async (e) =>{
        //Check if a valid option is selected
        if(editedSupplier.SName === ''){
            setErrorEdit('Please enter the supplier name');
            return; // do not submit the information
        } else if(editedSupplier.Email === ''){
            setErrorEdit('Please enter the supplier email');
            return; // do not submit the information
        } else if(editedSupplier.Address === ''){
            setErrorEdit('Please enter the supplier address');
            return; // do not submit the information
        } else if (editedSupplier.Phone === '') {
            setErrorEdit('Please enter the suppliers phone number');
            return; // do not submit the information
        }
        setErrorEdit('');

        try{
            const res = await axios.put(`/viewSuppliers/updateSupplier/${editedSupplier.SuID}`,
                {SName: editedSupplier.SName,
                    Email: editedSupplier.Email,
                    Address: editedSupplier.Address,
                    Phone: editedSupplier.Phone,
                    Fax: editedSupplier.Fax})
            setShowEdit(false); // on success close the submission page
        }catch (err){
            setErrorEdit('Supplier already in database and cannot be added again');
        }
    }

    // Template from React bootstrap website
    // https://react-bootstrap.netlify.app/docs/components/modal/
    const handleCloseEdit = () => {
        setShowEdit(false);
        setErrorEdit(''); // close remove the error message
    }
    //****************************************************************

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

            {/* to edit supplier*/}
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Supplier Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="supplier-name-textarea">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder={supplierBeingEdited.SName}
                                defaultValue={supplierBeingEdited.SName}
                                autoFocus
                                name = 'SName'
                                onChange={handleChangeEdit}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="supplier-Email-textarea">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder={supplierBeingEdited.Email}
                                defaultValue={supplierBeingEdited.Email}
                                name = 'Email'
                                onChange={handleChangeEdit}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="supplier-address-textarea">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder={supplierBeingEdited.Address}
                                defaultValue={supplierBeingEdited.Address}
                                name = 'Address'
                                onChange={handleChangeEdit}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="supplier-phone-textarea">
                            <Form.Label>Phone: (###) ###-####</Form.Label>
                            <Form.Control
                                name = 'Phone'
                                type="text"
                                placeholder={supplierBeingEdited.Phone}
                                defaultValue={supplierBeingEdited.Phone}
                                onChange={handleChangeEdit}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="supplier-fax-textarea">
                            <Form.Label>Fax: (###) ###-####</Form.Label>
                            <Form.Control
                                type="text"
                                name = 'Fax'
                                placeholder={supplierBeingEdited.Fax}
                                defaultValue={supplierBeingEdited.Fax}
                                onChange={handleChangeEdit}
                            />
                        </Form.Group>
                        {errorEdit && <Alert variant="danger">{errorEdit}</Alert>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmitEdit}>
                        Edit
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