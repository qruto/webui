<script setup lang="ts">
import { useData } from 'vitepress';
import DialogModalExample from '../../examples/DialogModalExample.vue';
import HomePage from './HomePage.vue';

// https://vitepress.dev/reference/runtime-api#usedata
const { frontmatter } = useData();
const exampleComponents = {
  dialog: DialogModalExample,
};
</script>

<template>
  <HomePage v-if="frontmatter.home" />
  <div
    class="h-screen w-screen"
    v-else-if="typeof frontmatter.example !== 'undefined'"
  >
    <component :is="exampleComponents[frontmatter.example]" />
  </div>
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
</template>
