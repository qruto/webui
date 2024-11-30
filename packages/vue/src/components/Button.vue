<script setup lang="ts">
import { computed } from 'vue'

export type ButtonProps = {
  href?: string
  variant?: 'inverse' | 'adaptive' | 'light' | 'plain'
}

const { variant = 'plain', href } = defineProps<ButtonProps>()

const containerClass = 'inline-block text-base/6 sm:text-sm/6'

const styles = {
  base: [
    // Base
    'relative group isolate rounded-full border font-semibold',
    // Sizing
    'px-5 py-1.5 sm:px-7 sm:py-1.5',
    // Focus
    'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 dark:focus-visible:outline-yellow-700',
    // TODO: Hover
    'hover:after:absolute hover:after:inset-px hover:after:rounded-full hover:after:opacity-100 after:opacity-0 after:duration-200 hover:after:transition-opacity',
    // TODO: Visited
    // Disabled
    'disabled:opacity-50 disabled:pointer-events-none',
    // Icon
    // '[&>span>[data-slot=icon]]:-mx-0.5 [&>span>[data-slot=icon]]:my-0.5 [&>span>[data-slot=icon]]:size-5 [&>span>[data-slot=icon]]:shrink-0 [&>span>[data-slot=icon]]:sm:my-1 [&>span>[data-slot=icon]]:sm:size-4',
  ],
  // solid: [
  //   // Optical border, implemented as the button background to avoid corner artifacts
  //   'border-transparent bg-[--btn-border]',
  //   // Dark mode: border is rendered on `after` so background is set to button background
  //   'dark:bg-[--btn-bg]',
  //   // Button background, implemented as foreground layer to stack on top of pseudo-border layer
  //   'before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-[--btn-bg]',
  //   // Drop shadow, applied to the inset `before` layer so it blends with the border
  //   'before:shadow',
  //   // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
  //   'dark:before:hidden',
  //   // Dark mode: Subtle white outline is applied using a border
  //   'dark:border-white/5',
  //   // Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
  //   'after:absolute after:inset-0 after:-z-10 after:rounded-lg',
  //   // Inner highlight shadow
  //   'after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)]',
  //   // White overlay on hover
  //   'after:active:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay]',
  //   // Dark mode: `after` layer expands to cover entire button
  //   'dark:after:-inset-px dark:after:rounded-lg',
  //   // Disabled
  //   'disabled:shadow-none disabled:after:shadow-none',
  // ],
  plain: [
    // Base
    'border-transparent',

    // Dark mode
    'dark:text-zinc-100 dark:active:shadow-[shadow:inset_0_2px_theme(colors.black/15%)] dark:active:top-px',

    // Hover
    'hover:after:bg-white/40 dark:hover:after:bg-white/5',

    // Active
    'active:top-px active:shadow-inner',
  ],

  outline: [
    // Dark mode
    'dark:text-zinc-100 dark:border-zinc-700 dark:active:shadow-[shadow:inset_0_2px_theme(colors.black/15%)]',

    // Active
    'active:shadow-inner',

    // Hover
    'hover:after:bg-white/30 dark:hover:after:bg-white/5',
  ],

  inverse: [
    // Base
    'border-zinc-600 text-zinc-100 bg-zinc-800 shadow-[shadow:inset_0_1px_theme(colors.white/20%),inset_0_-2px_theme(colors.black)]',
    // Dark mode
    'dark:text-zinc-950 dark:bg-zinc-100 dark:border-zinc-900 dark:shadow-[shadow:inset_0_2px_theme(colors.white),inset_0_-1px_theme(colors.black/30%)]',
    // Hover
    'hover:after:bg-white/10 dark:hover:after:bg-white/40',
    // Active
    'active:shadow-[shadow:inset_0_2px_theme(colors.black),inset_0_-1px_theme(colors.white/20%)] dark:active:shadow-[shadow:inset_0_1px_theme(colors.black/30%),inset_0_-2px_theme(colors.white)]',
  ],

  adaptive: [
    // Base
    'text-zinc-900 border border-zinc-200 bg-zinc-50 shadow-[shadow:inset_0_1px_theme(colors.white),inset_0_-1px_theme(colors.black/20%)]',
    // Dark mode
    'dark:text-zinc-200 dark:border-zinc-900 dark:shadow-[shadow:inset_0_1px_theme(colors.white/10%),inset_0_-1px_theme(colors.black/90%)] dark:bg-zinc-900',
    // Hover
    'hover:after:bg-white/30 dark:hover:after:bg-white/5',
    // Active
    'active:top-px active:shadow-[shadow:inset_0_1px_theme(colors.black/10%),inset_0_-1px_theme(colors.white)] dark:active:shadow-[shadow:inset_0_1px_theme(colors.black/40%),inset_0_-1px_theme(colors.white/5%)]',
  ],

  light: [
    // Base
    'text-zinc-800 border border-zinc-200 bg-zinc-50 shadow-[shadow:inset_0_1px_theme(colors.white/30%),inset_0_-1px_theme(colors.black/40%)]',
    // Dark mode
    'dark:text-zinc-200 dark:border-zinc-900 dark:shadow-[shadow:inset_0_1px_theme(colors.white/10%),inset_0_-1px_theme(colors.black/40%)] dark:bg-zinc-600',
    // Active
    'active:shadow-[shadow:inset_0_1px_theme(colors.black/40%),inset_0_-1px_theme(colors.white/30%)] dark:active:shadow-[shadow:inset_0_1px_theme(colors.black/40%),inset_0_-1px_theme(colors.white/7%)]',
    // Hover
    'hover:after:bg-white/30 dark:hover:after:bg-white/10',
  ],
}

const classes = computed(() => [...styles.base, ...styles[variant]])

const attributes = {
  'data-component': 'button',
}
</script>

<template>
  <a
    v-if="typeof href !== 'undefined'"
    :class="[containerClass, classes]"
    :href
    v-bind="attributes"
  >
    <slot />
  </a>
  <button v-else class="cursor-default" :class="classes" v-bind="attributes">
    <span
      :class="[
        containerClass,
        variant !== 'plain' ? 'group-active:relative group-active:top-px' : '',
      ]"
    >
      <span
        class="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      />
      <slot />
    </span>
  </button>
</template>
