import type { Sexo, TipoDocumento, Auditoria } from './comunes'

export interface Persona {
  id: string
  nombres: string
  apellidos: string
  sexo: Sexo
  fechaNacimiento?: string
  lugarNacimiento?: string
  nacionalidad?: string
  tipoDocumento?: TipoDocumento
  documento?: string
  telefono?: string
  email?: string
  direccion?: string
  notas?: string
  esClerigo?: boolean
  cargoEclesiastico?: string
  auditoria: Auditoria
}
