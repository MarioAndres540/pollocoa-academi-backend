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

  async execute(data: RegisterDTO): Promise<AuthResponseDTO> {
    // Validar email
    this.validateEmail(data.email);

    // Validar contraseña
    const passwordValidation = this.passwordService.validate(data.password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.errors.join(', '));
    }

    // Verificar que el email no esté registrado
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await this.passwordService.hash(data.password);

    // Crear usuario
    const user: Profesor = {
      email: data.email.toLowerCase().trim(),
      password: hashedPassword,
      nombre: data.nombre.trim(),
      role: data.role || 'teacher'
    };

    const created = await this.userRepository.create(user);

    // Generar token
    const token = this.jwtService.generateToken({
      userId: created.id!,
      email: created.email,
      role: created.role
    });

    return {
      token,
      user: {
        id: created.id!,
        email: created.email,
        nombre: created.nombre,
        role: created.role
      }
    };
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }
  }
}