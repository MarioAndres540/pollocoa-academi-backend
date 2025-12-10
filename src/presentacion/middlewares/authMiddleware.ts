import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../../infraestructura/seguridad/JWTService';

const jwtService = new JWTService();

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
      return;
    }

    const token = authHeader.substring(7); // Remover "Bearer "

    // Verificar token
    const decoded = jwtService.verifyToken(token);
    
    if (!decoded) {
      res.status(401).json({
        success: false,
        message: 'Token inválido o expirado'
      });
      return;
    }

    // Adjuntar usuario al request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Error de autenticación'
    });
  }
};

// Middleware para verificar roles
export const checkRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'No autenticado'
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'No tienes permisos para realizar esta acción'
      });
      return;
    }

    next();
  };
};
