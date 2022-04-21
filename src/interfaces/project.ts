import { Document } from 'mongoose';
import ITeam from './team';

export default interface IProject extends Document {
    name: string;
    objective: string;
    description: string;
    status: number;
    deadline: string;
    team: ITeam;
    created_by: string;
    created_at: string;
}
