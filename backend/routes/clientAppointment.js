import express from "express"
import {
    getMyStylist, getMyStylistName, getMyStylistAppts, getAvailableServices,
    addAppointment
} from "../controllers/clientAppointment.js";

const router = express.Router()

router.get("/getMyStylist/:id", getMyStylist)
router.get("/getMyStylistName/:id", getMyStylistName)
router.get("/getMyStylistAppts/:id", getMyStylistAppts)
router.get("/getAvailableServices", getAvailableServices)
router.post("/addAppointment", addAppointment)

export default router;