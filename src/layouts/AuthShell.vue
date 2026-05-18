<script setup lang="ts">
import { Cross } from 'lucide-vue-next'
</script>

<template>
  <div class="grid min-h-screen lg:grid-cols-2">
    <aside class="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
      <div class="flex items-center gap-3">
        <span class="grid h-9 w-9 place-content-center rounded-md bg-accent/30">
          <Cross class="h-4 w-4" />
        </span>
        <span class="font-serif text-lg">Administracion Parroquial</span>
      </div>
      <blockquote class="space-y-4">
        <p class="font-serif text-2xl leading-snug">
          "Cuiden con diligencia que se anoten con exactitud los libros parroquiales y se conserven con cuidado."
        </p>
        <footer class="text-xs uppercase tracking-widest opacity-80">
          Codigo de Derecho Canonico, c. 535 §1
        </footer>
      </blockquote>
      <p class="text-xs uppercase tracking-widest opacity-70">Demo mock-first</p>
    </aside>
    <main class="flex items-center justify-center p-6 lg:p-12">
      <div class="w-full max-w-md">
        <router-view />
      </div>
    </main>
  </div>
</template>
