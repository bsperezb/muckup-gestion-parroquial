<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Plus, Users, Search } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import EmptyState from '@/components/EmptyState.vue'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Dialog from '@/components/ui/Dialog.vue'
import Badge from '@/components/ui/Badge.vue'
import Table from '@/components/ui/Table.vue'
import THead from '@/components/ui/THead.vue'
import TBody from '@/components/ui/TBody.vue'
import TR from '@/components/ui/TR.vue'
import TH from '@/components/ui/TH.vue'
import TD from '@/components/ui/TD.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Switch from '@/components/ui/Switch.vue'
import Label from '@/components/ui/Label.vue'
import Select from '@/components/ui/Select.vue'
import FormField from '@/components/FormField.vue'
import { usePersonasStore } from '@/stores/usePersonasStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { personaSchema } from '@/schemas/persona.schema'

const personas = usePersonasStore()
const auth = useAuthStore()

const termino = ref('')
const lista = computed(() => personas.buscar(termino.value))

const open = ref(false)
const errores = ref<Record<string, string>>({})
const form = reactive({
  nombres: '',
  apellidos: '',
  sexo: 'M' as 'M' | 'F',
  tipoDocumento: 'cc' as 'cc' | 'ti' | 'ce' | 'pasaporte' | 'rc',
  documento: '',
  telefono: '',
  email: '',
  direccion: '',
  esClerigo: false,
  cargoEclesiastico: '',
})

function reset() {
  Object.assign(form, {
    nombres: '',
    apellidos: '',
    sexo: 'M',
    tipoDocumento: 'cc',
    documento: '',
    telefono: '',
    email: '',
    direccion: '',
    esClerigo: false,
    cargoEclesiastico: '',
  })
  errores.value = {}
}

function guardar() {
  errores.value = {}
  const r = personaSchema.safeParse(form)
  if (!r.success) {
    for (const i of r.error.issues) errores.value[i.path.join('.')] = i.message
    return
  }
  personas.create({
    ...r.data,
    auditoria: { creadoPor: auth.usuario?.id ?? 'sistema', creadoEn: new Date().toISOString() },
  })
  open.value = false
  reset()
}
</script>

<template>
  <PageHeader
    titulo="Personas"
    descripcion="Personas referenciadas por los modulos del sistema: fieles, padrinos, ministros y clerigos."
  >
    <template #acciones>
      <Button @click="open = true"><Plus class="h-4 w-4" /> Nueva persona</Button>
    </template>
  </PageHeader>

  <Card class="flex items-center gap-3 p-4">
    <Search class="h-4 w-4 text-muted-foreground" />
    <Input v-model="termino" placeholder="Buscar por nombre o documento..." class="border-0 shadow-none focus-visible:ring-0" />
    <Badge variant="secondary">{{ lista.length }} personas</Badge>
  </Card>

  <Card v-if="lista.length">
    <Table>
      <THead>
        <TR>
          <TH></TH>
          <TH>Nombre</TH>
          <TH>Documento</TH>
          <TH>Contacto</TH>
          <TH>Rol</TH>
        </TR>
      </THead>
      <TBody>
        <TR v-for="p in lista" :key="p.id">
          <TD><Avatar :name="`${p.nombres} ${p.apellidos}`" size="sm" /></TD>
          <TD>
            <p class="font-medium">{{ p.nombres }} {{ p.apellidos }}</p>
            <p class="text-xs text-muted-foreground">{{ p.sexo === 'M' ? 'M' : 'F' }}</p>
          </TD>
          <TD class="font-mono text-xs">{{ p.documento ?? '—' }}</TD>
          <TD class="text-xs">
            <p>{{ p.telefono ?? '—' }}</p>
            <p class="text-muted-foreground">{{ p.email ?? '' }}</p>
          </TD>
          <TD>
            <Badge v-if="p.esClerigo" variant="accent">{{ p.cargoEclesiastico ?? 'Clerigo' }}</Badge>
            <Badge v-else variant="secondary">Fiel</Badge>
          </TD>
        </TR>
      </TBody>
    </Table>
  </Card>

  <EmptyState v-else titulo="Sin personas" :icono="Users" />

  <Dialog :open="open" title="Nueva persona" @update:open="(v) => (open = v) || (!v && reset())">
    <div class="grid gap-3 sm:grid-cols-2">
      <FormField label="Nombres" required :error="errores.nombres">
        <Input v-model="form.nombres" />
      </FormField>
      <FormField label="Apellidos" required :error="errores.apellidos">
        <Input v-model="form.apellidos" />
      </FormField>
      <FormField label="Sexo">
        <Select v-model="form.sexo">
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </Select>
      </FormField>
      <FormField label="Tipo de documento">
        <Select v-model="form.tipoDocumento">
          <option value="cc">CC</option>
          <option value="ti">TI</option>
          <option value="ce">CE</option>
          <option value="pasaporte">Pasaporte</option>
          <option value="rc">RC</option>
        </Select>
      </FormField>
      <FormField label="N.º documento"><Input v-model="form.documento" /></FormField>
      <FormField label="Telefono"><Input v-model="form.telefono" /></FormField>
      <FormField label="Correo" :error="errores.email"><Input v-model="form.email" type="email" /></FormField>
      <FormField label="Direccion"><Input v-model="form.direccion" /></FormField>
      <div class="flex items-center gap-2 sm:col-span-2">
        <Switch id="clerigo" v-model="form.esClerigo" />
        <Label for="clerigo">Es clerigo</Label>
      </div>
      <FormField v-if="form.esClerigo" label="Cargo eclesiastico" class="sm:col-span-2">
        <Input v-model="form.cargoEclesiastico" placeholder="Parroco, vicario, diacono, obispo..." />
      </FormField>
    </div>
    <div class="mt-4 flex justify-end gap-2">
      <Button variant="outline" @click="open = false">Cancelar</Button>
      <Button @click="guardar">Guardar</Button>
    </div>
  </Dialog>
</template>
