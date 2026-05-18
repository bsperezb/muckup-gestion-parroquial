<script setup lang="ts">
import { computed } from 'vue'
import { cn, initials } from '@/lib/utils'

const props = defineProps<{
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
}>()

const dim = computed(() => {
  switch (props.size ?? 'md') {
    case 'sm': return 'h-8 w-8 text-xs'
    case 'lg': return 'h-12 w-12 text-base'
    default: return 'h-9 w-9 text-sm'
  }
})

const seed = computed(() => initials(props.name))
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center justify-center overflow-hidden rounded-full bg-primary/10 font-semibold text-primary',
        dim,
      )
    "
  >
    <img v-if="src" :src="src" :alt="name" class="h-full w-full object-cover" />
    <span v-else>{{ seed }}</span>
  </span>
</template>
