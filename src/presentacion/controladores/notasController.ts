import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { RepositoryFactory } from '../../infraestructura/database/mongoose/repositories/RepositoryFactory';
import { CrearNota } from '../../aplicacion/use-case/notas/CrearNota';
import { ActualizarNota } from '../../aplicacion/use-case/notas/ActualizarNota';
import { TodasLasNotas } from '../../aplicacion/use-case/notas/TodasLasNotas';
import { NotaXEstudiante } from '../../aplicacion/use-case/notas/NotaXEstudiante';
import { NotasXMaterias } from '../../aplicacion/use-case/notas/NotasXMaterias';
import {EliminarNota} from '../../aplicacion/use-case/notas/EliminarNota';


export class NotasController {
     async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const gradeRepository = RepositoryFactory.getGradeRepository();
      const studentRepository = RepositoryFactory.getStudentRepository();
      const subjectRepository = RepositoryFactory.getSubjectRepository();

      const createGrade = new CrearNota(
        gradeRepository,
        studentRepository,
        subjectRepository
      );
    
      const grade = await createGrade.execute(req.body);

      res.status(201).json({
        success: true,
        message: 'Nota creada exitosamente',
        data: grade
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al crear nota'
      });
    }
  }

  // Obtener todas las notas
  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const gradeRepository = RepositoryFactory.getGradeRepository();
      const getAllGrades = new TodasLasNotas(gradeRepository);

      const grades = await getAllGrades.execute();

      res.status(200).json({
        success: true,
        message: 'Notas obtenidas exitosamente',
        data: grades,
        count: grades.length
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al obtener notas'
      });
    }
  }

  // Obtener notas por estudiante
  async getByStudent(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { studentId } = req.params;

      const gradeRepository = RepositoryFactory.getGradeRepository();
      const studentRepository = RepositoryFactory.getStudentRepository();

      const getGradesByStudent = new NotaXEstudiante(
        gradeRepository,
        studentRepository
      );

      const grades = await getGradesByStudent.execute(studentId);

      res.status(200).json({
        success: true,
        message: 'Notas del estudiante obtenidas exitosamente',
        data: grades,
        count: grades.length
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Error al obtener notas del estudiante'
      });
    }
  }

  // Obtener notas por materia
  async getBySubject(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { subjectId } = req.params;

      const gradeRepository = RepositoryFactory.getGradeRepository();
      const subjectRepository = RepositoryFactory.getSubjectRepository();

      const getGradesBySubject = new NotasXMaterias(
        gradeRepository,
        subjectRepository
      );

      const grades = await getGradesBySubject.execute(subjectId);

      res.status(200).json({
        success: true,
        message: 'Notas de la materia obtenidas exitosamente',
        data: grades,
        count: grades.length
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Error al obtener notas de la materia'
      });
    }
  }

  // Actualizar nota
  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const gradeRepository = RepositoryFactory.getGradeRepository();
      const updateGrade = new ActualizarNota(gradeRepository);

      const grade = await updateGrade.execute(id, req.body);

      res.status(200).json({
        success: true,
        message: 'Nota actualizada exitosamente',
        data: grade
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al actualizar nota'
      });
    }
  }

  // Eliminar nota
  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const gradeRepository = RepositoryFactory.getGradeRepository();
      const deleteGrade = new EliminarNota(gradeRepository);

      await deleteGrade.execute(id);

      res.status(200).json({
        success: true,
        message: 'Nota eliminada exitosamente'
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Error al eliminar nota'
      });
    }
  }
}