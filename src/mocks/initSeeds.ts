import { useDiocesisStore } from '@/stores/useDiocesisStore'
import { useParroquiasStore } from '@/stores/useParroquiasStore'
import { usePersonasStore } from '@/stores/usePersonasStore'
import { useUsuariosStore } from '@/stores/useUsuariosStore'
import { useBautismosStore } from '@/stores/useBautismosStore'
import { useConfirmacionesStore } from '@/stores/useConfirmacionesStore'
import { useMatrimoniosStore } from '@/stores/useMatrimoniosStore'
import { useDefuncionesStore } from '@/stores/useDefuncionesStore'
import {
  useIntencionesStore,
  useFundacionesStore,
  useCatequesisStore,
  useCronicaStore,
} from '@/stores/useOperacionStore'
import { usePlantillasStore } from '@/stores/usePlantillasStore'
import { useAuthStore } from '@/stores/useAuthStore'
import {
  seedBautismos,
  seedCatequesis,
  seedConfirmaciones,
  seedCronica,
  seedDefunciones,
  seedDiocesis,
  seedFundaciones,
  seedIntenciones,
  seedMatrimonios,
  seedParroquias,
  seedPersonas,
  seedPlantillas,
  seedUsuarios,
} from './seeds'

const PARROQUIA_DEMO = 'par_sanjose'

export function inicializarSemillas() {
  useDiocesisStore().seed(seedDiocesis())
  useParroquiasStore().seed(seedParroquias())
  useUsuariosStore().seed(seedUsuarios())
  usePersonasStore().seed(seedPersonas())
  usePlantillasStore().seed(seedPlantillas())
  useBautismosStore().seed(seedBautismos(PARROQUIA_DEMO))
  useConfirmacionesStore().seed(seedConfirmaciones(PARROQUIA_DEMO))
  useMatrimoniosStore().seed(seedMatrimonios(PARROQUIA_DEMO))
  useDefuncionesStore().seed(seedDefunciones(PARROQUIA_DEMO))
  useIntencionesStore().seed(seedIntenciones(PARROQUIA_DEMO))
  useFundacionesStore().seed(seedFundaciones(PARROQUIA_DEMO))
  useCatequesisStore().seed(seedCatequesis(PARROQUIA_DEMO))
  useCronicaStore().seed(seedCronica(PARROQUIA_DEMO))
}

export function resetTodo() {
  useAuthStore().logout()
  for (const key of Object.keys(localStorage)) {
    if (
      key.startsWith('theme') ||
      key.startsWith('auth') ||
      key.startsWith('parroquias') ||
      key.startsWith('personas') ||
      key.startsWith('diocesis') ||
      key.startsWith('bautismos') ||
      key.startsWith('confirmaciones') ||
      key.startsWith('matrimonios') ||
      key.startsWith('defunciones') ||
      key.startsWith('intenciones') ||
      key.startsWith('fundaciones') ||
      key.startsWith('catequesis') ||
      key.startsWith('cronica') ||
      key.startsWith('plantillas') ||
      key.startsWith('usuarios')
    ) {
      localStorage.removeItem(key)
    }
  }
  location.reload()
}
