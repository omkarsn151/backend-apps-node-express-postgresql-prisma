import { Router } from "express";
import { loginUser, regiterUser, generateRefreshAndAccessToken } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()


// register-user
router.route('/register').post(regiterUser)

// login-user
router.route('/login').post(loginUser)

// refresh-token
router.route('/refresh-token').post(generateRefreshAndAccessToken)

export default router