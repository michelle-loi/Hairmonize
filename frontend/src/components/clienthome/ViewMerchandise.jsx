import React, {useEffect, useState} from "react";
import {Container, Table} from "react-bootstrap";
import axios from "axios";

const ViewMerchandise = () => {

    const[merchandiseList, setMerchandiseList] = useState([]);

    useEffect(() => {
        const fetchMerchandiseList = async ()=>{
            try{
                const res = await axios.get("/clientMerchandise/getMerchandiseList")
                setMerchandiseList(res.data)
            }catch (err){
                console.log(err)
            }
        }
        fetchMerchandiseList();
    }, []);
    //console.log(merchandiseList)

    return (
        <Container>
            <h1 className="mt-3">Merchandise for Sale</h1>

            <Table responsive="sm">
                <thead>
                <tr>
                    <th className="header">Product Name</th>
                    <th className="header">Price</th>
                </tr>
                </thead>

                <tbody>
                {merchandiseList.map((product) => {
                    return (
                        <tr>
                            <td>{product.Product_name}</td>
                            <td>${product.Price}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </Container>
    )
}

export default ViewMerchandise