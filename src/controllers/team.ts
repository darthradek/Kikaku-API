import { NextFunction, Request, Response } from 'express';
import Team from '../models/team';

const createTeam = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, members, leader, created_by } = req.body;

    const team = new Team({
        name,
        description,
        members,
        leader,
        created_by
    });

    return team
        .save()
        .then((team) => res.status(201).json({ team }))
        .catch((error) => res.status(500).json({ error }));
};

const getAllTeams = (req: Request, res: Response, next: NextFunction) => {
    Team.find()
        .exec()
        .then((teams) => {
            return res.status(200).json({
                teams: teams,
                count: teams.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getTeamById = (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;

    return Team.findById(teamId)
        .populate('members')
        .populate('leader')
        .populate('created_by')
        .then((team) => (team ? res.status(200).json(team) : res.status(404).json({ message: 'Team not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const updateTeam = (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;

    return Team.findById(teamId)
        .then((team) => {
            if (team) {
                team.set(req.body);

                return team
                    .save()
                    .then((team) => res.status(201).json({ team }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Team not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteTeam = (req: Request, res: Response, next: NextFunction) => {
    const teamId = req.params.teamId;

    return Team.findByIdAndDelete(teamId)
        .then((team) => (team ? res.status(201).json({ team, message: 'Team deleted successfully' }) : res.status(404).json({ message: 'Team not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createTeam, getTeamById, getAllTeams, deleteTeam, updateTeam };
