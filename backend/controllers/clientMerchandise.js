import {db} from "../database.js";

export const getMerchandiseList = (req, res) => {
    const q = "SELECT Product_code, Product_name, Price FROM INVENTORY WHERE Is_Merchandise = 1";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};