import type { Auditoria, EstadoCivil, RefBautismo, Sexo } from './comunes'

export type SacramentoFinal = 'confesion' | 'uncion_enfermos' | 'viatico'

export interface Defuncion {
  id: string
  parroquiaId: string
  libro: string
  tomo: string
  folio: string
  numero: string
  anio: number
  difuntoNombres: string
  difuntoApellidos: string
  sexo: Sexo
  fechaNacimiento?: string
  edadAlFallecer?: number
  estadoCivil?: EstadoCivil
  conyugeNombre?: string
  padreNombre?: string
  madreNombre?: string
  fechaDefuncion: string
  lugarDefuncion: string
  causa?: string
  sacramentosFinales: SacramentoFinal[]
  ministroUltimaHora?: string
  refBautismo: RefBautismo
  celebranteExequiasNombre: string
  fechaExequias: string
  lugarSepultura: string
  disposicion: 'inhumacion' | 'cremacion'
  numeroActaCivil?: string
  observaciones?: string
  auditoria: Auditoria
}
