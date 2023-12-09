import {db} from "../database.js";


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