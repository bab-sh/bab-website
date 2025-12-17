<template>
  <section id="install" class="relative py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <Badge variant="secondary" class="border-bab/20 bg-bab/10 text-bab-light mb-4">
          Installation
        </Badge>
        <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">Get started in seconds</h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
          Choose your preferred installation method. Works on all major platforms.
        </p>
      </div>

      <div class="mx-auto max-w-3xl">
        <Tabs default-value="script" class="w-full">
          <TabsList class="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger v-for="method in installMethods" :key="method.id" :value="method.id">
              <Icon :name="method.icon" class="mr-2 h-4 w-4" />
              {{ method.label }}
            </TabsTrigger>
          </TabsList>

          <TabsContent
            v-for="method in installMethods"
            :key="method.id"
            :value="method.id"
            class="mt-6"
          >
            <Card class="border-border bg-card/50">
              <CardContent class="p-0">
                <div class="border-border flex items-center justify-between border-b px-4 py-3">
                  <span class="text-muted-foreground text-sm">{{ method.description }}</span>
                  <button
                    class="text-muted-foreground rounded p-1 transition-colors hover:bg-white/5 hover:text-white"
                    aria-label="Copy command"
                    @click="copyCommand(method.command)"
                  >
                    <Icon
                      v-if="copiedCommand !== method.command"
                      name="lucide:copy"
                      class="h-4 w-4"
                    />
                    <Icon v-else name="lucide:check" class="text-success h-4 w-4" />
                  </button>
                </div>
                <pre
                  class="overflow-x-auto p-4 font-mono text-sm"
                ><code><span class="text-tui-muted select-none">$ </span><span class="text-white">{{ method.command }}</span></code></pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div class="mt-12">
          <h3 class="mb-6 text-center text-lg font-semibold text-white">Also available via:</h3>
          <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <Card
              v-for="pkg in packageManagers"
              :key="pkg.name"
              class="card-hover border-border bg-card/30 cursor-pointer"
              @click="copyCommand(pkg.command)"
            >
              <CardContent class="p-3 sm:p-4">
                <div class="mb-2 flex items-center justify-between">
                  <span class="text-sm font-medium text-white sm:text-base">{{ pkg.name }}</span>
                  <Icon
                    v-if="copiedCommand !== pkg.command"
                    name="lucide:copy"
                    class="text-muted-foreground h-3 w-3 shrink-0"
                  />
                  <Icon v-else name="lucide:check" class="text-success h-3 w-3 shrink-0" />
                </div>
                <code class="text-muted-foreground block font-mono text-xs break-all sm:truncate">
                  {{ pkg.command }}
                </code>
              </CardContent>
            </Card>
          </div>
        </div>

        <div class="mt-8 text-center">
          <p class="text-muted-foreground mb-4">Or download binaries directly from GitHub:</p>
          <Button variant="outline" as-child>
            <a
              href="https://github.com/bab-sh/bab/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="lucide:download" class="mr-2 h-4 w-4" />
              Download Latest Release
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { Badge } from '@/components/ui/badge'
  import { Button } from '@/components/ui/button'
  import { Card, CardContent } from '@/components/ui/card'
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

  const copiedCommand = ref<string | null>(null)

  const installMethods = [
    {
      id: 'script',
      label: 'Script',
      icon: 'lucide:terminal',
      description: 'Quick install script (macOS/Linux)',
      command: 'curl -fsSL https://bab.sh/install | sh',
    },
    {
      id: 'homebrew',
      label: 'Homebrew',
      icon: 'simple-icons:homebrew',
      description: 'Install via Homebrew (macOS/Linux)',
      command: 'brew install bab-sh/tap/bab',
    },
    {
      id: 'windows',
      label: 'Windows',
      icon: 'simple-icons:windows',
      description: 'Install via PowerShell (Windows)',
      command: 'iwr -useb https://bab.sh/install.ps1 | iex',
    },
    {
      id: 'go',
      label: 'Go',
      icon: 'simple-icons:go',
      description: 'Install via Go',
      command: 'go install github.com/bab-sh/bab@latest',
    },
  ]

  const packageManagers = [
    { name: 'Chocolatey', command: 'choco install bab' },
    {
      name: 'Scoop',
      command:
        'scoop bucket add bab-sh https://github.com/bab-sh/scoop-bucket && scoop install bab',
    },
    { name: 'Snap', command: 'snap install bab-sh' },
    { name: 'AUR', command: 'paru -S bab-bin' },
  ]

  const copyCommand = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command)
      copiedCommand.value = command
      setTimeout(() => {
        copiedCommand.value = null
      }, 2000)
    } catch (e) {
      void e
    }
  }
</script>
