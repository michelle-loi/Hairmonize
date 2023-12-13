import {db} from "../database.js";

// get the employee id and name
export const getEmployeeNameID = (req, res) => {
    const q =
        "SELECT E.EID, E.FName, E.LName FROM EMPLOYEE E JOIN ACCOUNT A ON E.EID = A.EID WHERE A.AccountType = 0 OR A.AccountType = 3";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};