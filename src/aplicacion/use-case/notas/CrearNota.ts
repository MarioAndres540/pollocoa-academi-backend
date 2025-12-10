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
  ) {}

  async execute(data: CreateNotaDTO): Promise<NotaWithDetailsDTO> {
    try {
      console.log('🔍 Datos recibidos para crear nota:', data);
      
      // Validar que el estudiante existe y está activo
      const student = await this.studentRepository.findById(data.estudianteId);
      console.log('👨‍🎓 Estudiante encontrado:', student);
      
      if (!student) {
        throw new Error('Estudiante no encontrado');
      }
      if (!student.isActive) {
        throw new Error('El estudiante no está activo');
      }

      // Validar que la materia existe y está activa
      console.log('🔍 Buscando materia con ID:', data.materiaId);
      const subject = await this.subjectRepository.findById(data.materiaId);
      console.log('📚 Materia encontrada:', subject);
      
      if (!subject) {
        throw new Error('Materia no encontrada');
      }
      if (!subject.isActive) {
        throw new Error('La materia no está activa');
      }

      // Validar el valor de la nota
      console.log('📊 Validando valor:', data.valor);
      this.validateGradeValue(data.valor);
      console.log('✅ Valor validado');

      // Crear objeto de nota
      const grade: Nota = {
        estudianteId: data.estudianteId,
        materiaId: data.materiaId,
        valor: data.valor,
        description: data.description?.trim()
      };

      console.log('💾 Creando nota en repositorio:', grade);
      const created = await this.gradeRepository.create(grade);
      console.log('✅ Nota creada con ID:', created.id);

      // Mapear a DTO con detalles
      const result = this.mapToDTO(created, student, subject);
      console.log('📦 Resultado final:', result);
      
      return result;
      
    } catch (error: any) {
      console.error('❌ Error en CrearNota.execute:', error);
      throw error;
    }
  }

  private validateGradeValue(value: number): void {
    console.log('🔍 Validando valor:', value);
    
    if (value < 0 || value > 5) {
      throw new Error('La nota debe estar entre 0 y 5');
    }
    
    // Validar que tenga máximo 2 decimales
    const valueStr = value.toString();
    const decimalPart = valueStr.split('.')[1];
    
    if (decimalPart && decimalPart.length > 2) {
      throw new Error('La nota debe tener máximo 2 decimales');
    }
  }

  private mapToDTO(grade: Nota, student: Estudiante, subject: Materia): NotaWithDetailsDTO {
    console.log('🔄 Mapeando a DTO con detalles...');
    console.log('Nota:', grade);
    console.log('Estudiante:', student);
    console.log('Materia:', subject);
    
    return {
      id: grade.id!,
      estudianteId: grade.estudianteId,
      materiaId: grade.materiaId,
      valor: grade.valor,
      description: grade.description,
      
      // Información del estudiante
      estudiante: {
        id: student.id!,
        nombre: student.nombre,
        apellido: student.apellido,
        email: student.email
      },
      
      // Información de la materia
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