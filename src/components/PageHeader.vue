<script setup lang="ts">
defineProps<{
  titulo: string
  descripcion?: string
}>()
</script>

<template>
  <div class="flex flex-col gap-1 border-b pb-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h2 class="font-serif text-2xl font-semibold tracking-tight">{{ titulo }}</h2>
      <p v-if="descripcion" class="mt-1 max-w-2xl text-sm text-muted-foreground">
        {{ descripcion }}
      </p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <slot name="acciones" />
    </div>
  </div>
</template>
