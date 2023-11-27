import express from "express"
import {
    getEmployees,
    getOneEmployee,
    getEmployeeEmails,
    getEmployeePhones,
    deleteEmployee,
    updateEmployee,
    getEmail, updateEmail, addEmail
} from "../controllers/viewEmployee.js";

const router = express.Router()

// paths of the site, and their respective functions (functions are in the controller) to execute when a http post (request to send data) is triggered
router.get("/employeeTable", getEmployees)
router.get("/emailTable", getEmployeeEmails)
router.get("/phoneTable", getEmployeePhones)
router.delete("/deleteEmployee/:id", deleteEmployee)

//Edit employee
router.get("/getOneEmployee/:id", getOneEmployee)
router.put("/updateEmployee/:id", updateEmployee)
router.get("/getEmail/:id", getEmail)
router.put("/updateEmail/:id", updateEmail)
router.post("/addEmail", addEmail)

export default router;