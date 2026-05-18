<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/useThemeStore'
import Button from '@/components/ui/Button.vue'

const theme = useThemeStore()
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    aria-label="Cambiar tema"
    @click="theme.toggle"
  >
    <Sun v-if="theme.mode === 'dark'" class="h-4 w-4" />
    <Moon v-else class="h-4 w-4" />
  </Button>
</template>
