<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Plus, Search, Eye, FileDown, Filter } from 'lucide-vue-next'
import PageHeader from '@/components/PageHeader.vue'
import EmptyState from '@/components/EmptyState.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Card from '@/components/ui/Card.vue'
import Table from '@/components/ui/Table.vue'
import THead from '@/components/ui/THead.vue'
import TBody from '@/components/ui/TBody.vue'
import TR from '@/components/ui/TR.vue'
import TH from '@/components/ui/TH.vue'
import TD from '@/components/ui/TD.vue'
import Badge from '@/components/ui/Badge.vue'
import Select from '@/components/ui/Select.vue'
import { useBautismosStore } from '@/stores/useBautismosStore'
import { useParroquiasStore } from '@/stores/useParroquiasStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { formatoFechaCorta } from '@/utils/format'
import { descargarFeBautismo } from '@/utils/pdf'

const bautismos = useBautismosStore()
const parroquias = useParroquiasStore()
const auth = useAuthStore()
const router = useRouter()

const parroquiaId = computed(() => auth.usuario?.parroquiaId ?? 'par_sanjose')

const termino = ref('')
const anio = ref<'todos' | string>('todos')

const filtrados = computed(() => {
  let list = bautismos.porParroquia(parroquiaId.value)
  if (anio.value !== 'todos') list = list.filter((b) => String(b.anio) === anio.value)
  if (termino.value.trim()) {
    const q = termino.value.toLowerCase()
    list = list.filter((b) =>
      `${b.bautizadoNombres} ${b.bautizadoApellidos} ${b.libro} ${b.folio} ${b.numero}`
        .toLowerCase()
        .includes(q),
    )
  }
  return [...list].sort(
    (a, b) => new Date(b.fechaBautismo).getTime() - new Date(a.fechaBautismo).getTime(),
  )
})

const anios = computed(() => Array.from(new Set(bautismos.items.map((b) => b.anio))).sort((a, b) => b - a))

function descargar(id: string) {
  const b = bautismos.byId(id)
  const p = parroquias.byId(parroquiaId.value)
  if (b && p) descargarFeBautismo(b, p)
}

function abrir(id: string) {
  router.push(`/app/bautismos/${id}`)
}
</script>

<template>
  <PageHeader
    titulo="Libro de bautismos"
    descripcion="Registro sacramental de bautismos. Genera fe de bautismo en PDF con notas marginales."
  >
    <template #acciones>
      <RouterLink to="/app/bautismos/nuevo">
        <Button as="span">
          <Plus class="h-4 w-4" />
          Nuevo bautismo
        </Button>
      </RouterLink>
    </template>
  </PageHeader>

  <Card class="p-4">
    <div class="flex flex-wrap items-end gap-3">
      <div class="grow space-y-1">
        <label class="text-xs font-medium text-muted-foreground">Buscar</label>
        <div class="relative">
          <Search class="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input v-model="termino" placeholder="Nombre del bautizado, libro/folio/numero..." class="pl-8" />
        </div>
      </div>
      <div class="w-40 space-y-1">
        <label class="text-xs font-medium text-muted-foreground">Ano</label>
        <Select v-model="anio">
          <option value="todos">Todos</option>
          <option v-for="a in anios" :key="a" :value="String(a)">{{ a }}</option>
        </Select>
      </div>
      <Badge variant="secondary"><Filter class="mr-1 h-3 w-3" />{{ filtrados.length }} registros</Badge>
    </div>
  </Card>

  <Card v-if="filtrados.length">
    <Table>
      <THead>
        <TR>
          <TH>Partida</TH>
          <TH>Bautizado</TH>
          <TH>Fecha</TH>
          <TH>Ministro</TH>
          <TH>Notas marginales</TH>
          <TH class="text-right">Acciones</TH>
        </TR>
      </THead>
      <TBody>
        <TR v-for="b in filtrados" :key="b.id" class="cursor-pointer" @click="abrir(b.id)">
          <TD>
            <p class="font-mono text-xs text-muted-foreground">
              L{{ b.libro }} F{{ b.folio }} N{{ b.numero }} / {{ b.anio }}
            </p>
          </TD>
          <TD>
            <p class="font-medium">{{ b.bautizadoNombres }} {{ b.bautizadoApellidos }}</p>
            <p class="text-xs text-muted-foreground">{{ b.sexo === 'M' ? 'Masculino' : 'Femenino' }}</p>
          </TD>
          <TD class="tabular-nums">{{ formatoFechaCorta(b.fechaBautismo) }}</TD>
          <TD>
            <p class="text-sm">{{ b.ministroNombre }}</p>
            <p class="text-xs text-muted-foreground capitalize">{{ b.ministroCalidad }}</p>
          </TD>
          <TD>
            <Badge v-if="b.notasMarginales.length" variant="accent">
              {{ b.notasMarginales.length }} nota{{ b.notasMarginales.length > 1 ? 's' : '' }}
            </Badge>
            <span v-else class="text-xs text-muted-foreground">—</span>
          </TD>
          <TD class="text-right" @click.stop>
            <Button variant="ghost" size="icon" aria-label="Ver" @click="abrir(b.id)">
              <Eye class="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Emitir fe de bautismo" @click="descargar(b.id)">
              <FileDown class="h-4 w-4" />
            </Button>
          </TD>
        </TR>
      </TBody>
    </Table>
  </Card>

  <EmptyState
    v-else
    titulo="Sin resultados"
    descripcion="Ajusta los filtros o registra un nuevo bautismo."
  >
    <RouterLink to="/app/bautismos/nuevo">
      <Button as="span"><Plus class="h-4 w-4" /> Nuevo bautismo</Button>
    </RouterLink>
  </EmptyState>
</template>
