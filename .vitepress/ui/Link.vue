<template>
  <component
    :is="tag"
    :href="href || undefined"
    :target="target || (isExternal ? '_blank' : undefined)"
    :rel="rel || (isExternal ? 'noreferrer' : undefined)"
  >
    <slot />
    <span v-if="isExternal">→</span>
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { isExternal } from '../utils'

const props = defineProps({
  tag: {
    type: String,
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '',
  },
  rel: {
    type: String,
    default: '',
  },
});

const tag = computed(() => props.tag || (props.href ? 'a' : 'span'));
const isExternal = computed(
  () => (props.href && isExternal(props.href)) || props.target === '_blank',
);
</script>
