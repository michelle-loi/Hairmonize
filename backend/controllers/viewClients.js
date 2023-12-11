import {db} from "../database.js";


//*********FOR VIEWING CLIENTS*********
export const getClients = (req, res) => {
    const q = "SELECT * FROM CLIENT";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

export const getClientEmails = (req, res) => {
    const q =
        "SELECT * FROM CLIENT_EMAIL";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const getClientPhones = (req, res) => {
    const q =
        "SELECT * FROM CLIENT_PHONE";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const deleteClient = (req, res) => {
    const CID = req.params.id;
    const q = "DELETE FROM CLIENT WHERE `CID` = ?";

    db.query(q, [CID], (err, data) => {
        if (err) return res.status(500).json("Error while deleting client. Client not deleted.");

        return res.status(200).json("Client has been deleted.");
    });
};

//*********FOR ADDING CLIENTS*********
export const addClient = (req, res) => {
    const q =
        "INSERT INTO CLIENT (`FName`, `MName`, `LName`, `EID`) VALUES (?, ?, ?, ?)";

    db.query(q, [req.body.FName, req.body.MName, req.body.LName, req.body.EID], (err, data) => {
        if (err) return res.status(500).json("Error while adding client. Client not added.");

        const lastInsertedCID = data.insertId;

        return res.status(200).json({ message: "Client has been added.", cid: lastInsertedCID });
    });
};

export const addEmail = (req, res) => {
    const q =
        "INSERT INTO CLIENT_EMAIL (`CID`, `Email`) VALUES (?, ?)";

    db.query(q, [req.body.cid, req.body.email], (err, data) => {
        if (err) return res.status(500).json("Error while adding email. Email not added.");

        return res.status(200).json("Email has been added.");
    });
};

export const addPhone = (req, res) => {
    const q =
        "INSERT INTO CLIENT_PHONE (`CID`, `Phone`) VALUES (?, ?)";

    db.query(q, [req.body.cid, req.body.phone], (err, data) => {
        if (err) return res.status(500).json("Error while adding phone. Phone not added.");

        return res.status(200).json("Phone has been added.");
    });
};

export const getStylistEID = (req, res) => {
    const q = "SELECT * FROM STYLIST";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

export const getEmployeeEIDName = (req, res) => {
    const q = "SELECT EID, FName, MName, LName FROM EMPLOYEE";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};