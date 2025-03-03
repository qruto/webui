<script setup lang="ts">
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'vue'

type ActionProps =
  /* @vue-ignore */
  | (ButtonHTMLAttributes & { href?: never })
  | (Omit<AnchorHTMLAttributes, 'href'> & { href: string })

const props = defineProps<ActionProps>()
const href = 'href' in props ? props.href : undefined
</script>

<template>
  <component :is="href ? 'a' : 'button'" :href="href" data-component="action">
    <slot />
    <span
      class="absolute top-1/2 left-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
      aria-hidden="true"
    />
  </component>
</template>
