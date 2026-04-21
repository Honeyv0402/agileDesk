import mongoose from "mongoose";
import Task from "../models/taskModel.js";
import { generateTaskFromText } from "../services/aiService.js";


// create task
export const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, completed } = req.body;

        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const task = new Task({
            title,
            description,
            priority,
            dueDate,
            completed: completed === true || completed === "true",
            owner: req.user.id
        });

        const saved = await task.save();

        return res.status(201).json({
            success: true,
            task: saved
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// get all task
export const getTasks = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const filter = { owner: req.user.id };

        if (req.query.completed !== undefined) {
            filter.completed = req.query.completed === "true";
        }

        const tasks = await Task.find(filter).sort({ createdAt: -1 });

        return res.json({
            success: true,
            tasks
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// get single task
export const getTaskById = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID"
            });
        }

        const task = await Task.findOne({
            _id: id,
            owner: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            task
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// update task
export const updateTaskById = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const data = { ...req.body };

        if (data.completed !== undefined) {
            data.completed =
                data.completed === true ||
                data.completed === "true" ||
                data.completed === "yes";
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID"
            });
        }

        const updated = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user.id
            },
            data,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Task not found or not yours"
            });
        }

        res.status(200).json({
            success: true,
            task: updated
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// delete task
export const deleteTaskById = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid task ID"
            });
        }

        const deleted = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Task not found or not yours"
            });
        }

        res.json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// generate task by AI
export const generateTaskAI = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Text input is required"
            });
        }

        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({
                success: false,
                message: "GROQ_API_KEY missing in .env"
            });
        }

        const aiTask = await generateTaskFromText(text);

        if (!aiTask) {
            return res.status(400).json({
                success: false,
                message: "AI failed to generate task"
            });
        }

        return res.json({
            success: true,
            task: aiTask
        });

    } catch (err) {
        console.log("AI ERROR:", err.response?.data || err.message);

        return res.status(500).json({
            success: false,
            message: err.response?.data || err.message
        });
    }
};