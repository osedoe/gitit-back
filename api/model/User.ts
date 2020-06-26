import { Document, model, Schema } from 'mongoose';

export interface UserModel extends Document {
    id: string;
    email: string;
    token: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    id: String,
    email: String,
    token: String,
    password: String
});

export default model<UserModel>('user', UserSchema);
