<template>
  <div class="min-h-screen bg-background text-foreground">
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
