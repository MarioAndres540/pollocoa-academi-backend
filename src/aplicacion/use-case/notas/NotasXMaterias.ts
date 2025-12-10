import { INotasRepository } from "../../../dominio/repositorios/INotasRepository";
import { IMateriasRepository } from "../../../dominio/repositorios/IMateriasRepository";
import { NotaResponseDTO } from "../../dto/NotaDTO";

export class NotasXMaterias {
    constructor(
    private gradeRepository: INotasRepository,
    private subjectRepository: IMateriasRepository
  ) {}

  async execute(subjectId: string): Promise<NotaResponseDTO[]> {
    const subject = await this.subjectRepository.findById(subjectId);
    if (!subject) {
      throw new Error('Materia no encontrada');
    }

    const grades = await this.gradeRepository.findBySubject(subjectId);

    return grades.map(grade => ({
      id: grade.id!,
      estudianteId: grade.estudianteId,
      materiaId: grade.materiaId,
      valor: grade.valor,
      description: grade.description,
      createdAt: grade.createdAt,
      updatedAt: grade.updatedAt
    }));
  }
}