//import React from "react";
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Table, Modal } from 'react-bootstrap';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";


const ViewAccounts=()=>{

    const [accountTable, setClientTable] = useState([]);


    useEffect(() => {
        const fetchAllAccounts = async () => {
            try {
                const res = await axios.get('/viewAccounts/AccountTable');
                setClientTable(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllAccounts();
    }, []);

    //DELETE: for testing
    //console.log(accountTable);



    const handleDelete = async (Username, AccountType)=>{
        if(AccountType !== 1){
            setShowPopup(true);
        } else{
            try {
                const res = await axios.delete(`/viewAccounts/deleteAccount/${Username}`);
                //console.log(res.data);
                window.location.reload(); //THIS RELOADING THE WINDOW IS NEEDED, UNLESS THE SECOND DELETE THROWS A 500 ERROR
            } catch (err) {
                console.log(err);
            }
        }
    };

    //****************WHEN DELETE FOR EMPLOYEE ACCOUNT IS CLICKED*************************
    const [showPopup, setShowPopup] = useState(false);

    const handleCloseButtonClick = () => {
        setShowPopup(false);
    };

    //************************************************************************************



    return(
        <div>

            <div className="d-flex align-items-center mt-3 justify-content-start">
                <h1 className="mt-3">Accounts</h1>

                <Link className="link" to={`/adminhome/addClient`}>
                    <Button variant="success" style={{ marginTop: '20px' , marginLeft: '20px'}}>Add new account for client</Button>
                </Link>
            </div>

            <Modal show={showPopup} onHide={handleCloseButtonClick}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Cannot delete an employee account because all employees are required to have an account. Delete employee account by deleting the employee in 'Employees' tab.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseButtonClick}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <Table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Creation Date</th>
                    <th>CID</th>
                    <th>EID</th>
                    <th>Account Type</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {accountTable.map((account)=>{

                    return(
                        <tr key={account.Username}>
                            <td>{account.Username}</td>
                            <td>{(account.CreationDate || '').split('T')[0]}</td>
                            <td>{account.CID}</td>
                            <td>{account.EID}</td>
                            <td>
                                {account.AccountType === 0
                                ? <p>Stylist</p>
                                : account.AccountType === 1
                                ? <p>Client</p>
                                : account.AccountType === 2
                                ? <p>Admin</p>
                                : account.AccountType === 3
                                ? <p>Admin + Stylist</p>
                                : <p>Unknown</p>}
                            </td>


                            <td><Button onClick={() => handleDelete(account.Username, account.AccountType)} variant="danger"><BsTrash3Fill/></Button>{''}</td>
                        </tr>
                    )})}
                </tbody>
            </Table>
        </div>
    );
}

export default ViewAccounts;