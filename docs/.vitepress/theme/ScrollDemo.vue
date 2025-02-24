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
showOnPassScreenPercent(section3, 20)
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
    <p class="appearing mt-[12dvh]">the main way to navigate content</p>
  </section>
  <section
    ref="section2"
    class="mx-auto h-[30dvh] overflow-y-scroll rounded-xl border bg-zinc-200 border-zinc-300 dark:bg-zinc-900 md:w-md dark:border-zinc-700"
  >
    <div class="flex h-[50dvh] pt-[6dvh] w-full flex-col items-center justify-around">
      <div class="font-display w-full sticky top-6 text-center text-3xl text-zinc-400 dark:text-zinc-500">
        scroll inside <span class="inline-block animate-bounce text-xl text-zinc-500 dark:text-zinc-400">↓</span>
      </div>
      <header class="halfway-scroll-appearing pt-[6dvh]">it might appear for content parts</header>
    </div>
  </section>
  <section
    ref="section3"
    class="w-screen relative left-[calc(-50vw+50%)] mt-12 h-[20dvh] overflow-x-scroll rounded-x-xl border-y bg-zinc-200 border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700"
  >
    <div class="flex relative w-[200vw] md:w-[150vw] h-full items-center">
      <div class="flex sticky -left-1/3 w-screen items-center justify-center">
        <div class="font-display sticky left-5 md:left-12 text-zinc-400 md:animation-none shrink-width flex items-center justify-center text-center text-3xl dark:text-zinc-500">
            scroll horizontal
            <span class="inline-block animate-bounce-right ml-2 text-xl text-zinc-500 dark:text-zinc-400">→</span>
        </div>
      </div>
      <header class="text-center shrink-0 absolute right-0 max-w-[30vw] md:max-w-full animation-range -translate-x-1/2 md:translate-0 md:w-screen motion-preset-fade timeline-scroll-inline">perceive it as an off-canvas tape</header>
    </div>
  </section>
</template>

<style>
.shrink-width {
  animation-name: shrink-width;

  animation-timeline: scroll(inline);

  animation-fill-mode: both;
  animation-timing-function: linear;
}

@keyframes shrink-width {
  from {
    width: 50dvw;
    font-size: var(--text-3xl);
  }
  to {
    width: 30dvw;
    font-size: var(--text-xl);
  }
}

.halfway-scroll-appearing {
  animation-timeline: scroll();

  animation-name: appear_half;
  animation-fill-mode: both;
  animation-timing-function: linear;
}

.timeline-scroll-inline {
  animation-timeline: scroll(inline);

  /* animation-name: appear; */
  animation-fill-mode: both;
  animation-timing-function: linear;
}

.animation-range {
  animation-range: contain;
}

.animation-appear {
  animation-name: appear;
}

@keyframes appear-right {
  from {
    opacity: 0;
    transform: translate(100px, 0);
  }

  50% {
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translate(0, 0);
  }
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

.appearing {
  animation-timeline: view(block 40% 55%);

  animation-name: appear;
  animation-fill-mode: both;
  animation-timing-function: linear;
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
