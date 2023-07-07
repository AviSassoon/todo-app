import mongoose from 'mongoose';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || '');

    console.log('Database connected!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new DatabaseConnectionError();
  }
};

export default connectDB;
