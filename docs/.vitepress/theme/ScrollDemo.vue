<template>
  <section class="flex h-[30dvh] flex-col text-center">
    <header class="font-display space-y-4 text-center text-3xl text-zinc-800 dark:text-zinc-500">
      <div>
        scroll <span class="inline-block animate-bounce text-xl dark:text-zinc-400">↓</span>
      </div>
      <div class="pointer-fine:inline hidden">🖱️</div>
      <div class="pointer-coarse:inline hidden">👆</div>
    </header>
    <p class="appearing mt-20">the main way to navigate content</p>
  </section>
  <section
    class="appear-half-screen mx-auto h-[30dvh] overflow-y-scroll rounded-xl border bg-zinc-900 md:w-md dark:border-zinc-700"
  >
    <div class="flex h-[50dvh] w-full flex-col items-center justify-center pt-26">
      <div class="font-display w-full text-center text-3xl dark:text-zinc-500">
        scroll inside <span class="inline-block animate-bounce text-xl dark:text-zinc-400">↓</span>
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

.appear-half-screen {
  animation-timeline: view(block 60% 50%);

  animation-name: fade;
  animation-fill-mode: both;
  animation-timing-function: linear;
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
  }

  20% {
    pointer-events: auto;
    opacity: 0;
  }

  60% {
    opacity: 1;
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
