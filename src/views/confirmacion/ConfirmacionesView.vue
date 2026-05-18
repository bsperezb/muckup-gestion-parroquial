<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Plus, Sparkles, Search } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import EmptyState from '@/components/EmptyState.vue'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Dialog from '@/components/ui/Dialog.vue'
import Table from '@/components/ui/Table.vue'
import THead from '@/components/ui/THead.vue'
import TBody from '@/components/ui/TBody.vue'
import TR from '@/components/ui/TR.vue'
import TH from '@/components/ui/TH.vue'
import TD from '@/components/ui/TD.vue'
import Badge from '@/components/ui/Badge.vue'
import Select from '@/components/ui/Select.vue'
import FormField from '@/components/FormField.vue'
import { useConfirmacionesStore } from '@/stores/useConfirmacionesStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useBautismosStore } from '@/stores/useBautismosStore'
import { formatoFechaCorta } from '@/utils/format'
import { siguienteNumero } from '@/utils/canonical'
import type { RefBautismo } from '@/types'

const confirmaciones = useConfirmacionesStore()
const auth = useAuthStore()
const bautismos = useBautismosStore()
const parroquiaId = computed(() => auth.usuario?.parroquiaId ?? 'par_sanjose')

const termino = ref('')
const filtradas = computed(() => {
  const list = confirmaciones.porParroquia(parroquiaId.value)
  if (!termino.value.trim()) return list
  const q = termino.value.toLowerCase()
  return list.filter((c) => `${c.confirmadoNombres} ${c.confirmadoApellidos}`.toLowerCase().includes(q))
})

const openNueva = ref(false)
const form = reactive({
  fechaConfirmacion: new Date().toISOString().slice(0, 10),
  confirmadoNombres: '',
  confirmadoApellidos: '',
  sexo: 'M' as 'M' | 'F',
  nombreConfirmacion: '',
  refParroquia: '',
  refLibro: '',
  refFolio: '',
  refNumero: '',
  refFecha: '',
  padrinoNombre: '',
  ministroNombre: 'Mons. Pablo Emiro Salas Anteliz',
  ministroTipo: 'obispo_diocesano' as 'obispo_diocesano' | 'obispo_auxiliar' | 'presbitero_delegado',
})

function guardar() {
  const ref: RefBautismo = {
    parroquia: form.refParroquia || 'No registrada en este sistema',
    libro: form.refLibro,
    folio: form.refFolio,
    numero: form.refNumero,
    fechaBautismo: form.refFecha ? new Date(form.refFecha).toISOString() : '',
    bautizado: `${form.confirmadoNombres} ${form.confirmadoApellidos}`,
  }
  const sugeridos = confirmaciones.porParroquia(parroquiaId.value).map((c) => c.numero)
  confirmaciones.create({
    parroquiaId: parroquiaId.value,
    libro: '4',
    tomo: '4',
    folio: String(Math.floor(Math.random() * 50) + 20),
    numero: siguienteNumero(sugeridos),
    anio: new Date().getFullYear(),
    fechaConfirmacion: new Date(form.fechaConfirmacion).toISOString(),
    lugarCelebracion: 'Iglesia parroquial',
    confirmadoNombres: form.confirmadoNombres,
    confirmadoApellidos: form.confirmadoApellidos,
    sexo: form.sexo,
    nombreConfirmacion: form.nombreConfirmacion,
    refBautismo: ref,
    padrinoNombre: form.padrinoNombre,
    ministroNombre: form.ministroNombre,
    ministroTipo: form.ministroTipo,
    auditoria: { creadoPor: auth.usuario?.id ?? 'sistema', creadoEn: new Date().toISOString() },
  })
  openNueva.value = false
}

const totalBautismosLocales = computed(() => bautismos.porParroquia(parroquiaId.value).length)
</script>

