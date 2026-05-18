<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Menu } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/useAuthStore'
import { useParroquiasStore } from '@/stores/useParroquiasStore'
import ThemeToggle from './ThemeToggle.vue'
import UserMenu from './UserMenu.vue'
import Button from '@/components/ui/Button.vue'

const route = useRoute()
const auth = useAuthStore()
const parroquias = useParroquiasStore()

const parroquia = computed(() =>
  auth.usuario?.parroquiaId ? parroquias.byId(auth.usuario.parroquiaId) : undefined,
)

const titulo = computed(() => {
  const meta = route.meta as { title?: string }
  return meta.title ?? 'Inicio'
})
</script>

<template>
  <header
    class="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur lg:px-6"
  >
    <div class="flex items-center gap-3">
      <Button variant="ghost" size="icon" class="lg:hidden" aria-label="Menu">
        <Menu class="h-4 w-4" />
      </Button>
      <div class="flex flex-col leading-tight">
        <h1 class="font-serif text-lg font-semibold tracking-tight">{{ titulo }}</h1>
        <p v-if="parroquia" class="text-xs text-muted-foreground">
          {{ parroquia.nombre }} · {{ parroquia.ciudad }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <ThemeToggle />
      <UserMenu />
    </div>
  </header>
</template>
