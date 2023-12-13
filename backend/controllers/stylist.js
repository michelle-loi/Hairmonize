/**
 * The following code in this file is written with assistance from these YouTube videos:
 * Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE
 * Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10
 * Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
 */

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