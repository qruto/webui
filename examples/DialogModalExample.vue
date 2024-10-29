<script setup>
import { ref, useTemplateRef } from 'vue';

import { DialogModal, CloseButton } from '../.vitepress/ui/DialogModal';
import Button from '../.vitepress/ui/Button.vue';

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
        'max-h-none max-w-none',
        // place at the bottom center of the viewport
        'mx-2 mb-0 mt-auto md:m-auto',
        // center the dialog on the screen
        'md:mx-auto md:mb-auto',
        // enable complete transition
        'transition-allow-discrete transition-[opacity,translate,transform,overlay,display] duration-500',
        // mobile screen in / out transition
        'translate-y-full open:translate-y-0 open:[@starting-style]:translate-y-full',
        // wide screen in / out transition
        'md:opacity-0 md:open:opacity-100 md:open:[@starting-style]:opacity-0',
        'md:translate-x-0 md:open:translate-x-0 md:open:[@starting-style]:-translate-x-full',
        'md:-translate-y-full md:open:[@starting-style]:translate-y-0',
        // backdrop transition
        'backdrop:transition-allow-discrete backdrop:transition-[display,overlay,background-color] backdrop:duration-500',
        'backdrop:bg-black/0 open:backdrop:bg-black/40 open:backdrop:[@starting-style]:bg-black/0',
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
