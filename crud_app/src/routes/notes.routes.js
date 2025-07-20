import { Router } from "express";
import { addNote, deleteAllNotes, deleteNote, deleteSelectedNotes, getNoteById, getNotes, updateNote } from "../controllers/notes.controller.js";

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

// delete-all-notes
router.route('/delete-all-notes').delete(deleteAllNotes)

export default router