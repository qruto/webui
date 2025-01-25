<script setup lang="ts">
import ScrollDemo from './ScrollDemo.vue'
import { Button } from '@webui/vue'
</script>
<template>
  <header class="py-8 text-center">
    <h1 class="font-display text-5xl font-bold dark:text-zinc-100">Web UI</h1>
    <p class="mt-4 px-4 text-zinc-400">
      Well-abstracted components that leverage the latest capabilities of the web platform.
    </p>
  </header>
  <main class="isolate mx-auto h-[200dvh] max-w-screen-md px-4">
    <p class="mt-10 text-center font-bold">this is page</p>
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
