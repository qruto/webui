<script setup>
import { useData } from "vitepress";
const { site } = useData();
</script>
<template>
  <div>
    <h1 class="text-red-500">{{ site.title }}</h1>
    <p>{{ site.description }}</p>
    <ul>
      <li><a href="/markdown-examples.html">Markdown Examples</a></li>
      <li><a href="/api-examples.html">API Examples</a></li>
    </ul>
  </div>
</template>
