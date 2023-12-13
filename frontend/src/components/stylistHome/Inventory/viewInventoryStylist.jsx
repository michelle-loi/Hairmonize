/**
 * The following code in this file is written with assistance from these YouTube videos:
 * Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE
 * Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10
 * Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
 */

//import React from "react";
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Table, Modal } from 'react-bootstrap';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";



const ViewInventoryStylist=()=>{

    const [inventoryTable, setInventoryTable] = useState([]);


    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await axios.get('/viewInventory/getInventory');
                setInventoryTable(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchInventory();
    }, []);

    const [totalInventoryValue, setTotalInventoryValue] = useState(null);
    useEffect(() => {
        const fetchTotalInventoryValue= async () => {
            try {
                const res = await axios.get('/viewInventory/getTotalInventoryValue');
                setTotalInventoryValue(res.data[0].total);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTotalInventoryValue();
    }, []);



    const handleDelete = async (Product_code)=>{
        try {
            const res = await axios.delete(`/viewInventory/deleteInventory/${Product_code}`);
            //console.log(res.data);
            window.location.reload(); //THIS RELOADING THE WINDOW IS NEEDED, UNLESS THE SECOND DELETE THROWS A 500 ERROR
        } catch (err) {
            console.log(err);
        }
    };

    //****************WHEN DELETE FOR EMPLOYEE ACCOUNT IS CLICKED*************************


    //************************************************************************************



    return(
        <div>

            <div className="d-flex align-items-center mt-3 justify-content-start">
                <h1 className="mt-3">Inventory</h1>

                <Link className="link" to={`/stylistHome/addInventory`}>
                    <Button variant="success" style={{ marginTop: '20px' , marginLeft: '20px'}}>Add new product</Button>
                </Link>
            </div>


            <Table>
                <thead>
                <tr>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    {/*<th>Type</th>*/}
                    <th>Sold as Merchandise?</th>
                    <th>Used as Salon Supply?</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {inventoryTable.map((item)=>{

                    return(
                        <tr key={item.Product_code}>
                            <td>{item.Product_code}</td>
                            <td>{item.Product_name}</td>
                            <td>${item.Price}</td>
                            <td>{item.Quantity}</td>
                            {/*<td>{item.Product_t}</td>*/}
                            <td>
                                {item.Is_Merchandise === 1
                                    ? <p>Yes</p>
                                    : <p>No</p>}
                            </td>
                            <td>
                                {item.Is_Supply === 1
                                    ? <p>Yes</p>
                                    : <p>No</p>}
                            </td>

                            <td>
                                <Link className="link" to={`/stylistHome/editInventory/${item.Product_code}`}>
                                    <Button variant="warning"><FaEdit /></Button>
                                </Link>
                            </td>


                            <td><Button onClick={() => handleDelete(item.Product_code)} variant="danger"><BsTrash3Fill/></Button>{''}</td>
                        </tr>
                    )})}
                </tbody>
            </Table>

            <h3>Total value of all items in inventory: ${totalInventoryValue}</h3>

        </div>
    );
}

export default ViewInventoryStylist;