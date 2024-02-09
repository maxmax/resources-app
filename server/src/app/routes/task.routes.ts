import express from 'express';
import * as taskController from '../controllers/task.controller';

const router = express.Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/:id', taskController.getTaskById);
router.get('/resource/:resourceId', taskController.getTasksByResourceId);

export default router;
