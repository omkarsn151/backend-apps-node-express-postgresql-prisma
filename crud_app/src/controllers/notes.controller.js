import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

const getNotes = asyncHandler( async (req, res) => {
    const notes = await prisma.notes.findMany();
    res.status(200).json({
        message: "OK",
        data: notes
    })
})


export {getNotes}