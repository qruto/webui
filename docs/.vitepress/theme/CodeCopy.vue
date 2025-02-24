<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

const code = useTemplateRef('code');
const status = ref<'waiting' | 'copied' | 'fail'>('waiting');
defineExpose({ copy });
const emit = defineEmits<{ fail: [DOMException] }>();

async function copy() {
  if (status.value !== 'waiting') {
    return false;
  }

  try {
    await navigator.clipboard.writeText(code.value?.innerText || '');
    status.value = 'copied';

    setTimeout(() => {
      status.value = 'waiting';
    }, 2000);

    return true;
  } catch (err) {
    status.value = 'fail';
    emit('fail', err);

    setTimeout(() => {
      status.value = 'waiting';
    }, 2000);

    return false;
  }
}
</script>

<template>
  <div class="relative" :class="status === 'copied' ? 'motion-preset-confetti motion-duration-[12s]' : undefined">
    <code ref="code">
      <slot />
    </code>
    <button class="cursor-copy h-full self-stretch" type="button" @click="copy">
      <slot name="icon" :status="status" />
    </button>
  </div>
</template>
