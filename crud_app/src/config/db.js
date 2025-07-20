import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    const connectionInstance = await prisma.$connect();
    console.log("✅ Database connected successfully");
    // console.log(`✅ Connected to DB at host: ${process.env.DATABASE_URL}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw Error("Error connecting to DB");
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("🛑 Prisma disconnected due to app termination");
  process.exit(0);
});

export default prisma;
