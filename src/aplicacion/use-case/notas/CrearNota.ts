import { INotasRepository } from "../../../dominio/repositorios/INotasRepository";
import { IEstudiantesRepository } from "../../../dominio/repositorios/IEstudiantesRepository";
import { IMateriasRepository } from "../../../dominio/repositorios/IMateriasRepository";
import { Nota } from "../../../dominio/entidades/Nota";
import { CreateNotaDTO, NotaResponseDTO, NotaWithDetailsDTO } from "../../dto/NotaDTO";
import { Materia } from "../../../dominio/entidades/Materia";
import { Estudiante } from "../../../dominio/entidades/Estudiante";

// src/aplicacion/casosDeUso/notas/CrearNota.ts
export class CrearNota {
  constructor(
    private gradeRepository: INotasRepository,
    private studentRepository: IEstudiantesRepository,
    private subjectRepository: IMateriasRepository
  ) { }

  async execute(data: CreateNotaDTO): Promise<NotaWithDetailsDTO> {
    try {
      console.log('🔍 Datos recibidos para crear nota:', data);

      // 1. Validar Estudiante
      const student = await this.studentRepository.findById(data.estudianteId);
      if (!student) throw new Error('Estudiante no encontrado');
      if (!student.isActive) throw new Error('El estudiante no está activo');

      // 2. Validar Materia
      const subject = await this.subjectRepository.findById(data.materiaId);
      if (!subject) throw new Error('Materia no encontrada');
      if (!subject.isActive) throw new Error('La materia no está activa');

      // 3. Validar Valor
      this.validateGradeValue(data.valor);

      // 4. Crear Nota
      const gradeToCreate: Nota = {
        estudianteId: data.estudianteId,
        materiaId: data.materiaId,
        valor: data.valor,
        description: data.description?.trim()
      };

      const createdGrade = await this.gradeRepository.create(gradeToCreate);

      // 5. Construir respuesta con detalles explícitamente
      const response: NotaWithDetailsDTO = {
        id: createdGrade.id!, // Asegurar que usamos el ID generado
        estudianteId: createdGrade.estudianteId,
        materiaId: createdGrade.materiaId,
        valor: createdGrade.valor,
        description: createdGrade.description,
        createdAt: createdGrade.createdAt,
        updatedAt: createdGrade.updatedAt,

        // Poblar detalles
        estudiante: {
          id: student.id!,
          nombre: student.nombre,
          apellido: student.apellido,
          email: student.email
        },
        materia: {
          id: subject.id!,
          nombre: subject.nombre,
          codigo: subject.codigo
        }
      };

      console.log('✅ Nota creada y mapeada:', response);
      return response;

    } catch (error: any) {
      console.error('❌ Error en CrearNota.execute:', error);
      throw error;
    }
  }

  private validateGradeValue(value: number): void {
    if (value < 0 || value > 5) {
      throw new Error('La nota debe estar entre 0 y 5');
    }

    const valueStr = value.toString();
    if (valueStr.includes('.')) {
      const decimalPart = valueStr.split('.')[1];
      if (decimalPart && decimalPart.length > 2) {
        throw new Error('La nota debe tener máximo 2 decimales');
      }
    }
  }

  // mapToDTO ya no es necesario si construimos la respuesta directamente arriba, 
  // pero lo mantenemos por si se usa en otros métodos o para compatibilidad futura
  private mapToDTO(grade: Nota, student: Estudiante, subject: Materia): NotaWithDetailsDTO {
    return {
      id: grade.id!,
      estudianteId: grade.estudianteId,
      materiaId: grade.materiaId,
      valor: grade.valor,
      description: grade.description,
      estudiante: {
        id: student.id!,
        nombre: student.nombre,
        apellido: student.apellido,
        email: student.email
      },
      materia: {
        id: subject.id!,
        nombre: subject.nombre,
        codigo: subject.codigo
      },
      createdAt: grade.createdAt,
      updatedAt: grade.updatedAt
    };
  }
}