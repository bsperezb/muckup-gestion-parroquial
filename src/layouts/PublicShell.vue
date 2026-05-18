<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Cross, LogIn } from 'lucide-vue-next'
import ThemeToggle from '@/components/ThemeToggle.vue'
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background">
    <header class="border-b bg-card/60 backdrop-blur">
    <div class="flex px-2 md:px-6 h-14 items-center justify-between">
        <RouterLink to="/publico" class="flex items-center gap-2">
          <span class="grid h-8 w-8 place-content-center rounded-md bg-primary text-primary-foreground">
            <Cross class="h-4 w-4" />
          </span>
          <div class="leading-tight">
            <p class="font-serif text-base font-semibold">Directorio Parroquial</p>
            <p class="text-[10px] uppercase tracking-widest text-muted-foreground">
              Parroquias inscritas
            </p>
          </div>
        </RouterLink>
        <div class="flex items-center gap-2">
          <ThemeToggle />
          <RouterLink to="/login">
            <Button variant="outline" size="sm" as="span">
              <LogIn class="h-4 w-4" />
              Iniciar sesion
            </Button>
          </RouterLink>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <router-view />
    </main>

    <footer class="border-t bg-card/40">
      <div class="container py-6 text-center text-xs text-muted-foreground">
        Administracion Parroquial · Demo mock-first · {{ new Date().getFullYear() }}
      </div>
    </footer>
  </div>
</template>
