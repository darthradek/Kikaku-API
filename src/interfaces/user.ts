import { Document } from 'mongoose';

export default interface IUser extends Document {
    username: string;
    email: string;
    password_hash: string;
    created_at: string;
}
