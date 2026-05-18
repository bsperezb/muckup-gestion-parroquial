<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LogIn, KeyRound, ArrowRight } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Button from '@/components/ui/Button.vue'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()
const auth = useAuthStore()

const email = ref('parroco@sanjose.org')
const password = ref('demo1234')
const error = ref<string | null>(null)
const submitting = ref(false)

async function submit() {
  error.value = null
  submitting.value = true
  const r = auth.login(email.value, password.value)
  submitting.value = false
  if (!r.ok) {
    error.value = r.error ?? 'Error desconocido'
    return
  }
  router.push('/app/dashboard')
}

const demos = [
  { email: 'admin@plataforma.org', rol: 'Administrador de Plataforma' },
  { email: 'parroco@sanjose.org', rol: 'Parroco' },
  { email: 'secretaria@sanjose.org', rol: 'Secretaria' },
  { email: 'catequista@sanjose.org', rol: 'Catequista' },
]

function rapido(e: string) {
  email.value = e
  password.value = 'demo1234'
}
</script>

<template>
  <Card class="border-0 shadow-none">
    <CardHeader class="space-y-3 px-0">
      <div class="grid h-10 w-10 place-content-center rounded-md bg-primary text-primary-foreground">
        <LogIn class="h-4 w-4" />
      </div>
      <CardTitle class="font-serif text-2xl">Iniciar sesion</CardTitle>
      <CardDescription>
        Demo mock-first. Todos los datos viven en este navegador.
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-4 px-0">
      <form class="space-y-3" @submit.prevent="submit">
        <div class="space-y-1.5">
          <Label for="email">Correo</Label>
          <Input id="email" v-model="email" type="email" placeholder="correo@parroquia.org" />
        </div>
        <div class="space-y-1.5">
          <Label for="pwd">Contrasena</Label>
          <Input id="pwd" v-model="password" type="password" />
        </div>
        <p v-if="error" role="alert" class="text-sm text-destructive">{{ error }}</p>
        <Button type="submit" class="w-full" :disabled="submitting">
          <KeyRound class="h-4 w-4" />
          Ingresar
        </Button>
      </form>

      <div class="rounded-md border bg-muted/30 p-3">
        <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Acceso rapido de demo
        </p>
        <ul class="space-y-1">
          <li v-for="d in demos" :key="d.email">
            <button
              type="button"
              class="flex w-full items-center justify-between rounded px-2 py-1 text-left text-sm transition-colors hover:bg-secondary"
              @click="rapido(d.email)"
            >
              <span>
                <span class="font-medium">{{ d.rol }}</span>
                <span class="ml-2 text-xs text-muted-foreground">{{ d.email }}</span>
              </span>
              <ArrowRight class="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </li>
        </ul>
        <p class="mt-2 text-[11px] text-muted-foreground">Contrasena: <code class="font-mono">demo1234</code></p>
      </div>
    </CardContent>
  </Card>
</template>
