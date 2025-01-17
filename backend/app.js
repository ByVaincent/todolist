import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/tasks.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

mongoose.connect(process.env.API_CONNECTION_STRING)
    .then(() => console.log('Connexion à mongoDB ok'))
    .catch(() => console.log('Connexion à mongoDB failed'))

app.use(cors());
app.use(express.json());

const tasksRoutes = router;
app.use('/api/tasks', tasksRoutes);





export default app;
