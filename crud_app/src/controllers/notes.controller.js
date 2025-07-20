import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

// get-notes
const getNotes = asyncHandler( async (req, res) => {
    const notes = await prisma.notes.findMany();
    res.status(200).json({
        message: "OK",
        data: notes
    })
})

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
})

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

export {getNotes, addNote, getNoteById}