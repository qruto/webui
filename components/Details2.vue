<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <details>
    <summary
      ref="summary"
      class="cursor-pointer list-none [&::-webkit-details-marker]:hidden"
    >
      <slot :open="open" name="summary" />
    </summary>
    <slot />
  </details>
</template>
