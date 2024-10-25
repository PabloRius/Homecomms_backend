import mongoose, { Document, Schema } from 'mongoose';

export interface IHub extends Document {
  //Shown info
  name: string;
  description: string;
  CdnPhotoUrl: string;

  // Internal info
  participants: Array<string>;
  createdBy: string;
  createdAt: Date;

  // External references
  pantryId: string;
}

const HubSchema: Schema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  description: { type: String, default: 'No description provided' },
  CdnPhotoUrl: {
    type: String,
    default:
      'https://res.cloudinary.com/dszl8ytip/image/upload/f_auto,q_auto/hub_placeholder',
  },
  participants: { type: Array<string>, required: true },
  createdAt: { type: Date, default: Date.now },
  pantryId: { type: String },
});

export default mongoose.model<IHub>('Hub', HubSchema);
