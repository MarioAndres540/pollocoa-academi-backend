import { IMateriasRepository } from "../../../dominio/repositorios/IMateriasRepository";
import { Materia } from "../../../dominio/entidades/Materia";
import { CreateMateriatDTO, MateriaResponseDTO } from "../../dto/MateriaDTO";

export class CrearMateria{
    constructor(private subjectRepository: IMateriasRepository) {}

  async execute(data: CreateMateriatDTO): Promise<MateriaResponseDTO> {
    // Validaciones
    this.validateCode(data.codigo);

    const subject: Materia = {
      nombre: data.nombre.trim(),
      codigo: data.codigo.toUpperCase().trim(),
      description: data.description?.trim(),
      isActive: true
    };

    const created = await this.subjectRepository.create(subject);
    return this.mapToDTO(created);
  }

  private validateCredits(credits: number): void {
    if (credits < 1 || credits > 10) {
      throw new Error('Los créditos deben estar entre 1 y 10');
    }
  }

  private validateCode(code: string): void {
    if (code.length < 2 || code.length > 10) {
      throw new Error('El código debe tener entre 2 y 10 caracteres');
    }
  }

  private mapToDTO(subject: Materia): MateriaResponseDTO {
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