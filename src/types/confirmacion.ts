import type { Auditoria, RefBautismo, Sexo } from './comunes'

export interface Confirmacion {
  id: string
  parroquiaId: string
  libro: string
  tomo: string
  folio: string
  numero: string
  anio: number
  fechaConfirmacion: string
  lugarCelebracion: string
  confirmadoNombres: string
  confirmadoApellidos: string
  sexo: Sexo
  fechaNacimiento?: string
  nombreConfirmacion?: string
  refBautismo: RefBautismo
  padreNombre?: string
  madreNombre?: string
  padrinoNombre?: string
  padrinoDocumento?: string
  ministroNombre: string
  ministroTipo: 'obispo_diocesano' | 'obispo_auxiliar' | 'presbitero_delegado'
  observaciones?: string
  auditoria: Auditoria
}
