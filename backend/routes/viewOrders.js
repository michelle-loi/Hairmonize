import express from "express";
import {
    getOrders, deleteOrder, addOrder
} from "../controllers/viewOrders.js";

import { getSuppliers } from '../controllers/viewSuppliers.js';


const router = express.Router()

// Order functions
router.get("/getOrders", getOrders);
router.post("/addOrder", addOrder);
router.delete("/deleteOrder/:id", deleteOrder);



// Route to get the list of suppliers
router.get('/suppliers', getSuppliers);



export default router;