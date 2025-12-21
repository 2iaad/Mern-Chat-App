import express from "express"

import { signup, login, logout, editProfile, checkAuth } from "../controllers/auth.controllers.ts"
import { protectRoute } from "../middleware/auth.middleware.ts"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/edit-profile", protectRoute, editProfile)

router.get("/check", protectRoute, checkAuth)

export default router