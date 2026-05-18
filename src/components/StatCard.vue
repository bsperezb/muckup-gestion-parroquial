<script setup lang="ts">
import { LayoutDashboard } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'

defineProps<{
  titulo: string
  valor: string | number
  detalle?: string
  icono?: typeof LayoutDashboard
  tono?: 'primary' | 'accent' | 'success'
}>()
</script>

<template>
  <Card class="p-4">
    <div class="flex items-start justify-between gap-3">
      <div class="space-y-1">
        <p class="text-xs uppercase tracking-wider text-muted-foreground">{{ titulo }}</p>
        <p class="font-serif text-2xl font-semibold tabular-nums">{{ valor }}</p>
        <p v-if="detalle" class="text-xs text-muted-foreground">{{ detalle }}</p>
      </div>
      <span
        :class="[
          'grid h-9 w-9 place-content-center rounded-md',
          (tono ?? 'primary') === 'primary' && 'bg-primary/10 text-primary',
          tono === 'accent' && 'bg-accent/15 text-accent-foreground',
          tono === 'success' && 'bg-success/15 text-success',
        ]"
      >
        <component :is="icono ?? LayoutDashboard" class="h-4 w-4" />
      </span>
    </div>
  </Card>
</template>
