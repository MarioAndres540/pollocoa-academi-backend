// src/configuracion/db.ts
import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  try {
    // Si ya está conectado, no reconectar
    if (isConnected) {
      console.log("✅ MongoDB ya está conectado");
      return;
    }

    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/student_management';
    
    console.log("🔄 Conectando a MongoDB...");
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000, // 10 segundos timeout
      socketTimeoutMS: 45000, // 45 segundos timeout
      maxPoolSize: 10, // Límite de conexiones
    });

    isConnected = true;
    console.log("✅ MongoDB conectado exitosamente");
    
    // Manejar eventos de conexión
    mongoose.connection.on('error', (err) => {
      console.error('❌ Error de conexión MongoDB:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB desconectado');
      isConnected = false;
    });

  } catch (error) {
    console.error("❌ Error de conexión MongoDB:", error);
    process.exit(1);
  }
};

// Exportar la conexión para usarla directamente si es necesario
export const mongooseConnection = mongoose.connection;