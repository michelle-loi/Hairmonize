import express from "express"
import updateAccountRoutes from "./routes/updateAccount.js"
import authRoutes from "./routes/auth.js"
import viewEmployeeRoutes from "./routes/viewEmployee.js"
import viewClientsRoutes from "./routes/viewClients.js"
import clientPriceListRoutes from "./routes/clientPriceList.js";
import profileRoutes from "./routes/profile.js"
import viewCustomerRoutes from "./routes/viewCustomer.js"
import employeeServices from "./routes/employeeServices.js";
import employeeTransactions from "./routes/employeeTransactions.js";
import viewSuppliers from "./routes/viewSuppliers.js";
import viewOrders from "./routes/viewOrders.js"
import viewAccounts from "./routes/viewAccounts.js"
import viewInventory from "./routes/viewInventory.js";
import clientAppointment from "./routes/clientAppointment.js";
import viewExpenses from "./routes/viewExpenses.js";
import registration from "./routes/registration.js";
import stylist from "./routes/stylist.js"
import clientMerchandise from "./routes/clientMerchandise.js";

import cookieParser from "cookie-parser"

const app = express()

// Use express to send data to the database
app.use(express.json());

// using cookie parser to distinguish between the different users
app.use(cookieParser());

app.use("/backend/updateAccount", updateAccountRoutes)
app.use("/backend/auth", authRoutes)
app.use("/backend/viewEmployee",viewEmployeeRoutes)
app.use("/backend/viewClient",viewClientsRoutes)
app.use("/backend/clientPriceList", clientPriceListRoutes) // path to controller, route import
app.use("/backend/profile", profileRoutes)
app.use("/backend/viewCustomer", viewCustomerRoutes)
app.use("/backend/employeeServices", employeeServices)
app.use("/backend/employeeTransactions", employeeTransactions)
app.use("/backend/viewSuppliers", viewSuppliers)
app.use("/backend/viewOrders", viewOrders)
app.use("/backend/viewAccounts", viewAccounts)
app.use("/backend/viewInventory", viewInventory)
app.use("/backend/clientAppointment", clientAppointment)
app.use("/backend/viewExpenses", viewExpenses)
app.use("/backend/registration", registration)
app.use("/backend/stylist", stylist)
app.use("/backend/clientMerchandise", clientMerchandise)

// Connect to the database
app.listen(8800, ()=>{
    console.log("Connection created!")
})