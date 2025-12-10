import { IEstudiantesRepository } from "../../../dominio/repositorios/IEstudiantesRepository";
import { EstudianteResponseDTO } from "../../dto/EstudianteDTO";

export class CambioEstadoEstudiante {
    constructor(private studentRepository: IEstudiantesRepository) {}

  async execute(id: string, isActive: boolean): Promise<EstudianteResponseDTO> {
    // Verificar que el estudiante existe
    const existing = await this.studentRepository.findById(id);
    if (!existing) {
      throw new Error('Estudiante no encontrado');
    }

    const updated = await this.studentRepository.changeStatus(id, isActive);
    if (!updated) {
      throw new Error('Error al cambiar el estado del estudiante');
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
}