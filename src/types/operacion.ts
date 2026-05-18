import type { Auditoria } from './comunes'

export type EstadoIntencion = 'pendiente' | 'asignada' | 'celebrada'
export type TipoIntencion =
  | 'difunto'
  | 'accion_gracias'
  | 'peticion'
  | 'aniversario'
  | 'gregorianas'
  | 'pro_populo'

export interface IntencionMisa {
  id: string
  parroquiaId: string
  numero: number
  fechaSolicitud: string
  solicitanteNombre: string
  solicitanteContacto?: string
  tipo: TipoIntencion
  descripcion: string
  difuntoNombre?: string
  estipendio: number
  moneda: string
  recibidoPor: string
  fechaProgramada: string
  sacerdoteAsignado?: string
  estado: EstadoIntencion
  fechaCelebracionReal?: string
  observaciones?: string
  auditoria: Auditoria
}

export type FrecuenciaFundacion = 'anual' | 'mensual' | 'semestral'

export interface FundacionMisa {
  id: string
  parroquiaId: string
  fundador: string
  descripcion: string
  intencion: string
  fechaConstitucion: string
  cantidadAnual: number
  frecuencia: FrecuenciaFundacion
  capitalConstituido?: number
  cumplimientoUltimoAnio?: number
  observaciones?: string
  auditoria: Auditoria
}

export type EtapaCatequetica =
  | 'pre_bautismal'
  | 'primera_comunion'
  | 'confirmacion'
  | 'prematrimonial'

export interface GrupoCatequesis {
  id: string
  parroquiaId: string
  nombre: string
  etapa: EtapaCatequetica
  anio: number
  catequistaNombre: string
  diaSemana: string
  hora: string
  cupos: number
  inscritos: string[]
  auditoria: Auditoria
}

export interface EntradaCronica {
  id: string
  parroquiaId: string
  fecha: string
  titulo: string
  cuerpo: string
  categoria: 'visita_pastoral' | 'decreto' | 'evento' | 'general'
  auditoria: Auditoria
}
