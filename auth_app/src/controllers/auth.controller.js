import { Prisma, PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

const getAllUsers =  asyncHandler( async (req, res) => {
    const allUsers = await prisma.user.findMany();
    res.status(200).json({
        message: "OK",
        data: allUsers
    });
});

const regiterUser = asyncHandler( async (req, res) => {
    const { username, fullName, phone, email, password} = req.body

    if ([username, fullName, phone, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    const existingEmail = await prisma.user.findUnique({
        where: { email }
    });
    if (existingEmail) {
        return res.status(409).json({
            message: "Email number already exists"
        })  
        throw new ApiError(409, "Email already exists");
    }

    const existingPhone = await prisma.user.findUnique({
        where: { phone }
    });
    if ( existingPhone ) {
        // throw new ApiError(409,"Phone numner already exists");   
        return res.status(409).json({
            message: "Phone number already exists"
        })     
    }

    const exixtingUsername = await prisma.user.findUnique({
        where: { username }
    });
    if (exixtingUsername) {
        throw new ApiError(409, "Username already exists");
    }

//   const existing = await prisma.user.findFirst({
//     where: {
//       OR: [
//         { email },
//         { phone },
//         { username },
//       ]
//     }
//   });

//   if (existing) {
//     const conflictField = existing.email === email
//       ? "Email"
//       : existing.phone === phone
//       ? "Phone number"
//       : "Username";

//     throw new ApiError(409, `${conflictField} already exists`);
//   }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser =  await prisma.user.create({
        data: {
            username,
            fullName,
            email,
            phone,
            password: hashedPassword,
        }
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    await prisma.user.update({
        where: { id: newUser.id },
        data: { refreshToken },
    });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60, // 1 hour
    });

    res.status(201).json({
        message: "User registered successfully",
        data: {
            id: newUser.id,
            username,
            fullName,
            phone,
            email,
        },
        accessToken,
        refreshToken,
    });

});

const loginUser = asyncHandler( async (req, res) => {
    const { username, phone, email, password} = req.body;

    if (!password || (!username && !phone && !email)) {
        throw new ApiError(400, "Login credentials are required");
    }

        const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username },
                { phone },
                { email },
            ],
        },
    });

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const isPasswordCorrect = async (inputPassword, userPasswordHash) => {
        if (!userPasswordHash) {
            throw new Error("User password is not set.");
        }
        if (!inputPassword) {
            throw new Error("Password to compare is missing.");
        }
        return await bcrypt.compare(inputPassword, userPasswordHash);
    };

    const isValid = await isPasswordCorrect(password, user.password);
    if (!isValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken },
    });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60,
    });

    res.status(200)
        .json({
        message: "Login successful",
        data: {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            phone: user.phone,
            email: user.email,
        },
        accessToken,
        refreshToken,
    });
});


// login with email password only
// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//         throw new ApiError(400, "Email and password are required");
//     }

//     // Find user by email
//     const user = await prisma.user.findUnique({
//         where: { email },
//     });

//     if (!user) {
//         throw new ApiError(401, "Invalid email or password");
//     }

//     // Password comparison helper
//     const isPasswordCorrect = async (inputPassword, hashedPassword) => {
//         if (!hashedPassword) {
//             throw new Error("User password is not set.");
//         }
//         if (!inputPassword) {
//             throw new Error("Password to compare is missing.");
//         }
//         return await bcrypt.compare(inputPassword, hashedPassword);
//     };

//     // Check password
//     const isValid = await isPasswordCorrect(password, user.password);
//     if (!isValid) {
//         throw new ApiError(401, "Invalid email or password");
//     }

//     // Generate tokens
//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     // Store refresh token in DB
//     await prisma.user.update({
//         where: { id: user.id },
//         data: { refreshToken },
//     });

//     // Set access token in cookie
//     res.cookie("accessToken", accessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 1000 * 60 * 60, // 1 hour
//     });

//     // Send response
//     res.status(200).json({
//         message: "Login successful",
//         data: {
//             id: user.id,
//             username: user.username,
//             fullName: user.fullName,
//             phone: user.phone,
//             email: user.email,
//         },
//         accessToken,
//         refreshToken,
//     });
// });


export { getAllUsers, regiterUser, loginUser }