import { Router } from "express";
import { getAllUsers, getUserProfileById, getUserProfile, updateUserProfile, changePassword, deleteAccount } from "../controllers/profile.controlller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// get-all-users
router.route('/get-users').get(verifyJWT, getAllUsers)

// get-user-profile
router.route('/user-profile').get(verifyJWT, getUserProfile);

// get-user-profile-by-id
router.route('/user-profile/:id').get(verifyJWT, getUserProfileById);

// update-user-profile
router.route('/update-profile').patch(verifyJWT, updateUserProfile);

// change-password
router.route('/change-password').post(verifyJWT, changePassword);

// delete-account
router.route('/delete-account').delete(verifyJWT, deleteAccount);

export default router