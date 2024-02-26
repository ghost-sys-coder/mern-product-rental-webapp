import { Request, Response } from "express";
import { connectToMongoDB } from "../database/mongodb";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/clerk-sdk-node";
import { createClerkUser } from "../lib/actions";
import { IUser } from "../types/User.types";

/**
 * ! Create new user in mongodb
 * ! Method POST
 */

export const createNewUser = async (req: Request, res: Response) => {
    await connectToMongoDB();

  console.log("checking route")
  
    // Check if the 'Signing Secret' from the Clerk Dashboard was correctly provided
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error("You need a WEBHOOK_SECRET in your .env");
    }

    // Grab headers and body
    const headers = req.headers;
    const payload = req.body;

    // Get the Svix headers for verification
    const svix_id = headers["svix-id"] as string;
    const svix_timestamp = headers["svix-timestamp"] as string;
    const svix_signature = headers["svix-signature"] as string;

    // If there are missing Svix headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Initiate Svix
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(payload, {
          "svix-id": svix_id,
          "svix-timestamp": svix_timestamp,
          "svix-signature": svix_signature,
        }) as WebhookEvent;

        // get event data and types
        const { id, ...attributes } = evt.data;
        const eventType = evt.type;

        // Handle webhooks
        if (eventType === 'user.created') {
            console.log(id, attributes)
        }
      } catch (err: any) {
        // Console log and return error
        console.log("Webhook failed to verify. Error:", err.message);
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
};
