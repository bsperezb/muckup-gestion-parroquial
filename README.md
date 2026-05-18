# Administración Parroquial — Demo visual

Este repositorio es un **mock funcional / demo visual** de un sistema de administración parroquial católica. **No es un producto en producción**: es un prototipo navegable construido para validar flujos, look & feel y alcance con clientes antes de iniciar el desarrollo real.

> Toda la información se almacena en `localStorage` del navegador y se siembra con datos de ejemplo en el primer arranque. No hay backend, ni base de datos, ni autenticación real.

## ¿Qué es esto exactamente?

- **Demo visual**: las pantallas, navegación, diseño y micro-interacciones son representativas del producto final.
- **Mock técnico**: la lógica (CRUD, búsquedas, filtros, generación de PDFs, etc.) funciona contra datos locales sembrados con `@faker-js/faker`.
- **Sin backend**: no hay API, ni servidor, ni persistencia más allá del navegador.
- **PWA**: instalable y con soporte offline básico vía `vite-plugin-pwa`.

Sirve como base para:

1. Demos a párrocos, secretarías parroquiales y curias diocesanas.
2. Iterar requisitos y alcance antes de empezar la fase real de implementación.
3. Discutir flujos canónicos (bautismo, confirmación, matrimonio, defunción) sobre algo tangible.

## Qué lleva la demo

### Módulos navegables

- **Dashboard** general con resumen de la parroquia.
- **Personas** — registro central de fieles (CRUD, búsqueda, fichas).
- **Sacramentos**:
  - Bautismo
  - Confirmación
  - Matrimonio
  - Defunción
- **Catequesis** — grupos, catequistas, inscripciones.
- **Misas** — programación, intenciones, estipendios.
- **Búsqueda global** transversal a todos los registros.
- **Crónica parroquial**.
- **Parroquia** — configuración de datos, sello, párroco, libros.
- **Plataforma** — administración multi-parroquia (rol super admin).
- **Vistas públicas** — pantallas de consulta sin login.
- **Autenticación mock** con varios roles.

### Stack técnico

- Vue 3 + Vite + TypeScript
- Tailwind CSS + componentes estilo `shadcn-vue` (Radix Vue)
- Pinia + `pinia-plugin-persistedstate` (estado persistido en `localStorage`)
- Vue Router con guards por rol
- Validación con Zod + VeeValidate
- Tablas con TanStack Table
- Mapas con Leaflet
- Generación de PDFs canónicos con `pdfmake`
- PWA con `vite-plugin-pwa`
- Datos sembrados con `@faker-js/faker`

### Roles de demo

Todos los usuarios usan la misma contraseña: `demo1234`.

| Email | Rol |
|---|---|
| `admin@plataforma.org` | Administrador de Plataforma |
| `parroco@sanjose.org` | Párroco |
| `secretaria@sanjose.org` | Secretaria |
| `catequista@sanjose.org` | Catequista |

## Puesta en marcha

Requisitos: Node.js 20+ y npm 10+.

```bash
npm install
npm run dev
```

Abre http://localhost:5173.

### Comandos

- `npm run dev` — entorno de desarrollo
- `npm run build` — build de producción
- `npm run preview` — sirve el build local
- `npm run type-check` — chequeo TypeScript

### Resetear datos de demo

Desde el menú de usuario en la app: **"Reiniciar datos de demo"**, o en la consola del navegador:

```js
localStorage.clear(); location.reload();
```

## Estructura

```
src/
  views/             pantallas agrupadas por módulo
  components/        UI compartida
  components/ui      primitivas shadcn-vue (Button, Card, Input, Dialog...)
  layouts/           shells de la app
  router/            rutas + guards por rol
  stores/            Pinia + persistencia
  schemas/           contratos Zod
  types/             tipos compartidos
  mocks/             seeds + factories con @faker-js/faker
  utils/             helpers (PDF canónico, formato, etc.)
  assets/            tokens CSS, tema litúrgico, tipografías
```

## Estado

Prototipo en evolución. El alcance funcional cubierto en esta demo se irá ampliando según el feedback recibido en las presentaciones.

---

© Demo interna — no destinada a uso pastoral real.
