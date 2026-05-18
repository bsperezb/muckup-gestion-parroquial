<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  LayoutDashboard,
  Droplets,
  Sparkles,
  Heart,
  Cross,
  Users,
  BookOpen,
  CalendarHeart,
  PiggyBank,
  ScrollText,
  Search,
  Building2,
  FileText,
  Globe,
  Building,
  ShieldCheck,
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/useAuthStore'
import { cn } from '@/lib/utils'

const route = useRoute()
const auth = useAuthStore()

interface NavItem {
  to: string
  label: string
  icon: typeof LayoutDashboard
  roles?: string[]
}
interface NavGroup {
  label: string
  items: NavItem[]
}

const groups = computed<NavGroup[]>(() => [
  {
    label: 'General',
    items: [{ to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Sacramentos',
    items: [
      { to: '/app/bautismos', label: 'Bautismos', icon: Droplets },
      { to: '/app/confirmaciones', label: 'Confirmaciones', icon: Sparkles },
      { to: '/app/matrimonios', label: 'Matrimonios', icon: Heart },
      { to: '/app/defunciones', label: 'Defunciones', icon: Cross },
    ],
  },
  {
    label: 'Pastoral',
    items: [
      { to: '/app/catequesis', label: 'Catequesis', icon: BookOpen, roles: ['admin_plataforma', 'parroco', 'vicario', 'secretaria', 'catequista'] },
      { to: '/app/misas/intenciones', label: 'Intenciones de misa', icon: CalendarHeart },
      { to: '/app/misas/fundaciones', label: 'Fundaciones', icon: PiggyBank },
      { to: '/app/cronica', label: 'Cronica parroquial', icon: ScrollText },
    ],
  },
  {
    label: 'Documental',
    items: [
      { to: '/app/busqueda', label: 'Busqueda historica', icon: Search },
      { to: '/app/personas', label: 'Personas', icon: Users },
    ],
  },
  {
    label: 'Configuracion',
    items: [
      { to: '/app/parroquia', label: 'Datos de la parroquia', icon: Building2, roles: ['admin_plataforma', 'parroco', 'vicario'] },
    ],
  },
  {
    label: 'Plataforma',
    items: [
      { to: '/app/plataforma/parroquias', label: 'Parroquias inscritas', icon: Building, roles: ['admin_plataforma'] },
      { to: '/app/plataforma/plantillas', label: 'Catalogo de plantillas', icon: FileText, roles: ['admin_plataforma'] },
    ],
  },
])

function visible(item: NavItem) {
  if (!item.roles) return true
  return auth.usuario ? item.roles.includes(auth.usuario.rol) : false
}

function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <aside
    class="hidden h-screen w-64 shrink-0 flex-col border-r bg-card lg:flex"
  >
    <div class="flex h-14 items-center gap-2 border-b px-5">
      <span class="grid h-8 w-8 place-content-center rounded-md bg-primary text-primary-foreground">
        <Cross class="h-4 w-4" />
      </span>
      <div class="flex flex-col leading-tight">
        <span class="font-serif text-base font-semibold tracking-tight">Parroquia</span>
        <span class="text-[10px] uppercase tracking-widest text-muted-foreground">Administracion</span>
      </div>
    </div>

    <nav class="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
      <template v-for="group in groups" :key="group.label">
        <div
          v-if="group.items.some(visible)"
          class="mb-1 px-2 pt-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
        >
          {{ group.label }}
        </div>
        <ul class="mb-3 space-y-0.5">
          <li v-for="item in group.items.filter(visible)" :key="item.to">
            <RouterLink
              :to="item.to"
              :class="
                cn(
                  'group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                  isActive(item.to)
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-foreground/80 hover:bg-secondary hover:text-foreground',
                )
              "
            >
              <component :is="item.icon" class="h-4 w-4 shrink-0" />
              <span class="truncate">{{ item.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </template>
    </nav>

    <div class="border-t p-3">
      <RouterLink
        to="/publico"
        class="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Globe class="h-3.5 w-3.5" />
        Ver directorio publico
      </RouterLink>
      <div v-if="auth.usuario?.rol === 'admin_plataforma'" class="mt-1 flex items-center gap-2 rounded-md bg-primary/5 px-3 py-2 text-[11px] text-primary">
        <ShieldCheck class="h-3.5 w-3.5" />
        Sesion administrativa
      </div>
    </div>
  </aside>
</template>
