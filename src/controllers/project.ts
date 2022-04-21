import { NextFunction, Request, Response } from 'express';
import Project from '../models/project';

const createProject = (req: Request, res: Response, next: NextFunction) => {
    const { name, objective, description, status, deadline, team, created_by } = req.body;

    const project = new Project({
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
        .then((project) => res.status(201).json({ project }))
        .catch((error) => res.status(500).json({ error }));
};

const getAllProjects = (req: Request, res: Response, next: NextFunction) => {
    Project.find()
        .exec()
        .then((projects) => {
            return res.status(200).json({
                teams: projects,
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

const getProjectById = (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.projectId;

    return Project.findById(projectId)
        .then((project) => (project ? res.status(200).json({ project }) : res.status(404).json({ message: 'Project not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const updateProject = (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.projectId;

    return Project.findById(projectId)
        .then((project) => {
            if (project) {
                project.set(req.body);

                return project
                    .save()
                    .then((project) => res.status(201).json({ project }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteProject = (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.projectId;

    return Project.findByIdAndDelete(projectId)
        .then((project) => (project ? res.status(201).json({ project, message: 'Project deleted successfully' }) : res.status(404).json({ message: 'Project not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createProject, getProjectById, getAllProjects, deleteProject, updateProject };
