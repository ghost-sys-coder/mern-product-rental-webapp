import User from "../../models/User.models";
import { IUser } from "../../types/User.types";
import { connectToMongoDB } from "../../database/mongodb";

// Create clerk user in mongodb database
export const createClerkUser = async (user: IUser) => {
    await connectToMongoDB();
    try {
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error)
    }
}


