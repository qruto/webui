<template>
  <fieldset
    class="grid grid-cols-[auto_var(--spacing-6)_var(--spacing-6)_0.8rem] gap-x-1 gap-y-2"
  >
    <header class="w-full pl-4 text-lg text-zinc-800 dark:text-zinc-200">
      {{ title }}
      <a
        target="_blank"
        class="text-sm underline hover:text-zinc-600"
        href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog"
        >based on the &lt;dialog&gt; element</a
      >
    </header>

    <input
      id="mobile"
      value="mobile"
      v-model="screen"
      class="peer/mobile hidden"
      type="radio"
    />
    <label
      for="mobile"
      :class="screen === 'wide' ? '!text-zinc-500 dark:!text-zinc-600' : ''"
      class="text-yellow-500 peer-checked/mobile:text-yellow-500 peer-checked/wide:text-red-500 md:text-zinc-500 dark:text-yellow-400 dark:md:text-zinc-600"
      ><DevicePhoneMobileIcon class="size-6"
    /></label>

    <input
      id="wide"
      value="wide"
      v-model="screen"
      class="peer/wide hidden"
      type="radio"
    />
    <label
      for="wide"
      :class="screen === 'mobile' ? '!text-zinc-500 dark:!text-zinc-600' : ''"
      class="text-zinc-500 peer-checked/wide:text-yellow-500 md:text-yellow-500 dark:text-zinc-600 dark:md:text-yellow-400"
      ><ComputerDesktopIcon class="size-6"
    /></label>

    <div
      :class="[
        'col-span-4',
        'dark:shadow-concave-dark rounded-2xl bg-zinc-200 p-1 shadow-concave dark:bg-zinc-900',
        'relative overflow-hidden [--device-width:100%] peer-checked/wide:[--device-width:calc(var(--breakpoint-md)+2px)] peer-checked/mobile:[--device-width:var(--width-sm)] md:[--device-width:calc(var(--breakpoint-md)+2px)]',
        // ✓ checked wide
        'peer-checked/wide:h-[35dvh] peer-checked/wide:w-80 md:peer-checked/wide:h-auto md:peer-checked/wide:w-auto peer-checked/wide:[&>iframe]:origin-top-left peer-checked/wide:[&>iframe]:scale-50 md:peer-checked/wide:[&>iframe]:scale-100',
        'md:[&>iframe]:-ml-3',
      ]"
    >
      <iframe
        class="h-[70dvh] w-[var(--device-width)] rounded-2xl transition-[width,scale]"
        :src="`/examples/${component}`"
        frameborder="0"
      ></iframe>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { ComputerDesktopIcon } from '@heroicons/vue/24/solid';
import { DevicePhoneMobileIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
defineProps({
  title: {
    type: String,
    required: true,
  },
  component: {
    type: String,
    required: true,
  },
});

const screen = ref('auto');
// const size = query("md").value ? "laptop" : "mobile";
</script>
