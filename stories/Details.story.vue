<script setup lang="ts">
// import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid'
import Details2 from 'components/Details2.vue'

// function appearance()
</script>

<template>
  <Story>
    <Details2
      ref="details"
      class="dark:shadow-concave-dark shadow-concave rounded-3xl bg-zinc-200 px-8 py-4 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500"
      summary-class="flex gap-4 dark:text-zinc-200 rounded-t-3xl items-center justify-between"
      :class="[
        // 'mx-2 mb-0 translate-y-full',
        // 'rounded-t-2xl opacity-100 open:translate-y-0 open:opacity-100 backdrop:open:bg-black/40',
        // 'sm:mx-auto sm:mb-auto sm:rounded-2xl',
        // 'sm:-translate-x-full sm:translate-x-0 sm:translate-y-full sm:opacity-0 sm:open:translate-x-0 sm:[@starting-style]:open:-translate-x-full sm:[@starting-style]:open:translate-y-0 sm:[@starting-style]:open:opacity-0',
        // '[@starting-style]:open:translate-y-full [@starting-style]:backdrop:open:bg-black/0',
      ]"
      :open="open"
      @toggle="onToggle"
    >
      <template #summary="{ open: openSummary }">
        <strong class="font-bold">expand content</strong>
        <PlusIcon v-if="!openSummary" class="size-5" />
        <MinusIcon v-else class="size-5" />
      </template>
      <div class="mt-4">some details</div>
    </Details2>
  </Story>
</template>
