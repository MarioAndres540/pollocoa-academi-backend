import { IMateriasRepository } from "../../../dominio/repositorios/IMateriasRepository";
import { MateriaResponseDTO } from "../../dto/MateriaDTO";

export class MateriasXId {
    constructor(private subjectRepository: IMateriasRepository) {}

  async execute(id: string): Promise<MateriaResponseDTO> {
    const subject = await this.subjectRepository.findById(id);
    
    if (!subject) {
      throw new Error('Materia no encontrada');
    }

    return {
      id: subject.id!,
      nombre: subject.nombre,
      codigo: subject.codigo,
      description: subject.description,
      isActive: subject.isActive,
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt
    };
  }
}