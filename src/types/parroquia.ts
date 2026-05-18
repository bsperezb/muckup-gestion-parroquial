import type { Auditoria } from './comunes'

export type TipoDocumentoSacramental =
  | 'bautismo'
  | 'confirmacion'
  | 'matrimonio'
  | 'defuncion'
  | 'primera_comunion'
  | 'soltera'

export interface PlantillaActiva {
  tipo: TipoDocumentoSacramental
  plantillaId: string
  origen: 'catalogo' | 'custom'
}

export interface Diocesis {
  id: string
  nombre: string
  pais: string
  obispoActual?: string
}

export interface Parroquia {
  id: string
  slug: string
  nombre: string
  diocesisId: string
  parrocoTitularId?: string
  direccion: string
  ciudad: string
  pais: string
  lat: number
  lng: number
  telefono?: string
  email?: string
  sitioWeb?: string
  horarios?: string
  fundadaEn?: string
  patrono?: string
  visiblePublico: boolean
  selloUrl?: string
  firmaParrocoUrl?: string
  vigenciaDiasPorTipo: Record<TipoDocumentoSacramental, number>
  plantillasActivas: PlantillaActiva[]
  librosActivos: TipoDocumentoSacramental[]
  auditoria: Auditoria
}
