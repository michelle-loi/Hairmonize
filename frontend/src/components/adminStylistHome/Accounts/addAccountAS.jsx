import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {MdDelete} from "react-icons/md";

const AddAccountAS = () => {
    const location = useLocation();
    const navigate = useNavigate();



    //**********************CLIENTS TO SELECT FROM**************************
    const [clientCIDName, setClientCIDName] = useState([]);
    const [accountCID, setAccountCID] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');


    useEffect(() => {
        const fetchAllClientCIDName = async () => {
            try {
                const res = await axios.get('/viewAccounts/clientCIDName');
                setClientCIDName(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllClientCIDName();
    }, []);
    //console.log(clientCIDName);

    useEffect(() => {
        const fetchAllAccountCID = async () => {
            try {
                const res = await axios.get('/viewAccounts/accountCID');
                setAccountCID(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllAccountCID();
    }, []);
    //console.log(accountCID);

    const createClientsWithoutAccount = (accountCID, clientCIDName) => {
        return clientCIDName.map((client) => {
            const accountExistsForThisClient = accountCID.some((account) => account.CID === client.CID);

            if (!accountExistsForThisClient) {
                const { CID, FName, MName, LName } = client;
                return { CID, FName, MName, LName };
            }

            return null;
        }).filter(Boolean);
    };
    const clientsWithoutAccount = createClientsWithoutAccount(accountCID, clientCIDName);
    //console.log(clientsWithoutAccount);

    //*****************************************************************

    //**********************ADDING ACCOUNT**************************
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const addAccount = async () => {
        const currentDate = new Date();
        const partiallyFormattedDate = currentDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        const withSpacesFormattedDate = partiallyFormattedDate.replace(/\./g, '-');
        const withLastDotFormattedDate = withSpacesFormattedDate.replace(/\s/g, '');
        const mysqlFormattedDate = withLastDotFormattedDate.slice(0, -1);
        console.log(mysqlFormattedDate);

        try{
            await axios.post(`/viewAccounts/addAccount`, {Username: newUsername, Password: newPassword, CreationDate: mysqlFormattedDate, CID: selectedClient, EID: null, AccountType: 1});
        } catch (err) {
            console.log(err);
        }
    }
    //*****************************************************************


    const handleAdd = (e) => {
        //e.preventDefault();
        addAccount();

        navigate('/adminStylistHome');
    }

    const handleCancel = async () => {
        navigate('/adminStylistHome');
    }


    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">

            <Form onSubmit={handleAdd}>
                <Form.Label>
                    <h1>Create a new account for a client</h1>
                </Form.Label>

                <Form.Group className="mb-3" controlId="Client">
                    <Form.Label>Client to create account for <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        required
                    >
                        <option value=''>Select client</option>
                        {clientsWithoutAccount.map((client, i)=>{
                            return(
                                <option value={client.CID}>{client.FName} {client.MName} {client.LName} (CID: {client.CID})</option>
                            )
                        })}
                    </Form.Control>
                    <Form.Text>If you do not see the client you want to create an account for, it is either: <br></br>
                        - The client has not been created yet. Go to the 'Clients' tab and create the client first, then create their account. <br></br>
                        - The client already has an account. Go back to the 'Accounts' tab and delete the client's account. Then create a new account for them.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Username">
                    <Form.Label>Username <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Password">
                    <Form.Label>Password <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </Form.Group>


                <Button type="submit" variant="success" style={{ marginRight: '10px' }}>
                    Create Account
                </Button>
                <Button onClick={handleCancel} variant="secondary">
                    Cancel
                </Button>

            </Form>

        </Container>
    )
}

export default AddAccountAS;