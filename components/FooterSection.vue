<template>
  <footer class="border-border border-t py-12">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-8 grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="col-span-2 sm:col-span-2 lg:col-span-1">
          <div class="mb-4 flex items-center gap-3">
            <BabLogo class="h-8 w-8" />
            <span class="text-xl font-bold text-white">bab</span>
          </div>
          <p class="text-muted-foreground text-sm">
            Modern task runner. Zero dependencies, cross-platform, simple.
          </p>
        </div>

        <div>
          <h4 class="mb-4 font-semibold text-white">Product</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="https://bab.sh"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground text-sm transition-colors hover:text-white"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="#install"
                class="text-muted-foreground text-sm transition-colors hover:text-white"
              >
                Installation
              </a>
            </li>
            <li>
              <a
                href="https://github.com/bab-sh/bab/releases"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground text-sm transition-colors hover:text-white"
              >
                Releases
              </a>
            </li>
            <li>
              <a
                href="https://github.com/bab-sh/bab/blob/main/docs/content/roadmap.md"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground text-sm transition-colors hover:text-white"
              >
                Roadmap
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="mb-4 font-semibold text-white">Integrations</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=bab-sh.bab"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground text-sm transition-colors hover:text-white"
              >
                VS Code Extension
              </a>
            </li>
            <li>
              <a
                href="https://plugins.jetbrains.com/plugin/29264"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground text-sm transition-colors hover:text-white"
              >
                IntelliJ Plugin
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="mb-4 font-semibold text-white">Community</h4>
          <ul class="space-y-2">
            <li>
              <a
                href="https://github.com/bab-sh/bab"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground flex items-center gap-2 text-sm transition-colors hover:text-white"
              >
                <Icon icon="simple-icons:github" class="h-4 w-4" />
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://discord.bab.sh"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground flex items-center gap-2 text-sm transition-colors hover:text-white"
              >
                <Icon icon="simple-icons:discord" class="h-4 w-4" />
                Discord
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator class="my-8" />

      <div
        class="text-muted-foreground flex flex-col items-center justify-between gap-4 text-sm sm:flex-row"
      >
        <p>&copy; {{ currentYear }} bab. MIT License.</p>
        <p>
          Made with
          <Heart class="mx-1 mb-1 inline h-4 w-4 animate-pulse fill-red-500 text-red-500" />
          by AIO
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { Heart } from 'lucide-vue-next'
  import { Separator } from '@/components/ui/separator'
  import BabLogo from '@/components/BabLogo.vue'

  const currentYear = new Date().getFullYear()
</script>
