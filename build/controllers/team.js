"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const team_1 = __importDefault(require("../models/team"));
const createTeam = (req, res, next) => {
    const { name, description, members, leader, created_by } = req.body;
    const team = new team_1.default({
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
const getAllTeams = (req, res, next) => {
    team_1.default.find()
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
const getTeamById = (req, res, next) => {
    const teamId = req.params.teamId;
    return team_1.default.findById(teamId)
        .populate('members')
        .populate('leader')
        .populate('created_by')
        .then((team) => (team ? res.status(200).json(team) : res.status(404).json({ message: 'Team not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const updateTeam = (req, res, next) => {
    const teamId = req.params.teamId;
    return team_1.default.findById(teamId)
        .then((team) => {
        if (team) {
            team.set(req.body);
            return team
                .save()
                .then((team) => res.status(201).json({ team }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: 'Team not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteTeam = (req, res, next) => {
    const teamId = req.params.teamId;
    return team_1.default.findByIdAndDelete(teamId)
        .then((team) => (team ? res.status(201).json({ team, message: 'Team deleted successfully' }) : res.status(404).json({ message: 'Team not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createTeam, getTeamById, getAllTeams, deleteTeam, updateTeam };
