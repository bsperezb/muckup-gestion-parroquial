import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Persona } from '@/types'
import { uid } from '@/lib/utils'

export const usePersonasStore = defineStore(
  'personas',
  () => {
    const items = ref<Persona[]>([])

    const clerigos = computed(() => items.value.filter((p) => p.esClerigo))

    function seed(initial: Persona[]) {
      if (items.value.length === 0) items.value = initial
    }
    function byId(id: string) {
      return items.value.find((p) => p.id === id)
    }
    function buscar(termino: string) {
      const q = termino.toLowerCase().trim()
      if (!q) return items.value
      return items.value.filter((p) =>
        `${p.nombres} ${p.apellidos} ${p.documento ?? ''}`.toLowerCase().includes(q),
      )
    }
    function create(input: Omit<Persona, 'id'>) {
      const p: Persona = { id: uid('per'), ...input }
      items.value.push(p)
      return p
    }
    function update(id: string, patch: Partial<Persona>) {
      const i = items.value.findIndex((x) => x.id === id)
      if (i === -1) return
      items.value[i] = { ...items.value[i], ...patch }
    }
    function remove(id: string) {
      items.value = items.value.filter((p) => p.id !== id)
    }

    return { items, clerigos, seed, byId, buscar, create, update, remove }
  },
  { persist: true },
)
