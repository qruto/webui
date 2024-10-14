<script setup>
import { useData } from "vitepress";
import Home from "./Home.vue";

// https://vitepress.dev/reference/runtime-api#usedata
const { frontmatter } = useData();
</script>

<template>
  <Home v-if="frontmatter.home" />
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
</template>
