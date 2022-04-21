import mongoose, { Schema } from 'mongoose';
import IProject from '../interfaces/project';

const ProjectSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    objective: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Number, required: true },
    deadline: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, required: true, ref: 'Team' },
    created_by: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IProject>('Project', ProjectSchema);
