// src/infrastructure/database/mongoose/repositories/RepositoryFactory.ts

import { IEstudiantesRepository } from '../../../../dominio/repositorios/IEstudiantesRepository';
import { IMateriasRepository } from '../../../../dominio/repositorios/IMateriasRepository';
import { INotasRepository } from '../../../../dominio/repositorios/INotasRepository';
import { IProfesorRepository } from '../../../../dominio/repositorios/IProfesoresRepository';

import { 
  EstudiantesRepository, 
  MateriasRepository, 
  NotasRepository,
  ProfesorRepository 
} from './index';

export class RepositoryFactory {
    
  private static studentRepository: IEstudiantesRepository;
  private static subjectRepository: IMateriasRepository;
  private static gradeRepository: INotasRepository;
  private static userRepository: IProfesorRepository;

  static getStudentRepository(): IEstudiantesRepository {
    if (!this.studentRepository) {
      this.studentRepository = new EstudiantesRepository();
    }
    return this.studentRepository;
  }

  static getSubjectRepository(): IMateriasRepository {
    if (!this.subjectRepository) {
      this.subjectRepository = new MateriasRepository();
    }
    return this.subjectRepository;
  }

  static getGradeRepository(): INotasRepository {
    if (!this.gradeRepository) {
      this.gradeRepository = new NotasRepository();
    }
    return this.gradeRepository;
  }

  static getUserRepository(): IProfesorRepository {
    if (!this.userRepository) {
      this.userRepository = new ProfesorRepository();
    }
    return this.userRepository;
  }
}