import { TodasLasMaterias } from "./TodasLasMaterias";
import { ExcelExporter } from "../../../infraestructura/exports/ExcelExporter";
import { PDFExporter } from "../../../infraestructura/exports/PDFExporter";
import { IMateriasRepository } from "../../../dominio/repositorios/IMateriasRepository";    

export class ExportMaterias {
     constructor(
    private subjectRepository: IMateriasRepository,
    private excelExporter: ExcelExporter,
    private pdfExporter: PDFExporter
  ) {}

  async executeExcel(onlyActive?: boolean): Promise<Buffer> {
    const getAllSubjects = new TodasLasMaterias(this.subjectRepository);
    const subjects = await getAllSubjects.execute(onlyActive);
    return this.excelExporter.exportSubjects(subjects);
  }

  async executePDF(onlyActive?: boolean): Promise<Buffer> {
    const getAllSubjects = new TodasLasMaterias(this.subjectRepository);
    const subjects = await getAllSubjects.execute(onlyActive);
    return this.pdfExporter.exportSubjects(subjects);
  }
}