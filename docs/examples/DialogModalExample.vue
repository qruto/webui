<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';

import { DialogModal, CloseButton } from '@webui/vue';
import { Button } from '@webui/vue';

const open = ref(false);
const dialog = useTemplateRef('dialog');

function close() {
  open.value = false;
}
</script>

<template>
  <div
    class="flex h-full items-center justify-center bg-zinc-200 dark:bg-zinc-900"
  >
    <Button class="mx-auto" @click="open = true">open</Button>
    <DialogModal
      ref="dialog"
      :class="[
        // styles
        'rounded-t-2xl bg-zinc-100 px-10 pb-6 pt-10 shadow-[shadow:inset_0_2px_theme(colors.white),theme(boxShadow.lg)] sm:rounded-2xl dark:bg-zinc-700 dark:shadow-[shadow:inset_0_2px_theme(colors.white/5%),inset_0_-2px_theme(colors.black/7%),theme(boxShadow.lg)]',
        // reset browser defaults
        'fixed bottom-0 max-h-none max-w-none',
        // place at the bottom center of the viewport
        'm-auto mb-0',
        // center the dialog on the screen
        'md:mb-auto md:top-0',
        // enable complete transition
        'transition-discrete transition-all duration-500',
        // mobile screen in / out transition
        'translate-y-full translate-x-0 open:translate-y-0 open:translate-x-0 starting:open:translate-y-full',
        // '-translate-y-64 open:translate-y-1 starting:open:-translate-y-64',
        // wide screen in / out transition
        'md:opacity-0 md:open:opacity-100 md:open:starting:opacity-0',
        'md:translate-x-0 md:open:translate-x-0 md:open:starting:-translate-x-full',
        'md:-translate-y-full md:open:starting:translate-y-0',
        // backdrop transition
        'backdrop:transition-discrete backdrop:transition-all backdrop:duration-500',
        'backdrop:bg-black/0 open:backdrop:bg-black/40 starting:open:backdrop:bg-black/0',
      ]"
      :open="open"
      @close="close"
      @cancel="close"
    >
      <header class="text-base/7 font-medium text-zinc-800 dark:text-zinc-100">
        Greetings!
      </header>

      <p class="mt-2 text-sm/6 text-zinc-500 sm:text-base/7 dark:text-zinc-400">
        Welcome to our platform! We're glad to have you here.
      </p>
      <div class="mt-6 text-center">
        <CloseButton class="w-full sm:w-auto">Get Started</CloseButton>
      </div>
    </DialogModal>
  </div>
</template>

<style>
:root:has(dialog:open) {
  scale: 0.75;
}
</style>
