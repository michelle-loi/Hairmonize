import express from "express"
import {getEmployees} from "../controllers/viewEmployee.js";
import {getEmployeeEmails} from "../controllers/viewEmployee.js";
import {getEmployeePhones} from "../controllers/viewEmployee.js";
import {deleteEmployee} from "../controllers/viewEmployee.js";
import {getSpecificEMP} from "../controllers/viewEmployee.js";

const router = express.Router()

// paths of the site, and their respective functions (functions are in the controller) to execute when a http post (request to send data) is triggered
router.get("/employeeTable", getEmployees)
router.get("/emailTable", getEmployeeEmails)
router.get("/phoneTable", getEmployeePhones)
router.delete("/deleteEmployee/:id", deleteEmployee)
router.post("/getSpecificEMP", getSpecificEMP)

export default router;