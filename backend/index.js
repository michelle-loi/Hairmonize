import express from "express"
import updateAccountRoutes from "./routes/updateAccount.js"
import authRoutes from "./routes/auth.js"
import viewEmployeeRoutes from "./routes/viewEmployee.js"
import clientPriceListRoutes from "./routes/clientPriceList.js";
import profileRoutes from "./routes/profile.js"
import viewCustomerRoutes from "./routes/viewCustomer.js"
import employeeServices from "./routes/employeeServices.js";
import employeeTransactions from "./routes/employeeTransactions.js";
import viewSuppliers from "./routes/viewSuppliers.js";

import cookieParser from "cookie-parser"

const app = express()

// Use express to send data to the database
app.use(express.json());

// using cookie parser to distinguish between the different users
app.use(cookieParser());

app.use("/backend/updateAccount", updateAccountRoutes)
app.use("/backend/auth", authRoutes)
app.use("/backend/viewEmployee",viewEmployeeRoutes)
app.use("/backend/clientPriceList", clientPriceListRoutes) // path to controller, route import
app.use("/backend/profile", profileRoutes)
app.use("/backend/viewCustomer", viewCustomerRoutes)
app.use("/backend/employeeServices", employeeServices)
app.use("/backend/employeeTransactions", employeeTransactions)
app.use("/backend/viewSuppliers", viewSuppliers)

// Connect to the database
app.listen(8800, ()=>{
    console.log("Connection created!")
})