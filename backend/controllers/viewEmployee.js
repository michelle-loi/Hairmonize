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
        "INSERT INTO EMPLOYEE_EMAIL (`EID`, `EMAIL`) VALUES (?, ?)";
    //const eid = req.params.id;

    db.query(q, [req.body.eid, req.body.email], (err, data) => {
        if (err) return res.status(500).json("Error while adding email. Email not added.");

        return res.status(200).json("Email has been added.");
    });
};

export const deleteEmail = (req, res) => {
    const q = "DELETE FROM EMPLOYEE_EMAIL WHERE `EID` = ? AND `EMAIL` = ?";

    db.query(q, [req.body.eid, req.body.oldEmail], (err, data) => {
        if (err) return res.status(500).json("Error while deleting email. Email not deleted.");

        return res.status(200).json("Email has been deleted.");
    });
};

export const getPhone = (req, res) => {
    const q =
        "SELECT Phone FROM EMPLOYEE_PHONE WHERE EID = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const updatePhone = (req, res) => {
    const q =
        "UPDATE EMPLOYEE_PHONE SET `Phone` = ? WHERE EID = ? AND `Phone` = ?";
    const EID = req.params.id;

    db.query(q, [req.body.phone, EID, req.body.oldPhone], (err, data) => {
        if (err) return res.status(500).json("Error while updating phone. Phone not updated.");

        return res.status(200).json("Phone has been updated.");
    });
};

export const addPhone = (req, res) => {
    const q =
        "INSERT INTO EMPLOYEE_PHONE (`EID`, `Phone`) VALUES (?, ?)";
    //const eid = req.params.id;

    db.query(q, [req.body.eid, req.body.phone], (err, data) => {
        if (err) return res.status(500).json("Error while adding phone. Phone not added.");

        return res.status(200).json("Phone has been added.");
    });
};

export const deletePhone = (req, res) => {
    const q = "DELETE FROM EMPLOYEE_PHONE WHERE `EID` = ? AND `Phone` = ?";

    db.query(q, [req.body.eid, req.body.oldEmail], (err, data) => {
        if (err) return res.status(500).json("Error while deleting phone. Phone not deleted.");

        return res.status(200).json("Phone has been deleted.");
    });
};