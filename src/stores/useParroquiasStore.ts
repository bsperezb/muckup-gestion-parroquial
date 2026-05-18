import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Parroquia } from '@/types'
import { slugify, uid } from '@/lib/utils'

export const useParroquiasStore = defineStore(
  'parroquias',
  () => {
    const items = ref<Parroquia[]>([])

    const visiblesPublico = computed(() => items.value.filter((p) => p.visiblePublico))

    function seed(initial: Parroquia[]) {
      if (items.value.length === 0) items.value = initial
    }
    function byId(id: string) {
      return items.value.find((p) => p.id === id)
    }
    function bySlug(slug: string) {
      return items.value.find((p) => p.slug === slug)
    }
    function create(input: Omit<Parroquia, 'id' | 'slug'>) {
      const slug = slugify(input.nombre)
      const p: Parroquia = { id: uid('par'), slug, ...input }
      items.value.push(p)
      return p
    }
    function update(id: string, patch: Partial<Parroquia>) {
      const i = items.value.findIndex((x) => x.id === id)
      if (i === -1) return
      items.value[i] = { ...items.value[i], ...patch }
    }
    function remove(id: string) {
      items.value = items.value.filter((p) => p.id !== id)
    }

    return { items, visiblesPublico, seed, byId, bySlug, create, update, remove }
  },
  { persist: true },
)
