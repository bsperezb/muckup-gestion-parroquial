import { faker } from '@faker-js/faker/locale/es'
import { uid, slugify } from '@/lib/utils'
import type {
  Bautismo,
  Confirmacion,
  Defuncion,
  Diocesis,
  EntradaCronica,
  FundacionMisa,
  GrupoCatequesis,
  IntencionMisa,
  Matrimonio,
  Parroquia,
  Persona,
  Usuario,
} from '@/types'
import type { Plantilla } from '@/stores/usePlantillasStore'

faker.seed(2026517)

const ahora = () => new Date().toISOString()
const aud = (creador = 'sistema') => ({
  creadoPor: creador,
  creadoEn: ahora(),
})

export function seedDiocesis(): Diocesis[] {
  return [
    {
      id: 'dio_barranquilla',
      nombre: 'Arquidiocesis de Barranquilla',
      pais: 'Colombia',
      obispoActual: 'Mons. Pablo Emiro Salas Anteliz',
    },
    {
      id: 'dio_cartagena',
      nombre: 'Arquidiocesis de Cartagena',
      pais: 'Colombia',
    },
    {
      id: 'dio_medellin',
      nombre: 'Arquidiocesis de Medellin',
      pais: 'Colombia',
    },
  ]
}

export function seedParroquias(): Parroquia[] {
  const base = ahora()
  return [
    {
      id: 'par_sanjose',
      slug: 'san-jose-barranquilla',
      nombre: 'Parroquia San Jose',
      diocesisId: 'dio_barranquilla',
      direccion: 'Cra 50 #72-15',
      ciudad: 'Barranquilla',
      pais: 'Colombia',
      lat: 10.9985,
      lng: -74.7942,
      telefono: '+57 605 350 0000',
      email: 'parroquia@sanjose.org',
      sitioWeb: 'https://sanjose.example',
      patrono: 'San Jose Obrero',
      fundadaEn: '1952',
      horarios: 'Lun-Vie 7am, 6pm · Dom 7am, 9am, 11am, 6pm',
      visiblePublico: true,
      vigenciaDiasPorTipo: {
        bautismo: 90,
        confirmacion: 90,
        matrimonio: 90,
        defuncion: 180,
        primera_comunion: 90,
        soltera: 90,
      },
      plantillasActivas: [
        { tipo: 'bautismo', plantillaId: 'plt_bautismo_estandar', origen: 'catalogo' },
        { tipo: 'confirmacion', plantillaId: 'plt_confirmacion_estandar', origen: 'catalogo' },
        { tipo: 'matrimonio', plantillaId: 'plt_matrimonio_estandar', origen: 'catalogo' },
        { tipo: 'defuncion', plantillaId: 'plt_defuncion_estandar', origen: 'catalogo' },
      ],
      librosActivos: ['bautismo', 'confirmacion', 'matrimonio', 'defuncion'],
      auditoria: { creadoPor: 'sistema', creadoEn: base },
    },
    {
      id: 'par_inmaculada',
      slug: 'inmaculada-barranquilla',
      nombre: 'Parroquia Inmaculada Concepcion',
      diocesisId: 'dio_barranquilla',
      direccion: 'Calle 44 #43-21',
      ciudad: 'Barranquilla',
      pais: 'Colombia',
      lat: 10.9711,
      lng: -74.7873,
      telefono: '+57 605 340 1212',
      email: 'parroquia@inmaculada.org',
      patrono: 'Inmaculada Concepcion',
      visiblePublico: true,
      vigenciaDiasPorTipo: {
        bautismo: 90,
        confirmacion: 90,
        matrimonio: 90,
        defuncion: 180,
        primera_comunion: 90,
        soltera: 90,
      },
      plantillasActivas: [
        { tipo: 'bautismo', plantillaId: 'plt_bautismo_estandar', origen: 'catalogo' },
      ],
      librosActivos: ['bautismo', 'confirmacion', 'matrimonio', 'defuncion'],
      auditoria: { creadoPor: 'sistema', creadoEn: base },
    },
    {
      id: 'par_sanpedro',
      slug: 'san-pedro-claver',
      nombre: 'Santuario San Pedro Claver',
      diocesisId: 'dio_cartagena',
      direccion: 'Plaza San Pedro Claver',
      ciudad: 'Cartagena',
      pais: 'Colombia',
      lat: 10.4231,
      lng: -75.5519,
      patrono: 'San Pedro Claver',
      visiblePublico: true,
      vigenciaDiasPorTipo: {
        bautismo: 90,
        confirmacion: 90,
        matrimonio: 90,
        defuncion: 180,
        primera_comunion: 90,
        soltera: 90,
      },
      plantillasActivas: [],
      librosActivos: ['bautismo', 'matrimonio'],
      auditoria: { creadoPor: 'sistema', creadoEn: base },
    },
  ]
}

