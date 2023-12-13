/**
 * The following code in this file is written with assistance from these YouTube videos:
 * Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE
 * Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10
 * Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
 */

import {db} from "../database.js";

export const getSuppliers = (req, res)=>{
    // create query
    const q = "SELECT * FROM SUPPLIER";
    db.query(q, (err, data) => {

        // return error
        if(err){
            console.log(err);
            return res.status(500).json(err);
        }
        // return data
        return res.status(200).json(data);
    })
}

export const addSupplier = (req, res) => {
    const q = "INSERT INTO SUPPLIER(`SName`, `Email`, `Address`, `Phone`, `Fax`) VALUES (?)"
    const values = [
        req.body.SName,
        req.body.Email,
        req.body.Address,
        req.body.Phone,
        req.body.Fax,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json("Error occurred while adding a supplier.");
        return res.status(200).json("Supplier added.");
    });
};

export const deleteSupplier = (req, res) => {
    const SuID = req.params.id;
    const q = "DELETE FROM SUPPLIER WHERE `SuID` = ?";

    db.query(q, [SuID], (err, data) => {
        if (err) return res.status(500).json("Error occurred while trying to delete a supplier.");
        return res.status(200).json("Supplier has been deleted.");
    });
};

export const updateSupplier = (req, res) => {
    const q =
        "UPDATE SUPPLIER SET `SName` = ?, `Email` = ?, `Address` = ?, `Phone` = ?, `Fax` = ? WHERE SuID = ?";
    const SuID = req.params.id;

    db.query(q, [req.body.SName, req.body.Email, req.body.Address, req.body.Phone, req.body.Fax, SuID], (err, data) => {
        if (err) return res.status(500).json("Error while updating supplier. Supplier not updated.");

        return res.status(200).json("Supplier has been updated.");
    });
};
