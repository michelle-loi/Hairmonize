//import React from "react";
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './viewClient.css';
import axios from "axios";
import { Link } from "react-router-dom";


const ViewEmployees=()=>{
    //DELETE:An array with example employee data
    // const employees=[
    //     {EID:1,Fname:'John',Mname:'William',Lname:'Doe',Phone:'123-456-7890',Email:'JohnDoe@gmail.com', SalaryType: 'A'},
    //     {EID:2,Fname:'Jane',Mname:'Allison',Lname:'Doe',Phone:'987-654-3210',Email:'JaneDoe@gmail.com', SalaryType: 'B'},
    // ];

    const [ddata, setData] = useState([]);

    useEffect(() => {
        const fetchAllEmployees = async () => {
            try {
                console.log("I made it here")
                const res = await axios.get('/viewEmployee');
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllEmployees();
    }, []);

    console.log(ddata);



    const [editMode, setEditMode] = useState(false);


        const handleEditClick = () => {
            setEditMode(!editMode);
        };

        const handleInputChange = (e, EID, field) => {
            const updatedData = ddata.map(employee =>
                employee.EID === EID ? { ...employee, [field]: e.target.value } : employee
            );
            setData(updatedData);
        };

        return(
            <div>
                <h1 className="mt-3">Employees</h1>


                {editMode ? (
                    <Button variant="success" onClick={handleEditClick}>Save</Button>
                ) : (
                    <Button variant="warning" onClick={handleEditClick}>Edit</Button>
                )}

                <Table>
                    <thead>
                    <tr>
                        <th>EID</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        {/*<th>Phone Number</th>*/}
                        {/*<th>Email Address</th>*/}
                        <th>Salary Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ddata.map((employee)=>{
                        return(
                            <tr key={employee.EID}>
                                <td>{employee.EID}</td>
                                <td>
                                    {editMode ? (
                                        <input
                                            type="text"
                                            value={employee.FName}
                                            onChange={(e) => handleInputChange(e, employee.EID, 'Fname')}
                                        />
                                    ) : (
                                        employee.FName
                                    )}
                                </td>
                                <td>{employee.MName}</td>
                                <td>{employee.LName}</td>
                                {/*<td>{employee.Phone}</td>*/}
                                {/*<td>{employee.Email}</td>*/}
                                <td>{employee.SalaryType}</td>
                                <td className="button"><Button variant="danger">Delete</Button>{''}</td>
                            </tr>
                        )})}
                    </tbody>
                </Table>
            </div>
        );


}

export default ViewEmployees;