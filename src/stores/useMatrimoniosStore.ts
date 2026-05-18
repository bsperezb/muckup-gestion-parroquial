import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Matrimonio } from '@/types'
import { uid } from '@/lib/utils'

export const useMatrimoniosStore = defineStore(
  'matrimonios',
  () => {
    const items = ref<Matrimonio[]>([])

    function seed(initial: Matrimonio[]) {
      if (items.value.length === 0) items.value = initial
    }
    function byId(id: string) {
      return items.value.find((m) => m.id === id)
    }
    function porParroquia(parroquiaId: string) {
      return items.value.filter((m) => m.parroquiaId === parroquiaId)
    }
    function create(input: Omit<Matrimonio, 'id'>) {
      const m: Matrimonio = { id: uid('mat'), ...input }
      items.value.push(m)
      return m
    }
    function update(id: string, patch: Partial<Matrimonio>) {
      const i = items.value.findIndex((x) => x.id === id)
      if (i === -1) return
      items.value[i] = { ...items.value[i], ...patch }
    }
    function remove(id: string) {
      items.value = items.value.filter((m) => m.id !== id)
    }

    return { items, seed, byId, porParroquia, create, update, remove }
  },
  { persist: true },
)
