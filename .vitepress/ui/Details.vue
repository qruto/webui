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

<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  summaryClass: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['toggle']);

const details = ref();
const summary = ref();

const open = ref(false);

onMounted(() => (open.value = details.value.open));

function toggle(e) {
  emit('toggle', e);

  open.value = e.target.open;
}

// onMounted(() => {
//   console.log(details.value.offsetHeight);
//   console.log(summary.value.offsetHeight);
// });
</script>
