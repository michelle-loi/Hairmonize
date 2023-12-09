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