import { IProfesorRepository } from "../../../dominio/repositorios/IProfesoresRepository";
import { PasswordService } from "../../../infraestructura/seguridad/PasswordService";
import { JWTService } from "../../../infraestructura/seguridad/JWTService";
import { LoginDTO, AuthResponseDTO } from "../../dto/AuthDTO";

export class Login {
     constructor(
    private userRepository: IProfesorRepository,
    private passwordService: PasswordService,
    private jwtService: JWTService
  ) {}

  async execute(data: LoginDTO): Promise<AuthResponseDTO> {
    // Buscar usuario por email
    const user = await this.userRepository.findByEmail(data.email.toLowerCase());
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isValidPassword = await this.passwordService.compare(
      data.password,
      user.password
    );
    if (!isValidPassword) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token
    const token = this.jwtService.generateToken({
      userId: user.id!,
      email: user.email,
      role: user.role
    });

    return {
      token,
      user: {
        id: user.id!,
        email: user.email,
        nombre: user.nombre,
        role: user.role
      }
    };
  }
}