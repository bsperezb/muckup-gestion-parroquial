<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  for?: string
  required?: boolean
}>()
</script>

<template>
  <label
    :for="$props.for"
    :class="cn('text-sm font-medium leading-none text-foreground', $attrs.class as string)"
  >
    <slot />
    <span v-if="required" class="ml-0.5 text-destructive" aria-hidden="true">*</span>
  </label>
</template>
