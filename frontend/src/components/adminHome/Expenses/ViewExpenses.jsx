import React, {useContext, useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import {Button, Container, Form, Modal} from "react-bootstrap";

import "./ViewExpenses.css"
import Alert from "react-bootstrap/Alert";
import {AuthContext} from "../../../context/authContext";


const ViewExpenses = () => {
    const {currentUser} = useContext(AuthContext);

    // To get expenses
    const[expenses, setExpenses] = useState([])

    // Function to fetch expenses
    const fetchExpenses = async () => {
        try {
            const res = await axios.get("/viewExpenses/getExpenses");
            setExpenses(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Get Expenses
    useEffect(() => {
        fetchExpenses();
    }, []);



    // For deleting expenses
    const handleDelete = async (ExID)=> {
        try{
            await axios.delete(`/viewExpenses/deleteExpense/${ExID}`);
            // update table
            fetchExpenses();
        }catch (err){
            console.log(err);
        }
    }



    // Function to display expenses by mapping through them
    const expenseRowInTable = expenses.map((expense) => (
        <tr key={expense.ExID}>
            <td>
                <Button className="expense-trash-icon" variant="light" onClick={()=>handleDelete(expense.ExID)}>
                    <BsTrash3Fill/>
                </Button>
            </td>
            <td>{expense.ExID}</td>
            <td>{expense.Date.split('T')[0]}</td>
            <td>{expense.Time}</td>
            <td>${expense.Amount}</td>
            <td>{expense.Description}</td>
            <td>{expense.EID}</td>
        </tr>
    ));

    // Insert into expense table
    const [newExpenses, setNewExpenses] = useState({
        ExID:"",
        Date:"",
        Time:"",
        Amount:"",
        Description:"",
        EID:"",
    })

    // for showing errors
    const [error, setError] = useState('');

    // for input fields to read them
    const handleChange = e =>{
        setNewExpenses(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    //  for submitting new expenses
    const handleSubmit = async e =>{
        //Check if a valid option is selected
        if(newExpenses.Date === ''){
            setError('Please enter the date the expense was made');
            return; // do not submit the information
        } else if(newExpenses.Amount === ''){
            setError('Please enter the expense amount');
            return; // do not submit the information
        }
        setError('');

        try{
            newExpenses.EID = currentUser.EID;
            const res = await axios.post("/viewExpenses/addExpense", newExpenses)
            // update table
            fetchExpenses();
            // clear the fields for next time
            newExpenses.Date = '';
            newExpenses.Time = '';
            newExpenses.Amount = '';
            newExpenses.Description = '';
            setShow(false); // on success close the submission page
        }catch (err){
            setError('Error occurred while adding expense...');
        }
    }



    // Deals with modal to add an expense
    // Template from React bootstrap website
    // https://react-bootstrap.netlify.app/docs/components/modal/
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setError(''); // close remove the error message
        // clear the fields for next time
        newExpenses.Date = '';
        newExpenses.Time = '';
        newExpenses.Amount = '';
        newExpenses.Description = '';
    }

    const handleShow = () => setShow(true); // to show modal

    // get the year, month, and totals for filtering
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [totals, setTotal] = useState('')

    // filter total expenses
    const filterTotalExpenses = async () => {
        try {
            const iData = {
                Month: month,
                Year: year,
            }

            const res = await axios.post("/viewExpenses/filterAggregateExpenses", iData);
            setTotal(res.data)
        } catch (err) {
            console.log(err)
        }
    };

    return(
        <Container className="view-expense-page" fluid>
            <h1 className="mt-3">Expenses</h1>

            {/* to add expense*/}
            <div className="add-new-expense-b">
                <Button variant="primary" onClick={handleShow}> Add New Expense </Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="expense-date-textarea">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type='date'
                                autoFocus
                                name = 'Date'
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="expense-time-textarea">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type='time'
                                name = 'Time'
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="expense-amount-textarea">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type='number'
                                step='0.01'
                                min='0'
                                placeholder='$'
                                name = 'Amount'
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="expense-description-textarea">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name = 'Description'
                                type="text"
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
            <Table className="expenses-table" responsive="sm">
                <thead>
                <tr>
                    <th></th>
                    <th className="header">ExID</th>
                    <th className="header">Date</th>
                    <th className="header">Time</th>
                    <th className="header">Amount</th>
                    <th className="header">Description</th>
                    <th className="header">EID</th>
                </tr>
                </thead>
                <tbody>
                {expenseRowInTable}
                </tbody>
            </Table>

            {/* User selection of expenses */}
            <Form className="mt-5">
                <Form.Group className="mb-3" controlId="expense-get-year">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                        type='number'
                        autoFocus
                        name = 'Year'
                        onChange={(e) => setYear(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="expense-get-month">
                    <Form.Label>Month</Form.Label>
                    <Form.Control
                        type='number'
                        name = 'Month'
                        onChange={(e) => setMonth(e.target.value)}
                    />
                </Form.Group>
            </Form>
             <Button variant="primary" onClick={filterTotalExpenses}> Filter </Button>

            {/* Display total expenses based on selection */}
            <Table className="aggregate-expenses" responsive="sm">
                <thead>
                <tr>
                    <th className="header">Total</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{totals && totals[0] && totals[0].Total}</td>
                </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default ViewExpenses;