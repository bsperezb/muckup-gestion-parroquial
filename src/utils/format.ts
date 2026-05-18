const FECHA_FMT = new Intl.DateTimeFormat('es-CO', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

const FECHA_HORA_FMT = new Intl.DateTimeFormat('es-CO', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const MONEDA_FMT = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function formatoFecha(iso?: string): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return FECHA_FMT.format(d)
}

export function formatoFechaCorta(iso?: string): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('es-CO')
}

export function formatoFechaHora(iso?: string): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return FECHA_HORA_FMT.format(d)
}

export function formatoMoneda(valor: number, moneda = 'COP'): string {
  if (moneda === 'COP') return MONEDA_FMT.format(valor)
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: moneda,
  }).format(valor)
}

export function calcularEdad(fechaNacimientoIso: string, refIso?: string): number {
  const nacimiento = new Date(fechaNacimientoIso)
  const ref = refIso ? new Date(refIso) : new Date()
  let edad = ref.getFullYear() - nacimiento.getFullYear()
  const m = ref.getMonth() - nacimiento.getMonth()
  if (m < 0 || (m === 0 && ref.getDate() < nacimiento.getDate())) edad--
  return edad
}

export function diasDesde(iso: string): number {
  const d = new Date(iso)
  return Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24))
}
