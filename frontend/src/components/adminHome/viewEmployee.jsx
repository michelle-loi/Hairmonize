import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './viewEmployee.css';

const viewEmployee=()=>{

    //DELETE:An array with example employee data for testing
    const employees=[
        {EID:1,Fname:'John',Mname:'William',Lname:'Doe',Phone:'123-456-7890',Email:'JohnDoe@gmail.com', SalaryType: 'A'},
        {EID:2,Fname:'Jane',Mname:'Allison',Lname:'Doe',Phone:'987-654-3210',Email:'JaneDoe@gmail.com', SalaryType: 'B'},
    ];


    return(
        <>
            <h1 className="mt-3">Employees</h1>

            <Table>
                <thead>
                <tr>
                    <th>EID</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email Address</th>
                    <th>Salary Type</th>
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
                        <td>{employee.SalaryType}</td>
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