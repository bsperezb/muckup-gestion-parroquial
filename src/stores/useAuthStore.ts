import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Rol, Usuario } from '@/types'
import { useUsuariosStore } from './useUsuariosStore'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const usuarioId = ref<string | null>(null)
    const usuarios = useUsuariosStore()

    const usuario = computed<Usuario | undefined>(() =>
      usuarioId.value ? usuarios.byId(usuarioId.value) : undefined,
    )
    const autenticado = computed(() => !!usuario.value)

    function login(email: string, password: string): { ok: boolean; error?: string } {
      const u = usuarios.byEmail(email)
      if (!u) return { ok: false, error: 'Usuario no encontrado' }
      if (u.password !== password) return { ok: false, error: 'Contrasena invalida' }
      if (!u.activo) return { ok: false, error: 'Usuario inactivo' }
      usuarioId.value = u.id
      return { ok: true }
    }

    function logout() {
      usuarioId.value = null
    }

    function rolEs(...roles: Rol[]): boolean {
      return !!usuario.value && roles.includes(usuario.value.rol)
    }

    return { usuarioId, usuario, autenticado, login, logout, rolEs }
  },
  { persist: true },
)
