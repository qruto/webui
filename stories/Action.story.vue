<script setup lang="ts">
import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import { Details } from 'webui.dev'

const open = ref(false)

function onToggle(e: Event) {
  open.value = e.newState === 'open'
}
</script>

<template>
  <Story>
    <Action color="red" intense="plain">click me!</Action>
    <Action level="primary">click me!</Action>
    <!-- Destructive -->
  </Story>
</template>
