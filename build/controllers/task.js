"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = __importDefault(require("../models/task"));
const createTask = (req, res, next) => {
    const { title, status, isOptional, content, deadline, created_by } = req.body;
    const task = new task_1.default({
        title,
        status,
        isOptional,
        content,
        deadline,
        created_by
    });
    task.save()
        .then((task) => res.status(201).json(task))
        .catch((error) => res.status(500).json({ error }));
};
const getAllTasks = (req, res, next) => {
    const task_id = req.params.taskId;
    return task_1.default.find({ task_id })
        .populate('created_by')
        .then((tasks) => (tasks ? res.status(200).json(tasks) : res.status(404).json({ message: 'Tasks not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const deleteTask = (req, res, next) => {
    const task_id = req.params.taskId;
    return task_1.default.findByIdAndDelete(task_id)
        .then((task) => (task ? res.status(201).json({ task, message: 'Task deleted successfully' }) : res.status(404).json({ message: 'Task not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createTask, getAllTasks, deleteTask };
