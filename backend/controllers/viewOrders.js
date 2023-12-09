import {db} from "../database.js";

export const getOrders = (req, res)=>{

    // create query
    const q = "SELECT * FROM `ORDER`";
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

export const deleteOrder = (req, res) => {
    const Order_ID = req.params.id;
    const q = "DELETE FROM `ORDER` WHERE `Order_ID` = ?";

    db.query(q, [Order_ID], (err, data) => {
        if (err) return res.status(500).json("Error occurred while trying to delete an Order.");
        return res.status(200).json("Order has been deleted.");
    });
};

export const addOrder = (req, res) => {
    const selectedDate = new Date(req.body.selectedDate);
    // date components
    const year = selectedDate.getUTCFullYear();
    const month = selectedDate.getUTCMonth() + 1;
    const day = selectedDate.getUTCDate();
    // time components
    const hours = selectedDate.getUTCHours();
    const minutes = selectedDate.getUTCMinutes();
    const seconds = selectedDate.getUTCSeconds();

    // making mysql compatible date and times
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const q = "INSERT INTO `ORDER`(`Date`, `Time`, `SuID`, `EID`) VALUES (?,?,?,?)";
    const values = [
        formattedDate,
        formattedTime,
        req.body.SuID,
        req.body.EID,
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json("Error occurred while adding an order.");
        }
        return res.status(200).json("Order added.");
    });
};