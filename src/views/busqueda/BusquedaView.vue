<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Search, Sparkles, Droplets, Heart, Cross, ArrowRight } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Badge from '@/components/ui/Badge.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useBautismosStore } from '@/stores/useBautismosStore'
import { useConfirmacionesStore } from '@/stores/useConfirmacionesStore'
import { useMatrimoniosStore } from '@/stores/useMatrimoniosStore'
import { useDefuncionesStore } from '@/stores/useDefuncionesStore'

const bautismos = useBautismosStore()
const confirmaciones = useConfirmacionesStore()
const matrimonios = useMatrimoniosStore()
const defunciones = useDefuncionesStore()

const termino = ref('')

const resultadosBautismos = computed(() => (termino.value ? bautismos.buscarPorNombre(termino.value).slice(0, 8) : []))
const resultadosConfirmaciones = computed(() => {
  if (!termino.value) return []
  const q = termino.value.toLowerCase()
  return confirmaciones.items.filter((c) => `${c.confirmadoNombres} ${c.confirmadoApellidos}`.toLowerCase().includes(q)).slice(0, 5)
})
const resultadosMatrimonios = computed(() => {
  if (!termino.value) return []
  const q = termino.value.toLowerCase()
  return matrimonios.items
    .filter((m) => `${m.esposo.nombres} ${m.esposo.apellidos} ${m.esposa.nombres} ${m.esposa.apellidos}`.toLowerCase().includes(q))
    .slice(0, 5)
})
const resultadosDefunciones = computed(() => {
  if (!termino.value) return []
  const q = termino.value.toLowerCase()
  return defunciones.items.filter((d) => `${d.difuntoNombres} ${d.difuntoApellidos}`.toLowerCase().includes(q)).slice(0, 5)
})

const totalResultados = computed(
  () =>
    resultadosBautismos.value.length +
    resultadosConfirmaciones.value.length +
    resultadosMatrimonios.value.length +
    resultadosDefunciones.value.length,
)
</script>

<template>
  <PageHeader
    titulo="Busqueda historica"
    descripcion="Localiza personas en bautismos, confirmaciones, matrimonios y defunciones. Soporta busqueda fonetica simple."
  />

  <Card class="flex items-center gap-3 p-4">
    <Search class="h-4 w-4 text-muted-foreground" />
    <Input
      v-model="termino"
      placeholder="Nombre, apellido o numero de partida..."
      class="border-0 shadow-none focus-visible:ring-0"
    />
    <Badge v-if="termino" variant="secondary">{{ totalResultados }} coincidencias</Badge>
  </Card>

  <template v-if="termino">
    <Card v-if="resultadosBautismos.length">
      <div class="border-b p-4">
        <p class="flex items-center gap-2 font-medium"><Droplets class="h-4 w-4 text-primary" /> Bautismos</p>
      </div>
      <ul class="divide-y">
        <li v-for="b in resultadosBautismos" :key="b.id">
          <RouterLink :to="`/app/bautismos/${b.id}`" class="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-muted/40">
            <div>
              <p class="font-medium">{{ b.bautizadoNombres }} {{ b.bautizadoApellidos }}</p>
              <p class="text-xs text-muted-foreground">L{{ b.libro }} F{{ b.folio }} N{{ b.numero }} / {{ b.anio }}</p>
            </div>
            <ArrowRight class="h-3.5 w-3.5 text-muted-foreground" />
          </RouterLink>
        </li>
      </ul>
    </Card>

    <Card v-if="resultadosConfirmaciones.length" class="p-4">
      <p class="mb-2 flex items-center gap-2 font-medium"><Sparkles class="h-4 w-4 text-accent-foreground" /> Confirmaciones</p>
      <ul class="space-y-2 text-sm">
        <li v-for="c in resultadosConfirmaciones" :key="c.id" class="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
          <span>{{ c.confirmadoNombres }} {{ c.confirmadoApellidos }}</span>
          <span class="font-mono text-xs text-muted-foreground">L{{ c.libro }} F{{ c.folio }} N{{ c.numero }}</span>
        </li>
      </ul>
    </Card>

    <Card v-if="resultadosMatrimonios.length" class="p-4">
      <p class="mb-2 flex items-center gap-2 font-medium"><Heart class="h-4 w-4 text-primary" /> Matrimonios</p>
      <ul class="space-y-2 text-sm">
        <li v-for="m in resultadosMatrimonios" :key="m.id" class="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
          <span>{{ m.esposo.nombres }} {{ m.esposo.apellidos }} y {{ m.esposa.nombres }} {{ m.esposa.apellidos }}</span>
          <span class="font-mono text-xs text-muted-foreground">L{{ m.libro }} F{{ m.folio }} N{{ m.numero }}</span>
        </li>
      </ul>
    </Card>

    <Card v-if="resultadosDefunciones.length" class="p-4">
      <p class="mb-2 flex items-center gap-2 font-medium"><Cross class="h-4 w-4 text-muted-foreground" /> Defunciones</p>
      <ul class="space-y-2 text-sm">
        <li v-for="d in resultadosDefunciones" :key="d.id" class="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2">
          <span>{{ d.difuntoNombres }} {{ d.difuntoApellidos }}</span>
          <span class="font-mono text-xs text-muted-foreground">L{{ d.libro }} F{{ d.folio }} N{{ d.numero }}</span>
        </li>
      </ul>
    </Card>

    <EmptyState
      v-if="totalResultados === 0"
      titulo="Sin coincidencias"
      descripcion="Prueba con otras grafias o con el numero de partida."
    />
  </template>

  <EmptyState v-else titulo="Escribe para buscar" descripcion="La busqueda atraviesa todos los libros sacramentales." />
</template>
