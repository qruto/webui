<script setup lang="ts">
import Action from '../Action.vue'

const {
  // variant = 'inverse',
  // autofocus = false,
  // value,
  // disabled = false,
  class: elClass,
} = defineProps<{
  // variant: 'inverse' | 'adaptive' | 'light' | 'plain'
  // autofocus: boolean
  // value: string
  // disabled: boolean
  class: string
}>()
</script>

<template>
  <form method="dialog">
    <Action :class="elClass">
      <slot />
    </Action>
  </form>
</template>
