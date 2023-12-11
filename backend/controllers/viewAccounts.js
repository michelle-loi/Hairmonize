import {db} from "../database.js";

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
    const q =
        "INSERT INTO ACCOUNT (`Username`, `Password`, `CreationDate`, `CID`, `EID`, `AccountType`) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(q, [req.body.Username, req.body.Password, req.body.CreationDate, req.body.CID, req.body.EID, req.body.AccountType], (err, data) => {
        if (err) return res.status(500).json("Error while adding account. Account not added.");

        return res.status(200).json("Account has been added.");
    });
};