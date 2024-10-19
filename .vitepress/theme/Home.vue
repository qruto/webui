<script setup>
import { useData } from "vitepress";
import ComponentExample from "./ComponentExample.vue";
const { site } = useData();
</script>
<template>
  <header>Web UI</header>
  <main class="">
    <!-- <div class="max-w-96">
      <div class="relative inline-block">
        <div class="absolute inset-x-0 h-24 bg-red-500"></div>
        <div
          class="h-12 isolate scale-[4] w-64 resize-x overflow-hidden border border-zinc-900 [transform-origin:100%_100%]"
        ></div>
      </div>
    </div> -->
    <section>
      <header>Dialog Modal</header>
      <ComponentExample component="dialog" />
    </section>
  </main>
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
