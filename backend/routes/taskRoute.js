import express from 'express';
import authmiddleware from "../middlewares/auth.js";

import { createTask, deleteTaskById, getTaskById, getTasks, updateTaskById } from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.route('/gp')
    .get(authmiddleware, getTasks)
    .post(authmiddleware, createTask);

taskRouter.route('/:id/gp')
    .get(authmiddleware, getTaskById)
    .put(authmiddleware, updateTaskById)
    .delete(authmiddleware, deleteTaskById);

export default taskRouter;