export function seedClerigos(parroquiaId: string): Persona[] {
  const base = ahora()
  return [
    {
      id: 'cl_paroco',
      nombres: 'Carlos Andres',
      apellidos: 'Mendoza Restrepo',
      sexo: 'M',
      esClerigo: true,
      cargoEclesiastico: 'Parroco',
      telefono: '+57 300 000 0001',
      email: 'parroco@sanjose.org',
      auditoria: { creadoPor: 'sistema', creadoEn: base },
    },
    {
      id: 'cl_vicario',
      nombres: 'Jorge Luis',
      apellidos: 'Ortiz Pena',
      sexo: 'M',
      esClerigo: true,
      cargoEclesiastico: 'Vicario parroquial',
      auditoria: { creadoPor: 'sistema', creadoEn: base },
    },
    {
      id: 'cl_obispo',
      nombres: 'Pablo Emiro',
      apellidos: 'Salas Anteliz',
      sexo: 'M',
      esClerigo: true,
      cargoEclesiastico: 'Arzobispo de Barranquilla',
      auditoria: { creadoPor: 'sistema', creadoEn: base },
    },
  ].map((c) => ({ ...c, _parroquiaId: parroquiaId }) as unknown as Persona)
}

export function seedPersonas(): Persona[] {
  const personas: Persona[] = [...seedClerigos('par_sanjose')]
  for (let i = 0; i < 14; i++) {
    const sexo = faker.helpers.arrayElement(['M', 'F'] as const)
    personas.push({
      id: uid('per'),
      nombres: faker.person.firstName(sexo === 'M' ? 'male' : 'female'),
      apellidos: `${faker.person.lastName()} ${faker.person.lastName()}`,
      sexo,
      fechaNacimiento: faker.date.between({ from: '1960-01-01', to: '2018-01-01' }).toISOString(),
      lugarNacimiento: faker.location.city(),
      nacionalidad: 'Colombiana',
      tipoDocumento: 'cc',
      documento: faker.string.numeric(10),
      telefono: faker.phone.number(),
      email: faker.internet.email(),
      direccion: faker.location.streetAddress(),
      auditoria: { creadoPor: 'sistema', creadoEn: ahora() },
    })
  }
  return personas
}

export function seedUsuarios(): Usuario[] {
  const base = ahora()
  const pwd = 'demo1234'
  return [
    {
      id: 'u_admin',
      email: 'admin@plataforma.org',
      password: pwd,
      nombres: 'Lucia',
      apellidos: 'Romero',
      rol: 'admin_plataforma',
      activo: true,
      auditoria: { creadoPor: 'sistema', creadoEn: base },
    },
    {
      id: 'u_parroco',
      email: 'parroco@sanjose.org',
      password: pwd,
      nombres: 'Carlos Andres',
      apellidos: 'Mendoza',
      rol: 'parroco',
      parroquiaId: 'par_sanjose',
      activo: true,
      auditoria: { creadoPor: 'sistema', creadoEn: base },
    },
    {
      id: 'u_secretaria',
      email: 'secretaria@sanjose.org',
      password: pwd,
      nombres: 'Ana Maria',
      apellidos: 'Suarez',
      rol: 'secretaria',
      parroquiaId: 'par_sanjose',
      activo: true,
      auditoria: { creadoPor: 'sistema', creadoEn: base },
    },
    {
      id: 'u_catequista',
      email: 'catequista@sanjose.org',
      password: pwd,
      nombres: 'Patricia',
      apellidos: 'Salgado',
      rol: 'catequista',
      parroquiaId: 'par_sanjose',
      activo: true,
      auditoria: { creadoPor: 'sistema', creadoEn: base },
    },
  ]
}