<template>
  <PageHeader
    titulo="Libro de confirmaciones"
    descripcion="Asientos del sacramento de la confirmacion (c. 895). La referencia bautismal puede ser interna o externa."
  >
    <template #acciones>
      <Button @click="openNueva = true"><Plus class="h-4 w-4" /> Nueva confirmacion</Button>
    </template>
  </PageHeader>

  <Card class="flex items-center gap-3 p-4">
    <Search class="h-4 w-4 text-muted-foreground" />
    <Input v-model="termino" placeholder="Buscar confirmado por nombre..." class="border-0 shadow-none focus-visible:ring-0" />
    <Badge variant="secondary">{{ filtradas.length }} registros</Badge>
    <Badge variant="outline">Bautismos locales disponibles: {{ totalBautismosLocales }}</Badge>
  </Card>

  <Card v-if="filtradas.length">
    <Table>
      <THead>
        <TR>
          <TH>Partida</TH>
          <TH>Confirmado</TH>
          <TH>Nombre de confirmacion</TH>
          <TH>Fecha</TH>
          <TH>Referencia bautismal</TH>
          <TH>Ministro</TH>
        </TR>
      </THead>
      <TBody>
        <TR v-for="c in filtradas" :key="c.id">
          <TD class="font-mono text-xs text-muted-foreground">
            L{{ c.libro }} F{{ c.folio }} N{{ c.numero }} / {{ c.anio }}
          </TD>
          <TD class="font-medium">{{ c.confirmadoNombres }} {{ c.confirmadoApellidos }}</TD>
          <TD>{{ c.nombreConfirmacion ?? '—' }}</TD>
          <TD class="tabular-nums">{{ formatoFechaCorta(c.fechaConfirmacion) }}</TD>
          <TD>
            <p class="text-xs">{{ c.refBautismo.parroquia }}</p>
            <p class="font-mono text-[11px] text-muted-foreground">
              L{{ c.refBautismo.libro }} F{{ c.refBautismo.folio }} N{{ c.refBautismo.numero }}
            </p>
          </TD>
          <TD>
            <p class="text-sm">{{ c.ministroNombre }}</p>
            <Badge variant="outline" class="capitalize">{{ c.ministroTipo.replace('_', ' ') }}</Badge>
          </TD>
        </TR>
      </TBody>
    </Table>
  </Card>

  <EmptyState v-else titulo="Sin confirmaciones" :icono="Sparkles">
    <Button @click="openNueva = true"><Plus class="h-4 w-4" /> Crear primera</Button>
  </EmptyState>

  <Dialog
    :open="openNueva"
    title="Nueva confirmacion"
    description="Anclada al bautismo (local o externo) como referencia canonica blanda."
    @update:open="openNueva = $event"
  >
    <div class="grid gap-3 sm:grid-cols-2">
      <FormField label="Nombres" required class="sm:col-span-2">
        <Input v-model="form.confirmadoNombres" />
      </FormField>
      <FormField label="Apellidos" required class="sm:col-span-2">
        <Input v-model="form.confirmadoApellidos" />
      </FormField>
      <FormField label="Sexo">
        <Select v-model="form.sexo">
          <option value="M">M</option>
          <option value="F">F</option>
        </Select>
      </FormField>
      <FormField label="Nombre de confirmacion">
        <Input v-model="form.nombreConfirmacion" />
      </FormField>
      <FormField label="Fecha" required>
        <Input v-model="form.fechaConfirmacion" type="date" />
      </FormField>
      <FormField label="Padrino">
        <Input v-model="form.padrinoNombre" />
      </FormField>
      <div class="sm:col-span-2">
        <p class="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Referencia bautismal (c. 895 / c. 535 §2)
        </p>
        <p class="mb-2 text-xs text-muted-foreground">
          Datos del bautismo asentado en cualquier parroquia. Si el bautismo esta en este sistema,
          la nota marginal se genera automaticamente despues.
        </p>
      </div>
      <FormField label="Parroquia de bautismo" class="sm:col-span-2">
        <Input v-model="form.refParroquia" />
      </FormField>
      <FormField label="Libro"><Input v-model="form.refLibro" /></FormField>
      <FormField label="Folio"><Input v-model="form.refFolio" /></FormField>
      <FormField label="N.º"><Input v-model="form.refNumero" /></FormField>
      <FormField label="Fecha de bautismo"><Input v-model="form.refFecha" type="date" /></FormField>
      <FormField label="Ministro" class="sm:col-span-2">
        <Input v-model="form.ministroNombre" />
      </FormField>
      <FormField label="Tipo de ministro">
        <Select v-model="form.ministroTipo">
          <option value="obispo_diocesano">Obispo diocesano</option>
          <option value="obispo_auxiliar">Obispo auxiliar</option>
          <option value="presbitero_delegado">Presbitero delegado</option>
        </Select>
      </FormField>
    </div>
    <div class="mt-4 flex justify-end gap-2">
      <Button variant="outline" @click="openNueva = false">Cancelar</Button>
      <Button @click="guardar">Guardar</Button>
    </div>
  </Dialog>
</template>
