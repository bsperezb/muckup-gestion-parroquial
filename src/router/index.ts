import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => (useAuthStore().autenticado ? '/app/dashboard' : '/publico'),
  },
  {
    path: '/login',
    component: () => import('@/layouts/AuthShell.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue'),
        meta: { title: 'Iniciar sesion', guest: true },
      },
    ],
  },
  {
    path: '/publico',
    component: () => import('@/layouts/PublicShell.vue'),
    children: [
      {
        path: '',
        name: 'publico.directorio',
        component: () => import('@/views/publico/DirectorioView.vue'),
        meta: { title: 'Directorio parroquial', public: true },
      },
      {
        path: 'parroquias/:slug',
        name: 'publico.parroquia',
        component: () => import('@/views/publico/ParroquiaPublicaView.vue'),
        meta: { title: 'Parroquia', public: true },
      },
    ],
  },
  {
    path: '/app',
    component: () => import('@/layouts/AppShell.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { title: 'Dashboard' },
      },
      {
        path: 'bautismos',
        name: 'bautismos',
        component: () => import('@/views/bautismo/BautismosListView.vue'),
        meta: { title: 'Libro de bautismos' },
      },
      {
        path: 'bautismos/nuevo',
        name: 'bautismos.nuevo',
        component: () => import('@/views/bautismo/BautismoFormView.vue'),
        meta: { title: 'Nuevo bautismo' },
      },
      {
        path: 'bautismos/:id',
        name: 'bautismos.detalle',
        component: () => import('@/views/bautismo/BautismoDetailView.vue'),
        meta: { title: 'Detalle de bautismo' },
      },
      {
        path: 'confirmaciones',
        name: 'confirmaciones',
        component: () => import('@/views/confirmacion/ConfirmacionesView.vue'),
        meta: { title: 'Libro de confirmaciones' },
      },
      {
        path: 'matrimonios',
        name: 'matrimonios',
        component: () => import('@/views/matrimonio/MatrimoniosView.vue'),
        meta: { title: 'Libro de matrimonios' },
      },
      {
        path: 'defunciones',
        name: 'defunciones',
        component: () => import('@/views/defuncion/DefuncionesView.vue'),
        meta: { title: 'Libro de defunciones' },
      },
      {
        path: 'parroquia',
        name: 'parroquia',
        component: () => import('@/views/parroquia/ParroquiaConfigView.vue'),
        meta: { title: 'Datos de la parroquia', roles: ['admin_plataforma', 'parroco', 'vicario'] },
      },
      {
        path: 'personas',
        name: 'personas',
        component: () => import('@/views/personas/PersonasListView.vue'),
        meta: { title: 'Personas' },
      },
      {
        path: 'catequesis',
        name: 'catequesis',
        component: () => import('@/views/catequesis/CatequesisView.vue'),
        meta: { title: 'Catequesis' },
      },
      {
        path: 'misas/intenciones',
        name: 'misas.intenciones',
        component: () => import('@/views/misas/IntencionesView.vue'),
        meta: { title: 'Intenciones de misa' },
      },
      {
        path: 'misas/fundaciones',
        name: 'misas.fundaciones',
        component: () => import('@/views/misas/FundacionesView.vue'),
        meta: { title: 'Fundaciones de misas' },
      },
      {
        path: 'cronica',
        name: 'cronica',
        component: () => import('@/views/cronica/CronicaView.vue'),
        meta: { title: 'Cronica parroquial' },
      },
      {
        path: 'busqueda',
        name: 'busqueda',
        component: () => import('@/views/busqueda/BusquedaView.vue'),
        meta: { title: 'Busqueda historica' },
      },
      {
        path: 'plataforma/parroquias',
        name: 'plataforma.parroquias',
        component: () => import('@/views/plataforma/ParroquiasView.vue'),
        meta: { title: 'Parroquias inscritas', roles: ['admin_plataforma'] },
      },
      {
        path: 'plataforma/plantillas',
        name: 'plataforma.plantillas',
        component: () => import('@/views/plataforma/PlantillasView.vue'),
        meta: { title: 'Catalogo de plantillas', roles: ['admin_plataforma'] },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'No encontrado' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.autenticado) return { name: 'login' }
  if (to.meta.guest && auth.autenticado) return { name: 'dashboard' }

  const roles = (to.meta.roles as string[] | undefined) ?? null
  if (roles && auth.usuario && !roles.includes(auth.usuario.rol)) {
    return { name: 'dashboard' }
  }
  return true
})

router.afterEach((to) => {
  const t = (to.meta.title as string | undefined) ?? 'Administracion Parroquial'
  document.title = `${t} · Administracion Parroquial`
})

export default router
