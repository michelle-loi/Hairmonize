import express from "express";
import {
    getOrders,
    addOrder,
    deleteOrder
} from "../controllers/employeeOrders.js";


const router = express.Router()

// Get the services to show to client
router.get("/getOrders", getOrders);
router.post("/addOrder", addOrder);
router.delete("/deleteOrder/:id", deleteOrder);


export default router;