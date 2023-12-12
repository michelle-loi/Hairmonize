import express from "express"
import {
    getMyStylist, getMyStylistName, getMyStylistAppts, getAvailableServices, addAppointment,
    getMyApptsServiceName,deleteAppt
} from "../controllers/clientAppointment.js";

const router = express.Router()

//BOOKING APPOINTMENTS
router.get("/getMyStylist/:id", getMyStylist)
router.get("/getMyStylistName/:id", getMyStylistName)
router.get("/getMyStylistAppts/:id", getMyStylistAppts)
router.get("/getAvailableServices", getAvailableServices)
router.post("/addAppointment", addAppointment)

//UPCOMING APPOINTMENTS
router.get("/getMyApptsServiceName/:id", getMyApptsServiceName)
router.delete("/deleteAppt", deleteAppt)

export default router;