export function seedPlantillas(): Plantilla[] {
  const tipos: Array<['bautismo' | 'confirmacion' | 'matrimonio' | 'defuncion' | 'primera_comunion' | 'soltera', string]> = [
    ['bautismo', 'plt_bautismo_estandar'],
    ['confirmacion', 'plt_confirmacion_estandar'],
    ['matrimonio', 'plt_matrimonio_estandar'],
    ['defuncion', 'plt_defuncion_estandar'],
    ['primera_comunion', 'plt_primeracomunion_estandar'],
    ['soltera', 'plt_soltera_estandar'],
  ]
  const ahoraIso = ahora()
  const cat: Plantilla[] = tipos.map(([tipo, id]) => ({
    id,
    nombre: `Plantilla estandar de ${tipo.replace('_', ' ')}`,
    tipo,
    origen: 'catalogo',
    estado: 'aprobada',
    fechaCreacion: ahoraIso,
    descripcion: `Modelo de la Conferencia Episcopal para ${tipo.replace('_', ' ')}.`,
  }))
  cat.push({
    id: 'plt_bautismo_sanjose_custom',
    nombre: 'Bautismo con anexo san Jose (solicitud)',
    tipo: 'bautismo',
    origen: 'custom',
    estado: 'en_revision',
    solicitanteParroquiaId: 'par_sanjose',
    fechaCreacion: ahoraIso,
    descripcion: 'Solicitud de la parroquia para incluir oracion al patrono al pie.',
  })
  return cat
}

export function seedBautismos(parroquiaId: string): Bautismo[] {
  const bautismos: Bautismo[] = []
  for (let i = 0; i < 18; i++) {
    const sexo: 'M' | 'F' = faker.helpers.arrayElement(['M', 'F'])
    const nombres = faker.person.firstName(sexo === 'M' ? 'male' : 'female')
    const apellidoP = faker.person.lastName()
    const apellidoM = faker.person.lastName()
    const fechaNac = faker.date.between({ from: '2018-01-01', to: '2024-09-01' })
    const fechaBau = new Date(fechaNac.getTime() + 1000 * 60 * 60 * 24 * 90)
    const anio = fechaBau.getFullYear()
    bautismos.push({
      id: uid('bau'),
      parroquiaId,
      libro: '17',
      tomo: '17',
      folio: String(50 + Math.floor(i / 2)),
      numero: String(i + 1).padStart(3, '0'),
      anio,
      fechaBautismo: fechaBau.toISOString(),
      lugarCelebracion: 'Iglesia parroquial',
      ministroNombre: i % 3 === 0 ? 'Pbro. Jorge Luis Ortiz Pena' : 'Pbro. Carlos Andres Mendoza Restrepo',
      ministroCalidad: i % 3 === 0 ? 'vicario' : 'parroco',
      bautizadoNombres: nombres,
      bautizadoApellidos: `${apellidoP} ${apellidoM}`,
      sexo,
      fechaNacimiento: fechaNac.toISOString(),
      lugarNacimiento: 'Barranquilla, Atlantico',
      paisNacimiento: 'Colombia',
      esAdoptado: false,
      padreNombres: faker.person.firstName('male'),
      padreApellidos: `${apellidoP} ${faker.person.lastName()}`,
      padreDocumento: faker.string.numeric(10),
      madreNombres: faker.person.firstName('female'),
      madreApellidos: `${apellidoM} ${faker.person.lastName()}`,
      madreApellidosSoltera: apellidoM,
      madreDocumento: faker.string.numeric(10),
      padrinoNombres: faker.person.firstName('male'),
      padrinoApellidos: `${faker.person.lastName()} ${faker.person.lastName()}`,
      madrinaNombres: faker.person.firstName('female'),
      madrinaApellidos: `${faker.person.lastName()} ${faker.person.lastName()}`,
      notasMarginales: i % 6 === 0 ? [
        {
          id: uid('not'),
          tipo: 'confirmacion',
          fechaHecho: faker.date.recent({ days: 800 }).toISOString(),
          lugarHecho: 'Catedral Maria Reina, Barranquilla',
          referenciaPartida: `Libro 4 · Folio 18 · N.º 042 / 2024`,
          autoridad: 'Mons. Pablo Emiro Salas Anteliz',
          fechaAnotacion: faker.date.recent({ days: 30 }).toISOString(),
          firmadoPor: 'Pbro. Carlos Andres Mendoza Restrepo',
        },
      ] : [],
      auditoria: aud('u_secretaria'),
    })
  }
  return bautismos
}

