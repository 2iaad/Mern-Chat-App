import type { Request, Response } from "express";
import User from '../models/user.model.ts'
import bcrypt from "bcryptjs"

import { generateJWT } from "../lib/utils.ts";

export async function signup(req: Request, res: Response) {
    const { fullName, email, password } = req.body; // This line creates three separate variables, each one takes its value Ex: email = req.body.email
    try {
        if (!fullName || !email || !password)
            return res.status(400).json({ message: "All fields are required!" })

        if (password.length < 6) {
            console.log("Password too short, exiting");
            return res.status(400).json({ message: "Password must be atleast 6 characters" })
        }

        // looks for a document with this email inside the collection, then it return the document found || null, {email} stands for {email: ".."} its an object that we search for 
        const user = await User.findOne({ email })
        if (user) {

            console.log("User error");
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new js object(document) that follows schema rules -> using User(model)
        const newUser = new User({
            fullName: fullName,
            email,
            password: hashedPassword
        })

        // generate JWT token
        const jwToken = generateJWT(newUser._id, res);

        // save newUser inside the DB with its jwToken
        await newUser.save()

        res.status(201).json({
            message: "New user created!",
            id: newUser._id,
            fullName: newUser.fullName
        })
    }
    catch (error) {
        console.log(`Error in signUp function controller`, error.message)
        res.status(500).json({ message: "Internal server error!" })
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password)
            return res.status(400).json({ message: "All fields are required!" })

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalide email" })

        const isPsswdCorrect = await bcrypt.compare(password, user.password)
        if (!isPsswdCorrect)
            return res.status(400).json({ message: "Invalide password" })
        generateJWT(user._id, res);

        res.status(201).json({
            message: "User logged in!",
            id: user._id,
            fullName: user.fullName
        })
    }
    catch (error) {
        console.log(`Error in login function controller`, error.message)
        res.status(500).json({ message: "Internal server error!" })
    }
}

export const logout = (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "User logged out!" })
    }
    catch (error) {
        console.log(`Error in logout function controller`, error.message)
        res.status(500).json({ message: "Internal server error!" })
    }
}
