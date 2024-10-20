<template>
  <iframe
    class="w-[var(--device-width)] min-h-[70dvh] border rounded-2xl [--device-width:var(--width-sm)] md:[--device-width:var(--breakpoint-md)]"
    :src="`/examples/${component}`"
    frameborder="0"
  ></iframe>
</template>

<script setup>
defineProps({
  component: {
    type: String,
    required: true,
  },
});

// const size = query("md").value ? "laptop" : "mobile";
</script>
