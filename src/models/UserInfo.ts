import mongoose, { Document, Schema } from 'mongoose';

export interface IUserInfo extends Document {
  username: string;
  hubs: Array<string>;
  createdAt: Date;
}

const UserInfoSchema: Schema = new Schema({
  username: { type: String, required: true },
  hubs: { type: Array<string>, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUserInfo>('UserInfo', UserInfoSchema);
