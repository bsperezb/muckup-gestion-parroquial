<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/useThemeStore'

const theme = useThemeStore()

onMounted(() => {
  if (theme.mode === 'dark') document.documentElement.classList.add('dark')
})
</script>

<template>
  <router-view />
</template>
