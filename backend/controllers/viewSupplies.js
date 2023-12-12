import {db} from "../database.js";

export const getSuppliesTable = (req, res) => {
    const q = "SELECT Product_code, Product_name, SuID, SName FROM SUPPLIES NATURAL JOIN SUPPLIER NATURAL JOIN INVENTORY ORDER BY Product_code ASC";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

export const getUniqueProduct = (req, res) => {
    const q = "SELECT DISTINCT Product_code, Product_name FROM SUPPLIES NATURAL JOIN INVENTORY";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};