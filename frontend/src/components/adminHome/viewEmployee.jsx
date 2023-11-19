import React from "react";
import {Container,Row} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './viewEmployee.css';

const viewEmployee=()=>{

    //DELETE:Anarraywithexampleemployeedatafortesting
    const employees=[
        {EID:1,Fname:'John',Mname:'James',Lname:'Doe',Phone:'123-456-7890',Email:'JoneDoe@gmail.com'},
        {EID:2,Fname:'Jane',Mname:'Allison',Lname:'Doe',Phone:'987-654-3210',Email:'JaneDoe@gmail.com'},
    ];


    return(
        <>
            <h1 className="mt-3">Employees</h1>

            <Table>
                <thead>
                <tr>
                    <th>EID</th>
                    <th>FirstName</th>
                    <th>MiddleName</th>
                    <th>LastName</th>
                    <th>PhoneNumber</th>
                    <th>EmailAddress</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee)=>(
                    <tr>
                        <td>{employee.EID}</td>
                        <td>{employee.Fname}</td>
                        <td>{employee.Mname}</td>
                        <td>{employee.Lname}</td>
                        <td>{employee.Phone}</td>
                        <td>{employee.Email}</td>
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

export default viewEmployee;