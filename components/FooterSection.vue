<template>
  <footer class="border-border border-t py-12">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-8 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
        <div class="col-span-2 text-center sm:text-left lg:col-span-1">
          <div class="mb-4 flex items-center justify-center gap-3 sm:justify-start">
            <SvgoBabLogo class="h-8 w-8" aria-label="bab logo" />
            <span class="text-xl font-bold text-white">Bab</span>
          </div>
          <p class="text-muted-foreground text-sm">Clean commands for any project.</p>
        </div>

        <div class="text-center sm:text-left">
          <h3 class="mb-4 font-semibold text-white">Product</h3>
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

        <div class="text-center sm:text-left">
          <h3 class="mb-4 font-semibold text-white">Integrations</h3>
          <ul class="space-y-2">
            <li>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=bab-sh.bab"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground flex items-center justify-center gap-2 text-sm transition-colors hover:text-white sm:justify-start"
              >
                <Icon name="simple-icons:visualstudiocode" class="h-4 w-4" />
                VS Code Extension
              </a>
            </li>
            <li>
              <a
                href="https://plugins.jetbrains.com/plugin/29264"
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted-foreground flex items-center justify-center gap-2 text-sm transition-colors hover:text-white sm:justify-start"
              >
                <Icon name="simple-icons:intellijidea" class="h-4 w-4" />
                IntelliJ Plugin
              </a>
            </li>
          </ul>
        </div>

        <div class="col-span-2 text-center sm:col-span-1 sm:text-left">
          <h3 class="mb-4 font-semibold text-white">Community</h3>
          <div
            class="flex flex-wrap items-center justify-center gap-3 sm:flex-col sm:items-start sm:gap-0"
          >
            <a
              href="https://github.com/bab-sh/bab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              class="text-muted-foreground flex items-center gap-2 text-sm transition-colors hover:text-white sm:mb-2"
            >
              <Icon name="simple-icons:github" class="h-5 w-5 sm:h-4 sm:w-4" aria-hidden="true" />
              <span class="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://discord.bab.sh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              class="text-muted-foreground flex items-center gap-2 text-sm transition-colors hover:text-white sm:mb-2"
            >
              <Icon name="simple-icons:discord" class="h-5 w-5 sm:h-4 sm:w-4" aria-hidden="true" />
              <span class="hidden sm:inline">Discord</span>
            </a>
            <a
              href="https://x.com/babshdev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              class="text-muted-foreground flex items-center gap-2 text-sm transition-colors hover:text-white sm:mb-2"
            >
              <Icon name="simple-icons:x" class="h-5 w-5 sm:h-4 sm:w-4" aria-hidden="true" />
              <span class="hidden sm:inline">X</span>
            </a>
            <a
              href="https://www.instagram.com/babshdev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              class="text-muted-foreground flex items-center gap-2 text-sm transition-colors hover:text-white sm:mb-2"
            >
              <Icon
                name="simple-icons:instagram"
                class="h-5 w-5 sm:h-4 sm:w-4"
                aria-hidden="true"
              />
              <span class="hidden sm:inline">Instagram</span>
            </a>
            <a
              href="https://www.reddit.com/r/babsh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reddit"
              class="text-muted-foreground flex items-center gap-2 text-sm transition-colors hover:text-white sm:mb-2"
            >
              <Icon name="simple-icons:reddit" class="h-5 w-5 sm:h-4 sm:w-4" aria-hidden="true" />
              <span class="hidden sm:inline">Reddit</span>
            </a>
            <a
              href="https://www.threads.com/@babshdev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              class="text-muted-foreground flex items-center gap-2 text-sm transition-colors hover:text-white"
            >
              <Icon name="simple-icons:threads" class="h-5 w-5 sm:h-4 sm:w-4" aria-hidden="true" />
              <span class="hidden sm:inline">Threads</span>
            </a>
          </div>
        </div>
      </div>

      <Separator class="my-8" />

      <div
        class="text-muted-foreground flex flex-col items-center justify-between gap-4 text-sm sm:flex-row"
      >
        <p>
          &copy; {{ currentYear }} bab
          <span class="mx-2">·</span>
          <NuxtLink to="/imprint" class="transition-colors hover:text-white"> Imprint </NuxtLink>
          <span class="mx-2">·</span>
          MIT License
        </p>
        <p class="flex items-center">
          Made with
          <Icon
            name="lucide:heart"
            class="mx-1 inline-block h-4 w-4 animate-pulse fill-red-500 text-red-500"
          />
          by AIO
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  const currentYear = new Date().getFullYear()
</script>
