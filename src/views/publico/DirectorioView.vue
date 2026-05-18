<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import { Globe, MapPin, Phone, Mail, Clock, ChevronRight, Building2 } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Input from '@/components/ui/Input.vue'
import { useParroquiasStore } from '@/stores/useParroquiasStore'
import { useDiocesisStore } from '@/stores/useDiocesisStore'

const parroquias = useParroquiasStore()
const diocesis = useDiocesisStore()

const termino = ref('')
const seleccionada = ref<string | null>(null)

const lista = computed(() => {
  const base = parroquias.visiblesPublico
  if (!termino.value.trim()) return base
  const q = termino.value.toLowerCase()
  return base.filter((p) => `${p.nombre} ${p.ciudad} ${p.patrono ?? ''}`.toLowerCase().includes(q))
})

const centro = computed<[number, number]>(() => {
  if (!lista.value.length) return [10.96, -74.79]
  const lat = lista.value.reduce((a, p) => a + p.lat, 0) / lista.value.length
  const lng = lista.value.reduce((a, p) => a + p.lng, 0) / lista.value.length
  return [lat, lng]
})

function nombreDiocesis(id: string) {
  return diocesis.byId(id)?.nombre ?? '—'
}
</script>

<template>
  <div class="border-b bg-gradient-to-b from-primary/5 to-transparent">
    <div class="container py-10">
      <div class="grid items-center gap-6 lg:grid-cols-2">
        <div class="space-y-4">
          <span class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Globe class="h-3 w-3" /> Directorio Parroquial
          </span>
          <h1 class="font-serif text-4xl font-semibold tracking-tight">
            Parroquias inscritas en la plataforma
          </h1>
          <p class="max-w-xl text-muted-foreground">
            Encuentra las parroquias catolicas adheridas al sistema de administracion. Solicita partidas,
            consulta horarios de misas y ubicacion exacta.
          </p>
          <div class="max-w-md">
            <Input v-model="termino" placeholder="Buscar por nombre, ciudad o patrono..." />
          </div>
          <div class="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary">{{ lista.length }} parroquias visibles</Badge>
            <span>· {{ diocesis.items.length }} diocesis</span>
          </div>
        </div>
        <Card class="overflow-hidden p-0 shadow-md">
          <div class="aspect-[16/11] w-full">
            <LMap
              v-if="lista.length"
              :zoom="6"
              :center="centro"
              :use-global-leaflet="false"
              class="z-0 h-full w-full"
            >
              <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap"
              />
              <LMarker
                v-for="p in lista"
                :key="p.id"
                :lat-lng="[p.lat, p.lng]"
                @click="seleccionada = p.id"
              >
                <LPopup>
                  <div class="space-y-1 text-xs">
                    <p class="font-semibold">{{ p.nombre }}</p>
                    <p>{{ p.ciudad }}, {{ p.pais }}</p>
                    <RouterLink
                      :to="`/publico/parroquias/${p.slug}`"
                      class="inline-flex items-center gap-1 text-primary"
                    >
                      Ver detalle <ChevronRight class="h-3 w-3" />
                    </RouterLink>
                  </div>
                </LPopup>
              </LMarker>
            </LMap>
          </div>
        </Card>
      </div>
    </div>
  </div>

  <section class="container py-10">
    <h2 class="font-serif text-2xl font-semibold tracking-tight">Listado</h2>
    <div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <RouterLink
        v-for="p in lista"
        :key="p.id"
        :to="`/publico/parroquias/${p.slug}`"
        :class="[
          'group block rounded-lg border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md',
          seleccionada === p.id ? 'border-primary/60 ring-2 ring-primary/30' : '',
        ]"
      >
        <div class="flex items-start gap-3">
          <span class="grid h-10 w-10 shrink-0 place-content-center rounded-md bg-primary/10 text-primary">
            <Building2 class="h-5 w-5" />
          </span>
          <div class="min-w-0">
            <p class="font-serif text-lg font-semibold leading-tight">{{ p.nombre }}</p>
            <p class="text-xs text-muted-foreground">{{ nombreDiocesis(p.diocesisId) }}</p>
          </div>
        </div>
        <div class="mt-3 space-y-1.5 text-xs text-muted-foreground">
          <p class="flex items-center gap-1.5"><MapPin class="h-3 w-3" /> {{ p.direccion }}, {{ p.ciudad }}</p>
          <p v-if="p.telefono" class="flex items-center gap-1.5"><Phone class="h-3 w-3" /> {{ p.telefono }}</p>
          <p v-if="p.email" class="flex items-center gap-1.5"><Mail class="h-3 w-3" /> {{ p.email }}</p>
          <p v-if="p.horarios" class="flex items-start gap-1.5"><Clock class="mt-0.5 h-3 w-3" /> {{ p.horarios }}</p>
        </div>
        <div class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:underline">
          Ver detalle <ChevronRight class="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      </RouterLink>
    </div>
  </section>
</template>
