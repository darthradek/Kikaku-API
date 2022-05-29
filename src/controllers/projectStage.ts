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
        .then((projectStage) => res.status(201).json(projectStage))
        .catch((error) => res.status(500).json({ error }));
};

const updateProjectStage = (req: Request, res: Response, next: NextFunction) => {
    const projectStageId = req.params.projectStageId;

    return ProjectStage.findById(projectStageId)
        .then((projectStage) => {
            if (projectStage) {
                projectStage.set(req.body);
                return projectStage
                    .save()
                    .then((projectStage) => res.status(201).json(projectStage))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Project Stage couldnt be updated' });
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
    const projectStageId = req.params.projectStageId;

    return ProjectStage.findByIdAndDelete(projectStageId)
        .then((projectStage) => (projectStage ? res.status(201).json({ projectStage, message: 'Project Stage deleted successfully' }) : res.status(404).json({ message: 'Project Stage not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createProjectStage, updateProjectStage, getAllProjectStagesForProject, deleteProjectStage };
