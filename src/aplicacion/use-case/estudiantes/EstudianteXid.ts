import { IEstudiantesRepository } from "../../../dominio/repositorios/IEstudiantesRepository";
import { EstudianteResponseDTO } from "../../dto/EstudianteDTO";

export class EstudianteXid {
    constructor(private studentRepository: IEstudiantesRepository) {}

  async execute(id: string): Promise<EstudianteResponseDTO> {
    const student = await this.studentRepository.findById(id);
    
    if (!student) {
      throw new Error('Estudiante no encontrado');
    }

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