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



const ViewSupplies=()=>{

    const [suppliesTable, setSuppliesTable] = useState([]);

    useEffect(() => {
        const fetchSuppliesTable = async () => {
            try {
                const res = await axios.get('/viewSupplies/getSuppliesTable');
                setSuppliesTable(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchSuppliesTable();
    }, []);
    console.log(suppliesTable)




    const [uniqueProduct, setUniqueProduct] = useState([]);

    useEffect(() => {
        const fetchUniqueProduct = async () => {
            try {
                const res = await axios.get('/viewSupplies/getUniqueProduct');
                setUniqueProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUniqueProduct();
    }, []);
    console.log(uniqueProduct)



    return(
        <Container>
            <h1 className="mt-3">Suppliers of Inventory Items</h1>

            <Table responsive="sm">
                <thead>
                <tr>
                    <th className="header">Product Code</th>
                    <th className="header">Product Name</th>
                    <th className="header">Suppliers</th>
                </tr>
                </thead>

                <tbody>
                {uniqueProduct.map((product)=>{
                    return (
                        <tr>
                            <td>{product.Product_code}</td>
                            <td>{product.Product_name}</td>

                            <td>
                                {suppliesTable.map((entry, i)=>{
                                    return(
                                        entry.Product_code === product.Product_code && <p key={i}>{entry.SName} (SuID: {entry.SuID})</p>
                                    )
                                })}
                            </td>

                        </tr>
                    )})}
                </tbody>
            </Table>

        </Container>
    );
}

export default ViewSupplies;