import express from "express"
import {
    getClients,
    getClientEmails,
    getClientPhones,
    deleteClient,
} from "../controllers/viewClients.js";


const router = express.Router()

// paths of the site, and their respective functions (functions are in the controller) to execute when a http post (request to send data) is triggered
router.get("/clientTable", getClients)
router.get("/emailTable", getClientEmails)
router.get("/phoneTable", getClientPhones)
router.delete("/deleteClient/:id", deleteClient)

//Add employee
// router.post("/addEmployee", addEmployee)
// router.post("/addAccount", addAccount)
// router.post("/addAdministrator", addAdministrator)
// router.post("/addStylist", addStylist)

export default router;