export function seedConfirmaciones(parroquiaId: string): Confirmacion[] {
  const items: Confirmacion[] = []
  for (let i = 0; i < 8; i++) {
    const sexo: 'M' | 'F' = faker.helpers.arrayElement(['M', 'F'])
    items.push({
      id: uid('cnf'),
      parroquiaId,
      libro: '4',
      tomo: '4',
      folio: String(15 + i),
      numero: String(i + 30).padStart(3, '0'),
      anio: 2024,
      fechaConfirmacion: faker.date.between({ from: '2024-03-01', to: '2024-11-30' }).toISOString(),
      lugarCelebracion: 'Catedral Maria Reina',
      confirmadoNombres: faker.person.firstName(sexo === 'M' ? 'male' : 'female'),
      confirmadoApellidos: `${faker.person.lastName()} ${faker.person.lastName()}`,
      sexo,
      nombreConfirmacion: faker.helpers.arrayElement(['Juan Pablo', 'Maria', 'Jose', 'Lucia', 'Francisco']),
      refBautismo: {
        parroquia: 'Parroquia San Jose',
        diocesis: 'Arquidiocesis de Barranquilla',
        libro: '17',
        folio: String(40 + i),
        numero: String(20 + i).padStart(3, '0'),
        fechaBautismo: faker.date.between({ from: '2010-01-01', to: '2014-12-31' }).toISOString(),
        bautizado: faker.person.fullName(),
      },
      ministroNombre: 'Mons. Pablo Emiro Salas Anteliz',
      ministroTipo: 'obispo_diocesano',
      padrinoNombre: faker.person.fullName(),
      auditoria: aud('u_secretaria'),
    })
  }
  return items
}

export function seedMatrimonios(parroquiaId: string): Matrimonio[] {
  const items: Matrimonio[] = []
  for (let i = 0; i < 6; i++) {
    items.push({
      id: uid('mat'),
      parroquiaId,
      libro: '7',
      tomo: '7',
      folio: String(20 + i),
      numero: String(i + 10).padStart(3, '0'),
      anio: 2024,
      fechaCelebracion: faker.date.between({ from: '2024-01-01', to: '2024-12-30' }).toISOString(),
      lugarCelebracion: 'Iglesia parroquial',
      forma: 'con_misa',
      esposo: {
        nombres: faker.person.firstName('male'),
        apellidos: `${faker.person.lastName()} ${faker.person.lastName()}`,
        documento: faker.string.numeric(10),
        estadoCivilPrevio: 'soltero',
        refBautismo: {
          parroquia: 'Parroquia Inmaculada Concepcion',
          libro: '12',
          folio: '34',
          numero: '021',
          fechaBautismo: faker.date.between({ from: '1990-01-01', to: '2000-12-31' }).toISOString(),
          bautizado: '',
        },
      },
      esposa: {
        nombres: faker.person.firstName('female'),
        apellidos: `${faker.person.lastName()} ${faker.person.lastName()}`,
        documento: faker.string.numeric(10),
        estadoCivilPrevio: 'soltera' as 'soltero',
        refBautismo: {
          parroquia: 'Parroquia San Jose',
          libro: '15',
          folio: '90',
          numero: '055',
          fechaBautismo: faker.date.between({ from: '1990-01-01', to: '2000-12-31' }).toISOString(),
          bautizado: '',
        },
      },
      testigos: [
        { nombres: faker.person.fullName(), documento: faker.string.numeric(10) },
        { nombres: faker.person.fullName(), documento: faker.string.numeric(10) },
      ],
      sacerdoteAsistenteNombre: 'Pbro. Carlos Andres Mendoza Restrepo',
      ministroCalidad: 'parroco_propio',
      dispensas: [],
      efectosCiviles: true,
      numeroActaCivil: faker.string.numeric(8),
      auditoria: aud('u_secretaria'),
    })
  }
  return items
}

export function seedDefunciones(parroquiaId: string): Defuncion[] {
  const items: Defuncion[] = []
  for (let i = 0; i < 6; i++) {
    items.push({
      id: uid('def'),
      parroquiaId,
      libro: '9',
      tomo: '9',
      folio: String(40 + i),
      numero: String(i + 15).padStart(3, '0'),
      anio: 2024,
      difuntoNombres: faker.person.firstName(),
      difuntoApellidos: `${faker.person.lastName()} ${faker.person.lastName()}`,
      sexo: faker.helpers.arrayElement(['M', 'F']),
      edadAlFallecer: faker.number.int({ min: 60, max: 95 }),
      estadoCivil: 'casado',
      fechaDefuncion: faker.date.recent({ days: 200 }).toISOString(),
      lugarDefuncion: 'Barranquilla',
      sacramentosFinales: ['confesion', 'uncion_enfermos', 'viatico'],
      refBautismo: {
        parroquia: 'Parroquia San Jose',
        libro: '4',
        folio: '12',
        numero: '003',
        fechaBautismo: faker.date.past({ years: 70 }).toISOString(),
        bautizado: '',
      },
      celebranteExequiasNombre: 'Pbro. Carlos Andres Mendoza Restrepo',
      fechaExequias: faker.date.recent({ days: 200 }).toISOString(),
      lugarSepultura: 'Cementerio Calancala',
      disposicion: 'inhumacion',
      auditoria: aud('u_secretaria'),
    })
  }
  return items
}

