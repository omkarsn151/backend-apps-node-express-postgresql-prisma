import { Prisma, PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

// get-notes
const getNotes = asyncHandler( async (req, res) => {
    const notes = await prisma.notes.findMany();
    res.status(200).json({
        message: "OK",
        data: notes
    })
});

// add-note
const addNote = asyncHandler( async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        res.status(400).json({
            message: "Title is required"
        })
    }

    const newNote = await prisma.notes.create({
        data : {
            title,
            description,
        }
    });
    res.status(201).json({
        message: "New note added Successfully!",
        data: newNote
    });
});

//  get-note-by-id
const getNoteById = asyncHandler( async (req, res) => {
    const { id } = req.params;

    const noteById = await prisma.notes.findUnique({
        where:{
            id: parseInt(id)
        }
    });

    if (!noteById) {
        return res.status(404).json({message: "Note not found"})
    }

    res.status(200).json({
        message: "Note fetched successfully",
        data: noteById
    });
});

// update-note
const updateNote = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const existingNote = await prisma.notes.findUnique({
        where: { id: parseInt(id) }
    });

    if (!existingNote) {
        return res.status(404).json({ message: "Note not found" });
    }

    const updateNote = await prisma.notes.update({
        where: { id: parseInt(id) },
        data: {
            title: title || existingNote.title,
            description: description || existingNote.description,
        }
    });

    res.status(200)
       .json({
        message: "Note updated successfully",
        data: updateNote,
       });
});

// delete-note
const deleteNote =  asyncHandler( async (req, res) => {
   const { id } = req.params;

    const existingNote = await prisma.notes.findUnique({
            where: { id: parseInt(id) }
    });
    
    if (!existingNote) {
            return res.status(404).json({ message: "Note not found" });
    }

    const deleteNote = await prisma.notes.delete({
            where: { id: parseInt(id) }
    });

    res.status(200)
       .json({ message: "Note Deleted Successfully"})
});

const deleteSelectedNotes = asyncHandler( async (req, res) => {
    const { selectedIds } = req.body;

    if (!Array.isArray(selectedIds) || selectedIds.length === 0) {
        return res.status(400).json({
            message: "Please provide an array of IDs to delete"
        });
    }

    const validIds = selectedIds
        .map(id => parseInt(id))
        .filter(id => !isNaN(id));

    if (validIds.length === 0) {
        return res.status(400).json({
            message: "All provided IDs are invalid"
        });
    }

    const deleteResult = await prisma.notes.deleteMany({
        where: {
            id: { in: validIds }
        }
    });

    if (deleteResult.count === 0) {
        return res.status(404).json({
            message: "No matching notes found to delete"
        });
    }

    return res.status(200).json({
        message: `Successfully deleted ${deleteResult.count} of ${validIds.length} selected notes`
    });

});

const deleteAllNotes = asyncHandler(async (req, res) => {
    const totalNotes = await prisma.notes.count();

    if (totalNotes === 0) {
        return res.status(404).json({
            message: "There are no notes to delete.",
        });
    }

    await prisma.notes.deleteMany({});

    res.status(200).json({
        message: `All notes have been deleted successfully(Count = ${totalNotes}).`,
    });
});

export { getNotes, addNote, getNoteById, updateNote, deleteNote, deleteSelectedNotes, deleteAllNotes }