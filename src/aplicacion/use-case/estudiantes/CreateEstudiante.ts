import { IEstudiantesRepository } from "../../../dominio/repositorios/IEstudiantesRepository";
import { Estudiante } from "../../../dominio/entidades/Estudiante";
import { CreateEstudianteDTO, EstudianteResponseDTO } from "../../dto/EstudianteDTO";

export class CreateEstudiante {
    constructor(private studentRepository: IEstudiantesRepository) {}

  async execute(data: CreateEstudianteDTO): Promise<EstudianteResponseDTO> {
    // Validaciones
    this.validateEmail(data.email);
    this.validateDocumentNumber(data.numeroDocumento);

    // Crear estudiante
    const student: Estudiante = {
      nombre: data.nombre.trim(),
      apellido: data.apellido.trim(),
      email: data.email.toLowerCase().trim(),
      numeroDocumento: data.numeroDocumento.trim(),
      isActive: true
    };

    const created = await this.studentRepository.create(student);
    return this.mapToDTO(created);
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }
  }

  private validateDocumentNumber(documentNumber: string): void {
    if (documentNumber.length < 5) {
      throw new Error('El número de documento debe tener al menos 5 caracteres');
    }
  }

  private mapToDTO(student: Estudiante): EstudianteResponseDTO {
    return {
      id: student.id!,
      nombre: student.nombre,
      apellido: student.apellido,
      email: student.email,
      numeroDocumento: student.numeroDocumento,
      isActive: student.isActive,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    };
  }
}