<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  modelValue?: string | number
  id?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onChange(event: Event) {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <select
    :id="id"
    :value="modelValue"
    :disabled="disabled"
    :class="
      cn(
        'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        $attrs.class as string,
      )
    "
    @change="onChange"
  >
    <slot />
  </select>
</template>
