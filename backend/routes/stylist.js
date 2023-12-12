import express from "express"
import {
    getMyAppts, deleteAppt
} from "../controllers/stylist.js";

const router = express.Router()

router.get("/getMyAppts/:id", getMyAppts)
router.delete("/deleteAppt/:id/:time/:date", deleteAppt)

export default router;