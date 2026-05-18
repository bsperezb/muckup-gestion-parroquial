<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, FileDown, FilePlus, ExternalLink, ScrollText, Eye } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import EmptyState from '@/components/EmptyState.vue'
import FormField from '@/components/FormField.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import Dialog from '@/components/ui/Dialog.vue'
import Input from '@/components/ui/Input.vue'
import Select from '@/components/ui/Select.vue'
import Textarea from '@/components/ui/Textarea.vue'
import { useBautismosStore } from '@/stores/useBautismosStore'
import { useParroquiasStore } from '@/stores/useParroquiasStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { formatoFecha } from '@/utils/format'
import { partidaLegible } from '@/utils/canonical'
import { abrirFeBautismo, descargarFeBautismo } from '@/utils/pdf'
import type { TipoNotaMarginal } from '@/types'

const route = useRoute()
const router = useRouter()
const bautismos = useBautismosStore()
const parroquias = useParroquiasStore()
const auth = useAuthStore()

const id = computed(() => route.params.id as string)
const bautismo = computed(() => bautismos.byId(id.value))
const parroquia = computed(() =>
  bautismo.value ? parroquias.byId(bautismo.value.parroquiaId) : undefined,
)

const openNota = ref(false)
const nota = reactive({
  tipo: 'confirmacion' as TipoNotaMarginal,
  fechaHecho: new Date().toISOString().slice(0, 10),
  lugarHecho: '',
  referenciaPartida: '',
  autoridad: '',
  observaciones: '',
})

function emitirDescarga() {
  if (bautismo.value && parroquia.value) descargarFeBautismo(bautismo.value, parroquia.value)
}
function emitirVisualizar() {
  if (bautismo.value && parroquia.value) abrirFeBautismo(bautismo.value, parroquia.value)
}

function agregarNota() {
  if (!bautismo.value) return
  bautismos.agregarNotaMarginal(bautismo.value.id, {
    tipo: nota.tipo,
    fechaHecho: new Date(nota.fechaHecho).toISOString(),
    lugarHecho: nota.lugarHecho || '—',
    referenciaPartida: nota.referenciaPartida,
    autoridad: nota.autoridad,
    fechaAnotacion: new Date().toISOString(),
    firmadoPor: auth.usuario ? `${auth.usuario.nombres} ${auth.usuario.apellidos}` : 'Sistema',
    observaciones: nota.observaciones || undefined,
  })
  openNota.value = false
  nota.lugarHecho = ''
  nota.referenciaPartida = ''
  nota.autoridad = ''
  nota.observaciones = ''
}

const tiposNota: { value: TipoNotaMarginal; label: string }[] = [
  { value: 'confirmacion', label: 'Confirmacion' },
  { value: 'matrimonio', label: 'Matrimonio' },
  { value: 'nulidad_matrimonial', label: 'Nulidad matrimonial' },
  { value: 'orden_sagrado', label: 'Orden sagrado' },
  { value: 'profesion_religiosa', label: 'Profesion religiosa' },
  { value: 'adopcion', label: 'Adopcion' },
  { value: 'defuncion', label: 'Defuncion' },
  { value: 'rectificacion', label: 'Rectificacion' },
]
</script>

