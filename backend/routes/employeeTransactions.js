import express from "express";
import {
    getTransactions,
    addTransaction,
    deleteTransaction
} from "../controllers/employeeTransactions.js";


const router = express.Router()

router.get("/getTransactions", getTransactions);
router.post("/addTransaction", addTransaction);
router.delete("/deleteTransaction/:id", deleteTransaction);


export default router;