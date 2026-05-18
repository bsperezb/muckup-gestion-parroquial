import type { Auditoria, Rol } from './comunes'

export interface Usuario {
  id: string
  email: string
  password: string
  nombres: string
  apellidos: string
  rol: Rol
  parroquiaId?: string
  activo: boolean
  ultimoIngreso?: string
  auditoria: Auditoria
}

export interface SesionActiva {
  usuarioId: string
  parroquiaId?: string
  iniciadaEn: string
}
