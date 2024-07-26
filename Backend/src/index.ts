import dotenv from "dotenv"
import connectDB from "../src/db/index"
import { httpServer } from "../src/app"

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    httpServer.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port: ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MongoDB connection failed!", error)
})