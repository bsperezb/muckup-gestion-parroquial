<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <div class="relative w-full overflow-auto rounded-md border">
    <table :class="cn('w-full caption-bottom text-sm', $attrs.class as string)">
      <slot />
    </table>
  </div>
</template>
