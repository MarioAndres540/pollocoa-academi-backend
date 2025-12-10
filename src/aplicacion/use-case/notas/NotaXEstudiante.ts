import { INotasRepository } from "../../../dominio/repositorios/INotasRepository";
import { IEstudiantesRepository } from "../../../dominio/repositorios/IEstudiantesRepository";
import { NotaResponseDTO, NotaWithDetailsDTO } from "../../dto/NotaDTO";

export class NotaXEstudiante {
     constructor(
    private gradeRepository: INotasRepository,
    private studentRepository: IEstudiantesRepository
  ) {}

  async execute(studentId: string): Promise<NotaWithDetailsDTO []> {
    // Verificar que el estudiante existe
    const student = await this.studentRepository.findById(studentId);
    console.log('student', student);
    if (!student) {
      throw new Error('Estudiante no encontrado');
    }

    const grades = await this.gradeRepository.findByStudent(studentId);
    console.log('grades', grades);

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