<script setup lang="ts">
import { oneOf } from '../../shared/utils.ts';
import Button from '../Button.vue';

const {
  variant,
  autofocus,
  value,
  disabled,
  class: elClass,
} = defineProps({
  variant: {
    type: String,
    default: 'inverse',
    validator: oneOf(['inverse', 'adaptive', 'light', 'plain']),
  },

  autofocus: {
    type: Boolean,
    default: false,
  },

  value: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  class: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <form method="dialog">
    <Button :variant :autofocus :value :disabled :class="elClass">
      <slot />
    </Button>
  </form>
</template>
