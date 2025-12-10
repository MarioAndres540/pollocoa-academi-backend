import { IMateriasRepository } from "../../../dominio/repositorios/IMateriasRepository";
import { UpdateMateriaDTO, MateriaResponseDTO } from "../../dto/MateriaDTO";

export class ActualizarMateria {
      constructor(private subjectRepository: IMateriasRepository) {}

  async execute(id: string, data: UpdateMateriaDTO): Promise<MateriaResponseDTO> {
    const existing = await this.subjectRepository.findById(id);
    if (!existing) {
      throw new Error('Materia no encontrada');
    }

    const updateData: any = {};
    if (data.nombre) updateData.name = data.nombre.trim();
    if (data.codigo) updateData.code = data.codigo.toUpperCase().trim();
    if (data.description !== undefined) updateData.description = data.description.trim();

    const updated = await this.subjectRepository.update(id, updateData);
    if (!updated) {
      throw new Error('Error al actualizar la materia');
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

