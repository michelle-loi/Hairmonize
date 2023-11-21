import express from "express"
import {getEmployees} from "../controllers/viewEmployee.js";

const router = express.Router()

// paths of the site, and their respective functions (functions are in the controller) to execute when a http post (request to send data) is triggered
router.get("/", getEmployees)

export default router;