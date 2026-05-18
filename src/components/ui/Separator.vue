<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  orientation?: 'horizontal' | 'vertical'
}>()
</script>

<template>
  <div
    role="separator"
    :class="
      cn(
        'shrink-0 bg-border',
        (orientation ?? 'horizontal') === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      )
    "
  />
</template>
