<template>
  <footer class="py-12 border-t border-border">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div class="md:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <BabLogo class="w-8 h-8" />
            <span class="text-xl font-bold text-white">bab</span>
          </div>
          <p class="text-muted-foreground text-sm">
            Modern task runner. Zero dependencies, cross-platform, simple.
          </p>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Product</h4>
          <ul class="space-y-2">
            <li>
              <a href="https://bab.sh" target="_blank" rel="noopener" class="text-muted-foreground hover:text-white transition-colors text-sm">
                Documentation
              </a>
            </li>
            <li>
              <a href="#install" class="text-muted-foreground hover:text-white transition-colors text-sm">
                Installation
              </a>
            </li>
            <li>
              <a href="https://github.com/bab-sh/bab/releases" target="_blank" rel="noopener" class="text-muted-foreground hover:text-white transition-colors text-sm">
                Releases
              </a>
            </li>
            <li>
              <a href="https://github.com/bab-sh/bab/blob/main/docs/content/roadmap.md" target="_blank" rel="noopener" class="text-muted-foreground hover:text-white transition-colors text-sm">
                Roadmap
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Integrations</h4>
          <ul class="space-y-2">
            <li>
              <a href="https://marketplace.visualstudio.com/items?itemName=bab-sh.bab" target="_blank" rel="noopener" class="text-muted-foreground hover:text-white transition-colors text-sm">
                VS Code Extension
              </a>
            </li>
            <li>
              <a href="https://plugins.jetbrains.com/plugin/29264" target="_blank" rel="noopener" class="text-muted-foreground hover:text-white transition-colors text-sm">
                IntelliJ Plugin
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-4">Community</h4>
          <ul class="space-y-2">
            <li>
              <a href="https://github.com/bab-sh/bab" target="_blank" rel="noopener" class="text-muted-foreground hover:text-white transition-colors text-sm flex items-center gap-2">
                <Icon icon="simple-icons:github" class="h-4 w-4" />
                GitHub
              </a>
            </li>
            <li>
              <a href="https://discord.bab.sh" target="_blank" rel="noopener" class="text-muted-foreground hover:text-white transition-colors text-sm flex items-center gap-2">
                <Icon icon="simple-icons:discord" class="h-4 w-4" />
                Discord
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator class="my-8" />

      <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>&copy; {{ currentYear }} bab. MIT License.</p>
        <p>
          Made with
          <Heart class="h-4 w-4 mb-1 inline text-red-500 mx-1 fill-red-500 animate-pulse" />
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
