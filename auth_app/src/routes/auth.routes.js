import { Router } from "express";
import { getAllUsers, regiterUser } from "../controllers/auth.controller.js";

const router = Router()

// get-all-users
router.route('/get-users').get(getAllUsers)

// register-user
router.route('/register').post(regiterUser)

export default router