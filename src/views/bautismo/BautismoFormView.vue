<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Save, ArrowLeft } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import FormField from '@/components/FormField.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Input from '@/components/ui/Input.vue'
import Select from '@/components/ui/Select.vue'
import Textarea from '@/components/ui/Textarea.vue'
import Button from '@/components/ui/Button.vue'
import Switch from '@/components/ui/Switch.vue'
import Label from '@/components/ui/Label.vue'
import { bautismoSchema } from '@/schemas/bautismo.schema'
import { useBautismosStore } from '@/stores/useBautismosStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { siguienteNumero } from '@/utils/canonical'
import type { Bautismo } from '@/types'

const router = useRouter()
const bautismos = useBautismosStore()
const auth = useAuthStore()

const parroquiaId = auth.usuario?.parroquiaId ?? 'par_sanjose'

const sugeridos = bautismos.porParroquia(parroquiaId).map((b) => b.numero)
const numeroSugerido = siguienteNumero(sugeridos)

const form = reactive({
  libro: '17',
  tomo: '17',
  folio: '60',
  numero: numeroSugerido,
  anio: new Date().getFullYear(),
  fechaBautismo: new Date().toISOString().slice(0, 10),
  lugarCelebracion: 'Iglesia parroquial',
  ministroNombre: 'Pbro. Carlos Andres Mendoza Restrepo',
  ministroCalidad: 'parroco' as 'parroco' | 'vicario' | 'diacono' | 'delegado',
  bautizadoNombres: '',
  bautizadoApellidos: '',
  sexo: 'M' as 'M' | 'F',
  fechaNacimiento: '',
  lugarNacimiento: 'Barranquilla, Atlantico',
  paisNacimiento: 'Colombia',
  esAdoptado: false,
  padreNombres: '',
  padreApellidos: '',
  padreDocumento: '',
  madreNombres: '',
  madreApellidos: '',
  madreApellidosSoltera: '',
  madreDocumento: '',
  padrinoNombres: '',
  padrinoApellidos: '',
  madrinaNombres: '',
  madrinaApellidos: '',
  observaciones: '',
})

const errores = ref<Record<string, string>>({})

function guardar() {
  errores.value = {}
  const r = bautismoSchema.safeParse(form)
  if (!r.success) {
    for (const issue of r.error.issues) {
      errores.value[issue.path.join('.')] = issue.message
    }
    return
  }
  const nuevo = bautismos.create({
    parroquiaId,
    ...r.data,
    fechaBautismo: new Date(r.data.fechaBautismo).toISOString(),
    fechaNacimiento: new Date(r.data.fechaNacimiento).toISOString(),
    auditoria: { creadoPor: auth.usuario?.id ?? 'sistema', creadoEn: new Date().toISOString() },
  } as unknown as Omit<Bautismo, 'id' | 'notasMarginales'>)
  router.push(`/app/bautismos/${nuevo.id}`)
}
</script>

