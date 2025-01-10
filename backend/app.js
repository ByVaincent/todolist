import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api/tasks', (req, res, next) => {
    res.status(200).json({message: "it works"})
})


export default app;
