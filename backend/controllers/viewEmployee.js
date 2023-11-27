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

//Edit employee
export const getOneEmployee = (req, res) => {
    const q =
        "SELECT * FROM EMPLOYEE WHERE EID = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const updateEmployee = (req, res) => {
    const q =
        "UPDATE EMPLOYEE SET `FName` = ?, `MName` = ?, `LName` = ?, `SalaryType` = ? WHERE EID = ? ";
    const EID = req.params.id;

    db.query(q, [req.body.FName, req.body.MName, req.body.LName, req.body.SalaryType, EID], (err, data) => {
        if (err) return res.status(500).json("Error while updating employee. Employee not updated.");

        return res.status(200).json("Employee has been updated.");
    });
};

export const getEmail = (req, res) => {
    const q =
        "SELECT EMAIL FROM EMPLOYEE_EMAIL WHERE EID = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const updateEmail = (req, res) => {
    const q =
        "UPDATE EMPLOYEE_EMAIL SET `EMAIL` = ? WHERE EID = ? AND `EMAIL` = ?";
    const EID = req.params.id;

    db.query(q, [req.body.email, EID, req.body.oldEmail], (err, data) => {
        if (err) return res.status(500).json("Error while updating email. Email not updated.");

        return res.status(200).json("Email has been updated.");
    });
};

export const addEmail = (req, res) => {
    const q =
        "INSERT INTO EMPLOYEE_EMAIL (`EID`, `EMAIL`) VALUES (?)";
    //const eid = req.params.id;

    db.query(q, [req.body.eid, req.body.email], (err, data) => {
        if (err) return res.status(500).json("Error while adding email. Email not added.");

        return res.status(200).json("Email has been added.");
    });
};