import mongoose, { Schema } from 'mongoose';
import ITeam from '../interfaces/ITeam';

const TeamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
    leader: { type: Schema.Types.ObjectId, required: false, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    created_by: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

export default mongoose.model<ITeam>('Team', TeamSchema);
