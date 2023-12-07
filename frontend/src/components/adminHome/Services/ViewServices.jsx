import React, {useEffect, useState} from "react";
import {Button, Container, Form, Modal} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./ViewService.css"
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

const ViewServices = () => {
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
    const [newErr, setNewErr] = useState(null);

    // on click of submit show error if it occurs
    const [submitClicked, setSubmitClicked] = useState(false);

    // for input fields to read them
    const handleChange = e =>{
        setNewServices(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    //  for submitting new service
    const handleSubmit = async e =>{
        try{
            const res = await axios.post("/employeeServices/addService", newServices)
            setShow(false); // on success close the submission page
            window.location.reload();
        }catch (err){
            setNewErr(err.response.data)
            setSubmitClicked(true) // on error show the error
        }
    }

    // Deals with modal to add a service
    // Template from React bootstrap website
    // https://react-bootstrap.netlify.app/docs/components/modal/
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setSubmitClicked(false);
    }
    const handleShow = () => setShow(true);

    return(
      <Container className="view-services-page" fluid>
          <h1 className="mt-3">Services</h1>
          <Table className="services-table" responsive="sm">
              <thead>
              <tr>
                  <th className="header">Service</th>
                  <th></th>
                  <th className="header">Price</th>
              </tr>
              </thead>
              <tbody>
              {serviceRowInTable}
              </tbody>
          </Table>

          <Button variant="primary" onClick={handleShow}> Add New Service </Button>
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>New Service Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
                      <Form.Group className="mb-3" controlId="service-price-textarea">
                          {/*<Form.Label>SID</Form.Label>*/}
                          {/*<Form.Control*/}
                          {/*    type='number'*/}
                          {/*    placeholder='SID'*/}
                          {/*    name = 'SID'*/}
                          {/*    onChange={handleChange}*/}
                          {/*/>*/}
                      </Form.Group>
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
                      {submitClicked && (
                          <div>
                              {newErr && <p className="new-service-error-msg">{newErr}</p>}
                          </div>
                      )}
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
      </Container>
  )
}

export default ViewServices;