<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <td :class="cn('p-3 align-middle text-sm', $attrs.class as string)">
    <slot />
  </td>
</template>
