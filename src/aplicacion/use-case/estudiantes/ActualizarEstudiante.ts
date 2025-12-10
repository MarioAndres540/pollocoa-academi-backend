import { IEstudiantesRepository } from "../../../dominio/repositorios/IEstudiantesRepository";
import { UpdateEstudianteDTO, EstudianteResponseDTO } from "../../dto/EstudianteDTO";

export class ActualizarEstudiante {
  constructor(private studentRepository: IEstudiantesRepository) {}

  async execute(id: string, data: UpdateEstudianteDTO): Promise<EstudianteResponseDTO> {
    // Verificar que el estudiante existe
    const existing = await this.studentRepository.findById(id);
    if (!existing) {
      throw new Error('Estudiante no encontrado');
    }

    // Validar datos si se proporcionan
    if (data.email) {
      this.validateEmail(data.email);
    }

    // Preparar datos para actualizar
    const updateData: any = {};
    if (data.nombre) updateData.firstName = data.nombre.trim();
    if (data.apellido) updateData.lastName = data.apellido.trim();
    if (data.email) updateData.email = data.email.toLowerCase().trim();
    if (data.numeroDocumento) updateData.documentNumber = data.numeroDocumento.trim();

    const updated = await this.studentRepository.update(id, updateData);
    if (!updated) {
      throw new Error('Error al actualizar el estudiante');
    }

    return {
      id: updated.id!,
      nombre: updated.nombre,
      apellido: updated.apellido,
      email: updated.email,
      numeroDocumento: updated.numeroDocumento,
      isActive: updated.isActive,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    };
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Email inválido');
    }
  }
}