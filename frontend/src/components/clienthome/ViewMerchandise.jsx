/**
 * The following code in this file is written with assistance from these YouTube videos:
 * Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE
 * Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10
 * Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
 */

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