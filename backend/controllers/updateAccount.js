import {db} from "../database.js";
import bcrypt from "bcryptjs";


export const updateEmployeeEmail = (req, res) => {
    const q =
        "UPDATE EMPLOYEE_EMAIL SET `EMAIL` = ? WHERE EID = ?";
    const EID = req.params.id;

    db.query(q, [req.body.email, EID], (err, data) => {
        if (err) return res.status(500).json("Error while updating email. Email not updated.");

        return res.status(200).json("Email has been updated.");
    });
};

export const updateEmployeePhone = (req, res) => {
    const q =
        "UPDATE EMPLOYEE_PHONE SET `Phone` = ? WHERE EID = ?";
    const EID = req.params.id;

    db.query(q, [req.body.phone, EID], (err, data) => {
        if (err) return res.status(500).json("Error while updating Phone Number. Phone Number not updated.");

        return res.status(200).json("Phone Number has been updated.");
    });
};


export const updateEmployee = (req, res) => {
    const q =
        "UPDATE EMPLOYEE SET `FName` = ?, `MName` = ?, `LName` = ? WHERE EID = ? ";
    const EID = req.params.id;

    db.query(q, [req.body.FName, req.body.MName, req.body.LName, EID], (err, data) => {
        if (err) return res.status(500).json("Error while updating employee. Employee not updated.");

        return res.status(200).json("Employee has been updated.");
    });
};


export const updateEmployeePassword = (req, res) => {
    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);

    const q =
        "UPDATE ACCOUNT SET `Password` = ? WHERE EID = ? ";
    const EID = req.params.id;

    db.query(q, [hash, EID], (err, data) => {
        if (err) return res.status(500).json("Error while updating password. Password not updated.");

        return res.status(200).json("Password has been updated.");
    });
};

export const updateClientEmail = (req, res) => {
    const q =
        "UPDATE CLIENT_EMAIL SET `EMAIL` = ? WHERE CID = ?";
    const CID = req.params.id;

    db.query(q, [req.body.email,CID], (err, data) => {
        if (err) return res.status(500).json("Error while updating email. Email not updated.");

        return res.status(200).json("Email has been updated.");
    });
};

export const updateClientPhone = (req, res) => {
    const q =
        "UPDATE CLIENT_PHONE SET `Phone` = ? WHERE CID = ?";
    const CID = req.params.id;

    db.query(q, [req.body.phone, CID], (err, data) => {
        if (err) return res.status(500).json("Error while updating Phone Number. Phone Number not updated.");

        return res.status(200).json("Phone Number has been updated.");
    });
};


export const updateClient = (req, res) => {
    const q =
        "UPDATE CLIENT SET `FName` = ?, `MName` = ?, `LName` = ? WHERE CID = ? ";
    const CID = req.params.id;

    db.query(q, [req.body.FName, req.body.MName, req.body.LName, CID], (err, data) => {
        if (err) return res.status(500).json("Error while updating Client. Client not updated.");

        return res.status(200).json("Client has been updated.");
    });
};


export const updateClientPassword = (req, res) => {
    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);

    const q =
        "UPDATE ACCOUNT SET `Password` = ? WHERE CID = ? ";
    const EID = req.params.id;

    db.query(q, [hash, EID], (err, data) => {
        if (err) return res.status(500).json("Error while updating password. Password not updated.");

        return res.status(200).json("Password has been updated.");
    });
};