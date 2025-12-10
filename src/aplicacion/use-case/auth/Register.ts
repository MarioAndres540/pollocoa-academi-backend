import { IProfesorRepository } from "../../../dominio/repositorios/IProfesoresRepository";
import { Profesor } from "../../../dominio/entidades/Profesor";
import { PasswordService } from "../../../infraestructura/seguridad/PasswordService";
import { JWTService } from "../../../infraestructura/seguridad/JWTService";
import { RegisterDTO, AuthResponseDTO } from "../../dto/AuthDTO";

export class Register {
  constructor(
    private userRepository: IProfesorRepository,
    private passwordService: PasswordService,
    private jwtService: JWTService
  ) {}

  async execute(data: RegisterDTO): Promise<any> {
    // VALIDACIÓN DE DATOS DE ENTRADA
    if (!data.email || typeof data.email !== 'string') {
      throw new Error('El email es requerido');
    }
    
    if (!data.password || typeof data.password !== 'string') {
      throw new Error('La contraseña es requerida');
    }
    
    if (!data.nombre || typeof data.nombre !== 'string') {
      throw new Error('El nombre es requerido');
    }

    // Trim y validación
    const email = data.email.trim().toLowerCase();
    const nombre = data.nombre.trim();
    const password = data.password.trim();
    
    if (!email) {
      throw new Error('El email no puede estar vacío');
    }
    
    if (!nombre) {
      throw new Error('El nombre no puede estar vacío');
    }
    
    if (!password) {
      throw new Error('La contraseña no puede estar vacía');
    }
    
    if (password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('El email no tiene un formato válido');
    }

    // Verificar si el email ya existe
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('El email ya está registrado');
    }

    // Hashear contraseña
    const hashedPassword = await this.passwordService.hash(password);

    // Crear profesor
    const profesor: Profesor = {
      nombre: nombre,
      email: email,
      password: hashedPassword,
      role: data.role || 'teacher'
    };

    const created = await this.userRepository.create(profesor);

    // Generar token
    const token = this.jwtService.generateToken({
      userId: created.id!,
      email: created.email,
      role: created.role
    });

    return {
      user: {
        id: created.id,
        nombre: created.nombre,
        email: created.email,
        role: created.role
      },
      token
    };
  }
}