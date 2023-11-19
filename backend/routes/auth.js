import express from "express"
import {login, logout, register} from "../controllers/auth.js";

const router = express.Router()

// paths of the site, and their respective functions (functions are in the controller) to execute when a http post (request to send data) is triggered
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

export default router