import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { RepositoryFactory } from '../../infraestructura/database/mongoose/repositories/RepositoryFactory';
import { CreateEstudiante } from '../../aplicacion/use-case/estudiantes/CreateEstudiante';
import { ActualizarEstudiante } from '../../aplicacion/use-case/estudiantes/ActualizarEstudiante';
import {CambioEstadoEstudiante} from '../../aplicacion/use-case/estudiantes/CambioEstadoEstudiante';
import { EstudianteXid } from '../../aplicacion/use-case/estudiantes/EstudianteXid';
import { TodosLosEstudiantes } from '../../aplicacion/use-case/estudiantes/TodosLosEstudiantes';

export class EstudiantesController {
    async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const studentRepository = RepositoryFactory.getStudentRepository();
      const createStudent = new CreateEstudiante(studentRepository);

      const student = await createStudent.execute(req.body);

      res.status(201).json({
        success: true,
        message: 'Estudiante creado exitosamente',
        data: student
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al crear estudiante'
      });
    }
  }

  // Obtener todos los estudiantes
  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { active } = req.query;
      const onlyActive = active === 'true' ? true : active === 'false' ? false : undefined;

      const studentRepository = RepositoryFactory.getStudentRepository();
      const getAllStudents = new TodosLosEstudiantes(studentRepository);

      const students = await getAllStudents.execute(onlyActive);

      res.status(200).json({
        success: true,
        message: 'Estudiantes obtenidos exitosamente',
        data: students,
        count: students.length
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al obtener estudiantes'
      });
    }
  }

  // Obtener estudiante por ID
  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const studentRepository = RepositoryFactory.getStudentRepository();
      const getStudentById = new EstudianteXid(studentRepository);

      const student = await getStudentById.execute(id);

      res.status(200).json({
        success: true,
        message: 'Estudiante obtenido exitosamente',
        data: student
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Error al obtener estudiante'
      });
    }
  }

  // Actualizar estudiante
  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const studentRepository = RepositoryFactory.getStudentRepository();
      const updateStudent = new ActualizarEstudiante(studentRepository);

      const student = await updateStudent.execute(id, req.body);

      res.status(200).json({
        success: true,
        message: 'Estudiante actualizado exitosamente',
        data: student
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al actualizar estudiante'
      });
    }
  }

  // Cambiar estado del estudiante
  async changeStatus(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      if (typeof isActive !== 'boolean') {
        res.status(400).json({
          success: false,
          message: 'El campo isActive debe ser un booleano'
        });
        return;
      }

      const studentRepository = RepositoryFactory.getStudentRepository();
      const changeStatus = new CambioEstadoEstudiante(studentRepository);

      const student = await changeStatus.execute(id, isActive);

      res.status(200).json({
        success: true,
        message: `Estudiante ${isActive ? 'activado' : 'desactivado'} exitosamente`,
        data: student
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al cambiar estado del estudiante'
      });
    }
  }
}