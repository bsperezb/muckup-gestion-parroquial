import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Confirmacion } from '@/types'
import { uid } from '@/lib/utils'

export const useConfirmacionesStore = defineStore(
  'confirmaciones',
  () => {
    const items = ref<Confirmacion[]>([])

    function seed(initial: Confirmacion[]) {
      if (items.value.length === 0) items.value = initial
    }
    function byId(id: string) {
      return items.value.find((c) => c.id === id)
    }
    function porParroquia(parroquiaId: string) {
      return items.value.filter((c) => c.parroquiaId === parroquiaId)
    }
    function create(input: Omit<Confirmacion, 'id'>) {
      const c: Confirmacion = { id: uid('cnf'), ...input }
      items.value.push(c)
      return c
    }
    function update(id: string, patch: Partial<Confirmacion>) {
      const i = items.value.findIndex((x) => x.id === id)
      if (i === -1) return
      items.value[i] = { ...items.value[i], ...patch }
    }
    function remove(id: string) {
      items.value = items.value.filter((c) => c.id !== id)
    }

    return { items, seed, byId, porParroquia, create, update, remove }
  },
  { persist: true },
)
