<script setup lang="ts">
import { Building, Plus, Globe, MapPin } from 'lucide-vue-next'
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
import { useParroquiasStore } from '@/stores/useParroquiasStore'
import { useDiocesisStore } from '@/stores/useDiocesisStore'
import { useBautismosStore } from '@/stores/useBautismosStore'

const parroquias = useParroquiasStore()
const diocesis = useDiocesisStore()
const bautismos = useBautismosStore()

function diocesisNombre(id: string) {
  return diocesis.byId(id)?.nombre ?? '—'
}
</script>

<template>
  <PageHeader
    titulo="Parroquias inscritas"
    descripcion="Gestion multi-tenant. Cada parroquia es un tenant aislado con su propio libro y plantillas activas."
  >
    <template #acciones>
      <Button disabled><Plus class="h-4 w-4" /> Inscribir parroquia</Button>
    </template>
  </PageHeader>

  <Card>
    <Table>
      <THead>
        <TR>
          <TH>Parroquia</TH>
          <TH>Diocesis</TH>
          <TH>Ubicacion</TH>
          <TH>Bautismos</TH>
          <TH>Directorio publico</TH>
        </TR>
      </THead>
      <TBody>
        <TR v-for="p in parroquias.items" :key="p.id">
          <TD>
            <div class="flex items-center gap-3">
              <span class="grid h-9 w-9 place-content-center rounded-md bg-primary/10 text-primary">
                <Building class="h-4 w-4" />
              </span>
              <div>
                <p class="font-medium">{{ p.nombre }}</p>
                <p class="text-xs text-muted-foreground">{{ p.patrono ?? '—' }}</p>
              </div>
            </div>
          </TD>
          <TD>{{ diocesisNombre(p.diocesisId) }}</TD>
          <TD>
            <p class="text-sm">{{ p.ciudad }}</p>
            <p class="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
              <MapPin class="h-3 w-3" /> {{ p.lat.toFixed(4) }}, {{ p.lng.toFixed(4) }}
            </p>
          </TD>
          <TD class="tabular-nums">{{ bautismos.porParroquia(p.id).length }}</TD>
          <TD>
            <Badge v-if="p.visiblePublico" variant="success">
              <Globe class="mr-1 h-3 w-3" /> Visible
            </Badge>
            <Badge v-else variant="secondary">Privada</Badge>
          </TD>
        </TR>
      </TBody>
    </Table>
  </Card>
</template>
