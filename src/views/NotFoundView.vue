<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Compass } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
    <Compass class="h-10 w-10 text-primary" />
    <h1 class="font-serif text-3xl font-semibold">Pagina no encontrada</h1>
    <p class="max-w-md text-muted-foreground">
      La ruta que buscas no existe o fue movida. Vuelve al directorio publico o al panel.
    </p>
    <div class="flex gap-2">
      <RouterLink to="/publico"><Button variant="outline" as="span">Directorio</Button></RouterLink>
      <RouterLink to="/app/dashboard"><Button as="span">Ir al panel</Button></RouterLink>
    </div>
  </div>
</template>
