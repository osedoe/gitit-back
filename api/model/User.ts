import { Document, Schema } from 'mongoose';

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
