import { EmailAddressJSON } from "@clerk/clerk-sdk-node";

export interface IUser{
    clerkId: string;
    email: EmailAddressJSON[];
    username: string;
    firstName: string;
    lastName: string;
    image: string;
    emailVerified?: Date
}