/**
 * The following code in this file is written with assistance from these YouTube videos:
 * Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE
 * Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10
 * Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
 */

import {db} from "../database.js";
import bcrypt from "bcryptjs";

export const getAccounts = (req, res) => {
    const q = "SELECT * FROM ACCOUNT";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

export const deleteAccount = (req, res) => {
    const Username = req.params.id;
    const q = "DELETE FROM ACCOUNT WHERE `Username` = ?";

    db.query(q, [Username], (err, data) => {
        if (err) return res.status(500).json("Error while deleting client. Client not deleted.");

        return res.status(200).json("Client has been deleted.");
    });
};

export const getClientCIDName = (req, res) => {
    const q = "SELECT CID, FName, MName, LName FROM CLIENT";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

export const getAccountCID = (req, res) => {
    const q = "SELECT CID FROM ACCOUNT";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

export const addAccount = (req, res) => {
    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);

    const q =
        "INSERT INTO ACCOUNT (`Username`, `Password`, `CreationDate`, `CID`, `EID`, `AccountType`) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(q, [req.body.Username, hash, req.body.CreationDate, req.body.CID, req.body.EID, req.body.AccountType], (err, data) => {
        if (err) return res.status(500).json("Error while adding account. Account not added.");

        return res.status(200).json("Account has been added.");
    });
};