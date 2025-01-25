<template>
  <section class="flex h-[30dvh] flex-col justify-between">
    <header class="space-y-4 text-center text-3xl text-zinc-800 dark:text-zinc-200">
      <div>
        scroll <span class="inline-block animate-bounce text-xl dark:text-zinc-400">↓</span>
      </div>
      <div class="pointer-fine:inline hidden">🖱️</div>
      <div class="pointer-coarse:inline hidden">👆</div>
    </header>
    <p class="appearing">the main way users navigate content</p>
  </section>
</template>

<style>
.appearing {
  animation-timeline: view(block 20% 60%);

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
