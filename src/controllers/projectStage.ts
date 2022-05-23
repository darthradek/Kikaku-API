import { NextFunction, Request, Response } from 'express';
import ProjectStage from '../models/projectStage';

const createProjectStage = (req: Request, res: Response, next: NextFunction) => {
    const { title, tasks, project_id } = req.body;
    const projectStage = new ProjectStage({
        title,
        tasks,
        project_id
    });

    return projectStage
        .save()
        .then((projectStage) => res.status(201).json({ projectStage }))
        .catch((error) => res.status(500).json({ error }));
};

const updateProjectStage = (req: Request, res: Response, next: NextFunction) => {
    const projectStage_id = req.params.projectStageId;

    return ProjectStage.findById(projectStage_id)
        .then((projectStage) => {
            if (projectStage) {
                projectStage.set(req.body);

                return projectStage
                    .save()
                    .then((projectStage) => res.status(201).json(projectStage))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Project not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const getAllProjectStagesForProject = (req: Request, res: Response, next: NextFunction) => {
    const project_id = req.params.projectId;

    return ProjectStage.find({ project_id })
        .populate('tasks')
        .then((projectStages) => (projectStages ? res.status(200).json(projectStages) : res.status(404).json({ message: 'Projects not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const deleteProjectStage = (req: Request, res: Response, next: NextFunction) => {
    const project_id = req.params.projectId;

    return ProjectStage.findByIdAndDelete(project_id)
        .then((projectStage) => (projectStage ? res.status(201).json({ projectStage, message: 'Project deleted successfully' }) : res.status(404).json({ message: 'Project not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createProjectStage, updateProjectStage, getAllProjectStagesForProject, deleteProjectStage };
