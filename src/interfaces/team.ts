import { Document } from 'mongoose';
import IUser from './user';

export default interface ITeam extends Document {
    name: string;
    description: string;
    members: IUser[];
    leader: string;
    created_by: IUser;
    created_at: string;
}
