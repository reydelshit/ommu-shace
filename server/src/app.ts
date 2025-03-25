import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.options('*', cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/event', eventRoutes);

export default app;
