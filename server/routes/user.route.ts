import { Router } from "express";
import { createNewUser } from "../controllers/user.control";


const router = Router();

/**
 * ! Create new user in mongodb
 * ! Method POST
 */
router.get("/create", createNewUser);



export default router;

