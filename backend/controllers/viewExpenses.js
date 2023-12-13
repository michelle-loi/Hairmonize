/**
 * The following code in this file is written with assistance from these YouTube videos:
 * Lama Dev. (2022, September 18). React Node.js MySQL CRUD Tutorial for Beginners [Video]. YouTube. https://www.youtube.com/watch?v=fPuLnzSjPLE
 * Lama Dev. (2022, September 26). React Node.js MySQL Full Stack Blog App Tutorial [Video]. YouTube. https://www.youtube.com/watch?v=0aPLk2e2Z3g&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=10
 * Code With Yousaf. (2023, March 28). React + Node js + MySQL - CRUD Operations | CRUD Rest API with Node and Express [Video]. YouTube. https://www.youtube.com/watch?v=y5NvOade3sk&list=PLiNtaYczsCu3L-F8BrVsGNIt_7iQDxsLF&index=14&t=1125s
 */

import {db} from "../database.js";

export const getExpenses = (req, res)=>{
    // create query
    const q = "SELECT * FROM EXPENSE";
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

export const addExpense = (req, res) => {
    const q = "INSERT INTO EXPENSE(`Date`, `Time`, `Amount`, `Description`, `EID`) VALUES (?)"
    const values = [
        req.body.Date,
        req.body.Time,
        req.body.Amount,
        req.body.Description,
        req.body.EID,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json("Error occurred while adding an expense.");
        return res.status(200).json("Expense added.");
    });
};

export const deleteExpense = (req, res) => {
    const ExID = req.params.id;
    const q = "DELETE FROM EXPENSE WHERE `ExID` = ?";

    db.query(q, [ExID], (err, data) => {
        if (err) return res.status(500).json("Error occurred while trying to delete an expense.");
        return res.status(200).json("Expense has been deleted.");
    });
};

export const filterAggregateExpenses = (req, res) => {
    const year = req.body.Year;
    const month = req.body.Month;

    let q;

    if (year && month) {
        q = `SELECT SUM(Amount) AS Total FROM EXPENSE WHERE YEAR(Date) = ? AND MONTH(Date) = ?`;
    } else if (year) {
        q = `SELECT SUM(Amount) AS Total FROM EXPENSE WHERE YEAR(Date) = ?`;
    } else {
        q = `SELECT SUM(Amount) AS Total FROM EXPENSE`;
    }

    db.query(q, [year, month], (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json(err);
        }
        // return data
        console.log(data)
        return res.status(200).json(data);
    });
}
