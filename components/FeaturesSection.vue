<template>
  <section id="features" class="relative py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <Badge variant="secondary" class="border-bab/20 bg-bab/10 text-bab-light mb-4">
          Features
        </Badge>
        <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">
          Everything you need to run tasks
        </h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
          A modern approach to task automation that just works. Simple to learn, powerful to use.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2">
        <Card
          v-for="feature in features"
          :key="feature.title"
          class="card-hover border-border bg-card/50"
        >
          <CardHeader>
            <div class="bg-bab/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
              <component :is="feature.icon" class="text-bab-light h-6 w-6" />
            </div>
            <CardTitle class="text-white">{{ feature.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription class="text-muted-foreground text-sm">
              {{ feature.description }}
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div class="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in additionalFeatures"
          :key="item"
          class="text-muted-foreground flex items-center gap-3"
        >
          <Check class="text-bab h-5 w-5 flex-shrink-0" />
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { Package, Globe, FileCode, GitBranch, Check } from 'lucide-vue-next'
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
  import { Badge } from '@/components/ui/badge'

  const features = [
    {
      icon: Package,
      title: 'Zero Dependencies',
      description: 'Pure Go binary. Just download and run. No runtime or package manager required.',
    },
    {
      icon: Globe,
      title: 'Cross-Platform',
      description: 'Works seamlessly on Windows, macOS, and Linux. One config, any OS.',
    },
    {
      icon: FileCode,
      title: 'Simple YAML',
      description: 'Clean, readable configuration. No complex syntax to learn.',
    },
    {
      icon: GitBranch,
      title: 'Task Dependencies',
      description: 'Automatic prerequisite execution. Never run tasks in the wrong order.',
    },
  ]

  const additionalFeatures = [
    'Interactive TUI with fuzzy search',
    'Platform-specific commands',
    'Environment variables',
    'Shell completion (bash, zsh, fish)',
    'Dry-run mode',
    'Verbose logging',
    'Graceful shutdown',
    'Nested task groups',
    'Task descriptions',
    'Colored CLI output',
  ]
</script>
