import express from "express"

import {updateEmployeeEmail, updateEmployeePhone, updateEmployee, updateEmployeePassword} from "../controllers/updateAccount.js";

const router = express.Router()

router.put("/updateEmployeeEmail/:id", updateEmployeeEmail)
router.put("/updateEmployeePhone/:id", updateEmployeePhone)
router.put("/updateEmployee/:id", updateEmployee)
router.put("/updateEmployeePassword/:id", updateEmployeePassword)

export default router