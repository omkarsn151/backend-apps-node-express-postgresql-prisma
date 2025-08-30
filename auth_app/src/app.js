import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import "dotenv/config.js";
import { errorHandler } from "./utils/ApiError.js"; 

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

app.use(express.json());

app.use(cookieParser());

// routes
import authRoutes from './routes/auth.routes.js'
import profileRoutes from './routes/profile.routes.js'

// routes-declaration
app.use("/api/auth", authRoutes),
app.use("/api/profile", profileRoutes),

app.use(errorHandler);

export default app;
