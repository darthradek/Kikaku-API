import { NextFunction, Request, Response } from 'express';
import Task from '../models/task';

const createTask = (req: Request, res: Response, next: NextFunction) => {
    const { title, status, isOptional, content, deadline, created_by } = req.body;
    const task = new Task({
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

const getAllTasks = (req: Request, res: Response, next: NextFunction) => {
    const task_id = req.params.taskId;

    return Task.find({ task_id })
        .populate('created_by')
        .then((tasks) => (tasks ? res.status(200).json(tasks) : res.status(404).json({ message: 'Tasks not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const deleteTask = (req: Request, res: Response, next: NextFunction) => {
    const task_id = req.params.taskId;

    return Task.findByIdAndDelete(task_id)
        .then((task) => (task ? res.status(201).json({ task, message: 'Task deleted successfully' }) : res.status(404).json({ message: 'Task not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createTask, getAllTasks, deleteTask };
