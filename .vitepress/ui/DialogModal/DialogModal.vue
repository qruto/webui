<script setup>
import {
  computed,
  nextTick,
  ref,
  watch,
  watchEffect,
  watchPostEffect,
} from 'vue';

const { open, blocking, outsideClose } = defineProps({
  open: {
    type: Boolean,
    default: false,
  },

  blocking: {
    type: Boolean,
    default: true,
  },

  outsideClose: {
    type: Boolean,
    default: false,
  },
});

const dialog = ref();

function checkOutside(e) {
  if (!outsideClose) {
    return;
  }

  const dialogDimensions = dialog.value.getBoundingClientRect();

  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.value.close();
  }
}

const emit = defineEmits(['close', 'cancel']);

watchPostEffect(() => {
  if (open) {
    dialog.value.showModal();

    return;
  }

  dialog.value?.close();
});

const firstFocusable = ref();
const navigating = ref(false);

watch(navigating, value => {
  if (!value) {
    return;
  }

  setTimeout(() => {
    firstFocusable.value?.focus();
  }, 0);
});

watchEffect(async () => {
  if (!open) {
    return;
  }

  await nextTick();
  firstFocusable.value = document.activeElement;
});

function dismiss(e) {
  navigating.value = false;

  emit(e.type, e);
}

function navigate(e) {
  if (!open) {
    return;
  }

  if (navigating.value === false) {
    e.preventDefault();
  }

  navigating.value = true;
}

const classes = computed(() => [
  blocking ? 'blocking' : '',
  navigating.value ? '' : 'focus-visible:[&_*]:outline-none',
]);
</script>

<template>
  <dialog
    ref="dialog"
    :class="classes"
    @click="checkOutside"
    @close="dismiss"
    @cancel="dismiss"
    @focusout="navigate"
  >
    <slot />
  </dialog>
</template>

<style>
body:has(dialog.blocking:open) {
  overflow: hidden;
}
</style>
