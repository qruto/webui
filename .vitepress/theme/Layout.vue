<script setup>
import { useData } from "vitepress";
import Home from "./Home.vue";
import DialogModalExample from "../../examples/DialogModalExample.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const { frontmatter } = useData();
const exampleComponents = {
  dialog: DialogModalExample,
};
</script>

<template>
  <Home v-if="frontmatter.home" />
  <div v-else-if="typeof frontmatter.example !== 'undefined'">
    <component :is="exampleComponents[frontmatter.example]" />
  </div>
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
</template>
