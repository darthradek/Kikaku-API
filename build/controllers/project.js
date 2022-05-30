"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = __importDefault(require("../models/project"));
const createProject = (req, res, next) => {
    const { name, objective, description, status, deadline, team, created_by } = req.body;
    const project = new project_1.default({
        name,
        objective,
        description,
        status,
        deadline,
        team,
        created_by
    });
    return project
        .save()
        .then((project) => res.status(201).json(project))
        .catch((error) => res.status(500).json({ error }));
};
const getAllProjects = (req, res, next) => {
    project_1.default.find()
        .exec()
        .then((projects) => {
        return res.status(200).json({
            projects: projects,
            count: projects.length
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};
const getProjectById = (req, res, next) => {
    const projectId = req.params.projectId;
    return project_1.default.findById(projectId)
        .then((project) => (project ? res.status(200).json(project) : res.status(404).json({ message: 'Project not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const getAllProjectsCreatedByUser = (req, res, next) => {
    const created_by = req.params.created_by;
    return project_1.default.find({ created_by })
        .populate('created_by')
        .then((projects) => (projects ? res.status(200).json(projects) : res.status(404).json({ message: 'Projects not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const updateProject = (req, res, next) => {
    const projectId = req.params.projectId;
    return project_1.default.findById(projectId)
        .then((project) => {
        if (project) {
            project.set(req.body);
            return project
                .save()
                .then((project) => res.status(201).json({ project }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: 'Project not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteProject = (req, res, next) => {
    const projectId = req.params.projectId;
    return project_1.default.findByIdAndDelete(projectId)
        .then((project) => (project ? res.status(201).json(project) : res.status(404).json({ message: 'Project not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createProject, getProjectById, getAllProjects, getAllProjectsCreatedByUser, deleteProject, updateProject };
