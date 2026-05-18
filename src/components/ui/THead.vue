<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <thead :class="cn('bg-muted/40 [&_tr]:border-b', $attrs.class as string)">
    <slot />
  </thead>
</template>
