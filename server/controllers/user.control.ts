import { Request, Response } from "express";
import { connectToMongoDB } from "../database/mongodb";

/**
 * ! Create new user in mongodb
 * ! Method POST
 */

export const createNewUser = async (req: Request, res: Response) => {
    await connectToMongoDB();
    try {
        res.status(200).json({success: true})
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}