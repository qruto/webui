<script setup lang="ts">
import { CheckBadgeIcon, ExclamationCircleIcon, Square2StackIcon } from '@heroicons/vue/24/outline'
import CodeCopy from './CodeCopy.vue'
import ScrollDemo from './ScrollDemo.vue'
</script>
<template>
  <header class="py-8 text-center">
    <h1 class="font-display text-5xl font-bold dark:text-zinc-100">Web UI</h1>
    <p class="mt-6 px-4 text-zinc-400">
      Well-abstracted components that leverage the latest capabilities of the web platform.
    </p>
    <CodeCopy
      class="mt-8 inline-flex items-center text-zinc-900 rounded-2xl border border-zinc-200 bg-white font-mono"
    >
      <template #default><div class="py-3 pl-8 pr-2">npx webui.dev use</div></template>
      <template #icon="{ status }">
        <div
          class="mr-5 h-full flex items-center ml-3 text-zinc-400"
          :class="
            status === 'copied'
              ? '[transform:perspective(1500px)_rotateY(-360deg)] transition-transform duration-500'
              : '[transform:perspective(1500px)_rotateY(0deg)]'
          "
        >
          <Square2StackIcon class="size-5" v-if="status === 'waiting'" />
          <CheckBadgeIcon class="size-5 text-green-500" v-if="status === 'copied'" />
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
