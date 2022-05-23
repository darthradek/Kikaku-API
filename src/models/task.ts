import mongoose, { Schema } from 'mongoose';
import ITask from '../interfaces/ITask';

const TaskSchema = new Schema({
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    deadline: { type: String, required: true },
    status: { type: Number, required: true },
    assigned_users: [{ type: Schema.Types.ObjectId, required: false, ref: 'User' }],
    created_at: { type: Date, default: Date.now },
    created_by: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

export default mongoose.model<ITask>('Task', TaskSchema);
