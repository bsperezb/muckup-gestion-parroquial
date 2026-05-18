<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { ArrowLeft, MapPin, Phone, Mail, Globe, Clock, Cross, Building } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Badge from '@/components/ui/Badge.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useParroquiasStore } from '@/stores/useParroquiasStore'
import { useDiocesisStore } from '@/stores/useDiocesisStore'

const route = useRoute()
const parroquias = useParroquiasStore()
const diocesis = useDiocesisStore()

const parroquia = computed(() => parroquias.bySlug(route.params.slug as string))
const diocesisNombre = computed(() =>
  parroquia.value ? diocesis.byId(parroquia.value.diocesisId)?.nombre : '',
)
</script>

<template>
  <div class="container py-8">
    <RouterLink to="/publico" class="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft class="h-4 w-4" /> Volver al directorio
    </RouterLink>

    <template v-if="parroquia">
      <header class="space-y-3 border-b pb-6">
        <Badge variant="secondary">{{ diocesisNombre }}</Badge>
        <h1 class="font-serif text-4xl font-semibold tracking-tight">{{ parroquia.nombre }}</h1>
        <p v-if="parroquia.patrono" class="text-muted-foreground">
          Patrono: {{ parroquia.patrono }}
        </p>
      </header>

      <div class="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div class="space-y-4">
          <Card class="overflow-hidden p-0">
            <div class="aspect-[16/9] w-full">
              <LMap
                :zoom="15"
                :center="[parroquia.lat, parroquia.lng]"
                :use-global-leaflet="false"
                class="z-0 h-full w-full"
              >
                <LTileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="© OpenStreetMap"
                />
                <LMarker :lat-lng="[parroquia.lat, parroquia.lng]" />
              </LMap>
            </div>
          </Card>

          <Card>
            <CardHeader><CardTitle>Contacto</CardTitle></CardHeader>
            <CardContent class="grid gap-3 text-sm sm:grid-cols-2">
              <p class="flex items-start gap-2"><MapPin class="mt-0.5 h-4 w-4 text-primary" /> {{ parroquia.direccion }}, {{ parroquia.ciudad }} ({{ parroquia.pais }})</p>
              <p v-if="parroquia.telefono" class="flex items-center gap-2"><Phone class="h-4 w-4 text-primary" /> {{ parroquia.telefono }}</p>
              <p v-if="parroquia.email" class="flex items-center gap-2"><Mail class="h-4 w-4 text-primary" /> {{ parroquia.email }}</p>
              <p v-if="parroquia.sitioWeb" class="flex items-center gap-2"><Globe class="h-4 w-4 text-primary" /> {{ parroquia.sitioWeb }}</p>
              <p v-if="parroquia.horarios" class="flex items-start gap-2 sm:col-span-2"><Clock class="mt-0.5 h-4 w-4 text-primary" /> {{ parroquia.horarios }}</p>
            </CardContent>
          </Card>
        </div>

        <aside class="space-y-4">
          <Card>
            <CardHeader><CardTitle>Datos</CardTitle></CardHeader>
            <CardContent class="space-y-2 text-sm">
              <div class="flex items-center justify-between border-b pb-2">
                <span class="text-muted-foreground">Fundada</span>
                <span class="font-medium">{{ parroquia.fundadaEn ?? '—' }}</span>
              </div>
              <div class="flex items-center justify-between border-b pb-2">
                <span class="text-muted-foreground">Libros activos</span>
                <span class="font-medium tabular-nums">{{ parroquia.librosActivos.length }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-muted-foreground">Coordenadas</span>
                <span class="font-mono text-xs">{{ parroquia.lat.toFixed(4) }}, {{ parroquia.lng.toFixed(4) }}</span>
              </div>
            </CardContent>
          </Card>

          <Card class="border-primary/30 bg-primary/5">
            <CardContent class="space-y-2 p-4 text-sm">
              <Cross class="h-5 w-5 text-primary" />
              <p class="font-medium">Solicitar partida</p>
              <p class="text-xs text-muted-foreground">
                Comunicate con la secretaria para solicitar fe de bautismo, confirmacion o matrimonio.
                En produccion habilitaremos solicitud en linea con codigo QR de verificacion.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </template>

    <EmptyState
      v-else
      titulo="Parroquia no encontrada"
      descripcion="Es posible que el enlace este desactualizado."
      :icono="Building"
    />
  </div>
</template>
