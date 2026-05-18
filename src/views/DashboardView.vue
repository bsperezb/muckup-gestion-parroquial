<script setup lang="ts">
import { computed } from 'vue'
import {
  Droplets,
  Sparkles,
  Heart,
  Cross,
  CalendarHeart,
  BookOpen,
  ArrowUpRight,
} from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import PageHeader from '@/components/PageHeader.vue'
import StatCard from '@/components/StatCard.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Badge from '@/components/ui/Badge.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useBautismosStore } from '@/stores/useBautismosStore'
import { useConfirmacionesStore } from '@/stores/useConfirmacionesStore'
import { useMatrimoniosStore } from '@/stores/useMatrimoniosStore'
import { useDefuncionesStore } from '@/stores/useDefuncionesStore'
import { useIntencionesStore, useCatequesisStore } from '@/stores/useOperacionStore'
import { formatoFecha } from '@/utils/format'

const auth = useAuthStore()
const bautismos = useBautismosStore()
const confirmaciones = useConfirmacionesStore()
const matrimonios = useMatrimoniosStore()
const defunciones = useDefuncionesStore()
const intenciones = useIntencionesStore()
const catequesis = useCatequesisStore()

const parroquiaId = computed(() => auth.usuario?.parroquiaId ?? 'par_sanjose')

const totalBautismos = computed(() => bautismos.porParroquia(parroquiaId.value).length)
const totalConfirmaciones = computed(() => confirmaciones.porParroquia(parroquiaId.value).length)
const totalMatrimonios = computed(() => matrimonios.porParroquia(parroquiaId.value).length)
const totalDefunciones = computed(() => defunciones.porParroquia(parroquiaId.value).length)

const ultimosBautismos = computed(() =>
  [...bautismos.porParroquia(parroquiaId.value)]
    .sort((a, b) => new Date(b.fechaBautismo).getTime() - new Date(a.fechaBautismo).getTime())
    .slice(0, 5),
)

const proximasIntenciones = computed(() =>
  intenciones.items
    .filter((i) => i.estado !== 'celebrada')
    .sort((a, b) => new Date(a.fechaProgramada).getTime() - new Date(b.fechaProgramada).getTime())
    .slice(0, 5),
)

const totalCatequesis = computed(() =>
  catequesis.items.reduce((acc, g) => acc + g.inscritos.length, 0),
)
</script>

<template>
  <PageHeader
    titulo="Dashboard"
    descripcion="Resumen de la actividad sacramental y pastoral de la parroquia."
  />

  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <StatCard titulo="Bautismos" :valor="totalBautismos" detalle="Registrados en el sistema" :icono="Droplets" />
    <StatCard titulo="Confirmaciones" :valor="totalConfirmaciones" detalle="Libro 4" :icono="Sparkles" tono="accent" />
    <StatCard titulo="Matrimonios" :valor="totalMatrimonios" detalle="Libro 7" :icono="Heart" tono="success" />
    <StatCard titulo="Defunciones" :valor="totalDefunciones" detalle="Libro 9" :icono="Cross" />
  </div>

  <div class="grid gap-4 lg:grid-cols-3">
    <Card class="lg:col-span-2">
      <CardHeader class="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Ultimos bautismos</CardTitle>
          <p class="text-xs text-muted-foreground">Por fecha de celebracion descendente.</p>
        </div>
        <RouterLink to="/app/bautismos" class="text-xs font-medium text-primary hover:underline">
          Ver todos
        </RouterLink>
      </CardHeader>
      <CardContent>
        <ul class="divide-y">
          <li v-for="b in ultimosBautismos" :key="b.id" class="flex items-center justify-between gap-3 py-3">
            <div>
              <p class="font-medium">{{ b.bautizadoNombres }} {{ b.bautizadoApellidos }}</p>
              <p class="text-xs text-muted-foreground">
                Libro {{ b.libro }} · Folio {{ b.folio }} · N.º {{ b.numero }}
              </p>
            </div>
            <div class="text-right text-xs">
              <p>{{ formatoFecha(b.fechaBautismo) }}</p>
              <p class="text-muted-foreground">{{ b.ministroNombre }}</p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Proximas misas con intencion</CardTitle>
      </CardHeader>
      <CardContent>
        <ul class="space-y-3">
          <li v-for="i in proximasIntenciones" :key="i.id" class="rounded-md border bg-muted/30 p-3">
            <div class="flex items-start justify-between gap-2">
              <p class="text-sm font-medium">{{ i.descripcion }}</p>
              <Badge :variant="i.estado === 'pendiente' ? 'warning' : 'secondary'" class="capitalize">
                {{ i.estado }}
              </Badge>
            </div>
            <p class="mt-1 text-xs text-muted-foreground">
              <CalendarHeart class="mr-1 inline h-3 w-3" />
              {{ formatoFecha(i.fechaProgramada) }} · {{ i.sacerdoteAsignado ?? 'Sin asignar' }}
            </p>
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>

  <Card>
    <CardHeader class="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Formacion en catequesis</CardTitle>
        <p class="text-xs text-muted-foreground">{{ totalCatequesis }} catequizandos inscritos en el ciclo actual.</p>
      </div>
      <RouterLink to="/app/catequesis" class="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
        Gestionar grupos <ArrowUpRight class="h-3 w-3" />
      </RouterLink>
    </CardHeader>
    <CardContent class="grid gap-3 sm:grid-cols-3">
      <div v-for="g in catequesis.items" :key="g.id" class="rounded-md border bg-muted/30 p-3">
        <div class="flex items-center gap-2">
          <BookOpen class="h-3.5 w-3.5 text-primary" />
          <p class="text-sm font-medium">{{ g.nombre }}</p>
        </div>
        <p class="mt-1 text-xs text-muted-foreground">{{ g.catequistaNombre }} · {{ g.diaSemana }} {{ g.hora }}</p>
        <div class="mt-2 flex items-center justify-between text-xs">
          <span>{{ g.inscritos.length }} / {{ g.cupos }} cupos</span>
          <Badge variant="secondary">{{ g.etapa.replace('_', ' ') }}</Badge>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
