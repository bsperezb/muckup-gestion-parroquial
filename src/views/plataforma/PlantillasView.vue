<script setup lang="ts">
import { computed } from 'vue'
import { FileText, CheckCircle2, XCircle, AlertCircle } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import { usePlantillasStore } from '@/stores/usePlantillasStore'
import { useParroquiasStore } from '@/stores/useParroquiasStore'

const plantillas = usePlantillasStore()
const parroquias = useParroquiasStore()

const catalogo = computed(() => plantillas.items.filter((p) => p.origen === 'catalogo'))
const solicitudes = computed(() => plantillas.items.filter((p) => p.origen === 'custom'))

function nombreParroquia(id?: string) {
  if (!id) return '—'
  return parroquias.byId(id)?.nombre ?? id
}
</script>

<template>
  <PageHeader
    titulo="Catalogo de plantillas"
    descripcion="Plantillas globales que cada parroquia puede activar y solicitudes de plantillas personalizadas a revisar."
  />

  <Card>
    <CardHeader>
      <CardTitle>Solicitudes de plantillas personalizadas</CardTitle>
      <p class="text-xs text-muted-foreground">
        Las parroquias no editan plantillas directamente; envian solicitudes que un administrador aprueba.
      </p>
    </CardHeader>
    <CardContent class="space-y-3">
      <div
        v-for="s in solicitudes"
        :key="s.id"
        class="flex items-start justify-between gap-3 rounded-md border bg-muted/30 p-3"
      >
        <div>
          <p class="font-medium">{{ s.nombre }}</p>
          <p class="text-xs text-muted-foreground">
            Solicitante: {{ nombreParroquia(s.solicitanteParroquiaId) }} · Tipo: {{ s.tipo }}
          </p>
          <p class="mt-1 text-xs">{{ s.descripcion }}</p>
        </div>
        <div class="flex shrink-0 items-center gap-2">
          <Badge :variant="s.estado === 'aprobada' ? 'success' : s.estado === 'rechazada' ? 'destructive' : 'warning'">
            <component
              :is="s.estado === 'aprobada' ? CheckCircle2 : s.estado === 'rechazada' ? XCircle : AlertCircle"
              class="mr-1 h-3 w-3"
            />
            {{ s.estado.replace('_', ' ') }}
          </Badge>
          <Button v-if="s.estado === 'en_revision'" size="sm" @click="plantillas.setEstado(s.id, 'aprobada')">
            Aprobar
          </Button>
          <Button v-if="s.estado === 'en_revision'" size="sm" variant="outline" @click="plantillas.setEstado(s.id, 'rechazada')">
            Rechazar
          </Button>
        </div>
      </div>
      <p v-if="!solicitudes.length" class="text-sm text-muted-foreground">Sin solicitudes pendientes.</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Catalogo global</CardTitle>
      <p class="text-xs text-muted-foreground">
        Plantillas estandar mantenidas por el equipo de plataforma. Cualquier parroquia puede activarlas.
      </p>
    </CardHeader>
    <CardContent class="grid gap-3 sm:grid-cols-2">
      <div
        v-for="p in catalogo"
        :key="p.id"
        class="rounded-md border bg-muted/20 p-3"
      >
        <div class="flex items-center gap-2">
          <span class="grid h-8 w-8 place-content-center rounded-md bg-primary/10 text-primary">
            <FileText class="h-4 w-4" />
          </span>
          <div>
            <p class="font-medium">{{ p.nombre }}</p>
            <p class="text-xs text-muted-foreground capitalize">{{ p.tipo.replace('_', ' ') }}</p>
          </div>
        </div>
        <p class="mt-2 text-xs">{{ p.descripcion }}</p>
      </div>
    </CardContent>
  </Card>
</template>
