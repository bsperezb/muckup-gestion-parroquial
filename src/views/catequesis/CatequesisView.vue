<script setup lang="ts">
import { BookOpen, Plus, Users } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import EmptyState from '@/components/EmptyState.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import { useCatequesisStore } from '@/stores/useOperacionStore'

const catequesis = useCatequesisStore()
</script>

<template>
  <PageHeader
    titulo="Catequesis"
    descripcion="Grupos de formacion para los sacramentos. Inscripciones, asistencias y catequistas."
  >
    <template #acciones>
      <Button disabled><Plus class="h-4 w-4" /> Nuevo grupo</Button>
    </template>
  </PageHeader>

  <div class="grid gap-4 lg:grid-cols-2">
    <Card v-for="g in catequesis.items" :key="g.id">
      <CardHeader class="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{{ g.nombre }}</CardTitle>
          <p class="text-xs text-muted-foreground">{{ g.catequistaNombre }}</p>
        </div>
        <Badge variant="accent" class="capitalize">{{ g.etapa.replace('_', ' ') }}</Badge>
      </CardHeader>
      <CardContent class="space-y-3">
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted-foreground">{{ g.diaSemana }} · {{ g.hora }}</span>
          <span class="flex items-center gap-1 tabular-nums">
            <Users class="h-3.5 w-3.5" /> {{ g.inscritos.length }} / {{ g.cupos }}
          </span>
        </div>
        <div class="h-2 overflow-hidden rounded-full bg-muted">
          <div
            class="h-full bg-primary"
            :style="{ width: `${Math.min(100, (g.inscritos.length / g.cupos) * 100)}%` }"
          />
        </div>
      </CardContent>
    </Card>
  </div>

  <EmptyState v-if="!catequesis.items.length" titulo="Sin grupos creados" :icono="BookOpen" />
</template>
