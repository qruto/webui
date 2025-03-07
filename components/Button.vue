<script setup lang="ts">
import { TouchTarget } from 'webui.dev'
import { useSound } from '@vueuse/sound'

import clickSound from './click-sound.mp3'

import type { ButtonHTMLAttributes } from 'vue'

export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  level?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'neutral'
}

const { level = 'primary' } = defineProps<ButtonProps>()

const { play } = useSound(clickSound)

const styles = {
  base: [
    // base
    'relative font-display inline-flex group isolate rounded-full border font-semibold',
    // sizing
    'px-5 py-1.5 sm:px-7 sm:py-1.5',
    // focus
    'focus:outline-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-yellow-500 dark:focus-visible:outline-yellow-700',
    // hover
    'after:absolute after:rounded-full after:shadow-none after:shadow-white after:inset-0 after:opacity-0 after:duration-500 after:transition-opacity hover:after:opacity-100',
    // button background, implemented as foreground layer to stack on top of pseudo-border layer
    'before:absolute before:inset-0 before:rounded-full before:bg-transparent before:shadow-sm',
    // active (pressed)
    'active:[&>span]:top-px active:[&>span]:relative active:before:shadow-none',
    // disabled
    'disabled:opacity-50 disabled:pointer-events-none',
    // focus
    '',
    // :link
    '',
    // enabled
    '',
    // icon
    // '[&>span>[data-slot=icon]]:-mx-0.5 [&>span>[data-slot=icon]]:my-0.5 [&>span>[data-slot=icon]]:size-5 [&>span>[data-slot=icon]]:shrink-0 [&>span>[data-slot=icon]]:sm:my-1 [&>span>[data-slot=icon]]:sm:size-4',
  ],
  accent: {
    solid: [
      // Hover
      'hover:after:bg-white/30 dark:hover:after:bg-white/3',
      // Active
      'active:inset-shadow-concave-light',
    ],
    'solid-inverse': [
      // Base
      'border-zinc-600 text-zinc-100 bg-zinc-800 shadow-[shadow:inset_0_1px_theme(colors.white/20%),inset_0_-2px_theme(colors.black)]',
      // Dark mode
      'dark:text-zinc-950 dark:bg-zinc-100 dark:border-zinc-900 dark:shadow-[shadow:inset_0_2px_theme(colors.white),inset_0_-1px_theme(colors.black/30%)]',
      // Hover
      'hover:after:bg-white/10 dark:hover:after:bg-white/40',
      // Active
      'active:shadow-[shadow:inset_0_2px_theme(colors.black),inset_0_-1px_theme(colors.white/20%)] dark:active:shadow-[shadow:inset_0_1px_theme(colors.black/30%),inset_0_-2px_theme(colors.white)]',
    ],
    outline: [],
    plain: [],
  },

  // button color related styles
  color: {
    zinc: [
      'text-zinc-900 border-zinc-200 bg-zinc-50',
      'dark:text-zinc-200 dark:border-zinc-900 dark:bg-zinc-900 dark:inset-shadow-convex-dark dark:inset-shadow-zinc-900',
      'dark:active:inset-shadow-concave-dark '
    ],
    red: [
      'text-red-900 border-red-200 bg-red-50',
      'dark:text-red-100 dark:border-red-950 dark:bg-red-900',
    ],
    primary: [],
    yellow: ['dark:text-blue-100 dark:border-yellow-950/80 dark:bg-yellow-900'],
    green: [
      'text-green-800 border-green-300 bg-green-100 inset-shadow-green-100',
      'dark:text-green-800 dark:border-green-950/80 dark:bg-green-100',
    ],
  },
}

// returns class string
function appearance(accent: keyof typeof styles.accent, color: keyof typeof styles.color) {
  return [...styles.base, ...styles.accent[accent], ...styles.color[color]].join(' ')
}
</script>

<template>
  <button
    data-component="button"
    type="button"
    :class="{
      [appearance('solid', 'green')]: level === 'primary',
    }"
    @click="() => play()"
  >
    <span>
      <slot />
    </span>
    <TouchTarget />
  </button>
</template>
