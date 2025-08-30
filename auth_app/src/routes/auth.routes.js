import { Router } from "express";
import { getAllUsers, loginUser, regiterUser, generateRefreshAndAccessToken } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

// get-all-users
router.route('/get-users').get(verifyJWT, getAllUsers)

// register-user
router.route('/register').post(regiterUser)

// login-user
router.route('/login').post(loginUser)

// refresh-token
router.route('/refresh-token').post(generateRefreshAndAccessToken)

export default router