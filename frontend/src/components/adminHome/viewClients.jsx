import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './viewClient.css';

const viewClients=()=>{

    //DELETE:An array with example employee data for testing
    const clients=[
        {CID:1,Fname:'Bob',Mname:'',Lname:'Smith',Phone:'123-456-7890',Email:'BobSmith@gmail.com', EID: 2},
        {CID:2,Fname:'Mary',Mname:'Ann',Lname:'Johnson',Phone:'987-654-3210',Email:'MaryAJohnson@gmail.com', EID: 1},
    ];


    return(
        <>
            <h1 className="mt-3">Clients</h1>

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
                {clients.map((client)=>(
                    <tr>
                        <td>{client.CID}</td>
                        <td>{client.Fname}</td>
                        <td>{client.Mname}</td>
                        <td>{client.Lname}</td>
                        <td>{client.Phone}</td>
                        <td>{client.Email}</td>
                        <td>{client.EID}</td>
                        <td className="button"><Button variant="danger">Delete</Button>{''}</td>
                        <td className="button"><Button variant="warning">Edit</Button>{''}</td>
                        <td className="button"><Button variant="success">Save</Button>{''}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default viewClients;