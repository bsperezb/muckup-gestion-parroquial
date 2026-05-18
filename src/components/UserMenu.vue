<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LogOut, RotateCcw, ChevronDown } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/useAuthStore'
import { resetTodo } from '@/mocks/initSeeds'
import Avatar from '@/components/ui/Avatar.vue'
import Dialog from '@/components/ui/Dialog.vue'
import Button from '@/components/ui/Button.vue'

const auth = useAuthStore()
const router = useRouter()
const open = ref(false)
const confirmReset = ref(false)

function logout() {
  auth.logout()
  open.value = false
  router.push('/login')
}

function reset() {
  resetTodo()
  confirmReset.value = false
  open.value = false
  router.push('/login')
}

function rolLegible(rol: string) {
  const m: Record<string, string> = {
    admin_plataforma: 'Administrador de Plataforma',
    parroco: 'Parroco',
    vicario: 'Vicario',
    secretaria: 'Secretaria',
    canciller: 'Canciller',
    catequista: 'Catequista',
  }
  return m[rol] ?? rol
}
</script>

<template>
  <div v-if="auth.usuario" class="relative">
    <button
      class="flex items-center gap-2 rounded-md border px-2 py-1 transition-colors hover:bg-secondary"
      @click="open = !open"
    >
      <Avatar :name="`${auth.usuario.nombres} ${auth.usuario.apellidos}`" size="sm" />
      <div class="hidden text-left md:block">
        <p class="text-sm font-medium leading-tight">{{ auth.usuario.nombres }}</p>
        <p class="text-[11px] leading-tight text-muted-foreground">{{ rolLegible(auth.usuario.rol) }}</p>
      </div>
      <ChevronDown class="h-3.5 w-3.5 text-muted-foreground" />
    </button>

    <div
      v-if="open"
      class="absolute right-0 z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-md border bg-popover shadow-lg"
    >
      <div class="border-b p-3">
        <p class="text-sm font-medium">{{ auth.usuario.nombres }} {{ auth.usuario.apellidos }}</p>
        <p class="text-xs text-muted-foreground">{{ auth.usuario.email }}</p>
        <p class="mt-1 text-[11px] uppercase tracking-wide text-primary">{{ rolLegible(auth.usuario.rol) }}</p>
      </div>
      <div class="p-1">
        <button
          class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-secondary"
          @click="confirmReset = true; open = false"
        >
          <RotateCcw class="h-4 w-4" />
          Reiniciar datos de demo
        </button>
        <button
          class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
          @click="logout"
        >
          <LogOut class="h-4 w-4" />
          Cerrar sesion
        </button>
      </div>
    </div>

    <Dialog
      :open="confirmReset"
      title="Reiniciar datos de demo"
      description="Se borraran todos los registros y se sembraran los datos iniciales. Tendras que iniciar sesion de nuevo."
      @update:open="confirmReset = $event"
    >
      <div class="flex justify-end gap-2">
        <Button variant="outline" @click="confirmReset = false">Cancelar</Button>
        <Button variant="destructive" @click="reset">Reiniciar</Button>
      </div>
    </Dialog>
  </div>
</template>
