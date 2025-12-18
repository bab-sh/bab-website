<template>
  <section id="integrations" class="bg-card/30 relative py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <Badge variant="secondary" class="border-bab/20 bg-bab/10 text-bab-light mb-4">
          IDE Support
        </Badge>
        <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">Works where you work</h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
          First-class IDE support with syntax highlighting, code completion, and task execution
          built right into your editor.
        </p>
      </div>

      <div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <Card class="card-hover group border-border bg-card/50 overflow-hidden">
          <CardHeader class="pb-4">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-4">
                <div class="bg-vscode/10 flex h-16 w-16 items-center justify-center rounded-xl">
                  <Icon name="simple-icons:visualstudiocode" class="text-vscode" size="40" />
                </div>
                <div>
                  <CardTitle class="text-xl text-white">VS Code</CardTitle>
                  <CardDescription class="text-muted-foreground">
                    Visual Studio Code Extension
                  </CardDescription>
                </div>
              </div>
              <Badge
                variant="secondary"
                class="border-muted-foreground/30 bg-muted/50 text-muted-foreground text-xs whitespace-nowrap"
              >
                Coming soon
              </Badge>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <ul class="space-y-2">
              <li
                v-for="feature in vscodeFeatures"
                :key="feature"
                class="text-muted-foreground flex items-center gap-2 text-sm"
              >
                <Icon name="lucide:check" class="text-bab h-4 w-4 shrink-0" />
                {{ feature }}
              </li>
            </ul>
            <Separator class="my-4" />
            <div class="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                class="border-muted-foreground/30 text-muted-foreground flex-1 cursor-not-allowed bg-transparent opacity-50"
                disabled
              >
                <Icon name="lucide:download" class="mr-2 h-4 w-4" />
                Install Extension
              </Button>
              <Button
                variant="outline"
                class="border-muted-foreground/30 text-muted-foreground flex-1 cursor-not-allowed opacity-50"
                disabled
              >
                <Icon name="simple-icons:github" class="mr-2 h-4 w-4" />
                Source
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card class="card-hover group border-border bg-card/50 overflow-hidden">
          <CardHeader class="pb-4">
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-4">
                <div class="bg-intellij/10 flex h-16 w-16 items-center justify-center rounded-xl">
                  <Icon name="simple-icons:intellijidea" class="text-intellij" size="40" />
                </div>
                <div>
                  <CardTitle class="text-xl text-white">IntelliJ IDEA</CardTitle>
                  <CardDescription class="text-muted-foreground">
                    JetBrains IDE Plugin
                  </CardDescription>
                </div>
              </div>
              <Badge
                v-if="intellijVersion"
                variant="secondary"
                class="border-intellij/30 bg-intellij/15 text-intellij text-xs whitespace-nowrap"
              >
                v{{ intellijVersion }}
              </Badge>
            </div>
          </CardHeader>
          <CardContent class="space-y-4">
            <ul class="space-y-2">
              <li
                v-for="feature in intellijFeatures"
                :key="feature"
                class="text-muted-foreground flex items-center gap-2 text-sm"
              >
                <Icon name="lucide:check" class="text-bab h-4 w-4 shrink-0" />
                {{ feature }}
              </li>
            </ul>
            <Separator class="my-4" />
            <div class="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                class="border-intellij text-intellij hover:bg-intellij/10 flex-1 bg-transparent"
                as-child
              >
                <a
                  href="https://plugins.jetbrains.com/plugin/29264"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="lucide:download" class="mr-2 h-4 w-4" />
                  Install Plugin
                </a>
              </Button>
              <Button variant="outline" class="flex-1" as-child>
                <a
                  href="https://github.com/bab-sh/bab-intellij-plugin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="simple-icons:github" class="mr-2 h-4 w-4" />
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
            class="border-border bg-card text-muted-foreground px-4 py-2"
          >
            {{ feature }}
          </Badge>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const { data: intellijData } = await useFetch<{ version: string }>('/api/intellij-version')
  const intellijVersion = computed(() => intellijData.value?.version ?? null)

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
