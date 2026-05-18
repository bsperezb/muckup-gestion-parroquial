<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { Save, MapPin, Eye } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import FormField from '@/components/FormField.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Input from '@/components/ui/Input.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Switch from '@/components/ui/Switch.vue'
import Label from '@/components/ui/Label.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import { useParroquiasStore } from '@/stores/useParroquiasStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useDiocesisStore } from '@/stores/useDiocesisStore'
import { parroquiaSchema } from '@/schemas/parroquia.schema'

const parroquias = useParroquiasStore()
const diocesis = useDiocesisStore()
const auth = useAuthStore()

const parroquiaId = computed(() => auth.usuario?.parroquiaId ?? 'par_sanjose')
const parroquia = computed(() => parroquias.byId(parroquiaId.value))

const form = reactive({
  nombre: '',
  diocesisId: '',
  direccion: '',
  ciudad: '',
  pais: '',
  lat: 0,
  lng: 0,
  telefono: '',
  email: '',
  sitioWeb: '',
  patrono: '',
  fundadaEn: '',
  horarios: '',
  visiblePublico: false,
})

watch(
  () => parroquia.value,
  (p) => {
    if (!p) return
    Object.assign(form, {
      nombre: p.nombre,
      diocesisId: p.diocesisId,
      direccion: p.direccion,
      ciudad: p.ciudad,
      pais: p.pais,
      lat: p.lat,
      lng: p.lng,
      telefono: p.telefono ?? '',
      email: p.email ?? '',
      sitioWeb: p.sitioWeb ?? '',
      patrono: p.patrono ?? '',
      fundadaEn: p.fundadaEn ?? '',
      horarios: p.horarios ?? '',
      visiblePublico: p.visiblePublico,
    })
  },
  { immediate: true },
)

const errores = ref<Record<string, string>>({})
const mensaje = ref<string | null>(null)

function guardar() {
  errores.value = {}
  mensaje.value = null
  const r = parroquiaSchema.safeParse(form)
  if (!r.success) {
    for (const i of r.error.issues) errores.value[i.path.join('.')] = i.message
    return
  }
  parroquias.update(parroquiaId.value, { ...r.data })
  mensaje.value = 'Cambios guardados correctamente.'
}
</script>

<template>
  <PageHeader
    titulo="Datos de la parroquia"
    descripcion="Configura los datos canonicos y publicos de la parroquia. La geolocalizacion alimenta el directorio publico."
  >
    <template #acciones>
      <Badge v-if="form.visiblePublico" variant="success">Visible al publico</Badge>
      <Badge v-else variant="secondary">Privada</Badge>
    </template>
  </PageHeader>

  <p v-if="mensaje" class="rounded-md border border-success/30 bg-success/10 p-3 text-sm text-success">
    {{ mensaje }}
  </p>

  <form class="space-y-4" @submit.prevent="guardar">
    <Card>
      <CardHeader>
        <CardTitle>Identidad</CardTitle>
      </CardHeader>
      <CardContent class="grid gap-4 sm:grid-cols-2">
        <FormField label="Nombre de la parroquia" required :error="errores.nombre">
          <Input v-model="form.nombre" />
        </FormField>
        <FormField label="Diocesis" required :error="errores.diocesisId">
          <select v-model="form.diocesisId" class="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
            <option value="">Seleccione...</option>
            <option v-for="d in diocesis.items" :key="d.id" :value="d.id">{{ d.nombre }}</option>
          </select>
        </FormField>
        <FormField label="Patrono">
          <Input v-model="form.patrono" />
        </FormField>
        <FormField label="Fundada en">
          <Input v-model="form.fundadaEn" placeholder="Ano o fecha" />
        </FormField>
        <FormField label="Telefono">
          <Input v-model="form.telefono" />
        </FormField>
        <FormField label="Correo">
          <Input v-model="form.email" :error="errores.email" />
          <p v-if="errores.email" class="text-xs text-destructive">{{ errores.email }}</p>
        </FormField>
        <FormField label="Sitio web">
          <Input v-model="form.sitioWeb" placeholder="https://..." />
        </FormField>
        <FormField label="Horarios de misa" class="sm:col-span-2">
          <Textarea v-model="form.horarios" rows="2" />
        </FormField>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <MapPin class="h-4 w-4 text-primary" /> Ubicacion y mapa publico
        </CardTitle>
      </CardHeader>
      <CardContent class="grid gap-4 sm:grid-cols-2">
        <FormField label="Direccion" required :error="errores.direccion" class="sm:col-span-2">
          <Input v-model="form.direccion" />
        </FormField>
        <FormField label="Ciudad" required :error="errores.ciudad">
          <Input v-model="form.ciudad" />
        </FormField>
        <FormField label="Pais" required :error="errores.pais">
          <Input v-model="form.pais" />
        </FormField>
        <FormField label="Latitud" required :error="errores.lat" hint="Decimal entre -90 y 90">
          <Input v-model="form.lat" type="number" step="any" />
        </FormField>
        <FormField label="Longitud" required :error="errores.lng" hint="Decimal entre -180 y 180">
          <Input v-model="form.lng" type="number" step="any" />
        </FormField>
        <div class="flex items-center gap-3 rounded-md border bg-muted/30 p-3 sm:col-span-2">
          <Switch id="visible" v-model="form.visiblePublico" />
          <div>
            <Label for="visible">Mostrar en el directorio publico</Label>
            <p class="text-xs text-muted-foreground">
              Cuando esta activado, la parroquia aparece en /publico con su ubicacion en el mapa.
            </p>
          </div>
          <a
            href="/publico"
            target="_blank"
            rel="noopener"
            class="ml-auto inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Eye class="h-3 w-3" /> Ver mapa
          </a>
        </div>
      </CardContent>
    </Card>

    <div class="flex justify-end gap-2">
      <Button type="submit"><Save class="h-4 w-4" /> Guardar cambios</Button>
    </div>
  </form>
</template>
