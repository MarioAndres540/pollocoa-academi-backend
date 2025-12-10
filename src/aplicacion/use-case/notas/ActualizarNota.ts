import { INotasRepository } from "../../../dominio/repositorios/INotasRepository";
import { UpdateNotaDTO, NotaResponseDTO } from "../../dto/NotaDTO";

export class ActualizarNota {
    constructor(private gradeRepository: INotasRepository) {}

  async execute(id: string, data: UpdateNotaDTO): Promise<NotaResponseDTO> {
    const existing = await this.gradeRepository.findById(id);
    if (!existing) {
      throw new Error('Nota no encontrada');
    }

    if (data.valor !== undefined) {
      this.validateGradeValue(data.valor);
    }

    const updateData: any = {};
    if (data.valor !== undefined) updateData.valor = data.valor;
    if (data.description !== undefined) updateData.description = data.description.trim();

    const updated = await this.gradeRepository.update(id, updateData);
    if (!updated) {
      throw new Error('Error al actualizar la nota');
    }

    return {
      id: updated.id!,
      estudianteId: updated.estudianteId,
      materiaId: updated.materiaId,
      valor: updated.valor,
      description: updated.description,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    };
  }

  private validateGradeValue(value: number): void {
    if (value < 0 || value > 5) {
      throw new Error('La nota debe estar entre 0 y 5');
    }
    if (!/^\d+(\.\d{1,2})?$/.test(value.toString())) {
      throw new Error('La nota debe tener máximo 2 decimales');
    }
  }
}