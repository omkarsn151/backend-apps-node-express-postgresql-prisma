import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
      });
      console.log("PostgreSQL connected!!");
    })
    .catch((error) => {
      console.log("⭕ PostgreSQL connection error!!: ", error);
      process.exit(1);
    });

};

startServer();