export function seedIntenciones(parroquiaId: string): IntencionMisa[] {
  const items: IntencionMisa[] = []
  for (let i = 0; i < 10; i++) {
    const fechaSol = faker.date.recent({ days: 60 })
    const fechaProg = new Date(fechaSol.getTime() + 1000 * 60 * 60 * 24 * 7)
    items.push({
      id: uid('int'),
      parroquiaId,
      numero: i + 1,
      fechaSolicitud: fechaSol.toISOString(),
      solicitanteNombre: faker.person.fullName(),
      solicitanteContacto: faker.phone.number(),
      tipo: faker.helpers.arrayElement(['difunto', 'accion_gracias', 'peticion', 'aniversario']),
      descripcion: faker.lorem.sentence(),
      difuntoNombre: i % 2 === 0 ? faker.person.fullName() : undefined,
      estipendio: 30000,
      moneda: 'COP',
      recibidoPor: 'Secretaria parroquial',
      fechaProgramada: fechaProg.toISOString(),
      sacerdoteAsignado: i % 2 === 0 ? 'Pbro. Carlos Mendoza' : 'Pbro. Jorge Ortiz',
      estado: i < 6 ? 'celebrada' : i < 9 ? 'asignada' : 'pendiente',
      fechaCelebracionReal: i < 6 ? fechaProg.toISOString() : undefined,
      auditoria: aud('u_secretaria'),
    })
  }
  return items
}

export function seedFundaciones(parroquiaId: string): FundacionMisa[] {
  return [
    {
      id: uid('fnd'),
      parroquiaId,
      fundador: 'Familia Restrepo Velez',
      descripcion: 'Misa anual por el alma de don Eladio Restrepo',
      intencion: 'Eladio Restrepo Velez',
      fechaConstitucion: '1998-06-12',
      cantidadAnual: 1,
      frecuencia: 'anual',
      capitalConstituido: 5000000,
      cumplimientoUltimoAnio: 1,
      auditoria: aud('u_parroco'),
    },
    {
      id: uid('fnd'),
      parroquiaId,
      fundador: 'Hermandad del Santisimo',
      descripcion: 'Misa mensual primeros viernes',
      intencion: 'Por los hermanos difuntos',
      fechaConstitucion: '2010-09-03',
      cantidadAnual: 12,
      frecuencia: 'mensual',
      cumplimientoUltimoAnio: 11,
      auditoria: aud('u_parroco'),
    },
  ]
}

export function seedCatequesis(parroquiaId: string): GrupoCatequesis[] {
  return [
    {
      id: uid('cat'),
      parroquiaId,
      nombre: 'Primera Comunion 2026 — Grupo A',
      etapa: 'primera_comunion',
      anio: 2026,
      catequistaNombre: 'Patricia Salgado',
      diaSemana: 'Sabado',
      hora: '9:00',
      cupos: 25,
      inscritos: Array.from({ length: 18 }, () => uid('per')),
      auditoria: aud('u_catequista'),
    },
    {
      id: uid('cat'),
      parroquiaId,
      nombre: 'Confirmacion 2026',
      etapa: 'confirmacion',
      anio: 2026,
      catequistaNombre: 'Diacono Andres Polo',
      diaSemana: 'Domingo',
      hora: '11:00',
      cupos: 30,
      inscritos: Array.from({ length: 22 }, () => uid('per')),
      auditoria: aud('u_catequista'),
    },
    {
      id: uid('cat'),
      parroquiaId,
      nombre: 'Prematrimonial Mayo 2026',
      etapa: 'prematrimonial',
      anio: 2026,
      catequistaNombre: 'Familia Ortega',
      diaSemana: 'Viernes',
      hora: '19:00',
      cupos: 12,
      inscritos: Array.from({ length: 8 }, () => uid('per')),
      auditoria: aud('u_secretaria'),
    },
  ]
}

export function seedCronica(parroquiaId: string): EntradaCronica[] {
  return [
    {
      id: uid('crn'),
      parroquiaId,
      fecha: '2026-04-18',
      titulo: 'Visita pastoral del Arzobispo',
      cuerpo: 'Mons. Pablo Emiro Salas presidio la misa solemne y visito el archivo parroquial.',
      categoria: 'visita_pastoral',
      auditoria: aud('u_parroco'),
    },
    {
      id: uid('crn'),
      parroquiaId,
      fecha: '2026-03-09',
      titulo: 'Confirmaciones comunitarias',
      cuerpo: '42 jovenes recibieron el sacramento en la catedral.',
      categoria: 'evento',
      auditoria: aud('u_parroco'),
    },
  ]
}

export const slugifyName = slugify
