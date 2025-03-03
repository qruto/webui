<template>
  <component
    :is="tag"
    :target="target || (href && isExternal(href) ? '_blank' : undefined)"
    :rel="rel || (href && isExternal(href) ? 'noreferrer' : undefined)"
  >
    <slot />

    <slot name="icon">
      <span v-if="href && isExternal(href)">→</span>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { isExternal } from 'webui.dev'

import type { AnchorHTMLAttributes } from 'vue'

const { href } = defineProps<{
  href: string
} & /* @vue-ignore */ AnchorHTMLAttributes>()

const tag = computed(
  () => (typeof window === 'undefined' || href !== window.location.href ? 'a' : 'span')
)
</script>
