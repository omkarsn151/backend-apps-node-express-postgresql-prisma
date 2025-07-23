import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import "dotenv/config.js";

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
// import notesRouter from './routes/notes.routes.js'
import authRouter from './routes/auth.routes.js'

// routes-declaration
app.use("/api/auth", authRouter)

export default app;
