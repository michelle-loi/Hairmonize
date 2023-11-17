import express from "express"

const app = express()

// Use express to send data to the database
app.use(express.json());

// Connect to the database
app.listen(8800, ()=>{
    console.log("Connection created!")
})