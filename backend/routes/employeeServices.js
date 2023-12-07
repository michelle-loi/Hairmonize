import express from "express";
import {
    getServices,
    addService,
    deleteService
} from "../controllers/employeeServices.js";


const router = express.Router()

// Get the services to show to client
router.get("/getServices", getServices);
router.post("/addService", addService);
router.delete("/deleteService/:id", deleteService);


export default router;