<script setup lang="ts">
import { Inbox } from 'lucide-vue-next'

defineProps<{
  titulo: string
  descripcion?: string
  icono?: typeof Inbox
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 py-12 text-center">
    <component :is="icono ?? Inbox" class="mb-3 h-8 w-8 text-muted-foreground" />
    <p class="font-medium">{{ titulo }}</p>
    <p v-if="descripcion" class="mt-1 max-w-md text-sm text-muted-foreground">{{ descripcion }}</p>
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>
