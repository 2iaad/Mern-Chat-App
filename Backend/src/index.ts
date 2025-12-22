import express from "express"
import cookieParser from "cookie-parser";
import { config } from "dotenv"

import authRoutes from "./routes/auth.route.ts"
import messageRoutes from "./routes/message.route.ts"
import { connectDB } from "./lib/db.ts"

// Reads your .env file + Loads values into process.env
config();
const PORT = process.env.PORT

const app = express();

/**
 ->  express.json() is a built-in middleware in Express.
 ->  Middleware = function that runs for every request before it reaches your route handlers.
 ->  express.json() parses incoming request bodies that are in JSON format.
 ->  It makes the data available on req.body inside your routes.
 */
app.use(express.json()) // apply middleware to every request before reaching routes
app.use(cookieParser()); // apply middleware to every request to parse the Cookie header into (key, value)

// This means: forward any request that starts with /api/auth to authRoutes -> The router then decides what happens next
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    connectDB()
})