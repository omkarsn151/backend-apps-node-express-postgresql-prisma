import { Router } from "express";
import { addNote, getNotes } from "../controllers/notes.controller.js";

const router = Router()

// get-all-notes
router.route('/get-notes').get(getNotes)

// add-note
router.route('/add-note').post(addNote)

export default router