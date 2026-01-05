import express from "express"
import { protectRoute } from "../middleware/auth.middleware.ts"
import { getUsersForSideBar, getMessages, sendMessage } from "../controllers/message.controllers.ts"

const router = express.Router()

router.use(protectRoute);

router.get("/users", getUsersForSideBar)
router.get("/:id", getMessages) // The ":" indicates a dynamic parameter.

router.post("/send/:id", sendMessage)

export default router;