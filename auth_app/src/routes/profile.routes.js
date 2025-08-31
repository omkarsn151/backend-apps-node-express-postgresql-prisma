import { Router } from "express";
import { getUserProfile, updateUserProfile, changePassword } from "../controllers/profile.controlller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// get-user-profile
router.route('/user-profile').get(verifyJWT, getUserProfile);

// update-user-profile
router.route('/update-profile').patch(verifyJWT, updateUserProfile);

// change-password
router.route('/change-password').post(verifyJWT, changePassword)
export default router