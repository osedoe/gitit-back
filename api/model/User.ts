import { Document, Schema } from 'mongoose';
import DBManager from '../db/database';

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

export default DBManager.getInstance().setModel<UserModel>('user', UserSchema);
// export default mongoose.connection.model<UserModel>('user', UserSchema);
