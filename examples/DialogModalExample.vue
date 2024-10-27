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
  <div class="flex items-center bg-zinc-200 h-full justify-center">
    <Button class="mx-auto" @click="open = true">open</Button>
    <DialogModal
      ref="dialog"
      :class="[
        // styles
        'px-10 pb-6 pt-10 bg-zinc-100 rounded-t-2xl shadow-[shadow:inset_0_2px_theme(colors.white),theme(boxShadow.lg)] dark:bg-zinc-700 dark:shadow-[shadow:inset_0_2px_theme(colors.white/5%),inset_0_-2px_theme(colors.black/7%),theme(boxShadow.lg)] sm:rounded-2xl',
        // reset browser defaults
        'max-w-none max-h-none',
        // place at the bottom center of the viewport
        'mx-2 mb-0 mt-auto md:m-auto',
        // center the dialog on the screen
        'md:mx-auto md:mb-auto',
        // enable complete transition
        'transition-[opacity,translate,transform,overlay,display] transition-allow-discrete duration-500',
        // mobile screen in / out transition
        'translate-y-full open:[@starting-style]:translate-y-full open:translate-y-0',
        // wide screen in / out transition
        'md:opacity-0 md:open:[@starting-style]:opacity-0 md:open:opacity-100',
        'md:open:[@starting-style]:-translate-x-full md:translate-x-0 md:open:translate-x-0',
        'md:-translate-y-full md:open:[@starting-style]:translate-y-0',
        // backdrop transition
        'backdrop:transition-[display,overlay,background-color] backdrop:transition-allow-discrete backdrop:duration-500',
        'open:backdrop:bg-black/40 open:backdrop:[@starting-style]:bg-black/0 backdrop:bg-black/0',
      ]"
      :open="open"
      @close="close"
      @cancel="close"
    >
      <header class="text-base/7 font-medium text-zinc-800 dark:text-zinc-100">
        Greetings!
      </header>

      <p
        className="mt-2 text-sm/6 sm:text-base/7 dark:text-zinc-400 text-zinc-500"
      >
        Welcome to our platform! We're glad to have you here.
      </p>
      <div class="mt-6 text-center">
        <CloseButton class="w-full sm:w-auto">Get Started</CloseButton>
      </div>
    </DialogModal>
  </div>
</template>
