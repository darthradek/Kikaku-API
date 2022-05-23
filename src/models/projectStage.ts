import mongoose, { Schema } from 'mongoose';
import IProjectStage from '../interfaces/IProjectStage';

const ProjectStageSchema = new Schema({
    title: { type: String, required: true, unique: true },
    tasks: [{ type: Schema.Types.ObjectId, required: true, ref: 'Task' }],
    project_id: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model<IProjectStage>('ProjectStage', ProjectStageSchema);
