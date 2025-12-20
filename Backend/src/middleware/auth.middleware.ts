import jwt from "jsonwebtoken"
import User from "../models/user.model.ts"
import type { Response, Request } from "express"

export const protectRoute = async (res: Response, req: Request, next) => {

    try {
        // Get jwt from req header
        const token = req.cookies?.jwt; // ?: Access jwt only if req.cookies != (null, undefined)
        if (!token)
            return res.status(401).json({ message: "Unothorized: No token found!" })

        // decode the JWT token using the secret
        const decodedJwt = jwt.verify(token, process.env.JWT_SECRET!)
        if (!decodedJwt || typeof decodedJwt === "string" || !("userId" in decodedJwt))
            return res.status(401).json({ message: "Unauthorized: Invalid token!" });
        
        const user = await User.findById(decodedJwt.userId).select("-password");
        
        (req as any).user = user;

        // Calling the function to make the profile uprdates..
        next();
    }
    catch (error) {
        console.log(`Error in protectRoute middleware`, error.message)
        res.status(500).json({ message: "Internal server error!" })
    }
}