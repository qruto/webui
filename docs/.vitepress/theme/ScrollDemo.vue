<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

import type { ShallowRef } from 'vue'
import { onMounted, useTemplateRef } from 'vue'

const section2 = useTemplateRef('section2')
const section3 = useTemplateRef('section3')

function show(target: Element) {
  target.classList.remove('opacity-0')
  target.classList.add('opacity-100', 'transition-opacity', 'duration-500')
  target.classList.remove('pointer-events-none')
}

onMounted(() => {
  hide(section2.value as Element)
  hide(section3.value as Element)
})

function hide(target: Element) {
  target.classList.add('opacity-0')
  target.classList.remove('opacity-100')
  target.classList.add('pointer-events-none')
}
type TemplateRef = Readonly<ShallowRef<HTMLElement | null>>

function showOnPassScreenPercent(section: TemplateRef, percent: number) {
  useIntersectionObserver(
    section,
    ([{ isIntersecting, target }]) => (isIntersecting ? show(target) : hide(target)),
    {
      threshold: 0,
      rootMargin: `0px 0px -${percent}% 0px`,
    },
  )
}

showOnPassScreenPercent(section2, 50)
showOnPassScreenPercent(section3, 30)
</script>
<template>
  <section class="flex h-[30dvh] flex-col text-center">
    <header class="font-display space-y-4 text-center text-3xl text-zinc-400 dark:text-zinc-500">
      <div>
        scroll
        <span class="inline-block animate-bounce text-xl text-zinc-500 dark:text-zinc-400">↓</span>
      </div>
      <div class="pointer-fine:inline hidden">🖱️</div>
      <div class="pointer-coarse:inline hidden">👆</div>
    </header>
    <p class="appearing mt-20">the main way to navigate content</p>
  </section>
  <section
    ref="section2"
    class="mx-auto h-[30dvh] overflow-y-scroll rounded-xl border bg-zinc-900 md:w-md dark:border-zinc-700"
  >
    <div class="flex h-[50dvh] w-full flex-col items-center justify-center pt-26">
      <div class="font-display w-full text-center text-3xl dark:text-zinc-500">
        scroll inside <span class="inline-block animate-bounce text-xl dark:text-zinc-400">↓</span>
      </div>
      <header class="halfway-scroll-appearing mt-20">it might appear for content parts</header>
    </div>
  </section>
  <section
    ref="section3"
    class="mx-auto mt-12 h-[30dvh] scroll-pl-10 overflow-x-scroll rounded-xl border bg-zinc-900 pl-10 md:w-md dark:border-zinc-700"
  >
    <div class="flex h-full w-[70dvh] items-center justify-center pt-26">
      <div class="font-display flex w-full items-center text-center text-3xl dark:text-zinc-500">
        scroll horizontal
        <span class="inline-block animate-bounce text-xl dark:text-zinc-400">→</span>
      </div>
      <header class="halfway-scroll-appearing mt-20">it might appear for content parts</header>
    </div>
  </section>
</template>

<style>
.halfway-scroll-appearing {
  animation-timeline: scroll();

  animation-name: appear_half;
  animation-fill-mode: both;
  animation-timing-function: linear;
}

@keyframes appear_half {
  from {
    opacity: 0;
  }

  50% {
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translate(0, -30px);
  }
}

@keyframes show {
  from {
    display: none;
  }

  to {
    display: block;
  }
}

.appearing {
  animation-timeline: view(block 50% 50%);

  animation-name: appear;
  animation-fill-mode: both;
  animation-timing-function: linear;
}

@keyframes fade {
  from {
    pointer-events: none;
    opacity: 0;
    /* transition-property: all; */
    /* transition-duration: 1s; */
  }

  to {
    pointer-events: auto;
    opacity: 0;
  }
}

@keyframes appear {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translate(0, -50px);
  }
}
</style>
