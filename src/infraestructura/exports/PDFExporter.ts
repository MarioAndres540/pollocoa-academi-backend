// src/infrastructure/exports/PDFExporter.ts
import PDFDocument from 'pdfkit';
import { EstudianteResponseDTO } from '../../aplicacion/dto/EstudianteDTO';
import { MateriaResponseDTO } from '../../aplicacion/dto/MateriaDTO';
import { NotaWithDetailsDTO } from '../../aplicacion/dto/NotaDTO';

export class PDFExporter {
  // Exportar estudiantes
  async exportStudents(students: EstudianteResponseDTO[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });

        // Título
        doc.fontSize(20).font('Helvetica-Bold').text('Listado de Estudiantes', { align: 'center' });
        doc.moveDown();
        doc.fontSize(10).font('Helvetica').text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'center' });
        doc.moveDown(2);

        // Tabla
        const tableTop = 150;
        const itemHeight = 30;
        let y = tableTop;

        // Encabezados
        doc.fontSize(10).font('Helvetica-Bold');
        doc.text('Nombre', 50, y);
        doc.text('Apellido', 150, y);
        doc.text('Email', 250, y);
        doc.text('Documento', 380, y);
        doc.text('Estado', 480, y);

        doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();
        y += itemHeight;

        // Datos
        doc.font('Helvetica').fontSize(9);
        students.forEach((student, i) => {
          if (y > 700) {
            doc.addPage();
            y = 50;
          }

          doc.text(student.nombre, 50, y, { width: 90, ellipsis: true });
          doc.text(student.apellido, 150, y, { width: 90, ellipsis: true });
          doc.text(student.email, 250, y, { width: 120, ellipsis: true });
          doc.text(student.numeroDocumento, 380, y, { width: 90 });
          doc.text(student.isActive ? 'Activo' : 'Inactivo', 480, y);

          y += itemHeight;

          if (i < students.length - 1) {
            doc.moveTo(50, y - 15).lineTo(550, y - 15).stroke();
          }
        });

        // Footer
        const pages = doc.bufferedPageRange();
        for (let i = 0; i < pages.count; i++) {
          doc.switchToPage(i);
          doc.fontSize(8).text(
            `Página ${i + 1} de ${pages.count}`,
            50,
            doc.page.height - 50,
            { align: 'center' }
          );
        }

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Exportar materias
  async exportSubjects(subjects: MateriaResponseDTO[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });

        // Título
        doc.fontSize(20).font('Helvetica-Bold').text('Listado de Materias', { align: 'center' });
        doc.moveDown();
        doc.fontSize(10).font('Helvetica').text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'center' });
        doc.moveDown(2);

        // Tabla
        const tableTop = 150;
        const itemHeight = 30;
        let y = tableTop;

        // Encabezados
        doc.fontSize(10).font('Helvetica-Bold');
        doc.text('Código', 50, y);
        doc.text('Nombre', 120, y);
        doc.text('Estado', 380, y);
        doc.text('Descripción', 450, y);

        doc.moveTo(50, y + 15).lineTo(550, y + 15).stroke();
        y += itemHeight;

        // Datos
        doc.font('Helvetica').fontSize(9);
        subjects.forEach((subject, i) => {
          if (y > 700) {
            doc.addPage();
            y = 50;
          }

          doc.text(subject.codigo, 50, y);
          doc.text(subject.nombre, 120, y, { width: 250, ellipsis: true });
          doc.text(subject.isActive ? 'Activo' : 'Inactivo', 380, y);
          doc.text(subject.description || 'N/A', 450, y, { width: 100, ellipsis: true });

          y += itemHeight;

          if (i < subjects.length - 1) {
            doc.moveTo(50, y - 15).lineTo(550, y - 15).stroke();
          }
        });

        // Footer
        const pages = doc.bufferedPageRange();
        for (let i = 0; i < pages.count; i++) {
          doc.switchToPage(i);
          doc.fontSize(8).text(
            `Página ${i + 1} de ${pages.count}`,
            50,
            doc.page.height - 50,
            { align: 'center' }
          );
        }

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  // Exportar notas - AHORA USA NotaWithDetailsDTO
  async exportGrades(grades: NotaWithDetailsDTO[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50, size: 'A4', layout: 'landscape' });
        const buffers: Buffer[] = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfBuffer = Buffer.concat(buffers);
          resolve(pdfBuffer);
        });

        // Título
        doc.fontSize(20).font('Helvetica-Bold').text('Listado de Notas', { align: 'center' });
        doc.moveDown();
        doc.fontSize(10).font('Helvetica').text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'center' });
        doc.moveDown(2);

        // Tabla
        const tableTop = 120;
        const itemHeight = 25;
        let y = tableTop;

        // Encabezados
        doc.fontSize(9).font('Helvetica-Bold');
        doc.text('Estudiante', 50, y, { width: 120 });
        doc.text('Email', 180, y, { width: 150 });
        doc.text('Materia', 340, y, { width: 120 });
        doc.text('Código', 470, y);
        doc.text('Nota', 550, y);
        doc.text('Fecha', 610, y);

        doc.moveTo(50, y + 15).lineTo(750, y + 15).stroke();
        y += itemHeight;

        // Datos
        doc.font('Helvetica').fontSize(8);
        grades.forEach((grade, i) => {
          if (y > 520) {
            doc.addPage();
            y = 50;
          }

          const studentName = grade.estudiante 
            ? `${grade.estudiante.nombre} ${grade.estudiante.apellido}` 
            : 'N/A';

          doc.text(studentName, 50, y, { width: 120, ellipsis: true });
          doc.text(grade.estudiante?.email || 'N/A', 180, y, { width: 150, ellipsis: true });
          doc.text(grade.materia?.nombre || 'N/A', 340, y, { width: 120, ellipsis: true });
          doc.text(grade.materia?.codigo || 'N/A', 470, y);
          
          // Colorear nota según valor
          if (grade.valor >= 3.5) {
            doc.fillColor('green');
          } else if (grade.valor >= 3.0) {
            doc.fillColor('orange');
          } else {
            doc.fillColor('red');
          }
          doc.text(grade.valor.toFixed(2), 550, y);
          doc.fillColor('black');

          doc.text(
            grade.createdAt ? new Date(grade.createdAt).toLocaleDateString() : 'N/A',
            610,
            y
          );

          y += itemHeight;

          if (i < grades.length - 1) {
            doc.moveTo(50, y - 10).lineTo(750, y - 10).stroke();
          }
        });

        // Footer
        const pages = doc.bufferedPageRange();
        for (let i = 0; i < pages.count; i++) {
          doc.switchToPage(i);
          doc.fontSize(8).text(
            `Página ${i + 1} de ${pages.count}`,
            50,
            doc.page.height - 50,
            { align: 'center' }
          );
        }

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}