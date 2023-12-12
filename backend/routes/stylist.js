import express from "express"
import {
    getMyAppts, deleteAppt,
    getMyClients
} from "../controllers/stylist.js";

const router = express.Router()

//UPCOMING APPOINTMENTS
router.get("/getMyAppts/:id", getMyAppts)
router.delete("/deleteAppt/:id/:time/:date", deleteAppt)

//BOOK APPOINTMENT
router.get("/getMyClients/:id", getMyClients)

export default router;