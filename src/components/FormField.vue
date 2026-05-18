<script setup lang="ts">
import Label from '@/components/ui/Label.vue'

defineProps<{
  label: string
  for_?: string
  required?: boolean
  error?: string
  hint?: string
}>()
</script>

<template>
  <div class="space-y-1.5">
    <Label :for="for_" :required="required">{{ label }}</Label>
    <slot />
    <p v-if="error" class="text-xs text-destructive" role="alert">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-muted-foreground">{{ hint }}</p>
  </div>
</template>
