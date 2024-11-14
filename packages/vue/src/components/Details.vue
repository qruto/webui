<template>
  <details ref="details" @toggle="toggle">
    <summary
      ref="summary"
      class="cursor-pointer list-none [&::-webkit-details-marker]:hidden"
      :class="summaryClass"
    >
      <slot :open="open" name="summary" />
    </summary>
    <slot />
  </details>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{
  summaryClass?: string
}>()

const emit = defineEmits(['toggle'])

const details = ref()
const summary = ref()

const open = ref(false)

onMounted(() => (open.value = details.value.open))

function toggle(e: Event) {
  emit('toggle', e)

  open.value = (e.target as HTMLDetailsElement).open
}

// onMounted(() => {
//   console.log(details.value.offsetHeight);
//   console.log(summary.value.offsetHeight);
// });
</script>
