import { Document, model, Schema } from 'mongoose';

export interface UserModel extends Document {
  id: string;
  email: string;
  githubToken: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  id: String,
  email: String,
  githubToken: String,
  password: String
});

export default model<UserModel>('user', UserSchema);
