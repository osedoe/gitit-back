import { Document, Schema } from 'mongoose';
import DBManager from '../db/database';

export interface UserModel extends Document {
  id: string;
  email: string;
  githubToken: string;
  password: string;
}

export const UserSchema: Schema = new Schema({
  id: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  githubToken: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    required: true
  }
});

// export default DBManager.getInstance().setModel<UserModel>('user', UserSchema);
// export default DBManager.getConnection().model<UserModel>('user', UserSchema);
