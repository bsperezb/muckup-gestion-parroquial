export interface NumeracionCanonica {
  libro: string
  tomo: string
  folio: string
  numero: string
  anio: number
}

export function partidaLegible(n: NumeracionCanonica): string {
  return `Libro ${n.libro} · Tomo ${n.tomo} · Folio ${n.folio} · N.º ${n.numero}`
}

export function siguienteNumero(numerosActuales: string[]): string {
  if (!numerosActuales.length) return '001'
  const max = numerosActuales.reduce((acc, n) => {
    const parsed = parseInt(n, 10)
    return Number.isFinite(parsed) && parsed > acc ? parsed : acc
  }, 0)
  return String(max + 1).padStart(3, '0')
}

const REPLACEMENTS: Array<[RegExp, string]> = [
  [/[áàäâã]/gi, 'a'],
  [/[éèëê]/gi, 'e'],
  [/[íìïî]/gi, 'i'],
  [/[óòöôõ]/gi, 'o'],
  [/[úùüû]/gi, 'u'],
  [/ñ/gi, 'n'],
]

export function normalizar(input: string): string {
  let s = input.toLowerCase().trim()
  for (const [from, to] of REPLACEMENTS) s = s.replace(from, to)
  return s.replace(/\s+/g, ' ')
}

/**
 * Implementacion sencilla de Soundex para busqueda fonetica
 * en nombres hispanos. No es perfecto pero atrapa los errores
 * tipograficos mas comunes.
 */
export function soundex(input: string): string {
  const s = normalizar(input)
    .replace(/[^a-z]/g, '')
    .toUpperCase()
  if (!s) return ''
  const first = s[0]
  const map: Record<string, string> = {
    B: '1', F: '1', P: '1', V: '1',
    C: '2', G: '2', J: '2', K: '2', Q: '2', S: '2', X: '2', Z: '2',
    D: '3', T: '3',
    L: '4',
    M: '5', N: '5',
    R: '6',
  }
  let prev = map[first] ?? ''
  let out = first
  for (let i = 1; i < s.length && out.length < 4; i++) {
    const code = map[s[i]] ?? ''
    if (code && code !== prev) out += code
    prev = code
  }
  return (out + '000').slice(0, 4)
}

export function coincideFoneticamente(a: string, b: string): boolean {
  if (!a || !b) return false
  return soundex(a) === soundex(b)
}
