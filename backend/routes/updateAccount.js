import express from "express"

import {updateEmployeeEmail, updateEmployeePhone, updateEmployee, updateEmployeePassword, updateClientEmail,
    updateClientPhone, updateClient, updateClientPassword} from "../controllers/updateAccount.js";

const router = express.Router()

// employee and admin functions
router.put("/updateEmployeeEmail/:id", updateEmployeeEmail)
router.put("/updateEmployeePhone/:id", updateEmployeePhone)
router.put("/updateEmployee/:id", updateEmployee)
router.put("/updateEmployeePassword/:id", updateEmployeePassword)

// client functions
router.put("/updateClientEmail/:id", updateClientEmail)
router.put("/updateClientPhone/:id", updateClientPhone)
router.put("/updateClient/:id", updateClient)
router.put("/updateClientPassword/:id", updateClientPassword)

export default router