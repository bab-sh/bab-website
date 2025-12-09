<template>
  <div class="bg-background text-foreground min-h-screen">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  useHead({
    htmlAttrs: {
      class: 'dark',
      lang: 'en',
    },
  })
</script>
