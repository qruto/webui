<template>
  <iframe
    class="max-w-[--device-width] border rounded-full [--device-width:var(--width-sm)] md:[--device-width:var(--breakpoint-md)]"
    :src="`/examples/${component}`"
    frameborder="0"
  ></iframe>
</template>

<script setup>
import { oneOf, query } from "../utils";

defineProps({
  component: {
    type: String,
    required: true,
  },
});

// const size = query("md").value ? "laptop" : "mobile";
</script>
