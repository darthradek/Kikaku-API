import { Document } from 'mongoose';
import ITask from './ITask';

export default interface IProjectStage extends Document {
    title: string;
    tasks: ITask[];
    created_at: string;
}
