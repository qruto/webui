<template>
  <component
    :is="tagName"
    :href="href || undefined"
    :target="target || (href && isExternal(href) ? '_blank' : undefined)"
    :rel="rel || (href && isExternal(href) ? 'noreferrer' : undefined)"
  >
    <slot />
    <span v-if="href && isExternal(href)">→</span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isExternal } from '../utils'

const { tag, href } = defineProps<{
  tag?: string
  href?: string
  target?: string
  rel?: string
}>()

const tagName = computed(() => tag || (href ? 'a' : 'span'))
</script>
