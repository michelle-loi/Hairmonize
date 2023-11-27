import {db} from "../database.js";




//IMPORTANT: the order has to be (req, res), not (res, req)
export const getEmployees = (req, res) => {
    const q = "SELECT * FROM EMPLOYEE";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        return res.status(200).json(data);
    });
};

export const getEmployeeEmails = (req, res) => {
    const q =
        "SELECT * FROM EMPLOYEE_EMAIL";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const getEmployeePhones = (req, res) => {
    const q =
        "SELECT * FROM EMPLOYEE_PHONE";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const deleteEmployee = (req, res) => {
    const EID = req.params.id;
    const q = "DELETE FROM EMPLOYEE WHERE `EID` = ?";

    db.query(q, [EID], (err, data) => {
        if (err) return res.status(500).json("Error while deleting employee. Employee not deleted.");

        return res.status(200).json("Employee has been deleted.");
    });
};

// These are the functions that will get a particular employee's information
//--------------------------------------------------------------------------

// get the employees info based on a given EID
export const getSpecificEMP = (req, res) => {
    const {EID} = req.body;

    // Make query to get employee's information
    const query = "SELECT * FROM EMPLOYEE WHERE `EID` = ?";

    db.query(query, [EID], (err, data) => {
        if (err) return res.status(500).json("Error while searching for employee.");

        return res.status(200).json(data);
    });
};
