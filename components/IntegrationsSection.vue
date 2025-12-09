<template>
  <section id="integrations" class="py-24 relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <Badge variant="secondary" class="mb-4 bg-bab/10 border-bab/20 text-bab-light">
          IDE Support
        </Badge>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Works where you work
        </h2>
        <p class="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          First-class IDE support with syntax highlighting, code completion,
          and task execution built right into your editor.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card class="bg-card/50 border-border card-hover overflow-hidden group">
          <CardHeader class="pb-4">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-xl bg-vscode/10 flex items-center justify-center">
                  <Icon icon="simple-icons:visualstudiocode" class="w-10 h-10 text-vscode" />
                </div>
                <div>
                  <CardTitle class="text-white text-xl">VS Code</CardTitle>
                  <CardDescription class="text-muted-foreground">
                    Visual Studio Code Extension
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary" class="text-xs bg-muted/50 border-muted-foreground/30 text-muted-foreground">
                Coming soon
              </Badge>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <ul class="space-y-2">
              <li v-for="feature in vscodeFeatures" :key="feature" class="flex items-center gap-2 text-sm text-muted-foreground">
                <Check class="h-4 w-4 text-bab flex-shrink-0" />
                {{ feature }}
              </li>
            </ul>
            <Separator class="my-4" />
            <div class="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                class="flex-1 bg-transparent border-muted-foreground/30 text-muted-foreground cursor-not-allowed opacity-50"
                disabled
              >
                <Download class="mr-2 h-4 w-4" />
                Install Extension
              </Button>
              <Button
                variant="outline"
                class="flex-1 border-muted-foreground/30 text-muted-foreground cursor-not-allowed opacity-50"
                disabled
              >
                <Icon icon="simple-icons:github" class="mr-2 h-4 w-4" />
                Source
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card class="bg-card/50 border-border card-hover overflow-hidden group">
          <CardHeader class="pb-4">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-xl bg-intellij/10 flex items-center justify-center">
                  <Icon icon="simple-icons:intellijidea" class="w-10 h-10 text-intellij" />
                </div>
                <div>
                  <CardTitle class="text-white text-xl">IntelliJ IDEA</CardTitle>
                  <CardDescription class="text-muted-foreground">
                    JetBrains IDE Plugin
                  </CardDescription>
                </div>
              </div>
              <Badge v-if="intellijVersion" variant="secondary" class="text-xs bg-intellij/15 border-intellij/30 text-intellij">
                v{{ intellijVersion }}
              </Badge>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <ul class="space-y-2">
              <li v-for="feature in intellijFeatures" :key="feature" class="flex items-center gap-2 text-sm text-muted-foreground">
                <Check class="h-4 w-4 text-bab flex-shrink-0" />
                {{ feature }}
              </li>
            </ul>
            <Separator class="my-4" />
            <div class="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                class="flex-1 bg-transparent border-intellij text-intellij hover:bg-intellij/10"
                as-child
              >
                <a
                  href="https://plugins.jetbrains.com/plugin/29264"
                  target="_blank"
                  rel="noopener"
                >
                  <Download class="mr-2 h-4 w-4" />
                  Install Plugin
                </a>
              </Button>
              <Button
                variant="outline"
                class="flex-1"
                as-child
              >
                <a
                  href="https://github.com/bab-sh/bab-intellij-plugin"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon icon="simple-icons:github" class="mr-2 h-4 w-4" />
                  Source
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div class="mt-16 text-center">
        <p class="text-muted-foreground mb-6">Both extensions provide:</p>
        <div class="flex flex-wrap justify-center gap-3">
          <Badge
            v-for="feature in sharedFeatures"
            :key="feature"
            variant="secondary"
            class="bg-card border-border text-muted-foreground px-4 py-2"
          >
            {{ feature }}
          </Badge>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { Check, Download } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const intellijVersion = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('/api/intellij-version')
    const data = await res.json()
    intellijVersion.value = data.version
  } catch {}
})

const vscodeFeatures = [
  'Code completion for tasks and deps',
  'Go to definition (Ctrl+Click)',
  'Find all references',
  'Run tasks from Code Lens',
  'Task tree view in Explorer',
]

const intellijFeatures = [
  'Syntax highlighting',
  'JSON Schema validation',
  'Task navigation (Ctrl+Click)',
  'Run configurations',
  'Hierarchical task browser',
]

const sharedFeatures = [
  'Syntax Highlighting',
  'Auto-completion',
  'Error Detection',
  'Task Execution',
  'Go to Definition',
]
</script>
