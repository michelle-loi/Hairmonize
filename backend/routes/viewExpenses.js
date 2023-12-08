import express from "express";
import {getExpenses} from "../controllers/viewExpenses.js";
import {addExpense} from "../controllers/viewExpenses.js";
import {deleteExpense} from "../controllers/viewExpenses.js";

const router = express.Router()

router.get("/getExpenses", getExpenses);
router.post("/addExpense", addExpense);
router.delete("/deleteExpense/:id", deleteExpense);


export default router;