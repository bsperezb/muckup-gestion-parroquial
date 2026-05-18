import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Defuncion } from '@/types'
import { uid } from '@/lib/utils'

export const useDefuncionesStore = defineStore(
  'defunciones',
  () => {
    const items = ref<Defuncion[]>([])

    function seed(initial: Defuncion[]) {
      if (items.value.length === 0) items.value = initial
    }
    function byId(id: string) {
      return items.value.find((d) => d.id === id)
    }
    function porParroquia(parroquiaId: string) {
      return items.value.filter((d) => d.parroquiaId === parroquiaId)
    }
    function create(input: Omit<Defuncion, 'id'>) {
      const d: Defuncion = { id: uid('def'), ...input }
      items.value.push(d)
      return d
    }
    function update(id: string, patch: Partial<Defuncion>) {
      const i = items.value.findIndex((x) => x.id === id)
      if (i === -1) return
      items.value[i] = { ...items.value[i], ...patch }
    }
    function remove(id: string) {
      items.value = items.value.filter((d) => d.id !== id)
    }

    return { items, seed, byId, porParroquia, create, update, remove }
  },
  { persist: true },
)
