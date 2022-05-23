import { Document } from 'mongoose';
import ITeam from './ITeam';
import IUser from './IUser';

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
