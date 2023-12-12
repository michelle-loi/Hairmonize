import express from "express"
import {
    getSuppliesTable, getUniqueProduct
} from "../controllers/viewSupplies.js";

const router = express.Router()

router.get("/getSuppliesTable", getSuppliesTable)
router.get("/getUniqueProduct", getUniqueProduct)

export default router;