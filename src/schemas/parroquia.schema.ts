import { z } from 'zod'

export const parroquiaSchema = z.object({
  nombre: z.string().min(3, 'Nombre demasiado corto'),
  diocesisId: z.string().min(1, 'Seleccione una diocesis'),
  direccion: z.string().min(5, 'Direccion obligatoria'),
  ciudad: z.string().min(2),
  pais: z.string().min(2),
  lat: z.coerce.number().min(-90).max(90, 'Latitud invalida'),
  lng: z.coerce.number().min(-180).max(180, 'Longitud invalida'),
  telefono: z.string().optional(),
  email: z.string().email('Correo invalido').optional().or(z.literal('')),
  sitioWeb: z.string().url('URL invalida').optional().or(z.literal('')),
  patrono: z.string().optional(),
  fundadaEn: z.string().optional(),
  horarios: z.string().optional(),
  visiblePublico: z.boolean(),
})

export type ParroquiaInput = z.infer<typeof parroquiaSchema>
