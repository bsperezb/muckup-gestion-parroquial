<script setup lang="ts">
import { ScrollText, Plus } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useCronicaStore } from '@/stores/useOperacionStore'
import { formatoFecha } from '@/utils/format'

const cronica = useCronicaStore()
</script>

<template>
  <PageHeader
    titulo="Cronica parroquial"
    descripcion="Registro cronologico de visitas pastorales, decretos y eventos."
  >
    <template #acciones>
      <Button disabled><Plus class="h-4 w-4" /> Nueva entrada</Button>
    </template>
  </PageHeader>

  <div class="space-y-4">
    <Card v-for="e in cronica.items" :key="e.id">
      <CardHeader class="flex flex-row items-start justify-between">
        <div>
          <CardTitle class="font-serif text-lg">{{ e.titulo }}</CardTitle>
          <p class="text-xs text-muted-foreground">{{ formatoFecha(e.fecha) }}</p>
        </div>
        <Badge variant="accent" class="capitalize">{{ e.categoria.replace('_', ' ') }}</Badge>
      </CardHeader>
      <CardContent class="text-sm text-muted-foreground">
        {{ e.cuerpo }}
      </CardContent>
    </Card>
  </div>

  <EmptyState v-if="!cronica.items.length" titulo="Sin entradas" :icono="ScrollText" />
</template>
