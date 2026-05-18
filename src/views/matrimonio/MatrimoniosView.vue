<script setup lang="ts">
import { computed, ref } from 'vue'
import { Plus, Heart } from 'lucide-vue-next'
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
import { useMatrimoniosStore } from '@/stores/useMatrimoniosStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { formatoFechaCorta } from '@/utils/format'

const matrimonios = useMatrimoniosStore()
const auth = useAuthStore()
const parroquiaId = computed(() => auth.usuario?.parroquiaId ?? 'par_sanjose')

const list = computed(() => matrimonios.porParroquia(parroquiaId.value))
const aviso = ref(true)
</script>

<template>
  <PageHeader
    titulo="Libro de matrimonios"
    descripcion="Asientos del sacramento del matrimonio (cc. 1121-1123). El expediente prenupcial se gestiona aparte."
  >
    <template #acciones>
      <Button :disabled="aviso"><Plus class="h-4 w-4" /> Nuevo matrimonio</Button>
    </template>
  </PageHeader>

  <Card v-if="aviso" class="border-warning/30 bg-warning/5 p-4 text-sm">
    <p class="font-medium text-warning">Formulario completo en construccion</p>
    <p class="mt-1 text-muted-foreground">
      El asiento de matrimonio requiere el expediente matrimonial completo (datos de ambos conyuges,
      referencias bautismales, dispensas y testigos). En el demo se muestran los matrimonios sembrados.
      <button class="ml-2 font-medium text-primary underline" @click="aviso = false">Entendido</button>
    </p>
  </Card>

  <Card v-if="list.length">
    <Table>
      <THead>
        <TR>
          <TH>Partida</TH>
          <TH>Esposo</TH>
          <TH>Esposa</TH>
          <TH>Fecha</TH>
          <TH>Forma</TH>
          <TH>Efectos civiles</TH>
        </TR>
      </THead>
      <TBody>
        <TR v-for="m in list" :key="m.id">
          <TD class="font-mono text-xs text-muted-foreground">
            L{{ m.libro }} F{{ m.folio }} N{{ m.numero }} / {{ m.anio }}
          </TD>
          <TD>
            <p class="font-medium">{{ m.esposo.nombres }} {{ m.esposo.apellidos }}</p>
            <p class="text-xs text-muted-foreground">
              Bautismo: {{ m.esposo.refBautismo.parroquia }} · L{{ m.esposo.refBautismo.libro }} F{{ m.esposo.refBautismo.folio }} N{{ m.esposo.refBautismo.numero }}
            </p>
          </TD>
          <TD>
            <p class="font-medium">{{ m.esposa.nombres }} {{ m.esposa.apellidos }}</p>
            <p class="text-xs text-muted-foreground">
              Bautismo: {{ m.esposa.refBautismo.parroquia }} · L{{ m.esposa.refBautismo.libro }} F{{ m.esposa.refBautismo.folio }} N{{ m.esposa.refBautismo.numero }}
            </p>
          </TD>
          <TD class="tabular-nums">{{ formatoFechaCorta(m.fechaCelebracion) }}</TD>
          <TD><Badge variant="secondary" class="capitalize">{{ m.forma.replace('_', ' ') }}</Badge></TD>
          <TD>
            <Badge :variant="m.efectosCiviles ? 'success' : 'outline'">
              {{ m.efectosCiviles ? 'Si' : 'No' }}
            </Badge>
          </TD>
        </TR>
      </TBody>
    </Table>
  </Card>

  <EmptyState v-else titulo="Sin matrimonios" :icono="Heart" />
</template>
