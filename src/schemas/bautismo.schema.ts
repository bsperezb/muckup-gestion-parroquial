import { z } from 'zod'

export const bautismoSchema = z.object({
  libro: z.string().min(1, 'Libro obligatorio'),
  tomo: z.string().min(1, 'Tomo obligatorio'),
  folio: z.string().min(1, 'Folio obligatorio'),
  numero: z.string().min(1, 'Numero obligatorio'),
  anio: z.coerce.number().int().min(1800).max(2100),
  fechaBautismo: z.string().min(1, 'Fecha de bautismo obligatoria'),
  lugarCelebracion: z.string().min(3),
  ministroNombre: z.string().min(3, 'Ministro obligatorio'),
  ministroCalidad: z.enum(['parroco', 'vicario', 'diacono', 'delegado']),
  bautizadoNombres: z.string().min(2),
  bautizadoApellidos: z.string().min(2),
  sexo: z.enum(['M', 'F']),
  fechaNacimiento: z.string().min(1, 'Fecha de nacimiento obligatoria'),
  lugarNacimiento: z.string().min(2),
  paisNacimiento: z.string().optional(),
  esAdoptado: z.boolean(),
  padreNombres: z.string().optional(),
  padreApellidos: z.string().optional(),
  padreDocumento: z.string().optional(),
  madreNombres: z.string().min(2, 'Nombres de la madre obligatorios (c. 877)'),
  madreApellidos: z.string().min(2),
  madreApellidosSoltera: z.string().optional(),
  madreDocumento: z.string().optional(),
  padrinoNombres: z.string().optional(),
  padrinoApellidos: z.string().optional(),
  madrinaNombres: z.string().optional(),
  madrinaApellidos: z.string().optional(),
  observaciones: z.string().optional(),
})

export type BautismoInput = z.infer<typeof bautismoSchema>
