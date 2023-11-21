import express from "express"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import viewEmployeeRoutes from "./routes/viewEmployee.js"
import cookieParser from "cookie-parser"

const app = express()

// Use express to send data to the database
app.use(express.json());

// app.get("/test", (req,res)=>{
//     res.json("It worked")
//     console.log("It works")
//  })



// using cookie parser to distinguish between the different users
//app.use(cookieParser());

app.use("/backend/users", userRoutes)
app.use("/backend/auth", authRoutes)
app.use("/backend/viewEmployee",viewEmployeeRoutes)

// Connect to the database
app.listen(8800, ()=>{
    console.log("Connection created!")
})