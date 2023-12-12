import express from "express";
import {
    getServices,
    addService,
    deleteService
} from "../controllers/employeeServices.js";


const router = express.Router()

router.get("/getServices", getServices);
router.post("/addService", addService);
router.delete("/deleteService/:id", deleteService);


export default router;