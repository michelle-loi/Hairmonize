import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";



const EditInventory= () => {

    //**********************PRODUCT**************************
    const location = useLocation();
    const navigate = useNavigate();
    const Product_code = location.pathname.split("/")[3];

    const [currentProductInfo, setCurrentProductInfo] = useState({});
    const [newProductInfo, setNewProductInfo] = useState({
        Product_name:'',
        Price: 0,
        Quantity: 0,
        // Product_t:'',
        Is_Merchandise: 0,
        Is_Supply: 0
    });
    const [merchSupp, setMerchSupp] = useState('');


    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                const res = await axios.get(`/viewInventory/getOneProduct/${Product_code}`);
                setCurrentProductInfo(res.data[0]); //Doing data[0] instead of data so in currentProductInfo, it gets stored as an object, not an array.
                setNewProductInfo(res.data[0]);
                if ((res.data[0].Is_Merchandise === 1) && (res.data[0].Is_Supply === 1)){
                    setMerchSupp('Merchandise & Supply');
                } else if (res.data[0].Is_Merchandise === 1){
                    setMerchSupp('Merchandise');
                } else if(res.data[0].Is_Supply === 1){
                    setMerchSupp('Supply');
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchProductInfo()
    }, []);
    //DELETE: for testing
    console.log(JSON.stringify(newProductInfo));
    console.log(newProductInfo);

    const updateProduct = async () => {
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

        try {
            await axios.put(`/viewInventory/updateProduct/${Product_code}`,
                {Product_name: newProductInfo.Product_name, Price: newProductInfo.Price, Quantity: newProductInfo.Quantity, Is_Merchandise: Is_Merch, Is_Supply: Is_Supp});
        } catch (err) {
            console.log(err);
        }
    }
    //*****************************************************************

    //**********************IS_MERCHANDISE/IS_SUPPLY**************************
    // const [merchandiseChecked, setMerchandiseChecked] = useState(false);
    // const [supplyChecked, setSupplyChecked] = useState(false);
    // const isAtLeastOneChecked = merchandiseChecked || supplyChecked;

    //const [merchSupp, setMerchSupp] = useState('');

    // const handleMerchSuppChange = (event) => {
    //     setMerchSupp(event.target.value);
    //
    //     if (event.target.value === 'Merchandise & Supply'){
    //         setNewProductInfo({...newProductInfo, Is_Merchandise: 1});
    //         setNewProductInfo({...newProductInfo, Is_Supply: 1});
    //     } else if (event.target.value === 'Merchandise'){
    //         setNewProductInfo({...newProductInfo, Is_Merchandise: 1});
    //         setNewProductInfo({...newProductInfo, Is_Supply: 0});
    //     } else if (event.target.value === 'Supply'){
    //         setNewProductInfo({...newProductInfo, Is_Merchandise: 0});
    //         setNewProductInfo({...newProductInfo, Is_Supply: 1});
    //     }
    //     console.log(newProductInfo);
    // }


    //*****************************************************************

    const handleUpdate = (event) => {
        updateProduct();

        navigate('/adminhome');
    }

    const handleCancel = async () => {
        navigate('/adminhome');
    }

    //*****************************************************************

    return(
        <Container className="d-flex align-items-center justify-content-center vh-100">

            <Form onSubmit={handleUpdate}>
                <Form.Label>
                    <h1>Edit Inventory (Product Code: {Product_code})</h1>
                </Form.Label>


                <Form.Group className="mb-3" controlId="Product_name">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={currentProductInfo.Product_name}
                        defaultValue={currentProductInfo.Product_name}
                        onChange={(e) => setNewProductInfo({...newProductInfo, Product_name: e.target.value})}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={currentProductInfo.Price}
                        defaultValue={currentProductInfo.Price}
                        onChange={(e) => setNewProductInfo({...newProductInfo, Price: e.target.value})}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder={currentProductInfo.Quantity}
                        defaultValue={currentProductInfo.Quantity}
                        onChange={(e) => setNewProductInfo({...newProductInfo, Quantity: e.target.value})}
                        required
                    />
                </Form.Group>

                {/*<Form.Group className="mb-3" controlId="Product_t">*/}
                {/*    <Form.Label>Product Type</Form.Label>*/}
                {/*    <Form.Control*/}
                {/*        type="text"*/}
                {/*        placeholder={currentProductInfo.Product_t}*/}
                {/*        defaultValue={currentProductInfo.Product_t}*/}
                {/*        onChange={(e) => setNewProductInfo({...newProductInfo, Product_t: e.target.value})}*/}
                {/*        //required*/}
                {/*    />*/}
                {/*</Form.Group>*/}

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
                    Update
                </Button>
                <Button onClick={handleCancel} variant="secondary">
                    Cancel
                </Button>

            </Form>
        </Container>
    );
}

export default EditInventory;