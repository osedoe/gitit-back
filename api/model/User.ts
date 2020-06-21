import { Document, model, Schema } from 'mongoose';

export interface UserModel extends Document {
    email: string;
    token: string;
}

const UserSchema: Schema = new Schema({
    email: String,
    token: String
});

export default model<UserModel>('user', UserSchema);
