# Documentación del Proyecto - Sistema de Gestión Académica

Esta documentación detalla el funcionamiento interno, la arquitectura y la guía de uso de la API del Sistema de Gestión Académica.

## 🏗️ Arquitectura y Flujo Interno

El proyecto sigue los principios de **Clean Architecture** (Arquitectura Limpia), separando las responsabilidades en capas.

### Flujo de una Petición (Request Lifecycle)

Desde que inicia el servidor hasta que se responde a una petición, el flujo es el siguiente:

1.  **Inicio del Servidor (`server.ts`)**:
    *   Carga las variables de entorno (`.env`).
    *   Llama a `startServer()` en `app.ts`.
    *   Se conecta a la base de datos MongoDB.
    *   Inicia el servidor HTTP y WebSocket en el puerto configurado (ej. 3000).

2.  **Recepción de la Petición (`app.ts`)**:
    *   La petición entra a la aplicación Express.
    *   Pasa por middlewares globales:
        *   `Helmet`: Headers de seguridad.
        *   `Cors`: Permite peticiones desde otros dominios.
        *   `RateLimit`: Limita el número de peticiones para evitar abusos.
        *   `JSON Parser`: Convierte el cuerpo de la petición a JSON.

3.  **Enrutamiento (`src/presentacion/rutas/*.routes.ts`)**:
    *   Express dirige la petición al router correspondiente (ej. `/api/grades` va a `notas.routes.ts`).
    *   **Autenticación**: La mayoría de rutas pasan por `authMiddleware`, que verifica el token JWT en el header `Authorization`.

4.  **Controlador (`src/presentacion/controladores/*.ts`)**:
    *   Recibe la petición (`Request`) y la respuesta (`Response`).
    *   Extrae datos del body o params.
    *   Instancia el **Repositorio** (Infraestructura) y el **Caso de Uso** (Aplicación).
    *   Ejecuta el Caso de Uso.

5.  **Caso de Uso (`src/aplicacion/use-case/**/*.ts`)**:
    *   Contiene la lógica de negocio pura.
    *   No sabe de HTTP ni de bases de datos, solo manipula Entidades.
    *   Llama al Repositorio definido en una Interfaz.

6.  **Repositorio (`src/infraestructura/database/mongoose/repositories/*.ts`)**:
    *   Implementa la interfaz del dominio.
    *   Interactúa directamente con la base de datos usando Mongoose (`Models`).
    *   Convierte los documentos de Mongoose a Entidades de Dominio antes de devolverlos.

7.  **Respuesta**:
    *   El Controlador recibe el resultado del Caso de Uso.
    *   Formatea la respuesta JSON (ej. `{ success: true, data: ... }`).
    *   Envía la respuesta al cliente.

---

## 🚀 Requisitos para Consumir la API

Para consumir los endpoints desde **Postman**, **Insomnia**, o una **Aplicación Frontend**, necesitas:

1.  **URL Base**: `http://localhost:3000/api` (o el puerto que configures).
2.  **Headers Básicos**:
    *   `Content-Type`: `application/json`
3.  **Autenticación (JWT)**
    *   **Opción A (Recomendada)**: El sistema setea automáticamente una Cookie HTTP-Only llamada `token` al hacer Login. El navegador la enviará automáticamente en las siguientes peticiones.
    *   **Opción B (Header)**: Puedes enviar manualmente el header `Authorization`: `Bearer <TU_TOKEN_JWT>`.
    *   *Nota*: La cookie tiene prioridad secundaria si se envía el header.

### Pasos para probar en Postman:

1.  **Registrar Usuario** (`POST /api/auth/register`): Crea una cuenta.
2.  **Login** (`POST /api/auth/login`): Ingresa con tus credenciales.
3.  **Copiar Token**: Del JSON de respuesta del login, copia el `token`.
4.  **Configurar Auth en Postman**:
    *   Ve a la pestaña "Authorization".
    *   Tipo: `Bearer Token`.
    *   Pega el token.
5.  **Hacer Peticiones**: Ahora puedes consultar `/api/students`, `/api/grades`, etc.

---

## 📚 Referencia de Endpoints

### 🔐 Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Body Requerido |
|--------|----------|-------------|----------------|
| POST | `/register` | Registro | `{ "nombre": "...", "email": "...", "password": "..." }` |
| POST | `/login` | Iniciar Sesión | `{ "email": "...", "password": "..." }` |
| GET | `/profile` | Perfil Usuario | *Requiere Token* |

### 🎓 Estudiantes (`/api/students`)
*Requiere Auth Token*

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| GET | `/` | Listar todos | - |
| POST | `/` | Crear | `{ "nombre": "...", "apellido": "...", "email": "...", "numeroDocumento": "..." }` |
| GET | `/:id` | Ver detalle | - |
| PUT | `/:id` | Actualizar | `{ "nombre": "...", ... }` |
| PATCH | `/:id/status`| Cambiar estado a inactivo | - |
| GET | `/export/excel`| Descargar Excel | - |
| GET | `/export/pdf` | Descargar PDF | - |

### 📚 Materias (`/api/subjects`)
*Requiere Auth Token*

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| GET | `/` | Listar todas | - |
| POST | `/` | Crear | `{ "nombre": "...", "codigo": "..." }` |
| GET | `/:id` | Ver detalle | - |
| PUT | `/:id` | Actualizar | `{ "nombre": "...", ... }` |

### 📝 Notas (`/api/grades`)
*Requiere Auth Token*

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| GET | `/` | Listar todas (con relaciones) | - |
| POST | `/` | Crear nota | `{ "estudianteId": "ID", "materiaId": "ID", "valor": 3.5, "description": "..." }` |
| GET | `/student/:id` | Notas por Estudiante | - |
| GET | `/subject/:id` | Notas por Materia | - |
| PUT | `/:id` | Actualizar nota | `{ "valor": 4.0, ... }` |
| DELETE | `/:id` | Eliminar nota | - |

---

## 🛠️ Tecnologías Usadas

*   **Runtime**: Node.js
*   **Lenguaje**: TypeScript
*   **Framework**: Express
*   **Base de Datos**: MongoDB (con Mongoose)
*   **WebSockets**: Socket.io
*   **Seguridad**: Helmet, Cors, Bcrypt, JWT
