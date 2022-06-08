"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const projectStage_1 = __importDefault(require("../models/projectStage"));
const createProjectStage = (req, res, next) => {
    const { title, tasks, project_id } = req.body;
    const projectStage = new projectStage_1.default({
        title,
        tasks,
        project_id
    });
    return projectStage
        .save()
        .then((projectStage) => res.status(201).json(projectStage))
        .catch((error) => res.status(500).json({ error }));
};
const updateProjectStage = (req, res, next) => {
    const projectStageId = req.params.projectStageId;
    return projectStage_1.default.findById(projectStageId)
        .then((projectStage) => {
        if (projectStage) {
            projectStage.set(req.body);
            return projectStage
                .save()
                .then((projectStage) => res.status(201).json(projectStage))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: 'Project Stage couldnt be updated' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const getAllProjectStagesForProject = (req, res, next) => {
    const project_id = req.params.projectId;
    return projectStage_1.default.find({ project_id })
        .populate('tasks')
        .then((projectStages) => (projectStages ? res.status(200).json(projectStages) : res.status(404).json({ message: 'Projects not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const deleteProjectStage = (req, res, next) => {
    const projectStageId = req.params.projectStageId;
    return projectStage_1.default.findByIdAndDelete(projectStageId)
        .then((projectStage) => (projectStage ? res.status(201).json({ projectStage, message: 'Project Stage deleted successfully' }) : res.status(404).json({ message: 'Project Stage not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createProjectStage, updateProjectStage, getAllProjectStagesForProject, deleteProjectStage };
