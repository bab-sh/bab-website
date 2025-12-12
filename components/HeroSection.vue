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

          <div class="flex items-center justify-center gap-3 sm:gap-4 lg:justify-start">
            <SvgoBabLogo class="h-20 w-20 shrink-0 sm:h-24 sm:w-24 lg:h-28 lg:w-28" />
            <h1
              class="text-gradient m-0 flex h-20 items-center justify-center p-0 text-7xl leading-none font-bold tracking-tight sm:h-24 sm:text-8xl lg:h-28 lg:text-9xl"
            >
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
                <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" as-child>
              <a
                href="https://github.com/bab-sh/bab"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center"
              >
                <Icon name="simple-icons:github" class="mr-2 h-4 w-4" />
                GitHub
                <span
                  v-if="formattedStars"
                  class="text-muted-foreground ml-2 flex items-center gap-1"
                >
                  <Icon name="lucide:star" class="h-3 w-3 fill-current" />
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
                  class="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-white/5"
                  :class="selectedPlatform === 'unix' ? 'text-white' : 'text-muted-foreground/50'"
                  title="macOS / Linux"
                  @click="selectedPlatform = 'unix'"
                >
                  <Icon name="simple-icons:apple" class="h-4 w-4" />
                </button>
                <button
                  class="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-white/5"
                  :class="selectedPlatform === 'unix' ? 'text-white' : 'text-muted-foreground/50'"
                  title="macOS / Linux"
                  @click="selectedPlatform = 'unix'"
                >
                  <Icon name="simple-icons:linux" class="h-4 w-4" />
                </button>
                <button
                  class="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-white/5"
                  :class="
                    selectedPlatform === 'windows' ? 'text-white' : 'text-muted-foreground/50'
                  "
                  title="Windows"
                  @click="selectedPlatform = 'windows'"
                >
                  <Icon name="simple-icons:windows" class="h-4 w-4" />
                </button>
              </div>
            </div>
            <div
              class="group border-border bg-card/50 hover:border-bab/30 flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 font-mono text-xs transition-colors sm:text-sm lg:inline-flex lg:w-auto lg:px-4"
            >
              <span class="text-tui-match">{{ promptSymbol }}</span>
              <code class="text-white">{{ installCommand }}</code>
              <button
                class="text-muted-foreground ml-auto rounded p-1 transition-colors hover:bg-white/5 hover:text-white lg:ml-2"
                @click="copyInstallCommand"
              >
                <Icon v-if="!copied" name="lucide:copy" class="h-4 w-4" />
                <Icon v-else name="lucide:check" class="text-success h-4 w-4" />
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
      <Icon name="lucide:chevron-down" class="text-muted-foreground h-6 w-6" />
    </div>
  </section>
</template>

<script setup lang="ts">
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
