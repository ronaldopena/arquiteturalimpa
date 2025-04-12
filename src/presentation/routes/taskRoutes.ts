import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post('/tasks', (req, res) => taskController.create(req, res));
taskRoutes.get('/tasks', (req, res) => taskController.findAll(req, res));
taskRoutes.get('/tasks/:id', (req, res) => taskController.findById(req, res));
taskRoutes.put('/tasks/:id', (req, res) => taskController.update(req, res));
taskRoutes.delete('/tasks/:id', (req, res) => taskController.delete(req, res));

export { taskRoutes }; 