import { Router } from "express";
import { addNote, getNoteById, getNotes, updateNote } from "../controllers/notes.controller.js";

const router = Router()

// get-all-notes
router.route('/get-notes').get(getNotes)

// add-note
router.route('/add-note').post(addNote)

// get-note-by-id
router.route('/get-notes/:id').get(getNoteById)

// update-note
router.route('/update-note/:id').patch(updateNote)

export default router