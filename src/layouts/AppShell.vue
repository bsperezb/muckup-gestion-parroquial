<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="flex min-h-screen bg-muted/20">
    <AppSidebar />
    <div class="flex min-w-0 flex-1 flex-col">
      <AppHeader />
      <main class="scrollbar-thin flex-1 overflow-x-hidden px-4 py-6 lg:px-8 lg:py-8">
        <div class="mx-auto max-w-7xl space-y-6">
          <slot />
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>
