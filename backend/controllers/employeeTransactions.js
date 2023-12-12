import {db} from "../database.js";

export const getTransactions = (req, res)=>{

    // create query
    const q = "SELECT * FROM TRANSACTION";
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

export const addTransaction = (req, res) => {
    const q = "INSERT INTO TRANSACTION(`Date`, `Time`, `Amount`, `Method_of_payment`) VALUES (?)"
    const values = [
        req.body.Date,
        req.body.Time,
        req.body.Amount,
        req.body.Method_of_payment,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json("Error occurred while adding a transaction.");
        return res.status(200).json("Transaction added.");
    });
};

export const deleteTransaction = (req, res) => {
    const Transaction_ID = req.params.id;
    const q = "DELETE FROM TRANSACTION WHERE `Transaction_ID` = ?";

    db.query(q, [Transaction_ID], (err, data) => {
        if (err) return res.status(500).json("Error occurred while trying to delete a transaction.");
        return res.status(200).json("Transaction has been deleted.");
    });
};

