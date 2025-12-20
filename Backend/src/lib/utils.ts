import jwt from "jsonwebtoken"

import type { Response, CookieOptions } from "express";
import type { Types } from "mongoose"

/**
 *  -> what is a cookie:
 *      A cookie is a small piece of data that a server sends to a client (usually a browser),
 *      which the browser stores and sends back with future requests to the same server. Cookies are commonly used to remember information about the user between requests.
 *  -> what is JWT:
 *      JWT identifies the user on every request after signUp / signIn to prevent using password and email on each request.
 *      Credentials authenticate the user once.
 * 
 *  -> const token = jwt.sign()
 *      -> Takes a payload (data you want to store in the token)
 *      -> Signs it using a secret key
 *      -> returns a JWT string
 */

export const    generateJWT = (userId: Types.ObjectId, res: Response) => {

    const jwtOptions : jwt.SignOptions = { expiresIn: "7d" };
    const resOptions : CookieOptions = {
        maxAge: 7 * 24 * 60 * 60 * 1000, // Ms
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    }

    const token = jwt.sign({userId}, process.env.JWT_SECRET!, jwtOptions)

    // built-in Express method to set a cookie in the HTTP response. ("jwt" = cookie's key, token = cookie's key)
    // now the HTTP response includes a Set-Cookie header.
    res.cookie("jwt", token, resOptions)

    return token ;
}
