import React, {useEffect, useState} from "react";
import {Button, Container, Form, Modal} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./ViewService.css"
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Alert from "react-bootstrap/Alert";

const ViewServices = () => {
    const[services, setServices] = useState([])

    // Fetch Services that will allow us to update our table after an insertion or deletion occurs
    const fetchServices = async () => {
        try {
            const res = await axios.get("/employeeServices/getServices");
            setServices(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchServices();
    }, []);


    // For deleting services
    const handleDelete = async (SID)=> {
        try{
            console.log(`Deleting service with SID: ${SID}`);
            await axios.delete(`/employeeServices/deleteService/${SID}`);
            // update the table
            fetchServices();
        }catch (err){
            console.log(err);
        }
    }

    // Display Services
    const serviceRowInTable = services.map((service) => (
        <tr key={service.SID}>
            <td>
                <Button className="service-trash-icon" variant="light" onClick={()=>handleDelete(service.SID)}>
                    <BsTrash3Fill/>
                </Button>
                <Button className="service-edit-icon " variant="light" onClick={() => handleShowEdit(service.SID, service.SName, service.SPrice)}>
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
        try {
            const res = await axios.post("/employeeServices/addService", newServices);
            // update services
            fetchServices();
            // clear the fields for next time
            newServices.SName = '';
            newServices.SPrice = '';
            // close the box
            setShow(false);
        } catch (err) {
            setError('Service already in the database and cannot be added again');
        }
    };


    // Deals with modal to add a service
    // Template from React bootstrap website
    // https://react-bootstrap.netlify.app/docs/components/modal/
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        // clear the fields for next time
        newServices.SName = '';
        newServices.SPrice = ''
        setError('');
    }

    const handleShow = () => setShow(true);


    //************************* Edit ************************************
    // Modal for edit
    // Template from React bootstrap website
    // https://react-bootstrap.netlify.app/docs/components/modal/
    const [showEdit, setShowEdit] = useState(false);
    const [serviceBeingEdited, setServiceBeingEdited] = useState({});
    const [editedService, setEditedService] = useState({});
    const handleCloseEdit = () => {
        setShowEdit(false);
        setErrorEdit('');
    }
    const handleShowEdit = (SID, SName, SPrice) => {
        setShowEdit(true);

        setServiceBeingEdited({SID: SID, SName: SName, SPrice: SPrice});
        setEditedService({SID: SID, SName: SName, SPrice: SPrice});
    };

    const handleChangeEdit = e =>{
        setEditedService(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const [errorEdit, setErrorEdit] = useState('');


    //  for submitting edited service
    const handleSubmitEdit = async e =>{
        if(editedService.SName === ''){
            setErrorEdit('Please enter the service name');
            return; // do not submit the information
        } else if(editedService.SPrice === ''){
            setErrorEdit('Please enter the service price');
            return; // do not submit the information
        }

        setErrorEdit('');
        try{
            const res = await axios.put(`/employeeServices/updateService/${editedService.SID}`, {SPrice: editedService.SPrice, SName: editedService.SName})
            setShowEdit(false); // on success close the submission page
        }catch (err){
            setErrorEdit('Service already in database and cannot be added again');
        }
    }

    //****************************************************************

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

          {/*Modal for edit*/}
          <Modal show={showEdit} onHide={handleCloseEdit}>
              <Modal.Header closeButton>
                  <Modal.Title>Edit Service Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
                      <Form.Group className="mb-3" controlId="service-name-textarea">
                          <Form.Label>Service Name</Form.Label>
                          <Form.Control
                              type='text'
                              placeholder={serviceBeingEdited.SName}
                              defaultValue={serviceBeingEdited.SName}
                              autoFocus
                              name = 'SName'
                              onChange={handleChangeEdit}
                              required
                          />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="service-price-textarea">
                          <Form.Label>Service Price</Form.Label>
                          <Form.Control
                              type='number'
                              step='0.01'
                              min='0'
                              max='1000'
                              placeholder={serviceBeingEdited.SPrice}
                              defaultValue={serviceBeingEdited.SPrice}
                              name = 'SPrice'
                              onChange={handleChangeEdit}
                              required
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

export default ViewServices;