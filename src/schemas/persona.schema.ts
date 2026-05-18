import { z } from 'zod'

export const personaSchema = z.object({
  nombres: z.string().min(2, 'Nombres obligatorios'),
  apellidos: z.string().min(2, 'Apellidos obligatorios'),
  sexo: z.enum(['M', 'F']),
  fechaNacimiento: z.string().optional(),
  lugarNacimiento: z.string().optional(),
  nacionalidad: z.string().optional(),
  tipoDocumento: z.enum(['cc', 'ti', 'ce', 'pasaporte', 'rc']).optional(),
  documento: z.string().optional(),
  telefono: z.string().optional(),
  email: z.string().email('Correo invalido').optional().or(z.literal('')),
  direccion: z.string().optional(),
  notas: z.string().optional(),
  esClerigo: z.boolean().optional(),
  cargoEclesiastico: z.string().optional(),
})

export type PersonaInput = z.infer<typeof personaSchema>
