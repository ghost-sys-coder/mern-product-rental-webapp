import { Document } from "mongoose";
import { IUser } from "../types/User.types";
import { Schema, model } from "mongoose";

const UserSchema = new Schema<IUser>({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    image: {
        type: String,
        required: true,
    },
    emailVerified: {
        type: Date,
        default: null
    }
});


const User = model('User', UserSchema);

export default User;