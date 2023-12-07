import express from "express"

import {
    getCustomer,
    getCustomerEmail,
    getCustomerPhone,
} from "../controllers/viewCustomer.js";

const router = express.Router()

// paths of the site, and their respective functions (functions are in the controller) to execute when a http post (request to send data) is triggered
router.get("/getCustomer/:id", getCustomer)
router.get("/getCustomerEmail/:id", getCustomerEmail)
router.get("/getCustomerPhone/:id", getCustomerPhone)
export default router;