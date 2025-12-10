import { Request, Response } from 'express';
import { RepositoryFactory } from '../../infraestructura/database/mongoose/repositories/RepositoryFactory';
import { PasswordService } from '../../infraestructura/seguridad/PasswordService';
import { JWTService } from '../../infraestructura/seguridad/JWTService';
import { Register } from '../../aplicacion/use-case/auth/Register';
import { Login } from '../../aplicacion/use-case/auth/Login';

export class AuthController {
    // Registro de usuario
  async register(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = RepositoryFactory.getUserRepository();
      const passwordService = new PasswordService();
      const jwtService = new JWTService();

      const register = new Register(userRepository, passwordService, jwtService);

      const result = await register.execute(req.body);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: result
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al registrar usuario'
      });
    }
  }

  // Login de usuario
  async login(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = RepositoryFactory.getUserRepository();
      const passwordService = new PasswordService();
      const jwtService = new JWTService();

      const login = new Login(userRepository, passwordService, jwtService);

      const result = await login.execute(req.body);

      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: result
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Error al iniciar sesión'
      });
    }
  }

  // Obtener perfil del usuario autenticado
  async getProfile(req: any, res: Response): Promise<void> {
    try {
      const userRepository = RepositoryFactory.getUserRepository();
      const user = await userRepository.findById(req.user.userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Perfil obtenido exitosamente',
        data: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          role: user.role
        }
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al obtener perfil'
      });
    }
  }
}