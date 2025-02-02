import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const UserSchema = new Schema<TUser>({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  needsPasswordChange: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
  },
  status: {
    type: String,
    enum: ['in-progress', 'blocked'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const UserModel = model<TUser>('User', UserSchema);
