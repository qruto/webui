<script lang="ts" setup>
import { Story, Variant } from 'histoire'

const props = defineProps<{
  story: Story
  variant?: Variant
}>()

function hasWrapper() {
  return (props.story.meta as { centered?: boolean })?.centered !== false
    && (props.story.meta as { centered?: boolean }).centered !== false
}
</script>

<template>
  <div
    :class="hasWrapper() ? 'flex items-center justify-wrapper' : undefined"
  >
    <slot />
  </div>
</template>
