import express from "express"
import {
    getInventory, deleteInventory,
    getOneProduct, updateProduct,
    addProduct
} from "../controllers/viewInventory.js";
import {deleteAccount, getAccounts} from "../controllers/viewAccounts.js";
import {getOneEmployee, updateEmployee} from "../controllers/viewEmployee.js";

const router = express.Router()

//View and delete
router.get("/getInventory", getInventory)
router.delete("/deleteInventory/:id", deleteInventory)

//Edit
router.get("/getOneProduct/:id", getOneProduct)
router.put("/updateProduct/:id", updateProduct)
router.post("/addProduct", addProduct)

export default router;