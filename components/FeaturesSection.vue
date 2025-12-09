<template>
  <section id="features" class="py-24 relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <Badge variant="secondary" class="mb-4 bg-bab/10 border-bab/20 text-bab-light">
          Features
        </Badge>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Everything you need to run tasks
        </h2>
        <p class="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          A modern approach to task automation that just works.
          Simple to learn, powerful to use.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 gap-6">
        <Card
          v-for="feature in features"
          :key="feature.title"
          class="bg-card/50 border-border card-hover"
        >
          <CardHeader>
            <div
              class="w-12 h-12 rounded-lg bg-bab/10 flex items-center justify-center mb-4"
            >
              <component :is="feature.icon" class="h-6 w-6 text-bab-light" />
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

      <div class="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="item in additionalFeatures"
          :key="item"
          class="flex items-center gap-3 text-muted-foreground"
        >
          <Check class="h-5 w-5 text-bab flex-shrink-0" />
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Package,
  Globe,
  FileCode,
  GitBranch,
  Check,
} from 'lucide-vue-next'
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
  'Shell completion (bash, zsh, fish)',
  'Dry-run mode',
  'Verbose logging',
  'Graceful shutdown',
  'Nested task groups',
  'Task descriptions',
  'Colored CLI output',
]
</script>
