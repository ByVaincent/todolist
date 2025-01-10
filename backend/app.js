import express from 'express';
import cors from 'cors';
import Task from './Models/Task.js'
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8')
    .then(() => console.log('Connexion à mongoDB ok'))
    .catch(() => console.log('Connexion à mongoDB failed'))

app.use(cors());
app.use(express.json());

app.get('/api/tasks', (req, res, next) => {
    res.status(200).json({message: "it works"})
});

app.post('/api/tasks', (req, res, next) => {
    const newTask = new Task({
        ...req.body
    });
    newTask.save()
        .then((task) => res.status(200).json({message: `Nouvelle tâche créée avec succès: ${task}`}))
        .catch(error => res.status(400).json({error}));
});

app.delete('/api/tasks/div_:id', (req, res, next) => {
    Task.deleteOne({id: req.params.id})
        .then(() => res.status(200).json({message: 'Tâche supprimée avec succès!'}))
        .catch(error => res.status(400).json({error}))
})



export default app;
