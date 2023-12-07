import express from "express";
import {getPrices} from "../controllers/clientPriceList.js";

const router = express.Router()

// Get the services to show to client
router.get("/getPrices", getPrices) // function name


export default router;