import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Bautismo, NotaMarginal } from '@/types'
import { coincideFoneticamente } from '@/utils/canonical'
import { uid } from '@/lib/utils'

export const useBautismosStore = defineStore(
  'bautismos',
  () => {
    const items = ref<Bautismo[]>([])

    const total = computed(() => items.value.length)

    function seed(initial: Bautismo[]) {
      if (items.value.length === 0) items.value = initial
    }
    function byId(id: string) {
      return items.value.find((b) => b.id === id)
    }
    function porParroquia(parroquiaId: string) {
      return items.value.filter((b) => b.parroquiaId === parroquiaId)
    }
    function buscarPorNombre(termino: string) {
      const q = termino.toLowerCase().trim()
      if (!q) return [] as Bautismo[]
      return items.value.filter((b) => {
        const full = `${b.bautizadoNombres} ${b.bautizadoApellidos}`.toLowerCase()
        return full.includes(q) || coincideFoneticamente(full, q)
      })
    }
    function buscarPorPartida(libro: string, folio: string, numero: string) {
      return items.value.find(
        (b) => b.libro === libro && b.folio === folio && b.numero === numero,
      )
    }
    function create(input: Omit<Bautismo, 'id' | 'notasMarginales'> & { notasMarginales?: NotaMarginal[] }) {
      const b: Bautismo = { id: uid('bau'), notasMarginales: [], ...input }
      items.value.push(b)
      return b
    }
    function update(id: string, patch: Partial<Bautismo>) {
      const i = items.value.findIndex((x) => x.id === id)
      if (i === -1) return
      items.value[i] = { ...items.value[i], ...patch }
    }
    function agregarNotaMarginal(bautismoId: string, nota: Omit<NotaMarginal, 'id'>) {
      const b = byId(bautismoId)
      if (!b) return
      b.notasMarginales = [...b.notasMarginales, { id: uid('not'), ...nota }]
    }
    function remove(id: string) {
      items.value = items.value.filter((b) => b.id !== id)
    }

    return {
      items,
      total,
      seed,
      byId,
      porParroquia,
      buscarPorNombre,
      buscarPorPartida,
      create,
      update,
      agregarNotaMarginal,
      remove,
    }
  },
  { persist: true },
)
