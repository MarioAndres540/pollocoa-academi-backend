import { INotasRepository } from "../../../dominio/repositorios/INotasRepository";
import { NotaResponseDTO, NotaWithDetailsDTO } from "../../dto/NotaDTO";

export class TodasLasNotas {
  constructor(private gradeRepository: INotasRepository) { }

  async execute(): Promise<NotaWithDetailsDTO[]> {
    const grades = await this.gradeRepository.findAll();

    return grades.map(grade => ({
      id: grade.id!,
      estudianteId: grade.estudianteId,
      materiaId: grade.materiaId,
      valor: grade.valor,
      description: grade.description,
      createdAt: grade.createdAt,
      updatedAt: grade.updatedAt,
      estudiante: grade.estudiante,
      materia: grade.materia
    }));
  }
}