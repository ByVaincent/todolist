import express from 'express';
import tasksCtrl from "../controllers/tasks.js";
const router = express.Router();


router.get('/:userid', tasksCtrl.getAllTasks);

router.post('/', tasksCtrl.createTasks);

router.put('/:id/:completed', tasksCtrl.updateSelectedTask);

router.delete('/div_:id', tasksCtrl.deleteTask);

export default router;