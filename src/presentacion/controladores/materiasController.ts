import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { RepositoryFactory } from '../../infraestructura/database/mongoose/repositories/RepositoryFactory';
import { CrearMateria } from '../../aplicacion/use-case/materias/CrearMateria';
import { ActualizarMateria } from '../../aplicacion/use-case/materias/ActualizarMateria';
import { CambioEstadoMateria } from '../../aplicacion/use-case/materias/CambioEstadoMateria';
import { TodasLasMaterias } from '../../aplicacion/use-case/materias/TodasLasMaterias';
import { MateriasXId } from '../../aplicacion/use-case/materias/MateriasXId';

export class MateriasController {
    async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const subjectRepository = RepositoryFactory.getSubjectRepository();
      const createSubject = new CrearMateria(subjectRepository);

      const subject = await createSubject.execute(req.body);

      res.status(201).json({
        success: true,
        message: 'Materia creada exitosamente',
        data: subject
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al crear materia'
      });
    }
  }

  // Obtener todas las materias
  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { active } = req.query;
      const onlyActive = active === 'true' ? true : active === 'false' ? false : undefined;

      const subjectRepository = RepositoryFactory.getSubjectRepository();
      const getAllSubjects = new TodasLasMaterias(subjectRepository);

      const subjects = await getAllSubjects.execute(onlyActive);

      res.status(200).json({
        success: true,
        message: 'Materias obtenidas exitosamente',
        data: subjects,
        count: subjects.length
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al obtener materias'
      });
    }
  }

  // Obtener materia por ID
  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const subjectRepository = RepositoryFactory.getSubjectRepository();
      const getSubjectById = new MateriasXId(subjectRepository);

      const subject = await getSubjectById.execute(id);

      res.status(200).json({
        success: true,
        message: 'Materia obtenida exitosamente',
        data: subject
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message || 'Error al obtener materia'
      });
    }
  }

  // Actualizar materia
  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const subjectRepository = RepositoryFactory.getSubjectRepository();
      const updateSubject = new ActualizarMateria(subjectRepository);

      const subject = await updateSubject.execute(id, req.body);

      res.status(200).json({
        success: true,
        message: 'Materia actualizada exitosamente',
        data: subject
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al actualizar materia'
      });
    }
  }

  // Cambiar estado de la materia
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

      const subjectRepository = RepositoryFactory.getSubjectRepository();
      const changeStatus = new CambioEstadoMateria(subjectRepository);

      const subject = await changeStatus.execute(id, isActive);

      res.status(200).json({
        success: true,
        message: `Materia ${isActive ? 'activada' : 'desactivada'} exitosamente`,
        data: subject
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al cambiar estado de la materia'
      });
    }
  }
}