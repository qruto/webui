<script setup lang="ts">
import DetailsExample from '../../examples/DetailsExample.vue'
import ComponentDemo from './ComponentDemo.vue'

import { Button } from '@webui/vue'
</script>
<template>
  <header class="py-8 text-center">
    <h1 class="font-display text-5xl font-bold dark:text-zinc-100">Web UI</h1>
    <p class="mt-4 px-4 text-zinc-500">
      Well-abstracted components that leverage the latest capabilities of the web platform.
    </p>
  </header>
  <main class="mx-auto flex max-w-screen-md flex-col items-center px-4">
    <!-- <div class="max-w-96">
      <div class="relative inline-block">
        <div class="absolute inset-x-0 h-24 bg-red-500"></div>
        <div
          class="h-12 isolate scale-[4] w-64 resize-x overflow-hidden border border-zinc-900 [transform-origin:100%_100%]"
        ></div>
      </div>
    </div> -->
    <section class="w-full">
      <header class="pl-4 text-lg text-zinc-800 dark:text-zinc-200">
        Button / Link
        <span class="text-sm"
          >based on the
          <a
            target="_blank"
            class="text-sm underline hover:text-zinc-600"
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button"
          >
            &lt;button&gt;</a
          >
          or
          <a
            target="_blank"
            class="text-sm underline hover:text-zinc-600"
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a"
          >
            &lt;a&gt;</a
          >
          element, depending on <code>href</code> attribute.
        </span>
      </header>
      <div class="mt-4 text-center">
        <Button class="mx-auto">press me</Button>
      </div>
    </section>
    <section class="mt-10 w-full">
      <header class="pl-4 text-lg text-zinc-800 dark:text-zinc-200">
        Details
        <a
          target="_blank"
          class="text-sm underline hover:text-zinc-600"
          href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details"
          >based on the &lt;details&gt; element</a
        >
      </header>
      <DetailsExample class="mt-2" />
    </section>
    <section class="mt-10">
      <ComponentDemo component="dialog" title="Dialog Modal" />
    </section>
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
