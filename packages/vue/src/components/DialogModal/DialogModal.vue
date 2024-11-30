<script setup lang="ts">
import { computed, nextTick, ref, watch, watchEffect, watchPostEffect } from 'vue'

export type DialogModalProps = {
  open: boolean
  blocking?: boolean
  outsideClose?: boolean
}

const { open = false, blocking = true, outsideClose = false } = defineProps<DialogModalProps>()

const dialog = ref()

function checkOutside(e: MouseEvent) {
  if (!outsideClose) {
    return
  }

  const dialogDimensions = dialog.value.getBoundingClientRect()

  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.value.close()
  }
}

const emit = defineEmits<{ (type: 'close' | 'cancel', e: Event): void }>()

watchPostEffect(() => {
  if (open) {
    dialog.value.showModal()

    return
  }

  dialog.value?.close()
})

const firstFocusable = ref()
const navigating = ref(false)

watch(navigating, (value) => {
  if (!value) {
    return
  }

  setTimeout(() => {
    firstFocusable.value?.focus()
  }, 0)
})

watchEffect(async () => {
  if (!open) {
    return
  }

  await nextTick()
  firstFocusable.value = document.activeElement
})

function dismiss(e: Event) {
  navigating.value = false

  emit(e.type as 'close' | 'cancel', e)
}

function navigate(e: Event) {
  if (!open) {
    return
  }

  if (navigating.value === false) {
    e.preventDefault()
  }

  navigating.value = true
}

const classes = computed(() => [
  blocking ? 'blocking' : '',
  navigating.value ? '' : 'focus-visible:[&_*]:outline-none',
])
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
