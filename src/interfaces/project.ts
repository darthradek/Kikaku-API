import { Document } from 'mongoose';
import ITeam from './team';
import IUser from './user';

export default interface IProject extends Document {
    name: string;
    objective: string;
    description: string;
    status: number;
    deadline: string;
    team: ITeam;
    created_by: IUser;
    created_at: string;
}
