import { IEstudiantesRepository } from "../../../dominio/repositorios/IEstudiantesRepository";
import { EstudianteResponseDTO } from "../../dto/EstudianteDTO";

export class TodosLosEstudiantes {
    constructor(private studentRepository: IEstudiantesRepository) {}

  async execute(onlyActive?: boolean): Promise<EstudianteResponseDTO[]> {
    const filters = onlyActive !== undefined ? { isActive: onlyActive } : undefined;
    const students = await this.studentRepository.findAll(filters);

    return students.map(student => ({
      id: student.id!,
      nombre: student.nombre,
      apellido: student.apellido,
      email: student.email,
      numeroDocumento: student.numeroDocumento,
      isActive: student.isActive,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    }));
  }
}