import express from "express"
import {
    getMyStylist, getMyStylistName, getMyStylistAppts, getAvailableServices,
    addAppointment,
    getMyAppts
} from "../controllers/clientAppointment.js";

const router = express.Router()

//BOOKING APPOINTMENTS
router.get("/getMyStylist/:id", getMyStylist)
router.get("/getMyStylistName/:id", getMyStylistName)
router.get("/getMyStylistAppts/:id", getMyStylistAppts)
router.get("/getAvailableServices", getAvailableServices)
router.post("/addAppointment", addAppointment)

//UPCOMING APPOINTMENTS
router.get("/getMyAppts/:id", getMyAppts)

export default router;