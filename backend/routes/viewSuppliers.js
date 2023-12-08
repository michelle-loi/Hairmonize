import express from "express";
import {getSuppliers} from "../controllers/viewSuppliers.js";
import {addSupplier} from "../controllers/viewSuppliers.js";
import {deleteSupplier} from "../controllers/viewSuppliers.js";


const router = express.Router()

// Get the services to show to client
router.get("/getSuppliers", getSuppliers);
router.post("/addSupplier", addSupplier);
router.delete("/deleteSupplier/:id", deleteSupplier);


export default router;