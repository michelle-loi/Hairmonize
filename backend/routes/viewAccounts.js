import express from "express"
import {
    getAccounts, deleteAccount,
    getClientCIDName,getAccountCID,
    addAccount
} from "../controllers/viewAccounts.js";

const router = express.Router()

router.get("/AccountTable", getAccounts)
router.delete("/deleteAccount/:id", deleteAccount)
router.get("/clientCIDName", getClientCIDName)
router.get("/accountCID", getAccountCID)
router.post("/addAccount", addAccount)

export default router;