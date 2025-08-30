import { Prisma, PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const prisma = new PrismaClient();

// get-my-profile
const getUserProfile  = asyncHandler( async (req, res) => {
    const userId =  req.user.id;

    const userProfile = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            fullName: true,
            phone: true,
            email: true,
            createdAt: true,
            updatedAt: true,   
        }
    });

    if (!userProfile) {
        throw new ApiError(404, "User profile not found");
    }

    res.status(200).json({
        message: "Profile fetched successfully",
        data: userProfile,
    });
});

export { getUserProfile }