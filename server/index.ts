import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import bodyParser from "body-parser";
import { Webhook } from "svix";
import clerkClient, { WebhookEvent } from "@clerk/clerk-sdk-node";

/** import mongodb connection */
import { connectToMongoDB } from "./database/mongodb";

/** import application routes */
import userRoutes from "./routes/webhooks.route";
import { IUser } from "./types/User.types";
import { createClerkUser } from "./lib/actions";

/** set up env file configuration */
dotenv.config({ path: "./config/config.env" });

/** initialize express app */
const app: Express = express();
const port = process.env.PORT || 8000;

/** logging files and actions */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/** app middleware */
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(cookieParser());

/** run app routes */

app.post(
  "/api/webhooks/clerk",
  bodyParser.raw({ type: "application/json" }),
  async function (req, res) {
    // Check if the 'Signing Secret' from the Clerk Dashboard was correctly provided
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error("You need a WEBHOOK_SECRET in your .env");
    }

    // Grab the headers and body
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

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If the verification fails, error out and  return error code
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
        
      const { id } = evt.data;
      const eventType = evt.type;
        
        // CREATE
        if (eventType === "user.created") {
            const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

            const user: IUser = {
                clerkId: id,
                email: email_addresses,
                username: username,
                firstName: first_name,
                lastName: last_name,
                image: image_url,
            };

            const newUser = await createClerkUser(user);

            //set public metadata
            if (newUser) {
                await clerkClient.users.updateUserMetadata(id, {
                    publicMetadata: {
                        userId: newUser._id
                    }
                })
            }

            return res.status(200).json({message: "OKAY", user: newUser})
        }
        
    } catch (err: any) {
      // Console log and return error
      console.log("Webhook failed to verify. Error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }


    return res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  }
);

/** run express app */
app.listen(port, async () => {
  await connectToMongoDB();
  console.log(`Application running on port number:${port}`);
});

/** export express app */
export default app;
