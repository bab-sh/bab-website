<template>
  <section id="install" class="py-24 relative bg-card/30">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <Badge variant="secondary" class="mb-4 bg-bab/10 border-bab/20 text-bab-light">
          Installation
        </Badge>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Get started in seconds
        </h2>
        <p class="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          Choose your preferred installation method. Works on all major platforms.
        </p>
      </div>

      <div class="max-w-3xl mx-auto">
        <Tabs :default-value="installMethods[0].id" class="w-full">
          <TabsList class="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger
              v-for="method in installMethods"
              :key="method.id"
              :value="method.id"
            >
              <Icon :icon="method.icon" class="h-4 w-4 mr-2" />
              {{ method.label }}
            </TabsTrigger>
          </TabsList>

          <TabsContent
            v-for="method in installMethods"
            :key="method.id"
            :value="method.id"
            class="mt-6"
          >
            <Card class="bg-card/50 border-border">
              <CardContent class="p-0">
                <div class="flex items-center justify-between px-4 py-3 border-b border-border">
                  <span class="text-sm text-muted-foreground">{{ method.description }}</span>
                  <button
                    @click="copyCommand(method.command)"
                    class="text-muted-foreground hover:text-white transition-colors p-1 rounded hover:bg-white/5"
                  >
                    <Copy v-if="copiedCommand !== method.command" class="h-4 w-4" />
                    <Check v-else class="h-4 w-4 text-success" />
                  </button>
                </div>
                <pre class="p-4 font-mono text-sm overflow-x-auto"><code><span class="text-tui-muted select-none">$ </span><span class="text-white">{{ method.command }}</span></code></pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div class="mt-12">
          <h3 class="text-lg font-semibold text-white mb-6 text-center">
            Also available via:
          </h3>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Card
              v-for="pkg in packageManagers"
              :key="pkg.name"
              class="bg-card/30 border-border card-hover cursor-pointer"
              @click="copyCommand(pkg.command)"
            >
              <CardContent class="p-3 sm:p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-white font-medium text-sm sm:text-base">{{ pkg.name }}</span>
                  <Copy v-if="copiedCommand !== pkg.command" class="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <Check v-else class="h-3 w-3 text-success flex-shrink-0" />
                </div>
                <code class="text-xs text-muted-foreground font-mono block break-all sm:truncate">
                  {{ pkg.command }}
                </code>
              </CardContent>
            </Card>
          </div>
        </div>

        <div class="mt-8 text-center">
          <p class="text-muted-foreground mb-4">
            Or download binaries directly from GitHub:
          </p>
          <Button variant="outline" as-child>
            <a
              href="https://github.com/bab-sh/bab/releases/latest"
              target="_blank"
              rel="noopener"
            >
              <Download class="mr-2 h-4 w-4" />
              Download Latest Release
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Copy, Check, Download } from 'lucide-vue-next'
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
  { name: 'Scoop', command: 'scoop bucket add bab-sh https://github.com/bab-sh/scoop-bucket && scoop install bab' },
  { name: 'Snap', command: 'snap install bab-sh' },
  { name: 'AUR', command: 'paru -S bab-bin' },
]

const copyCommand = async (command: string) => {
  await navigator.clipboard.writeText(command)
  copiedCommand.value = command
  setTimeout(() => {
    copiedCommand.value = null
  }, 2000)
}
</script>
