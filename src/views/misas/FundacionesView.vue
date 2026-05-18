<script setup lang="ts">
import { PiggyBank, Plus } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useFundacionesStore } from '@/stores/useOperacionStore'
import { formatoFecha, formatoMoneda } from '@/utils/format'

const fundaciones = useFundacionesStore()
</script>

<template>
  <PageHeader
    titulo="Fundaciones de misas"
    descripcion="Cargas perpetuas (c. 1307). Conservadas en el libro de fundaciones de la parroquia."
  >
    <template #acciones>
      <Button disabled><Plus class="h-4 w-4" /> Nueva fundacion</Button>
    </template>
  </PageHeader>

  <div class="grid gap-4 md:grid-cols-2">
    <Card v-for="f in fundaciones.items" :key="f.id">
      <CardHeader>
        <CardTitle>{{ f.fundador }}</CardTitle>
        <p class="text-xs text-muted-foreground">Constituida: {{ formatoFecha(f.fechaConstitucion) }}</p>
      </CardHeader>
      <CardContent class="space-y-3 text-sm">
        <p>{{ f.descripcion }}</p>
        <p class="text-muted-foreground">Intencion: {{ f.intencion }}</p>
        <div class="flex flex-wrap gap-2">
          <Badge variant="secondary" class="capitalize">{{ f.frecuencia }} ({{ f.cantidadAnual }}/ano)</Badge>
          <Badge v-if="f.capitalConstituido" variant="outline">
            Capital: {{ formatoMoneda(f.capitalConstituido) }}
          </Badge>
          <Badge :variant="(f.cumplimientoUltimoAnio ?? 0) >= f.cantidadAnual ? 'success' : 'warning'">
            Cumplimiento: {{ f.cumplimientoUltimoAnio ?? 0 }} / {{ f.cantidadAnual }}
          </Badge>
        </div>
      </CardContent>
    </Card>
  </div>

  <EmptyState v-if="!fundaciones.items.length" titulo="Sin fundaciones" :icono="PiggyBank" />
</template>
