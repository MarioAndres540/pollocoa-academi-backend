// src/server.ts
import { startServer } from './app';
import { config } from './configuracion/env';

const main = async () => {
  try {
    console.log(`
╔══════════════════════════════════════════════════╗
║  🎯 Iniciando aplicación...                      ║
║  📝 Environment: ${config.nodeEnv}                  ║
║  🚪 Port: ${config.port}                                ║
╚══════════════════════════════════════════════════╝
    `);
    
    const server = await startServer();
    
    // Iniciar servidor HTTP (con WebSockets)
    server.listen(config.port, () => {
      // El mensaje ya se muestra en startServer()
    });
    
  } catch (error) {
    console.error('❌ Error fatal al iniciar la aplicación:', error);
    process.exit(1);
  }
};

// Manejo de errores no capturados
process.on('unhandledRejection', (reason: Error | any) => {
  console.error('💥 UNHANDLED REJECTION!');
  console.error('Reason:', reason?.message || reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error(error.name, error.message);
  console.error(error.stack);
  process.exit(1);
});

// Manejar señales de terminación
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Iniciar la aplicación
main();