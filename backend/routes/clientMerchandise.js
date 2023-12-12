import express from "express"
import {
    getMerchandiseList
} from "../controllers/clientMerchandise.js";

const router = express.Router()

router.get("/getMerchandiseList", getMerchandiseList)

export default router;