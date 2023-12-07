import {db} from "../database.js";

export const getCustomer = (req, res) => {
    const q =
        "SELECT * FROM CLIENT WHERE CID = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};


export const getCustomerEmail = (req, res) => {
    const q =
        "SELECT EMAIL FROM CLIENT_EMAIL WHERE CID = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};


export const getCustomerPhone = (req, res) => {
    const q =
        "SELECT Phone FROM CLIENT_PHONE WHERE CID = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};