import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {MdDelete} from "react-icons/md";

const AddInventory = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [newProductName, setNewProductName] = useState('');
    const [newPrice, setNewPrice] = useState(null);
    const [newQuantity, setNewQuantity] = useState(null);
    const [merchSupp, setMerchSupp] = useState('');


    const addProduct = async () => {
        let Is_Merch = null;
        let Is_Supp = null;
        if (merchSupp === 'Merchandise & Supply'){
            Is_Merch = 1;
            Is_Supp = 1;
        } else if (merchSupp === 'Merchandise'){
            Is_Merch = 1;
            Is_Supp = 0;
        } else if (merchSupp === 'Supply'){
            Is_Merch = 0;
            Is_Supp = 1;
        }

        try{
            await axios.post(`/viewInventory/addProduct`, {Product_name: newProductName, Price: newPrice, Quantity: newQuantity, Is_Merchandise: Is_Merch, Is_Supply: Is_Supp});
        } catch (err) {
            console.log(err);
        }
    }


    const handleAdd = (e) => {
        //e.preventDefault();
        addProduct();

        navigate('/adminhome');
    }

    const handleCancel = async () => {
        navigate('/adminhome');
    }


    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">

            <Form onSubmit={handleAdd}>
                <Form.Label>
                    <h1>Add new product</h1>
                </Form.Label>

                <Form.Group className="mb-3" controlId="Product_name">
                    <Form.Label>Product  Name<span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        onChange={(e) => setNewProductName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Price">
                    <Form.Label>Price <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter price"
                        onChange={(e) => setNewPrice(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Quantity">
                    <Form.Label>Quantity <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter quantity"
                        onChange={(e) => setNewQuantity(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="MerchSupp">
                    <Form.Label>Product Use <span style={{ color: 'red'}}>*</span></Form.Label>
                    <Form.Control
                        as="select"
                        value={merchSupp}
                        onChange={(e) => setMerchSupp(e.target.value)}
                        required
                    >
                        <option value="">Select product use</option>
                        <option value="Merchandise">Merchandise</option>
                        <option value="Supply">Supply</option>
                        <option value="Merchandise & Supply">Merchandise & Supply</option>
                    </Form.Control>
                </Form.Group>


                <Button type="submit" variant="success" style={{ marginRight: '10px' }}>
                    Add Product
                </Button>
                <Button onClick={handleCancel} variant="secondary">
                    Cancel
                </Button>

            </Form>

        </Container>
    )
}

export default AddInventory;