import express from "express";
import authmiddleware from "../middlewares/auth.js";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.route("/")
  .get(authmiddleware, getTasks)
  .post(authmiddleware, createTask);

taskRouter.route("/:id")
  .get(authmiddleware, getTaskById)
  .put(authmiddleware, updateTaskById)
  .delete(authmiddleware, deleteTaskById);

export default taskRouter;