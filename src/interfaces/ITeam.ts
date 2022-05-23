import { Document } from 'mongoose';
import IUser from './IUser';

export default interface ITeam extends Document {
    name: string;
    description: string;
    members: IUser[];
    leader: IUser;
    created_by: IUser;
    created_at: string;
}
