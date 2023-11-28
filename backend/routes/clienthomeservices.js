import express from "express";
import {getServices} from "../controllers/clienthomeservices.js";


const router = express.Router()

// Get the services to show to client
router.get("/getServices", getServices) // function name


export default router;