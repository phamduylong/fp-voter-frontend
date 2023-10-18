
import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    id: number;
    fingerprintId?: number;
    sensorId?: number;
    candidateVotedId?: number | null;
    isAdmin: boolean;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: Number, required: true, default: -1 },
    fingerprintId: { type: Number, required: false, max: 162, default: -1 },
    sensorId: { type: Number, required: false, default: -1 },
    candidateVotedId: { type: Number, required: false, default: null },
    isAdmin: { type: Boolean, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;


