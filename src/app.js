import express from 'express';
import morgan from'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Routes
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api', authRoutes);
app.use('/api', tasksRoutes);


export default app;