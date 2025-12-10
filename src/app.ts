// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from "socket.io";
import { config } from './configuracion/env';
import { connectDB } from './configuracion/db';
import { initSocket } from "./infraestructura/sockets/SocketService";
import { errorHandler } from './presentacion/middlewares/errorHandler';

// Importar rutas (ajusta las rutas según tu estructura)
import authRoutes from './presentacion/rutas/auth.routes';
import estudiantesRoutes from './presentacion/rutas/estudiantes.routes';
import materiasRoutes from './presentacion/rutas/materias.routes'
import notasRoutes from './presentacion/rutas/notas.routes'

// Crear aplicación Express
export const app = express();
export const httpServer = createServer(app);

// Configurar Socket.io
export const io = new Server(httpServer, {
  cors: {
    origin: config.cors.origin || "*",
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// Middlewares de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "ws:", "wss:"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

// Configurar CORS
app.use(cors({
  origin: config.cors.origin || "*",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting para API REST (no aplicar a sockets)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Demasiadas peticiones desde esta IP, por favor intenta más tarde'
  },
  skip: (req) => {
    return req.path.startsWith('/socket.io/') || req.path === '/health';
  }
});

// Aplicar rate limiting solo a rutas de API
app.use('/api', apiLimiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de API
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv
  });
});

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/students', estudiantesRoutes);
app.use('/api/subjects', materiasRoutes);
app.use('/api/grades', notasRoutes);

// Ruta 404 para API
app.use('/api/:any', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta de API no encontrada'
  });
});

// Middleware de manejo de errores (debe ir al final, antes de iniciar el servidor)
app.use(errorHandler);

// Inicializar Socket.io
initSocket(io);

// Exportar función para iniciar el servidor
export const startServer = async () => {
  try {
    // CONECTAR A LA BASE DE DATOS AQUÍ - NO en otro lugar
    await connectDB();
    
    console.log(`
╔══════════════════════════════════════════════════╗
║  🚀 Server running on port ${config.port}                ║
║  📝 Environment: ${config.nodeEnv}                  ║
║  🗄️  Database: Connected                         ║
║  📡 REST API: http://localhost:${config.port}/api       ║
║  🔌 WebSocket: ws://localhost:${config.port}           ║
║  🩺 Health: http://localhost:${config.port}/health     ║
╚══════════════════════════════════════════════════╝
    `);
    
    return httpServer;
  } catch (error) {
    console.error('❌ Error starting server:', error);
    throw error;
  }
};
