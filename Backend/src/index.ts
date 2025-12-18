import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.route.ts"
import { connectDB } from "./lib/db.ts"

const app = express();

dotenv.config() // this need to be called inorder to use "process.env.PORT"
const PORT = process.env.PORT

app.use("/api/auth", authRoutes)

/*
    Route: is the code you write on the server that defines what happens when you visite the endpoint.
    Endpoint: is a specific HTTP method + URL path that the client requests.
*/

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    connectDB()
})