import {db} from "../database.js";

export const updateEmployeeUsername = (req, res) => {




    const q1 = "DELETE FROM ACCOUNT WHERE `EID` = ?";

    db.query(q1, [EID], (err, data) => {
        if (err) return res.status(500).json("Error while deleting employee. Employee not deleted.");

        return res.status(200).json("Employee has been deleted.");
    });

    const q = "UPDATE ACCOUNT SET `Username` = ?, WHERE EID = ? ";
    const EID = req.params.id;

    db.query(q, [req.body.Username, EID], (err, data) => {
        if (err) return res.status(500).json("Error while updating employee account. Employee account not updated.");

        return res.status(200).json("Employee account has been updated.");
    });
};


