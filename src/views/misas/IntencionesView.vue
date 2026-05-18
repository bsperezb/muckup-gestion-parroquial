<script setup lang="ts">
import { CalendarHeart, Plus } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import Table from '@/components/ui/Table.vue'
import THead from '@/components/ui/THead.vue'
import TBody from '@/components/ui/TBody.vue'
import TR from '@/components/ui/TR.vue'
import TH from '@/components/ui/TH.vue'
import TD from '@/components/ui/TD.vue'
import Badge from '@/components/ui/Badge.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useIntencionesStore } from '@/stores/useOperacionStore'
import { formatoFechaCorta, formatoMoneda } from '@/utils/format'

const intenciones = useIntencionesStore()

function variantEstado(e: string) {
  switch (e) {
    case 'celebrada':
      return 'success'
    case 'asignada':
      return 'secondary'
    default:
      return 'warning'
  }
}
</script>

<template>
  <PageHeader
    titulo="Intenciones de misa"
    descripcion="Libro de intenciones (c. 958). El Ordinario revisa el libro al menos una vez al ano."
  >
    <template #acciones>
      <Button disabled><Plus class="h-4 w-4" /> Nueva intencion</Button>
    </template>
  </PageHeader>

  <Card v-if="intenciones.items.length">
    <Table>
      <THead>
        <TR>
          <TH>N.º</TH>
          <TH>Solicitante</TH>
          <TH>Intencion</TH>
          <TH>Programada</TH>
          <TH>Sacerdote</TH>
          <TH>Estipendio</TH>
          <TH>Estado</TH>
        </TR>
      </THead>
      <TBody>
        <TR v-for="i in intenciones.items" :key="i.id">
          <TD class="font-mono text-xs">{{ String(i.numero).padStart(3, '0') }}</TD>
          <TD>
            <p class="font-medium">{{ i.solicitanteNombre }}</p>
            <p class="text-xs text-muted-foreground">{{ i.solicitanteContacto ?? '—' }}</p>
          </TD>
          <TD>
            <p class="text-sm">{{ i.descripcion }}</p>
            <Badge variant="outline" class="capitalize">{{ i.tipo.replace('_', ' ') }}</Badge>
          </TD>
          <TD class="tabular-nums">{{ formatoFechaCorta(i.fechaProgramada) }}</TD>
          <TD>{{ i.sacerdoteAsignado ?? '—' }}</TD>
          <TD class="tabular-nums">{{ formatoMoneda(i.estipendio, i.moneda) }}</TD>
          <TD><Badge :variant="variantEstado(i.estado) as any" class="capitalize">{{ i.estado }}</Badge></TD>
        </TR>
      </TBody>
    </Table>
  </Card>

  <EmptyState v-else titulo="Sin intenciones" :icono="CalendarHeart" />
</template>
