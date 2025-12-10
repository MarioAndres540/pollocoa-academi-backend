import { INotasRepository } from "../../../dominio/repositorios/INotasRepository";
import { NotaResponseDTO } from "../../dto/NotaDTO";

export class TodasLasNotas {
    constructor(private gradeRepository: INotasRepository) {}

  async execute(): Promise<NotaResponseDTO[]> {
    const grades = await this.gradeRepository.findAll();

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