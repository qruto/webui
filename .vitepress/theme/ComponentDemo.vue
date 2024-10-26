<template>
  <fieldset
    class="grid grid-cols-[auto_var(--spacing-6)] justify-items-end gap-y-2"
  >
    <header class="col-span-2 text-right text-sm dark:text-zinc-600">
      preview
    </header>

    <input id="mobile" value="mobile" v-model="screen" class="peer/mobile hidden" type="radio" />
    <label
      for="mobile"
      :class="screen === 'wide' ? '!text-zinc-500 dark:!text-zinc-600' : ''"
      class="text-yellow-500 peer-checked/mobile:text-yellow-500 peer-checked/wide:text-red-500 md:text-zinc-500 dark:text-zinc-600"
      ><DevicePhoneMobileIcon class="size-6"
    /></label>

    <input id="wide" value="wide" v-model="screen" class="peer/wide hidden" type="radio"  />
    <label
      for="wide"
      :class="screen === 'mobile' ? '!text-zinc-500 dark:!text-zinc-600' : ''"
      class="text-zinc-500 md:text-yellow-500 peer-checked/wide:text-yellow-500 dark:text-zinc-600"
      ><ComputerDesktopIcon class="size-6"
    /></label>

    <div
      :class="[
        'col-span-2',
        'rounded-2xl border',
        'relative overflow-hidden [--device-width:var(--width-sm)] peer-checked/mobile:[--device-width:var(--width-sm)] peer-checked/wide:[--device-width:calc(var(--breakpoint-md)+2px)] md:[--device-width:calc(var(--breakpoint-md)+2px)]',
        // ✓ checked wide
        'peer-checked/wide:h-[35dvh] peer-checked/wide:w-sm md:peer-checked/wide:h-auto md:peer-checked/wide:w-auto peer-checked/wide:[&>iframe]:origin-top-left peer-checked/wide:[&>iframe]:scale-50 md:peer-checked/wide:[&>iframe]:scale-100',
      ]"
    >
      <iframe
        class="h-[70dvh] w-[var(--device-width)] transition-[width,scale]"
        :src="`/examples/${component}`"
        frameborder="0"
      ></iframe>
    </div>
  </fieldset>
</template>

<script setup>
import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from '@heroicons/vue/24/outline';
import { ref, useTemplateRef } from 'vue';
defineProps({
  component: {
    type: String,
    required: true,
  },
});

const screen = ref('auto');
// const size = query("md").value ? "laptop" : "mobile";
</script>
