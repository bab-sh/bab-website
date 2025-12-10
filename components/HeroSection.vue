<template>
  <section class="relative flex min-h-screen items-center justify-center overflow-hidden">
    <div class="bg-gradient-purple absolute inset-0" />
    <div class="grid-bg absolute inset-0" />

    <div
      class="bg-bab/8 animate-pulse-slow absolute top-[15%] left-[18%] h-[28rem] w-[28rem] rounded-full blur-3xl"
    />
    <div
      class="bg-bab-light/8 animate-pulse-slow absolute right-[15%] bottom-[20%] h-[22rem] w-[22rem] rounded-full blur-3xl [animation-delay:2s]"
    />
    <div
      class="bg-bab-dark/6 animate-pulse-slow absolute top-[45%] right-[25%] h-48 w-48 rounded-full blur-2xl [animation-delay:3.5s]"
    />

    <div class="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div class="space-y-4 text-center lg:text-left">
          <div class="flex justify-center lg:justify-start">
            <Badge
              v-if="version"
              variant="secondary"
              class="border-bab/30 bg-bab/15 text-bab-light px-3 py-1 text-sm"
            >
              {{ version }}
            </Badge>
          </div>

          <div class="flex items-center justify-center gap-4 lg:justify-start">
            <BabLogo class="h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20" :glow="true" />
            <h1 class="text-gradient text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              Bab
            </h1>
          </div>

          <p class="text-muted-foreground mx-auto max-w-xl text-lg sm:text-xl lg:mx-0">
            Modern task runner. Zero dependencies, cross-platform, simple. Replace your Makefiles
            and npm scripts with clean YAML.
          </p>

          <div class="flex flex-col justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
            <Button size="lg" as-child>
              <a
                href="https://docs.bab.sh/guide/getting-started.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
                <ArrowRight class="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" as-child>
              <a
                href="https://github.com/bab-sh/bab"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center"
              >
                <Icon icon="simple-icons:github" class="mr-2 h-4 w-4" />
                GitHub
                <span
                  v-if="formattedStars"
                  class="text-muted-foreground ml-2 flex items-center gap-1"
                >
                  <Star class="h-3 w-3 fill-current" />
                  {{ formattedStars }}
                </span>
              </a>
            </Button>
          </div>

          <div class="pt-6">
            <div class="mb-2 flex items-center gap-4">
              <p class="text-muted-foreground text-sm">Quick install:</p>
              <div class="flex items-center gap-1">
                <button
                  class="rounded p-1.5 transition-colors hover:bg-white/5"
                  :class="selectedPlatform === 'unix' ? 'text-white' : 'text-muted-foreground/50'"
                  title="macOS / Linux"
                  @click="selectedPlatform = 'unix'"
                >
                  <Icon icon="simple-icons:apple" class="h-4 w-4" />
                </button>
                <button
                  class="rounded p-1.5 transition-colors hover:bg-white/5"
                  :class="selectedPlatform === 'unix' ? 'text-white' : 'text-muted-foreground/50'"
                  title="macOS / Linux"
                  @click="selectedPlatform = 'unix'"
                >
                  <Icon icon="simple-icons:linux" class="h-4 w-4" />
                </button>
                <button
                  class="rounded p-1.5 transition-colors hover:bg-white/5"
                  :class="
                    selectedPlatform === 'windows' ? 'text-white' : 'text-muted-foreground/50'
                  "
                  title="Windows"
                  @click="selectedPlatform = 'windows'"
                >
                  <Icon icon="simple-icons:windows" class="h-4 w-4" />
                </button>
              </div>
            </div>
            <div
              class="group border-border bg-card/50 hover:border-bab/30 inline-flex items-center gap-2 rounded-lg border px-3 py-2.5 font-mono text-xs transition-colors sm:px-4 sm:text-sm"
            >
              <span class="text-[#ff87d7]">{{ promptSymbol }}</span>
              <code class="text-white">{{ installCommand }}</code>
              <button
                class="text-muted-foreground ml-2 rounded p-1 transition-colors hover:bg-white/5 hover:text-white"
                @click="copyInstallCommand"
              >
                <Copy v-if="!copied" class="h-4 w-4" />
                <Check v-else class="text-success h-4 w-4" />
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
      <ChevronDown class="text-muted-foreground h-6 w-6" />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { ArrowRight, Copy, Check, ChevronDown, Star } from 'lucide-vue-next'
  import { Button } from '@/components/ui/button'
  import { Badge } from '@/components/ui/badge'

  const copied = ref(false)
  const selectedPlatform = ref<'unix' | 'windows'>('unix')

  const { data: starsData } = await useFetch<{ stars: number }>('/api/github-stars')
  const { data: versionData } = await useFetch<{ version: string }>('/api/github-version')

  const stars = computed(() => starsData.value?.stars ?? null)
  const version = computed(() => versionData.value?.version ?? null)

  onMounted(() => {
    if (navigator.platform.toLowerCase().includes('win')) {
      selectedPlatform.value = 'windows'
    }
  })

  const formattedStars = computed(() => {
    if (!stars.value) return null
    return stars.value >= 1000 ? `${(stars.value / 1000).toFixed(1)}k` : stars.value.toString()
  })

  const installCommand = computed(() =>
    selectedPlatform.value === 'windows'
      ? 'iwr -useb https://bab.sh/install.ps1 | iex'
      : 'curl -fsSL https://bab.sh/install | sh',
  )

  const promptSymbol = computed(() => (selectedPlatform.value === 'windows' ? '>' : '$'))

  const copyInstallCommand = async () => {
    await navigator.clipboard.writeText(installCommand.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
</script>
