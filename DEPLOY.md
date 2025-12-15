# Guía de Despliegue y Configuración

## Requisitos Previos
- Servidor (VPS) con Linux (Ubuntu/Debian recomendado).
- Acceso Root o usuario con privilegios sudo.
- Dominio apuntando a la IP del servidor (opcional, pero recomendado).

## 1. Acceso y Configuración SSH

### Generar Par de Claves (En tu máquina local)
Si no tienes claves SSH:
```bash
ssh-keygen -t ed25519 -C "tu_email@ejemplo.com"
```

### Configura el Archivo SSH Config (Opcional)
Edita `~/.ssh/config` para acceso rápido:
```
Host mi-servidor
    HostName IP_DEL_SERVIDOR
    User root
    IdentityFile ~/.ssh/id_ed25519
```

### Acceder al Servidor
```bash
ssh root@IP_DEL_SERVIDOR
```

### Asegurar el Servidor (Básico)
1. **Actualizar paquetes**:
    ```bash
    apt update && apt upgrade -y
    ```
2. **Crear nuevo usuario y deshabilitar root (Recomendado)**:
    ```bash
    adduser deploy
    usermod -aG sudo deploy
    ```
3. **Instalar Docker y Docker Compose**:
    Sigue la guía oficial o usa el script de conveniencia:
    ```bash
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    ```

## 2. Despliegue con Docker Compose

### Preparar el Proyecto
1. Clona tu repositorio en el servidor o copia los archivos.
    ```bash
    git clone <URL_DEL_REPO>
    cd pollocoa-academi-backend
    ```
2. Configura las variables de entorno:
    ```bash
    cp .env .env.prod
    nano .env
    ```
    *Asegúrate de cambiar `NODE_ENV=production` y usar contraseñas seguras.*

### Ejecutar
```bash
docker compose up --build -d
```
Esto iniciará:
- La aplicación en el puerto `3000`.
- MongoDB en el puerto `27017` (aislado en la red interna a menos que se exponga).

### Verificar
```bash
docker compose logs -f app
```

## 3. Mantenimiento
- **Reiniciar**: `docker compose restart`
- **Actualizar**:
    ```bash
    git pull
    docker compose up --build -d
    ```
- **Ver logs**: `docker compose logs --tail=100 -f`
