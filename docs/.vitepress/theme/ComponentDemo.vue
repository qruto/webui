<template>
  <fieldset class="group">
    <header class="flex w-full justify-between pl-4 text-lg text-zinc-800 dark:text-zinc-200">
      <h2>
        {{ title }}
        <a
          target="_blank"
          class="text-sm underline hover:text-zinc-600"
          href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog"
          >based on the &lt;dialog&gt; element</a
        >
      </h2>
      <div class="flex gap-2 pr-4">
        <label
          for="mobile"
          :class="screen === 'wide' ? '!text-zinc-500 dark:!text-zinc-600' : ''"
          class="has-checked:text-yellow-500"
          ><DevicePhoneMobileIcon class="size-6" />
          <input id="mobile" value="mobile" v-model="screen" class="hidden" type="radio" />
        </label>

        <label
          for="wide"
          :class="screen === 'mobile' ? '!text-zinc-500 dark:!text-zinc-600' : ''"
          class="has-checked:text-yellow-500"
          ><ComputerDesktopIcon class="size-6" />

          <input id="wide" value="wide" v-model="screen" class="peer/wide hidden" type="radio" />
        </label>
      </div>
    </header>

    <div
      :class="[
        'mt-2',
        'dark:shadow-concave-dark shadow-concave rounded-2xl bg-zinc-200 p-1 dark:bg-zinc-900',
        'relative overflow-hidden [--device-width:100%] group-has-[#mobile:checked]:[--device-width:var(--width-sm)] peer-checked/wide:[--device-width:calc(var(--breakpoint-md)+2px)] md:[--device-width:calc(var(--breakpoint-md)+2px)]',
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
import { DevicePhoneMobileIcon } from '@heroicons/vue/24/outline'
import { ComputerDesktopIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
defineProps({
  title: {
    type: String,
    required: true,
  },
  component: {
    type: String,
    required: true,
  },
})

const screen = ref('auto')
// const size = query("md").value ? "laptop" : "mobile";
</script>
