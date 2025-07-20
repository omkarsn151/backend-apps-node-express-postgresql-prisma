import { asyncHandler } from "../utils/asyncHandler.js";

const getNotes = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "OK"
    })
})


export {getNotes}