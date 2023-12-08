import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { BsTrash3Fill } from "react-icons/bs";
import {Button, Container, Form, Modal} from "react-bootstrap";

import "./ViewTransactions.css"
import Alert from "react-bootstrap/Alert";


const ViewTransactions = () => {

    // To get transactions
    const[transactions, setTransaction] = useState([])

    // For deleting transactions
    const handleDelete = async (Transaction_ID)=> {
        try{
            await axios.delete(`/employeeTransactions/deleteTransaction/${Transaction_ID}`);
        }catch (err){
            console.log(err);
        }
    }

    // Get Transactions
    useEffect(() => {
        const fetchTransactions = async ()=>{
            try{
                const res = await axios.get("/employeeTransactions/getTransactions") // whatever it is called first in route / function name
                setTransaction(res.data)
            }catch (err){
                console.log(err)
            }
        }
        fetchTransactions();
    }, []);

    // Function to display transactions by mapping through them
    const transactionRowInTable = transactions.map((transaction) => (
        <tr key={transaction.Transaction_ID}>
            <td>
                <Button className="transaction-trash-icon" variant="light" onClick={()=>handleDelete(transaction.Transaction_ID)}>
                    <BsTrash3Fill/>
                </Button>
            </td>
            <td>{transaction.Transaction_ID}</td>
            <td>{transaction.Date.split('T')[0]}</td> {/* Only want the date remove the time */}
            <td>{transaction.Time}</td>
            <td>${transaction.Amount}</td>
            <td>{transaction.Method_of_payment}</td>
        </tr>
    ));

    // Insert into transaction table
    const [newTransactions, setNewTransactions] = useState({
        Transaction_ID:"",
        Date:"",
        Time:"",
        Amount:"",
        Method_of_payment:"",
    })

    // holds what the user selected as payment type
    const [payment, setPayment] = useState('');

    // for showing errors
    const [error, setError] = useState('');

    // for input fields to read them
    const handleChange = e =>{
        setNewTransactions(prev=>({...prev, [e.target.name]: e.target.value}))
        setPayment(e.target.value); // change the dropdown value
    }

    //  for submitting new transaction
    const handleSubmit = async e =>{
        //Check if a valid option is selected
        if(newTransactions.Date === ''){
            setError('Please enter the date');
            return; // do not submit the information
        } else if(newTransactions.Time === ''){
            setError('Please enter the time');
            return; // do not submit the information
        } else if(newTransactions.Amount === ''){
            setError('Please enter the amount');
            return; // do not submit the information
        } else if (payment === '' || newTransactions.Method_of_payment === '') {
            setError('Please select a payment option');
            return; // do not submit the information
        }
        setError('');

        try{
            const res = await axios.post("/employeeTransactions/addTransaction", newTransactions)
            // clear the fields for next time
            newTransactions.Date = '';
            newTransactions.Time = '';
            newTransactions.Amount = '';
            newTransactions.Method_of_payment = '';
            setShow(false); // on success close the submission page
        }catch (err){
            console.log(err)
        }
    }

    // Deals with modal to add a transaction
    // Template from React bootstrap website
    // https://react-bootstrap.netlify.app/docs/components/modal/
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setError(''); // close remove the error message
        // clear the fields for next time
        newTransactions.Date = '';
        newTransactions.Time = '';
        newTransactions.Amount = '';
        newTransactions.Method_of_payment = '';
    }

    const handleShow = () => setShow(true); // to show modal

    return(
       <Container className="view-transaction-page" fluid>
           <h1 className="mt-3">Transactions</h1>

           {/* to add transaction*/}
           <div className="add-new-transaction-b">
               <Button variant="primary" onClick={handleShow}> Add New Transaction </Button>
           </div>
           <Modal show={show} onHide={handleClose}>
               <Modal.Header closeButton>
                   <Modal.Title>New Transaction Form</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                   <Form>
                       <Form.Group className="mb-3" controlId="transaction-date-textarea">
                           <Form.Label>Transaction Date</Form.Label>
                           <Form.Control
                               type='date'
                               autoFocus
                               name = 'Date'
                               onChange={handleChange}
                           />
                       </Form.Group>
                       <Form.Group className="mb-3" controlId="transaction-time-textarea">
                           <Form.Label>Transaction Time</Form.Label>
                           <Form.Control
                               type='time'
                               name = 'Time'
                               onChange={handleChange}
                           />
                       </Form.Group>
                       <Form.Group className="mb-3" controlId="transaction-time-textarea">
                           <Form.Label>Transaction Amount</Form.Label>
                           <Form.Control
                               type='number'
                               placeholder='$0.00'
                               min='0'
                               step='0.01'
                               name = 'Amount'
                               onChange={handleChange}
                           />
                       </Form.Group>
                       <Form.Group className="mb-3" controlId="transaction-time-textarea">
                           <Form.Label>Method of Payment</Form.Label>
                           <Form.Control
                               as="select"
                               name='Method_of_payment'
                               value={payment}
                               onChange={handleChange}
                           >
                               <option value="" disabled>Select...</option>
                               <option value="Cash">Cash</option>
                               <option value="Credit">Credit</option>
                               <option value="Debit">Debit</option>
                               <option value="Cheque">Cheque</option>
                           </Form.Control>
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
           <Table className="transactions-table" responsive="sm">
               <thead>
               <tr>
                   <th></th>
                   <th className="header">Transaction ID</th>
                   <th className="header">Date</th>
                   <th className="header">Time</th>
                   <th className="header">Amount</th>
                   <th className="header">Method of Payment</th>
               </tr>
               </thead>
               <tbody>
               {transactionRowInTable}
               </tbody>
           </Table>
       </Container>
    )
}

export default ViewTransactions;