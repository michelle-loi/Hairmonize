import {db} from "../database.js";

// UPCOMING APPOINTMENTS
export const getMyAppts = (req, res) => {
    const q =
        "SELECT APPOINTMENT.CID, FName, MName, LName, Date, Time, Service_SID, SName FROM APPOINTMENT JOIN SERVICE JOIN CLIENT WHERE Stylist_EID = ? AND APPOINTMENT.CID = CLIENT.CID AND SERVICE_SID = SID ORDER BY APPOINTMENT.Date ASC, APPOINTMENT.Time ASC";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const deleteAppt = (req, res) => {
    const q = "DELETE FROM APPOINTMENT WHERE CID = ? AND Time = ? AND Date = ?";

    db.query(q, [req.params.id, req.params.time, req.params.date], (err, data) => {
        if (err) return res.status(500).json("Error while deleting appointment. Appointment not deleted.");

        return res.status(200).json("Appointment has been deleted.");
    });
};

//BOOK APPOINTMENT
export const getMyClients = (req, res) => {
    const q = "SELECT * FROM CLIENT WHERE EID = ?;";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};