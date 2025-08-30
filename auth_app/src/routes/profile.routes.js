import { Router } from "express";
import { getUserProfile } from "../controllers/profile.controlller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// get-my-profile
router.route('/my-profile').get(verifyJWT, getUserProfile);

export default router