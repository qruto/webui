<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

const code = useTemplateRef('code');
const status = ref<'waiting' | 'copied' | 'fail'>('waiting');
defineExpose({ copy });
const emit = defineEmits<{ fail: [DOMException] }>();

async function copy() {
  try {
    await navigator.clipboard.writeText(code.value?.innerText || '');
    status.value = 'copied';

    setTimeout(() => {
      status.value = 'waiting';
    }, 2000);

    return true;
  } catch (err) {
    console.error(err)
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
  <div class="relative">
    <code ref="code">
      <slot />
    </code>
    <button class="cursor-copy self-stretch" type="button" @mousedown="copy">
      <slot name="icon" :status="status" />
    </button>
  </div>
</template>
