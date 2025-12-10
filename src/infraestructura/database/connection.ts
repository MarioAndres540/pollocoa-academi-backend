// src/infrastructure/database/connection.ts
import mongoose from 'mongoose';
import { config } from '../../configuracion/env';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoURI = config.mongodb.uri || 'mongodb://localhost:27017/student_management';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Manejo de eventos de conexión
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB error:', error);
});