<template>
  <div
    class="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-4"
  >
    <h1 class="text-8xl font-bold text-white">{{ error?.statusCode || 500 }}</h1>
    <p class="text-muted-foreground mt-4 text-xl">
      {{ error?.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
    </p>
    <p class="text-muted-foreground mt-2 text-sm">
      {{
        error?.statusCode === 404
          ? "The page you're looking for doesn't exist or has been moved."
          : 'An unexpected error occurred. Please try again later.'
      }}
    </p>
    <NuxtLink
      to="/"
      class="mt-8 inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
    >
      <Icon name="lucide:arrow-left" class="h-4 w-4" />
      Back to Home
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
  import type { NuxtError } from '#app'

  const props = defineProps<{
    error: NuxtError
  }>()

  useHead({
    htmlAttrs: { class: 'dark' },
    title: props.error?.statusCode === 404 ? 'Page not found - Bab' : 'Error - Bab',
  })
</script>