<template>
  <PageHeader titulo="Nuevo bautismo" descripcion="Asiento del libro de bautismos (c. 877).">
    <template #acciones>
      <Button variant="outline" @click="router.back()">
        <ArrowLeft class="h-4 w-4" /> Cancelar
      </Button>
      <Button @click="guardar">
        <Save class="h-4 w-4" /> Guardar partida
      </Button>
    </template>
  </PageHeader>

  <form class="space-y-4" @submit.prevent="guardar">
    <Card>
      <CardHeader>
        <CardTitle>Identificacion de la partida</CardTitle>
      </CardHeader>
      <CardContent class="grid gap-4 sm:grid-cols-5">
        <FormField label="Libro" required :error="errores.libro">
          <Input v-model="form.libro" />
        </FormField>
        <FormField label="Tomo" required :error="errores.tomo">
          <Input v-model="form.tomo" />
        </FormField>
        <FormField label="Folio" required :error="errores.folio">
          <Input v-model="form.folio" />
        </FormField>
        <FormField label="N.º" required :error="errores.numero">
          <Input v-model="form.numero" />
        </FormField>
        <FormField label="Ano" required :error="errores.anio">
          <Input v-model="form.anio" type="number" />
        </FormField>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Celebracion</CardTitle>
      </CardHeader>
      <CardContent class="grid gap-4 sm:grid-cols-2">
        <FormField label="Fecha del bautismo" required :error="errores.fechaBautismo">
          <Input v-model="form.fechaBautismo" type="date" />
        </FormField>
        <FormField label="Lugar de celebracion" required :error="errores.lugarCelebracion">
          <Input v-model="form.lugarCelebracion" />
        </FormField>
        <FormField label="Ministro" required :error="errores.ministroNombre">
          <Input v-model="form.ministroNombre" />
        </FormField>
        <FormField label="Calidad del ministro" required>
          <Select v-model="form.ministroCalidad">
            <option value="parroco">Parroco</option>
            <option value="vicario">Vicario parroquial</option>
            <option value="diacono">Diacono</option>
            <option value="delegado">Delegado</option>
          </Select>
        </FormField>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Datos del bautizado</CardTitle>
      </CardHeader>
      <CardContent class="grid gap-4 sm:grid-cols-2">
        <FormField label="Nombres" required :error="errores.bautizadoNombres">
          <Input v-model="form.bautizadoNombres" />
        </FormField>
        <FormField label="Apellidos" required :error="errores.bautizadoApellidos">
          <Input v-model="form.bautizadoApellidos" />
        </FormField>
        <FormField label="Sexo" required>
          <Select v-model="form.sexo">
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </Select>
        </FormField>
        <FormField label="Fecha de nacimiento" required :error="errores.fechaNacimiento">
          <Input v-model="form.fechaNacimiento" type="date" />
        </FormField>
        <FormField label="Lugar de nacimiento" required :error="errores.lugarNacimiento">
          <Input v-model="form.lugarNacimiento" />
        </FormField>
        <FormField label="Pais de nacimiento">
          <Input v-model="form.paisNacimiento" />
        </FormField>
        <div class="flex items-center gap-2 sm:col-span-2">
          <Switch id="adoptado" v-model="form.esAdoptado" />
          <Label for="adoptado">Es adoptado (c. 877 §3)</Label>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Padres</CardTitle>
      </CardHeader>
      <CardContent class="grid gap-4 sm:grid-cols-2">
        <FormField label="Padre - nombres">
          <Input v-model="form.padreNombres" />
        </FormField>
        <FormField label="Padre - apellidos">
          <Input v-model="form.padreApellidos" />
        </FormField>
        <FormField label="Documento padre">
          <Input v-model="form.padreDocumento" />
        </FormField>
        <div />
        <FormField label="Madre - nombres" required :error="errores.madreNombres" hint="Siempre se inscribe (c. 877 §2)">
          <Input v-model="form.madreNombres" />
        </FormField>
        <FormField label="Madre - apellidos" required :error="errores.madreApellidos">
          <Input v-model="form.madreApellidos" />
        </FormField>
        <FormField label="Apellidos de soltera">
          <Input v-model="form.madreApellidosSoltera" />
        </FormField>
        <FormField label="Documento madre">
          <Input v-model="form.madreDocumento" />
        </FormField>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Padrinos</CardTitle>
      </CardHeader>
      <CardContent class="grid gap-4 sm:grid-cols-2">
        <FormField label="Padrino - nombres">
          <Input v-model="form.padrinoNombres" />
        </FormField>
        <FormField label="Padrino - apellidos">
          <Input v-model="form.padrinoApellidos" />
        </FormField>
        <FormField label="Madrina - nombres">
          <Input v-model="form.madrinaNombres" />
        </FormField>
        <FormField label="Madrina - apellidos">
          <Input v-model="form.madrinaApellidos" />
        </FormField>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Observaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea v-model="form.observaciones" rows="4" />
      </CardContent>
    </Card>

    <div class="flex justify-end gap-2">
      <Button variant="outline" type="button" @click="router.back()">Cancelar</Button>
      <Button type="submit"><Save class="h-4 w-4" /> Guardar partida</Button>
    </div>
  </form>
</template>
