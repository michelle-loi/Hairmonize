import express from "express"
import {
    getAccounts, deleteAccount
} from "../controllers/viewAccounts.js";

const router = express.Router()

router.get("/AccountTable", getAccounts)
router.delete("/deleteAccount/:id", deleteAccount)

export default router;