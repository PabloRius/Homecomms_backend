import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

export interface UserLogInfo {
  username: string;
  email: string;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
