import express from "express"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"


const app = express()

// Use express to send data to the database
app.use(express.json());

app.use("/backend/users", userRoutes)
app.use("/backend/auth", authRoutes)


// Connect to the database
app.listen(8800, ()=>{
    console.log("Connection created!")
})