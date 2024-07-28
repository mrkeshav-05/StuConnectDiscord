// import dotenv from "dotenv"
import connectDB from "../src/db/index"
import { httpServer } from "../src/app"
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
// require('dotenv').config({ debug: process.env.DEBUG })

connectDB()
.then(() => {
    httpServer.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port: ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MongoDB connection failed!", error)
})