import dotenv from "dotenv"
import connectDB from "../src/db/index"
import { app } from "../src/app"

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port: ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MongoDB connection failed!", error)
})