import { INotasRepository } from "../../../dominio/repositorios/INotasRepository";
import { IEstudiantesRepository } from "../../../dominio/repositorios/IEstudiantesRepository";
import { IMateriasRepository } from "../../../dominio/repositorios/IMateriasRepository";
import { Nota } from "../../../dominio/entidades/Nota";
import { CreateNotaDTO, NotaResponseDTO } from "../../dto/NotaDTO";

export class CrearNota {
    constructor(
    private gradeRepository: INotasRepository,
    private studentRepository: IEstudiantesRepository,
    private subjectRepository: IMateriasRepository
  ) {}

  async execute(data: CreateNotaDTO): Promise<NotaResponseDTO> {
    // Validar que el estudiante existe y está activo
    const student = await this.studentRepository.findById(data.estudianteId);
    if (!student) {
      throw new Error('Estudiante no encontrado');
    }
    if (!student.isActive) {
      throw new Error('El estudiante no está activo');
    }

    // Validar que la materia existe y está activa
    const subject = await this.subjectRepository.findById(data.materiaId);
    if (!subject) {
      throw new Error('Materia no encontrada');
    }
    if (!subject.isActive) {
      throw new Error('La materia no está activa');
    }

    // Validar el valor de la nota
    this.validateGradeValue(data.valor);

    const grade: Nota = {
      estudianteId: data.estudianteId,
      materiaId: data.materiaId,
      valor: data.valor,
      description: data.description?.trim()
    };

    const created = await this.gradeRepository.create(grade);
    return this.mapToDTO(created);
  }

  private validateGradeValue(value: number): void {
    if (value < 0 || value > 5) {
      throw new Error('La nota debe estar entre 0 y 5');
    }
    // Validar que tenga máximo 2 decimales
    if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
      throw new Error('La nota debe tener máximo 2 decimales');
    }
  }

  private mapToDTO(grade: Nota): NotaResponseDTO {
    return {
      id: grade.id!,
      estudianteId: grade.estudianteId,
      materiaId: grade.materiaId,
      valor: grade.valor,
      description: grade.description,
      createdAt: grade.createdAt,
      updatedAt: grade.updatedAt
    };
  }
}