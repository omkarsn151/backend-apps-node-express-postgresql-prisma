import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const prisma = new PrismaClient();

 const verifyJWT = asyncHandler(async (req, res, next) => {
  // const token =
  //   req.cookies?.accessToken ||
  //   req.header("Authorization")?.replace("Bearer ", "");

  // if (!token) {
  //   throw new ApiError(401, "Unauthorized request");
  // }

    const authHeader = req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized request, missing token");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded?.id },
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }
});

export { verifyJWT }