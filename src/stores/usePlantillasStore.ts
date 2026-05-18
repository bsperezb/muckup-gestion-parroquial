import { defineStore } from 'pinia'
import { ref } from 'vue'
import { uid } from '@/lib/utils'
import type { TipoDocumentoSacramental } from '@/types'

export type EstadoPlantilla = 'aprobada' | 'en_revision' | 'rechazada'

export interface Plantilla {
  id: string
  nombre: string
  tipo: TipoDocumentoSacramental
  origen: 'catalogo' | 'custom'
  estado: EstadoPlantilla
  solicitanteParroquiaId?: string
  fechaCreacion: string
  descripcion: string
}

export const usePlantillasStore = defineStore(
  'plantillas',
  () => {
    const items = ref<Plantilla[]>([])

    function seed(initial: Plantilla[]) {
      if (items.value.length === 0) items.value = initial
    }
    function porTipo(tipo: TipoDocumentoSacramental) {
      return items.value.filter((p) => p.tipo === tipo)
    }
    function create(input: Omit<Plantilla, 'id'>) {
      const v: Plantilla = { id: uid('plt'), ...input }
      items.value.push(v)
      return v
    }
    function setEstado(id: string, estado: EstadoPlantilla) {
      const i = items.value.findIndex((x) => x.id === id)
      if (i === -1) return
      items.value[i] = { ...items.value[i], estado }
    }

    return { items, seed, porTipo, create, setEstado }
  },
  { persist: true },
)
