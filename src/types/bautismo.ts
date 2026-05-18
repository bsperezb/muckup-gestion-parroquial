import type { Auditoria, Sexo } from './comunes'

export type TipoNotaMarginal =
  | 'confirmacion'
  | 'matrimonio'
  | 'nulidad_matrimonial'
  | 'disolucion'
  | 'orden_sagrado'
  | 'profesion_religiosa'
  | 'adopcion'
  | 'cambio_nombre'
  | 'defuncion'
  | 'rectificacion'

export interface NotaMarginal {
  id: string
  tipo: TipoNotaMarginal
  fechaHecho: string
  lugarHecho: string
  referenciaPartida: string
  autoridad: string
  fechaAnotacion: string
  firmadoPor: string
  observaciones?: string
}

export interface Bautismo {
  id: string
  parroquiaId: string
  libro: string
  tomo: string
  folio: string
  numero: string
  anio: number
  fechaBautismo: string
  lugarCelebracion: string
  ministroId?: string
  ministroNombre: string
  ministroCalidad: 'parroco' | 'vicario' | 'diacono' | 'delegado'
  bautizadoNombres: string
  bautizadoApellidos: string
  sexo: Sexo
  fechaNacimiento: string
  lugarNacimiento: string
  paisNacimiento?: string
  esAdoptado: boolean
  padreNombres?: string
  padreApellidos?: string
  padreDocumento?: string
  madreNombres: string
  madreApellidos: string
  madreApellidosSoltera?: string
  madreDocumento?: string
  padrinoNombres?: string
  padrinoApellidos?: string
  padrinoDocumento?: string
  madrinaNombres?: string
  madrinaApellidos?: string
  madrinaDocumento?: string
  observaciones?: string
  notasMarginales: NotaMarginal[]
  auditoria: Auditoria
}
