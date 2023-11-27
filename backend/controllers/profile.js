import {db} from "../database.js";


//IMPORTANT: the order has to be (req, res), not (res, req)
export const getPersonalInfo = (req, res) => {
    const q = "SELECT * FROM EMPLOYEE";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};
