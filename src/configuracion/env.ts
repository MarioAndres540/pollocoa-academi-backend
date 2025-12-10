// src/config/env.ts
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  mongodb: {
    uri: process.env.NODE_ENV === 'production' 
      ? process.env.MONGODB_URI_DOCKER 
      : process.env.MONGODB_URI || 'mongodb://localhost:27017/student_management'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_change_this',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200'
  }
};