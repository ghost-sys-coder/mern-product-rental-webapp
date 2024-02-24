import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";


/** import mongodb connection */
import { connectToMongoDB } from "../database/mongodb";

/** import application routes */
import userRoutes from "../routes/user.route";

/** set up env file configuration */
dotenv.config({ path: "./config/config.env" });

/** initialize express app */
const app: Express = express();
const port = process.env.PORT || 8000;

/** logging files and actions */
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"))
}


/** app middleware */
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
app.use(cookieParser())


/** run app routes */
app.use("/api/users", userRoutes);


/** run express app */
app.listen(port, async() => {
    await connectToMongoDB();
    console.log(`Application running on port number:${port}`)
})