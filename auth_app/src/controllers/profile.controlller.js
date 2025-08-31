import { Prisma, PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const prisma = new PrismaClient();

// get-all-users
const getAllUsers = asyncHandler( async (req, res) => {
    const allUsers = await prisma.user.findMany();
    res.status(200).json({
        message: "User List Fetched Successfully",
        data: allUsers
    });
});

// get-user-profile-by-id
const getUserProfileById = asyncHandler( async (req, res) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            username: true,
            fullName: true,
            email: true,
            phone: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json({
        message: "User Profile fetched successfully",
        data: user
    });
});

// get-user-profile
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

// update-user-profile
const updateUserProfile = asyncHandler( async (req, res) => {
    const userId =  req.user.id;
    const { username, fullName, phone, email } = req.body;

    if (username) {
        const existingUsername = await prisma.user.findFirst({
            where: {
                username,
                id: { not: userId }, 
            },
        });
        if (existingUsername) {
            throw new ApiError(409, "Username already exists");
        }
    }

    if (email) {
        const existingEmail = await prisma.user.findFirst({
            where: {
                email,
                id: { not: userId }, 
            },
        });
        if (existingEmail) {
            throw new ApiError(409, "Email already exists");
        }
    }

    if (phone) {
        const existingPhone = await prisma.user.findFirst({
            where: {
                phone,
                id: { not: userId }, 
            },
        });
        if (existingPhone) {
            throw new ApiError(409, "Phone number already exists");
        }
    }

    const updatedProfile = await prisma.user.update({
        where: { id: userId },
        data: {
            ...(username && { username }),
            ...(fullName && { fullName }),
            ...(phone && { phone }),
            ...(email && { email }),
        },
        select: {
            id: true,
            username: true,
            fullName: true,
            phone: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    res.status(200).json({
        message: "Profile updated successfully",
        data: updatedProfile,
    });


});

// change-password
const changePassword = asyncHandler( async (req, res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if(!currentPassword || !newPassword){
        throw new ApiError(400, "Current password and new password are required");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            password: true,
        }
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const bcrypt = await import("bcrypt");
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Current password is incorrect");
    }

    if (await bcrypt.compare(newPassword, user.password)){
        throw new ApiError(401,"New Password cannot be same as old one");
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
    });

    res.status(200).json({
        message: "Password changed successfully",
    });
});

export { getAllUsers, getUserProfile, updateUserProfile, changePassword, getUserProfileById }