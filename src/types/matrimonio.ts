import type { Auditoria, EstadoCivil, RefBautismo } from './comunes'

export interface DatosConyuge {
  nombres: string
  apellidos: string
  documento?: string
  fechaNacimiento?: string
  lugarNacimiento?: string
  nacionalidad?: string
  domicilio?: string
  profesion?: string
  estadoCivilPrevio: EstadoCivil
  padreNombre?: string
  madreNombre?: string
  refBautismo: RefBautismo
}

export interface Dispensa {
  tipo: string
  autoridad: string
  fecha: string
  numeroRescripto?: string
}

export type FormaMatrimonial =
  | 'con_misa'
  | 'sin_misa'
  | 'forma_extraordinaria'
  | 'mixto'
  | 'dispensa_de_forma'

export interface Matrimonio {
  id: string
  parroquiaId: string
  libro: string
  tomo: string
  folio: string
  numero: string
  anio: number
  fechaCelebracion: string
  horaCelebracion?: string
  lugarCelebracion: string
  forma: FormaMatrimonial
  esposo: DatosConyuge
  esposa: DatosConyuge
  testigos: { nombres: string; documento?: string }[]
  sacerdoteAsistenteNombre: string
  ministroCalidad: 'parroco_propio' | 'vicario' | 'delegado' | 'obispo' | 'diacono'
  dispensas: Dispensa[]
  expedienteId?: string
  efectosCiviles: boolean
  numeroActaCivil?: string
  observaciones?: string
  auditoria: Auditoria
}
