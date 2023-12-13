/**
 * The following code in this file is written with assistance from these YouTube videos:
 * Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE
 * Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10
 * Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
 */

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
// export const getMyAppts = (req, res) => {
//     const q =
//         "SELECT * FROM APPOINTMENT WHERE CID = ?";
//
//     db.query(q, [res.params.id], (err, data) => {
//         if (err) return res.status(500).json(err);
//
//         return res.status(200).json(data);
//     });
// };
export const getMyApptsServiceName = (req, res) => {
    const q =
        "SELECT CID, Date, Time, Service_SID, SName FROM APPOINTMENT JOIN SERVICE WHERE CID = ? AND SERVICE_SID = SID";

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