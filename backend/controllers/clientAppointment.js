import {db} from "../database.js";


// BOOK APPOINTMENTS
export const getMyStylist = (req, res) => {
    const q =
        "SELECT EID FROM CLIENT WHERE CID = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const getMyStylistName = (req, res) => {
    const q =
        "SELECT FName, LName FROM EMPLOYEE WHERE EID = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const getMyStylistAppts = (req, res) => {
    const q =
        "SELECT * FROM APPOINTMENT WHERE Stylist_EID = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const getAvailableServices = (req, res) => {
    const q =
        "SELECT * FROM SERVICE";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const addAppointment = (req, res) => {
    const q =
        "INSERT INTO APPOINTMENT (`CID`, `Date`, `Time`, `Stylist_EID`, `Service_SID`) VALUES (?, ?, ?, ?, ?)";

   db.query(q, [req.body.CID, req.body.Date, req.body.Time, req.body.Stylist_EID, req.body.Service_SID], (err, data) => {
       if (err) return res.status(500).json("Error while adding appointment. Appointment not added.");

        return res.status(200).json("Appointment has been added.");
    });
};

// UPCOMING APPOINTMENTS
export const getMyAppts = (req, res) => {
    const q =
        "SELECT * FROM APPOINTMENT WHERE CID = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};