<script setup lang="ts">
import { computed } from 'vue'
import { Cross, Plus } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import EmptyState from '@/components/EmptyState.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import Table from '@/components/ui/Table.vue'
import THead from '@/components/ui/THead.vue'
import TBody from '@/components/ui/TBody.vue'
import TR from '@/components/ui/TR.vue'
import TH from '@/components/ui/TH.vue'
import TD from '@/components/ui/TD.vue'
import Badge from '@/components/ui/Badge.vue'
import { useDefuncionesStore } from '@/stores/useDefuncionesStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { formatoFechaCorta } from '@/utils/format'

const defunciones = useDefuncionesStore()
const auth = useAuthStore()
const parroquiaId = computed(() => auth.usuario?.parroquiaId ?? 'par_sanjose')
const list = computed(() => defunciones.porParroquia(parroquiaId.value))
</script>

<template>
  <PageHeader
    titulo="Libro de defunciones"
    descripcion="Asientos de exequias (c. 1182). Se anota tambien al margen del bautismo (c. 535 §2)."
  >
    <template #acciones>
      <Button disabled><Plus class="h-4 w-4" /> Nuevo asiento</Button>
    </template>
  </PageHeader>

  <Card v-if="list.length">
    <Table>
      <THead>
        <TR>
          <TH>Partida</TH>
          <TH>Difunto</TH>
          <TH>Edad</TH>
          <TH>Fecha defuncion</TH>
          <TH>Sacramentos finales</TH>
          <TH>Sepultura</TH>
        </TR>
      </THead>
      <TBody>
        <TR v-for="d in list" :key="d.id">
          <TD class="font-mono text-xs text-muted-foreground">
            L{{ d.libro }} F{{ d.folio }} N{{ d.numero }} / {{ d.anio }}
          </TD>
          <TD class="font-medium">{{ d.difuntoNombres }} {{ d.difuntoApellidos }}</TD>
          <TD class="tabular-nums">{{ d.edadAlFallecer ?? '—' }}</TD>
          <TD class="tabular-nums">{{ formatoFechaCorta(d.fechaDefuncion) }}</TD>
          <TD>
            <div class="flex flex-wrap gap-1">
              <Badge v-for="s in d.sacramentosFinales" :key="s" variant="outline" class="capitalize">
                {{ s.replace('_', ' ') }}
              </Badge>
            </div>
          </TD>
          <TD>
            <p>{{ d.lugarSepultura }}</p>
            <Badge variant="secondary" class="capitalize">{{ d.disposicion }}</Badge>
          </TD>
        </TR>
      </TBody>
    </Table>
  </Card>

  <EmptyState v-else titulo="Sin defunciones" :icono="Cross" />
</template>
