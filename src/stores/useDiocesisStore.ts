import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Diocesis } from '@/types'
import { uid } from '@/lib/utils'

export const useDiocesisStore = defineStore(
  'diocesis',
  () => {
    const items = ref<Diocesis[]>([])

    function seed(initial: Diocesis[]) {
      if (items.value.length === 0) items.value = initial
    }
    function byId(id: string) {
      return items.value.find((d) => d.id === id)
    }
    function create(input: Omit<Diocesis, 'id'>) {
      const d: Diocesis = { id: uid('dio'), ...input }
      items.value.push(d)
      return d
    }

    return { items, seed, byId, create }
  },
  { persist: true },
)
