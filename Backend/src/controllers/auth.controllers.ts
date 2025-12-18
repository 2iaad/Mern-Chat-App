import type { Request, Response } from "express";

export function signup(req: Request, res: Response)
{
    res.status(200).send('<h1>SignUp rout<h1>')
}

/**
    Arrow Function (Function Expression) in a data holder: Functions you want to store in variables, pass around, or export.
 */

export const login = (req:Request, res:Response) =>
{
    res.send("login rout")
}

export const logout = (req:Request, res:Response) =>
{
    res.send("logout rout")
}
