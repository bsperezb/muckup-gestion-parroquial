<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary/15 text-primary',
        accent: 'border-transparent bg-accent/20 text-accent-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'text-foreground',
        success: 'border-transparent bg-success/15 text-success',
        warning: 'border-transparent bg-warning/15 text-warning',
        destructive: 'border-transparent bg-destructive/15 text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type Variants = VariantProps<typeof badgeVariants>

const props = withDefaults(
  defineProps<{
    variant?: Variants['variant']
  }>(),
  { variant: 'default' },
)

const classes = computed(() => cn(badgeVariants({ variant: props.variant })))
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
