# Build Stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para compilar)
RUN npm ci

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Production Stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar artifacts compilados del stage anterior
COPY --from=builder /usr/src/app/dist ./dist

# Crear usuario no privilegiado por seguridad
USER node

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "dist/server.js"]