<template>
  <template v-if="bautismo">
    <PageHeader
      :titulo="`${bautismo.bautizadoNombres} ${bautismo.bautizadoApellidos}`"
      :descripcion="partidaLegible(bautismo)"
    >
      <template #acciones>
        <Button variant="outline" @click="router.back()">
          <ArrowLeft class="h-4 w-4" /> Volver
        </Button>
        <Button variant="outline" @click="emitirVisualizar">
          <Eye class="h-4 w-4" /> Vista previa
        </Button>
        <Button @click="emitirDescarga">
          <FileDown class="h-4 w-4" /> Descargar fe de bautismo
        </Button>
      </template>
    </PageHeader>

    <div class="grid gap-4 lg:grid-cols-3">
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle>Asiento canonico</CardTitle>
          <p class="text-xs text-muted-foreground">Codigo de Derecho Canonico c. 877</p>
        </CardHeader>
        <CardContent class="grid gap-y-3 gap-x-6 text-sm sm:grid-cols-2">
          <div>
            <p class="text-xs text-muted-foreground">Fecha de bautismo</p>
            <p class="font-medium">{{ formatoFecha(bautismo.fechaBautismo) }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Lugar</p>
            <p class="font-medium">{{ bautismo.lugarCelebracion }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Ministro</p>
            <p class="font-medium">{{ bautismo.ministroNombre }}</p>
            <p class="text-xs capitalize text-muted-foreground">{{ bautismo.ministroCalidad }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Sexo</p>
            <p class="font-medium">{{ bautismo.sexo === 'M' ? 'Masculino' : 'Femenino' }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Fecha de nacimiento</p>
            <p class="font-medium">{{ formatoFecha(bautismo.fechaNacimiento) }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Lugar de nacimiento</p>
            <p class="font-medium">{{ bautismo.lugarNacimiento }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Padre</p>
            <p class="font-medium">
              {{ bautismo.padreNombres ? `${bautismo.padreNombres} ${bautismo.padreApellidos ?? ''}` : 'No consta' }}
            </p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Madre</p>
            <p class="font-medium">{{ bautismo.madreNombres }} {{ bautismo.madreApellidos }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Padrino</p>
            <p class="font-medium">
              {{ bautismo.padrinoNombres ? `${bautismo.padrinoNombres} ${bautismo.padrinoApellidos ?? ''}` : '—' }}
            </p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Madrina</p>
            <p class="font-medium">
              {{ bautismo.madrinaNombres ? `${bautismo.madrinaNombres} ${bautismo.madrinaApellidos ?? ''}` : '—' }}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Notas marginales</CardTitle>
            <p class="text-xs text-muted-foreground">c. 535 §2</p>
          </div>
          <Button size="sm" variant="outline" @click="openNota = true">
            <FilePlus class="h-3.5 w-3.5" /> Agregar
          </Button>
        </CardHeader>
        <CardContent>
          <ul v-if="bautismo.notasMarginales.length" class="space-y-3">
            <li v-for="n in bautismo.notasMarginales" :key="n.id" class="rounded-md border bg-muted/30 p-3">
              <div class="flex items-center justify-between">
                <Badge variant="accent" class="capitalize">{{ n.tipo.replace('_', ' ') }}</Badge>
                <span class="text-xs text-muted-foreground">{{ formatoFecha(n.fechaHecho) }}</span>
              </div>
              <p class="mt-1.5 text-sm">{{ n.lugarHecho }}</p>
              <p class="text-xs text-muted-foreground">Ref: {{ n.referenciaPartida || '—' }}</p>
              <p class="mt-1 text-[11px] text-muted-foreground">Firma: {{ n.firmadoPor }}</p>
            </li>
          </ul>
          <EmptyState
            v-else
            titulo="Sin anotaciones"
            descripcion="Cuando este fiel reciba confirmacion, matrimonio u otro acto canonico, registra la nota aqui."
            :icono="ScrollText"
          />
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          Documento solidario
          <Badge variant="secondary">DEMO</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent class="text-sm text-muted-foreground">
        El PDF se genera al vuelo con los datos vigentes. Si agregas una nueva nota marginal y vuelves
        a emitir, la nota aparece automaticamente en la fe de bautismo
        (cumple c. 535 §2 in fine: las anotaciones siempre se reflejan en la fe de bautismo).
      </CardContent>
    </Card>

    <Dialog
      :open="openNota"
      title="Nueva nota marginal"
      description="Anotacion canonica al margen del bautismo."
      @update:open="openNota = $event"
    >
      <div class="grid gap-3 sm:grid-cols-2">
        <FormField label="Tipo de nota" required>
          <Select v-model="nota.tipo">
            <option v-for="t in tiposNota" :key="t.value" :value="t.value">{{ t.label }}</option>
          </Select>
        </FormField>
        <FormField label="Fecha del hecho" required>
          <Input v-model="nota.fechaHecho" type="date" />
        </FormField>
        <FormField label="Lugar del hecho" required class="sm:col-span-2">
          <Input v-model="nota.lugarHecho" placeholder="Parroquia, ciudad" />
        </FormField>
        <FormField label="Referencia de la partida" class="sm:col-span-2">
          <Input v-model="nota.referenciaPartida" placeholder="Libro X · Folio Y · N.º Z / Ano" />
        </FormField>
        <FormField label="Autoridad que certifica" class="sm:col-span-2">
          <Input v-model="nota.autoridad" />
        </FormField>
        <FormField label="Observaciones" class="sm:col-span-2">
          <Textarea v-model="nota.observaciones" rows="2" />
        </FormField>
      </div>
      <div class="mt-4 flex justify-end gap-2">
        <Button variant="outline" @click="openNota = false">Cancelar</Button>
        <Button @click="agregarNota">
          <ExternalLink class="h-4 w-4" /> Anotar
        </Button>
      </div>
    </Dialog>
  </template>

  <EmptyState
    v-else
    titulo="Bautismo no encontrado"
    descripcion="Es posible que el registro haya sido eliminado."
  >
    <Button @click="router.push('/app/bautismos')">Volver al listado</Button>
  </EmptyState>
</template>
