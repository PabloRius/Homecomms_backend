import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not defined in the env variables');
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to the MongoDB instance');
  } catch (error) {
    console.error('Error connecting to the MongoDB instance', error);
    process.exit(1);
  }
};

export default connectDB;
