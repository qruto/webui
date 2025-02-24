<script setup lang="ts">
import {
  ExclamationCircleIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  GlobeAmericasIcon,
  GlobeAsiaAustraliaIcon,
  GlobeEuropeAfricaIcon,
  RectangleGroupIcon,
  Square2StackIcon,
} from '@heroicons/vue/24/outline'
import { CheckBadgeIcon,
} from '@heroicons/vue/24/solid'
import { onMounted, onUnmounted, ref } from 'vue'
import CodeCopy from './CodeCopy.vue'
import ScrollDemo from './ScrollDemo.vue'

const globe = ref(1)

onMounted(() => {
  const interval = setInterval(() => {
    globe.value = globe.value === 3 ? 1 : globe.value + 1
  }, 2000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})

const packageManager = ref('npx')

const foo = ref(1)
</script>
<template>
  <header class="py-8 text-center">
    <div class="flex items-center h-14 justify-center pr-2.5">
      <!-- <GlobeAmericasIcon
        v-show="globe === 1"
        class="h-12 w-12 text-yellow-500 dark:text-zinc-600"
      />
      <GlobeEuropeAfricaIcon
        v-show="globe === 2"
        class="h-12 w-12 text-yellow-500 dark:text-zinc-600"
      />
      <GlobeAsiaAustraliaIcon
        v-show="globe === 3"
        class="h-12 w-12 text-yellow-500 dark:text-zinc-600"
      /> -->
      <ComputerDesktopIcon
        v-show="globe === 1"
        class="h-14 w-14 text-yellow-500 dark:text-zinc-600"
      />
      <DeviceTabletIcon
        v-show="globe === 2"
        class="h-12 w-12 text-yellow-500 dark:text-zinc-600"
      />
      <DevicePhoneMobileIcon
        v-show="globe === 3"
        class="h-10 w-10 text-yellow-500 dark:text-zinc-600"
      />
      <RectangleGroupIcon class="h-10 w-10 text-yellow-500 dark:text-zinc-600" :class="foo === 1 ? 'block' : 'hidden'" />
    </div>
    <h1 class="font-display mt-4 text-5xl font-bold dark:text-zinc-100">Web UI</h1>
    <p class="mt-6 px-4 text-zinc-400">
      Well-abstracted components that leverage the latest capabilities of the web platform.
    </p>
    <div class="mt-4">
      <label class="text-zinc-500" for="package-manager">I'm using</label>
      <select
        v-model="packageManager"
        id="package-manager"
        class="border-none bg-transparent px-6 outline-none"
      >
        <option value="npx" selected>npm</option>
        <option value="pnpm dlx">pnpm</option>
        <option value="bunx --bun">bun</option>
      </select>
    </div>
    <CodeCopy
      class="mt-2 inline-flex items-center rounded-2xl border border-zinc-200 bg-white font-mono text-yellow-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-yellow-400"
    >
      <template #default
        ><div class="py-3 pr-2 pl-8">{{ packageManager }} webui.dev use</div></template
      >
      <template #icon="{ status }">
        <div
          class="relative flex h-full items-center pr-5 pl-3 text-zinc-400 empty:hidden"
          :class="status === 'copied' ? 'motion-preset-confetti' : undefined"
        >
          <Square2StackIcon class="size-5" v-if="status === 'waiting'" />
          <CheckBadgeIcon
            class="motion-preset-confetti size-5 text-green-500 dark:text-green-400"
            v-if="status === 'copied'"
          />
          <ExclamationCircleIcon class="size-5 text-red-500" v-if="status === 'fail'" />
        </div>
      </template>
    </CodeCopy>
  </header>
  <main class="isolate mx-auto max-w-screen-md px-4">
    <p class="mt-10 text-center font-bold text-zinc-700 dark:text-zinc-300">this is page</p>
    <div class="mt-14">
      <ScrollDemo />
    </div>

    <!-- <section class="w-full">
      <header class="pl-4 text-xl text-zinc-800 dark:text-zinc-400">
        <code class="dark:text-orange-400">&lt;Action&gt;</code>
        <span class="pl-1 text-sm"
          >based on the
          <a
            target="_blank"
            class="text-sm underline hover:text-zinc-600 dark:text-zinc-200"
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button"
          >
            <code>&lt;button&gt;</code></a
          >
          or
          <a
            target="_blank"
            class="text-sm underline hover:text-zinc-600 dark:text-zinc-300"
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a"
          >
            <code>&lt;a&gt;</code></a
          >
          element, depending on <CodeComponent class="text-zinc-300">href</CodeComponent> attribute.
        </span>
      </header>
      <div class="mt-4 text-center">
        <Button class="mx-auto">press me</Button>
      </div>
    </section>
    <section class="mt-10 w-full">
      <header class="pl-4 text-lg text-zinc-800 dark:text-zinc-400">
        <code class="dark:text-indigo-400">&lt;Details&gt;</code>
        <span class="text-sm">
          based on the native
          <a
            target="_blank"
            class="text-sm underline hover:text-zinc-600 dark:text-zinc-200"
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details"
            >&lt;details&gt;</a
          >
          element</span
        >
      </header>
      <DetailsExample class="mt-2" />
    </section>
    <section class="mt-10 w-full max-w-full">
      <ResponsiveDemo component="dialog" name="&lt;DialogModal&gt;" />
    </section> -->
  </main>
  <footer class="py-6 text-center text-zinc-500">
    by
    <a class="underline" target="_blank" href="https://qruto.to">qruto</a>
  </footer>
</template>

<style>
.resizer {
  position: relative;
  bottom: 50%;
  left: 0;
  height: 12rem;
  /* width: 100%; */
  resize: horizontal;
  overflow: hidden;
  /* min-height: var(--min-height-20);
  max-height: calc(100cqh - (var(--gap-2) + var(--min-heigh-20))); */
  transform-origin: 100% 100%;
  scale: 4 1;
  translate: 28px 1.5rem;
  background: green;
  z-index: 9999;
  clip-path: inset(calc(100% - 14px) 0 0 calc(100% - 14px));
  /* Important to hide it */
  opacity: 0;
}
</style>
