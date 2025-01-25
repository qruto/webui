<template>
  <fieldset class="group space-y-2">
    <header class="flex w-full justify-between pl-4 text-lg text-zinc-800 dark:text-zinc-400">
      <h2>
        <code>{{ name }}</code>
        <span class="text-sm"
          >based on the
          <a
            target="_blank"
            class="text-sm underline hover:text-zinc-600"
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog"
            ><code>&lt;dialog&gt;</code></a
          >
          element
        </span>
      </h2>
      <div class="flex gap-1 pr-4">
        <label
          for="mobile"
          :class="screen === 'wide' ? '!text-zinc-500 dark:!text-zinc-600' : ''"
          class="text-yellow-500 has-checked:text-yellow-500 md:text-zinc-500 dark:md:text-zinc-600"
          ><DevicePhoneMobileIcon class="size-6" />
          <input id="mobile" value="mobile" v-model="screen" class="hidden" type="radio" />
        </label>

        <label
          for="wide"
          :class="screen === 'mobile' ? '!text-zinc-500 dark:!text-zinc-600' : ''"
          class="text-zinc-600 has-checked:text-yellow-500 dark:md:text-yellow-500"
          ><ComputerDesktopIcon class="size-6" />

          <input id="wide" value="wide" v-model="screen" class="peer/wide hidden" type="radio" />
        </label>
      </div>
    </header>

    <div
      :class="[
        'mx-auto grid place-items-center',
        'max-w-sm md:max-w-(--breakpoint-md)',
        'dark:shadow-concave-dark shadow-concave rounded-2xl bg-zinc-200 dark:bg-zinc-900',
        'relative overflow-clip [--device-width:100%] group-has-[#mobile:checked]:[--device-width:var(--container-sm)] group-has-[#wide:checked]:[--device-width:calc(var(--breakpoint-md)+2px)] md:[--device-width:calc(var(--breakpoint-md)+2px)]',
        'md:group-has-[#mobile:checked]:w-(--container-sm)',
        'transition-[width]',
        // ✓ checked wide
        'group-has-[#wide:checked]:h-[35dvh] md:group-has-[#wide:checked]:h-auto md:group-has-[#wide:checked]:w-auto group-has-[#wide:checked]:[&>iframe]:scale-50 md:group-has-[#wide:checked]:[&>iframe]:scale-100',
      ]"
    >
      <iframe
        class="h-[70dvh] w-(--device-width) origin-top-left transition-[width,scale]"
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
  name: {
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
