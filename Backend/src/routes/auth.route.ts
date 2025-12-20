import express from "express"

import { signup, login, logout, editProfile } from "../controllers/auth.controllers.ts"
import { protectRoute } from "../middleware/auth.middleware.ts"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/edit-profile", protectRoute, editProfile)

export default router