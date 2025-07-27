import { Router } from "express";
import { getAllUsers, loginUser, regiterUser } from "../controllers/auth.controller.js";

const router = Router()

// get-all-users
router.route('/get-users').get(getAllUsers)

// register-user
router.route('/register').post(regiterUser)

// login-user
router.route('/login').post(loginUser)

export default router