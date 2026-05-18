export type Sexo = 'M' | 'F'

export type Rol =
  | 'admin_plataforma'
  | 'parroco'
  | 'vicario'
  | 'secretaria'
  | 'canciller'
  | 'catequista'

export type EstadoCivil = 'soltero' | 'casado' | 'viudo' | 'religioso' | 'sacerdote' | 'separado'

export type TipoDocumento = 'cc' | 'ti' | 'ce' | 'pasaporte' | 'rc'

/**
 * Referencia bautismal "blanda": guarda los datos canonicos del bautismo
 * (parroquia, libro, folio, numero, fecha, nombre del bautizado) como
 * datos en si, y opcionalmente enlaza al bautismo local via bautismoId.
 *
 * Permite registrar un sacramento aunque el bautismo se haya celebrado
 * en otra parroquia o no este en el sistema (c. 535 §2, c. 1122).
 */
export interface RefBautismo {
  bautismoId?: string
  parroquia: string
  diocesis?: string
  libro: string
  folio: string
  numero: string
  fechaBautismo: string
  bautizado: string
}

export interface DocumentoAdjunto {
  id: string
  nombre: string
  url: string
  tipo?: string
  fechaSubida: string
}

export interface Auditoria {
  creadoPor: string
  creadoEn: string
  actualizadoPor?: string
  actualizadoEn?: string
}
