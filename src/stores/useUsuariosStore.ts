import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Usuario } from '@/types'

export const useUsuariosStore = defineStore(
  'usuarios',
  () => {
    const items = ref<Usuario[]>([])

    function seed(initial: Usuario[]) {
      if (items.value.length === 0) items.value = initial
    }
    function byEmail(email: string) {
      return items.value.find((u) => u.email.toLowerCase() === email.toLowerCase())
    }
    function byId(id: string) {
      return items.value.find((u) => u.id === id)
    }

    return { items, seed, byEmail, byId }
  },
  { persist: true },
)
