import { Router } from "express";
import { addNote, deleteNote, deleteSelectedNotes, getNoteById, getNotes, updateNote } from "../controllers/notes.controller.js";

const router = Router()

// get-all-notes
router.route('/get-notes').get(getNotes)

// add-note
router.route('/add-note').post(addNote)

// get-note-by-id
router.route('/get-notes/:id').get(getNoteById)

// update-note
router.route('/update-note/:id').patch(updateNote)

// delete-note
router.route('/delete-note/:id').delete(deleteNote)

// delete-seleted-notes
router.route('/delete-selected-notes').delete(deleteSelectedNotes)

export default router