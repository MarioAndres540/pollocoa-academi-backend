import { IMateriasRepository } from "../../../dominio/repositorios/IMateriasRepository";
import {  MateriaResponseDTO } from "../../dto/MateriaDTO";

export class CambioEstadoMateria {
    constructor(private subjectRepository: IMateriasRepository) {}

  async execute(id: string, isActive: boolean): Promise<MateriaResponseDTO> {
    const existing = await this.subjectRepository.findById(id);
    if (!existing) {
      throw new Error('Materia no encontrada');
    }

    const updated = await this.subjectRepository.changeStatus(id, isActive);
    if (!updated) {
      throw new Error('Error al cambiar el estado de la materia');
    }

    return {
      id: updated.id!,
      nombre: updated.nombre,
      codigo: updated.codigo,
      description: updated.description,
      isActive: updated.isActive,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    };
  }
}