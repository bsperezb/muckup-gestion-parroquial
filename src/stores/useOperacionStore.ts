import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  IntencionMisa,
  FundacionMisa,
  GrupoCatequesis,
  EntradaCronica,
} from '@/types'
import { uid } from '@/lib/utils'

export const useIntencionesStore = defineStore(
  'intenciones',
  () => {
    const items = ref<IntencionMisa[]>([])
    function seed(initial: IntencionMisa[]) {
      if (items.value.length === 0) items.value = initial
    }
    function create(input: Omit<IntencionMisa, 'id'>) {
      const v: IntencionMisa = { id: uid('int'), ...input }
      items.value.push(v)
      return v
    }
    function update(id: string, patch: Partial<IntencionMisa>) {
      const i = items.value.findIndex((x) => x.id === id)
      if (i === -1) return
      items.value[i] = { ...items.value[i], ...patch }
    }
    return { items, seed, create, update }
  },
  { persist: true },
)

export const useFundacionesStore = defineStore(
  'fundaciones',
  () => {
    const items = ref<FundacionMisa[]>([])
    function seed(initial: FundacionMisa[]) {
      if (items.value.length === 0) items.value = initial
    }
    function create(input: Omit<FundacionMisa, 'id'>) {
      const v: FundacionMisa = { id: uid('fnd'), ...input }
      items.value.push(v)
      return v
    }
    return { items, seed, create }
  },
  { persist: true },
)

export const useCatequesisStore = defineStore(
  'catequesis',
  () => {
    const items = ref<GrupoCatequesis[]>([])
    function seed(initial: GrupoCatequesis[]) {
      if (items.value.length === 0) items.value = initial
    }
    function create(input: Omit<GrupoCatequesis, 'id'>) {
      const v: GrupoCatequesis = { id: uid('cat'), ...input }
      items.value.push(v)
      return v
    }
    return { items, seed, create }
  },
  { persist: true },
)

export const useCronicaStore = defineStore(
  'cronica',
  () => {
    const items = ref<EntradaCronica[]>([])
    function seed(initial: EntradaCronica[]) {
      if (items.value.length === 0) items.value = initial
    }
    function create(input: Omit<EntradaCronica, 'id'>) {
      const v: EntradaCronica = { id: uid('crn'), ...input }
      items.value.push(v)
      return v
    }
    return { items, seed, create }
  },
  { persist: true },
)
