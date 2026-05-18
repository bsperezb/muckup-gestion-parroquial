import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import type { Bautismo, Parroquia } from '@/types'
import { formatoFecha } from './format'
import { partidaLegible } from './canonical'

const fonts = pdfFonts as unknown as { pdfMake: { vfs: Record<string, string> } }
if (fonts.pdfMake?.vfs) {
  pdfMake.vfs = fonts.pdfMake.vfs
}

export function feDeBautismoPdf(b: Bautismo, p: Parroquia) {
  const doc: TDocumentDefinitions = {
    pageSize: 'LETTER',
    pageMargins: [60, 70, 60, 60],
    info: {
      title: `Fe de bautismo - ${b.bautizadoNombres} ${b.bautizadoApellidos}`,
      author: p.nombre,
    },
    content: [
      { text: p.nombre.toUpperCase(), alignment: 'center', bold: true, fontSize: 12 },
      { text: 'ARQUIDIOCESIS', alignment: 'center', fontSize: 9, color: '#555' },
      { text: '\nFE DE BAUTISMO', alignment: 'center', fontSize: 16, bold: true, margin: [0, 8, 0, 16] },
      {
        text: `El infrascrito Parroco certifica que en el libro de bautismos de esta parroquia, ${partidaLegible({
          libro: b.libro, tomo: b.tomo, folio: b.folio, numero: b.numero, anio: b.anio,
        })}, se halla la siguiente partida:`,
        fontSize: 10,
        alignment: 'justify',
        margin: [0, 0, 0, 12],
      },
      {
        table: {
          widths: ['30%', '70%'],
          body: [
            ['Bautizado', `${b.bautizadoNombres} ${b.bautizadoApellidos}`],
            ['Fecha de bautismo', formatoFecha(b.fechaBautismo)],
            ['Lugar de celebracion', b.lugarCelebracion],
            ['Ministro celebrante', `${b.ministroNombre} (${b.ministroCalidad})`],
            ['Fecha de nacimiento', formatoFecha(b.fechaNacimiento)],
            ['Lugar de nacimiento', `${b.lugarNacimiento}${b.paisNacimiento ? ', ' + b.paisNacimiento : ''}`],
            ['Padre', b.padreNombres ? `${b.padreNombres} ${b.padreApellidos ?? ''}` : 'No consta'],
            ['Madre', `${b.madreNombres} ${b.madreApellidos}`],
            ['Padrino', b.padrinoNombres ? `${b.padrinoNombres} ${b.padrinoApellidos ?? ''}` : '—'],
            ['Madrina', b.madrinaNombres ? `${b.madrinaNombres} ${b.madrinaApellidos ?? ''}` : '—'],
          ],
        },
        layout: 'lightHorizontalLines',
        fontSize: 10,
      },
      ...(b.notasMarginales.length
        ? [
            { text: '\nNotas marginales', bold: true, fontSize: 11, margin: [0, 14, 0, 6] as [number, number, number, number] },
            {
              ul: b.notasMarginales.map(
                (n) =>
                  `${n.tipo.replace('_', ' ').toUpperCase()} — ${formatoFecha(n.fechaHecho)} en ${n.lugarHecho}. Ref: ${n.referenciaPartida}. Firma: ${n.firmadoPor}.`,
              ),
              fontSize: 9,
              margin: [0, 0, 0, 10] as [number, number, number, number],
            },
          ]
        : []),
      {
        text: `\nSe expide la presente fe a peticion del interesado en ${p.ciudad}, a los ${formatoFecha(new Date().toISOString())}.`,
        fontSize: 10,
        alignment: 'justify',
        margin: [0, 18, 0, 30],
      },
      {
        columns: [
          { text: '_________________________\nParroco', alignment: 'center', fontSize: 10 },
          { text: '_________________________\nSecretaria parroquial', alignment: 'center', fontSize: 10 },
        ],
      },
      {
        text: `\nDocumento de demo. Vigencia: ${p.vigenciaDiasPorTipo.bautismo} dias.`,
        alignment: 'center',
        fontSize: 8,
        color: '#888',
        margin: [0, 30, 0, 0],
      },
    ],
    defaultStyle: { font: 'Roboto' },
  }
  return pdfMake.createPdf(doc)
}

export function descargarFeBautismo(b: Bautismo, p: Parroquia) {
  feDeBautismoPdf(b, p).download(`fe-bautismo-${b.numero}-${b.anio}.pdf`)
}

export function abrirFeBautismo(b: Bautismo, p: Parroquia) {
  feDeBautismoPdf(b, p).open()
}
