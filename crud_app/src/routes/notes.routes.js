import { Router } from "express";
import { getNotes } from "../controllers/notes.controller.js";

const router = Router()

router.route('/get-notes').get(getNotes)

export default router