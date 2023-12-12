import express from "express"
const router = express.Router()
import {getEmployeeNameID} from "../controllers/registration.js";

router.get("/getEmployeeNameID", getEmployeeNameID);

export default router;