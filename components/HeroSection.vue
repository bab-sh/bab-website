<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-purple"></div>
    <div class="absolute inset-0 grid-bg"></div>

    <div
      class="absolute top-[15%] left-[18%] w-[28rem] h-[28rem] bg-bab/8 rounded-full blur-3xl animate-pulse-slow"
    ></div>
    <div
      class="absolute bottom-[20%] right-[15%] w-[22rem] h-[22rem] bg-bab-light/8 rounded-full blur-3xl animate-pulse-slow [animation-delay:2s]"
    ></div>
    <div
      class="absolute top-[45%] right-[25%] w-48 h-48 bg-bab-dark/6 rounded-full blur-2xl animate-pulse-slow [animation-delay:3.5s]"
    ></div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div class="text-center lg:text-left space-y-4">
          <div class="flex justify-center lg:justify-start">
            <Badge
              v-if="version"
              variant="secondary"
              class="px-3 py-1 text-sm bg-bab/15 border-bab/30 text-bab-light"
            >
              {{ version }}
            </Badge>
          </div>

          <div class="flex items-center justify-center lg:justify-start gap-4">
            <BabLogo class="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20" :glow="true" />
            <h1 class="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-gradient">
              Bab
            </h1>
          </div>

          <p class="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
            Modern task runner. Zero dependencies, cross-platform, simple.
            Replace your Makefiles and npm scripts with clean YAML.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Button size="lg" as-child>
              <a href="https://bab.sh" target="_blank" rel="noopener">
                Get Started
                <ArrowRight class="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" as-child>
              <a href="https://github.com/bab-sh/bab" target="_blank" rel="noopener" class="flex items-center">
                <Icon icon="simple-icons:github" class="mr-2 h-4 w-4" />
                GitHub
                <span v-if="formattedStars" class="ml-2 flex items-center gap-1 text-muted-foreground">
                  <Star class="h-3 w-3 fill-current" />
                  {{ formattedStars }}
                </span>
              </a>
            </Button>
          </div>

          <div class="pt-6">
            <div class="flex items-center gap-4 mb-2">
              <p class="text-sm text-muted-foreground">Quick install:</p>
              <div class="flex items-center gap-1">
                <button
                  @click="selectedPlatform = 'unix'"
                  class="p-1.5 rounded transition-colors hover:bg-white/5"
                  :class="selectedPlatform === 'unix' ? 'text-white' : 'text-muted-foreground/50'"
                  title="macOS / Linux"
                >
                  <Icon icon="simple-icons:apple" class="h-4 w-4" />
                </button>
                <button
                  @click="selectedPlatform = 'unix'"
                  class="p-1.5 rounded transition-colors hover:bg-white/5"
                  :class="selectedPlatform === 'unix' ? 'text-white' : 'text-muted-foreground/50'"
                  title="macOS / Linux"
                >
                  <Icon icon="simple-icons:linux" class="h-4 w-4" />
                </button>
                <button
                  @click="selectedPlatform = 'windows'"
                  class="p-1.5 rounded transition-colors hover:bg-white/5"
                  :class="selectedPlatform === 'windows' ? 'text-white' : 'text-muted-foreground/50'"
                  title="Windows"
                >
                  <Icon icon="simple-icons:windows" class="h-4 w-4" />
                </button>
              </div>
            </div>
            <div class="inline-flex items-center gap-2 bg-card/50 border border-border rounded-lg px-3 sm:px-4 py-2.5 font-mono text-xs sm:text-sm hover:border-bab/30 transition-colors group">
              <span class="text-[#ff87d7]">{{ promptSymbol }}</span>
              <code class="text-white">{{ installCommand }}</code>
              <button
                @click="copyInstallCommand"
                class="ml-2 text-muted-foreground hover:text-white transition-colors p-1 rounded hover:bg-white/5"
              >
                <Copy v-if="!copied" class="h-4 w-4" />
                <Check v-else class="h-4 w-4 text-success" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-center lg:justify-end">
          <AnimatedTerminal />
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown class="h-6 w-6 text-muted-foreground" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { ArrowRight, Copy, Check, ChevronDown, Star } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const copied = ref(false)
const selectedPlatform = ref<'unix' | 'windows'>('unix')
const stars = ref<number | null>(null)
const version = ref<string | null>(null)

onMounted(async () => {
  if (navigator.platform.toLowerCase().includes('win')) {
    selectedPlatform.value = 'windows'
  }

  try {
    const [starsRes, versionRes] = await Promise.all([
      fetch('/api/github-stars'),
      fetch('/api/github-version')
    ])
    const starsData = await starsRes.json()
    const versionData = await versionRes.json()
    stars.value = starsData.stars
    version.value = versionData.version
  } catch {
    stars.value = null
    version.value = null
  }
})

const formattedStars = computed(() => {
  if (!stars.value) return null
  return stars.value >= 1000
    ? `${(stars.value / 1000).toFixed(1)}k`
    : stars.value.toString()
})

const installCommand = computed(() =>
  selectedPlatform.value === 'windows'
    ? 'iwr -useb https://bab.sh/install.ps1 | iex'
    : 'curl -fsSL https://bab.sh/install | sh'
)

const promptSymbol = computed(() => selectedPlatform.value === 'windows' ? '>' : '$')

const copyInstallCommand = async () => {
  await navigator.clipboard.writeText(installCommand.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>
