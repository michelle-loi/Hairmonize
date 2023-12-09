import express from "express";
import {
    getOrders,

} from "../controllers/viewOrders.js";

import { getSuppliers } from '../controllers/viewSuppliers.js';


const router = express.Router()

// Get the orders
router.get("/getOrders", getOrders);



// Route to get the list of suppliers
router.get('/suppliers', getSuppliers);



export default router;