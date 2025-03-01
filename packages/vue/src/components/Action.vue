<script setup lang="ts">
import { computed } from 'vue'

export type ButtonProps = {
  href?: string
  level?: 'inverse' | 'adaptive' | 'light' | 'plain'
}

const { variant = 'plain', href } = defineProps<ButtonProps>()

const attributes = {
  'data-component': 'action',
}
</script>

<template>
  <a
    v-if="typeof href !== 'undefined'"
    :href
    v-bind="attributes"
  >
    <slot />
  </a>
  <button v-else v-bind="attributes">
    <slot />
    <!-- touch target -->
    <span
      class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
      aria-hidden="true"
    />
  </button>
</template>
