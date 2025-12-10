🎓 Sistema de Gestión Académica - Backend
Sistema backend completo para la gestión de estudiantes, materias y notas, desarrollado con Node.js, TypeScript, MongoDB y Clean Architecture.

📋 Tabla de Contenidos

Características
Arquitectura
Tecnologías
Instalación
Uso
API Documentation
Estructura del Proyecto
Variables de Entorno
Scripts Disponibles
Despliegue
Contribución
Licencia

✨ Características
Módulo de Estudiantes

✅ Crear, editar y eliminar estudiantes
✅ Cambiar estado (activo/inactivo)
✅ Listar con filtros por estado
✅ Exportar a Excel (XLSX) y PDF

Módulo de Materias

✅ Crear, editar y eliminar materias
✅ Cambiar estado (activo/inactivo)
✅ Gestión de créditos y códigos únicos
✅ Exportar a Excel (XLSX) y PDF

Módulo de Notas

✅ Agregar múltiples notas por estudiante y materia
✅ Validación de notas (0 a 5)
✅ Editar y eliminar notas
✅ Visualizar por estudiante o materia
✅ Solo estudiantes y materias activos
✅ Exportar a Excel (XLSX) y PDF

Funcionalidades Técnicas

🔐 Autenticación JWT
🔒 Encriptación de contraseñas con bcrypt
🚀 WebSockets para notificaciones en tiempo real
📊 Exportación de reportes (Excel y PDF)
🛡️ Rate limiting y seguridad con Helmet
📝 Validación de datos en múltiples capas
🏗️ Clean Architecture
🐳 Docker y Docker Compose ready

🏛️ Arquitectura
Este proyecto implementa Clean Architecture con 4 capas bien definidas:
┌─────────────────────────────────────────┐
│   PRESENTACIÓN (Express, Controllers)   │
├─────────────────────────────────────────┤
│   APLICACIÓN (Casos de Uso, DTOs)       │
├─────────────────────────────────────────┤
│   DOMINIO (Entidades, Interfaces)       │
├─────────────────────────────────────────┤
│   INFRAESTRUCTURA (MongoDB, Servicios)  │
└─────────────────────────────────────────┘
Principios SOLID

✅ Single Responsibility Principle
✅ Open/Closed Principle
✅ Liskov Substitution Principle
✅ Interface Segregation Principle
✅ Dependency Inversion Principle

🛠️ Tecnologías
Core

Node.js 18+
TypeScript 5.9
Express.js 4.18
MongoDB 7.0
Mongoose 8.0

Seguridad

jsonwebtoken - Autenticación JWT
bcrypt - Hash de contraseñas
helmet - Headers de seguridad
cors - Control de CORS
express-rate-limit - Rate limiting

Exportación

exceljs - Generación de archivos Excel
pdfkit - Generación de archivos PDF

Tiempo Real

socket.io - WebSockets

DevOps

Docker - Containerización
Docker Compose - Orquestación
ts-node-dev - Hot reload en desarrollo

📦 Instalación
Requisitos Previos

Node.js 18 o superior
MongoDB 7.0 o superior
Git

Pasos
bash# Clonar repositorio
git clone https://github.com/tu-usuario/academic-manager-backend.git
cd academic-manager-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Iniciar MongoDB (si no está corriendo)
sudo systemctl start mongod

# Ejecutar en modo desarrollo
npm run dev
El servidor estará disponible en http://localhost:3000
🚀 Uso
Desarrollo
bash# Modo desarrollo con hot reload
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar versión compilada
npm start

# Limpiar y compilar
npm run clean && npm run build
Pruebas
bash# Ejecutar script de pruebas automatizado
node test-api.js

# O usar las colecciones de Postman/Yaak incluidas
📚 API Documentation
Base URL
http://localhost:3000/api
Autenticación
Todos los endpoints (excepto /auth/register y /auth/login) requieren autenticación mediante JWT:
Authorization: Bearer <tu_token_jwt>
Endpoints Principales
Autenticación

POST /auth/register - Registrar usuario
POST /auth/login - Iniciar sesión
GET /auth/profile - Obtener perfil

Estudiantes

POST /students - Crear estudiante
GET /students - Listar estudiantes
GET /students/:id - Obtener estudiante
PUT /students/:id - Actualizar estudiante
PATCH /students/:id/status - Cambiar estado
GET /students/export/excel - Exportar a Excel
GET /students/export/pdf - Exportar a PDF

Materias

POST /subjects - Crear materia
GET /subjects - Listar materias
GET /subjects/:id - Obtener materia
PUT /subjects/:id - Actualizar materia
PATCH /subjects/:id/status - Cambiar estado
GET /subjects/export/excel - Exportar a Excel
GET /subjects/export/pdf - Exportar a PDF

Notas

POST /grades - Crear nota
GET /grades - Listar todas las notas
GET /grades/student/:studentId - Notas por estudiante
GET /grades/subject/:subjectId - Notas por materia
PUT /grades/:id - Actualizar nota
DELETE /grades/:id - Eliminar nota
GET /grades/export/excel - Exportar a Excel
GET /grades/export/pdf - Exportar a PDF

Ejemplos de Uso
Registrar Usuario
bashPOST /api/auth/register
Content-Type: application/json

{
  "email": "profesor@universidad.com",
  "password": "ProfesorSeguro123",
  "name": "Juan Pérez",
  "role": "teacher"
}
Crear Estudiante
bashPOST /api/students
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "María",
  "apellido": "González",
  "email": "maria@estudiante.com",
  "numeroDocumento": "1234567890"
}
Crear Nota
bashPOST /api/grades
Authorization: Bearer <token>
Content-Type: application/json

{
  "estudianteId": "6939270bae58af188d64417d",
  "materiaId": "69392b7b3ed012b243e10253",
  "valor": 4.5,
  "description": "Primer parcial - Excelente"
}
Para más ejemplos, consulta el archivo api-tests.http incluido.
📁 Estructura del Proyecto
src/
├── dominio/                    # Capa de Dominio
│   ├── entities/               # Entidades del negocio
│   └── repositorios/           # Interfaces de repositorios
├── aplicacion/                 # Capa de Aplicación
│   ├── dto/                    # Data Transfer Objects
│   └── use-cases/              # Casos de uso
├── infraestructura/            # Capa de Infraestructura
│   ├── database/               # Conexión y modelos DB
│   ├── security/               # Servicios de seguridad
│   ├── exports/                # Servicios de exportación
│   └── websocket/              # WebSocket service
├── presentacion/               # Capa de Presentación
│   ├── controllers/            # Controladores HTTP
│   ├── routes/                 # Definición de rutas
│   └── middlewares/            # Middlewares
├── config/                     # Configuraciones
└── server.ts                   # Punto de entrada
🔧 Variables de Entorno
Crea un archivo .env en la raíz del proyecto:
env# Entorno
NODE_ENV=development
PORT=3000

# MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/student_management
MONGODB_URI_DOCKER=mongodb://mongodb:27017/student_management

# JWT
JWT_SECRET=tu_secreto_super_seguro_cambialo_en_produccion
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:5173
📜 Scripts Disponibles
json{
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "clean": "rm -rf dist",
  "test": "node test-api.js"
}