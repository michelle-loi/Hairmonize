import express from "express"

import{updateEmployeeUsername}from "../controllers/updateAccount.js";

const router = express.Router()

router.put("/updateEmployeeUsername/:id", updateEmployeeUsername)

export default router