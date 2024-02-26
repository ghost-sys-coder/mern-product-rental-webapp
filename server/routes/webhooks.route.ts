import { Router } from "express";
import { createNewUser } from "../controllers/webhooks.control";
import bodyParser from "body-parser";


const router = Router();

/**
 * ! Create new user in mongodb
 * ! Method POST
 */
router.post("/clerk", bodyParser.raw({type: "application/json"}), createNewUser);
// router.post("/clerk", createNewUser);



export default router;

