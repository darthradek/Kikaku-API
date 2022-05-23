import { Document } from 'mongoose';
import IUser from './IUser';

export default interface ITask extends Document {
    title: string;
    status: number;
    isOptional: boolean;
    content: string;
    created_at: string;
    assigned_users: IUser[];
    deadline: string;
}
