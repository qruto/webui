<script setup>
import { ref, useTemplateRef } from 'vue';

import { DialogModal, CloseButton } from '../.vitepress/ui/DialogModal';

const open = ref(false);
const dialog = useTemplateRef('dialog');

function close() {
  open.value = false;
}

const classes = [
  'mx-2 mb-0 translate-y-full',
  'rounded-t-2xl opacity-100 open:translate-y-0 open:opacity-100 backdrop:open:bg-black/40',
  'sm:mx-auto sm:mb-auto sm:rounded-2xl',
  'sm:opacity-0 sm:[@starting-style]:open:opacity-0 sm:open:translate-x-0 sm:-translate-x-full sm:translate-y-full sm:translate-x-0 sm:[@starting-style]:open:-translate-x-full sm:[@starting-style]:open:translate-y-0',
  '[@starting-style]:open:translate-y-full [@starting-style]:backdrop:open:bg-black/0',
  '',
];
</script>

<template>
  <button @click="open = true">open</button>
  <DialogModal
    ref="dialog"
    class="bg-zinc-100 px-10 pb-6 pt-10 shadow-[shadow:inset_0_2px_theme(colors.white),theme(boxShadow.lg)] dark:bg-zinc-700 dark:shadow-[shadow:inset_0_2px_theme(colors.white/5%),inset_0_-2px_theme(colors.black/7%),theme(boxShadow.lg)]"
    :class="classes"
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
</template>
