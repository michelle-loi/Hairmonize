import {db} from "../database.js";

export const getOrders = (req, res)=>{

    // create query
    const q = "SELECT * FROM ORDER";
    db.query(q, (err, data) => {

        // return error
        if(err){
            console.log(err);
            return res.status(500).json(err);
        }
        // return data
        return res.status(200).json(data);
    })
}

export const addOrder = (req, res) => {
    const q = "INSERT INTO ORDER(`Date`, `Time`, `SuID`, `EID`) VALUES (?)"
    const values = [
        req.body.Date,
        req.body.Time,
        req.body.SuID,
        req.body.EID,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json("Error occurred while adding a transaction.");
        return res.status(200).json("Transaction added.");
    });
};

export const deleteOrder = (req, res) => {
    const SID = req.params.id;
    const q = "DELETE FROM ORDER WHERE `Order_ID` = ?";

    db.query(q, [SID], (err, data) => {
        if (err) return res.status(500).json("Error occurred while trying to delete a service.");
        return res.status(200).json("Service has been deleted.");
    });
};

