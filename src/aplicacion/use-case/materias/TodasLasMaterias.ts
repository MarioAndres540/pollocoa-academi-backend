import { IMateriasRepository } from "../../../dominio/repositorios/IMateriasRepository";
import { MateriaResponseDTO } from "../../dto/MateriaDTO";

export class TodasLasMaterias {
    constructor(private subjectRepository: IMateriasRepository) {}

  async execute(onlyActive?: boolean): Promise<MateriaResponseDTO[]> {
    const filters = onlyActive !== undefined ? { isActive: onlyActive } : undefined;
    const subjects = await this.subjectRepository.findAll(filters);

    return subjects.map(subject => ({
      id: subject.id!,
      nombre: subject.nombre,
      codigo: subject.codigo,
      description: subject.description,
      isActive: subject.isActive,
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt
    }));
  }
}