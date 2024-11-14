<script setup lang="ts">
import Button from '../Button.vue'

const {
  variant = 'inverse',
  autofocus = false,
  value,
  disabled = false,
  class: elClass,
} = defineProps<{
  variant: 'inverse' | 'adaptive' | 'light' | 'plain'
  autofocus: boolean
  value: string
  disabled: boolean
  class: string
}>()
</script>

<template>
  <form method="dialog">
    <Button :variant :autofocus :value :disabled :class="elClass">
      <slot />
    </Button>
  </form>
</template>
