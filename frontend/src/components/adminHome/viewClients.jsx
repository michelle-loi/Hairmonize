//import React from "react";
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './viewClient.css';


const ViewClients=()=>{
    //DELETE:An array with example employee data for testing
    const clients=[
        {CID:1,Fname:'Bob',Mname:'',Lname:'Smith',Phone:'123-456-7890',Email:'BobSmith@gmail.com', EID: 2},
        {CID:2,Fname:'Mary',Mname:'Ann',Lname:'Johnson',Phone:'987-654-3210',Email:'MaryAJohnson@gmail.com', EID: 1},
    ];

    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState(clients);

    const handleEditClick = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (e, CID, field) => {
        const updatedData = data.map(client =>
            client.CID === CID ? { ...client, [field]: e.target.value } : client
        );
        setData(updatedData);
    };

    return(
        <div>
            <h1 className="mt-3">Clients</h1>


            {editMode ? (
                <Button variant="success" onClick={handleEditClick}>Save</Button>
            ) : (
                <Button variant="warning" onClick={handleEditClick}>Edit</Button>
            )}

            <Table>
                <thead>
                <tr>
                    <th>CID</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email Address</th>
                    <th>EID</th>
                </tr>
                </thead>
                <tbody>
                {data.map((client)=>(
                    <tr key={client.CID}>
                        <td>{client.CID}</td>
                        <td>
                            {editMode ? (
                                <input
                                    type="text"
                                    value={client.Fname}
                                    onChange={(e) => handleInputChange(e, client.CID, 'Fname')}
                                />
                            ) : (
                                client.Fname
                            )}
                        </td>
                        <td>{client.Mname}</td>
                        <td>{client.Lname}</td>
                        <td>{client.Phone}</td>
                        <td>{client.Email}</td>
                        <td>{client.EID}</td>
                        <td className="button"><Button variant="danger">Delete</Button>{''}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ViewClients;