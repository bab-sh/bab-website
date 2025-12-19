<template>
  <section id="comparison" class="bg-card/30 relative py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <Badge variant="secondary" class="border-bab/20 bg-bab/10 text-bab-light mb-4">
          Why bab?
        </Badge>
        <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">How bab compares</h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
          See how bab stacks up against other task runners and build tools.
        </p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[720px] table-fixed">
          <thead>
            <tr class="border-border border-b">
              <th class="text-muted-foreground w-[35%] px-4 py-4 text-left text-sm font-medium">
                Feature
              </th>
              <th
                v-for="tool in tools"
                :key="tool.name"
                class="w-[13%] px-4 py-4 text-center text-sm font-medium"
                :class="tool.highlight ? 'text-bab-light' : 'text-muted-foreground'"
              >
                <div class="flex h-14 flex-col items-center justify-end gap-1">
                  <SvgoBabLogo v-if="tool.useBabLogo" class="h-5 w-5" aria-label="bab logo" />
                  <Icon v-else :name="tool.icon" class="h-5 w-5" />
                  <span>{{ tool.name }}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(feature, index) in comparisonFeatures"
              :key="feature.name"
              class="border-border border-b transition-colors hover:bg-white/5"
              :class="{ 'bg-white/[0.02]': index % 2 === 0 }"
            >
              <td class="px-4 py-4">
                <div class="flex items-center gap-2">
                  <Icon :name="feature.icon" class="text-muted-foreground h-4 w-4 shrink-0" />
                  <span class="text-sm text-white">{{ feature.name }}</span>
                  <TooltipProvider v-if="feature.description">
                    <Tooltip
                      :open="openTooltip === index"
                      @update:open="(val: boolean) => (openTooltip = val ? index : null)"
                    >
                      <TooltipTrigger as-child>
                        <button
                          class="text-muted-foreground hover:text-white"
                          aria-label="More information"
                          @click.prevent="toggleTooltip(index)"
                        >
                          <Icon name="lucide:info" class="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" class="max-w-[280px]">
                        <p>{{ feature.description }}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </td>
              <td
                v-for="tool in tools"
                :key="tool.name"
                class="px-4 py-4 text-center"
                :class="tool.highlight ? 'bg-bab/5' : ''"
              >
                <Icon
                  v-if="feature.support[tool.key] === true"
                  name="lucide:check"
                  class="mx-auto h-5 w-5"
                  :class="tool.highlight ? 'text-bab-light' : 'text-green-500'"
                />
                <Icon
                  v-else-if="feature.support[tool.key] === false"
                  name="lucide:x"
                  class="text-muted-foreground mx-auto h-5 w-5"
                />
                <Icon v-else name="lucide:minus" class="text-muted-foreground mx-auto h-5 w-5" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="text-muted-foreground mt-8 text-center text-sm">
        Missing something? Let us know on
        <a
          href="https://github.com/bab-sh/bab/discussions"
          target="_blank"
          rel="noopener noreferrer"
          class="text-bab-light decoration-bab-light/50 hover:decoration-bab-light underline"
        >
          GitHub Discussions
        </a>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
  const openTooltip = ref<number | null>(null)

  function toggleTooltip(index: number) {
    openTooltip.value = openTooltip.value === index ? null : index
  }

  type ToolKey = 'bab' | 'make' | 'npm' | 'just' | 'task'
  type SupportValue = boolean | 'partial'

  interface Tool {
    name: string
    key: ToolKey
    icon: string
    highlight: boolean
    useBabLogo?: boolean
  }

  interface ComparisonFeature {
    name: string
    icon: string
    description?: string
    support: Record<ToolKey, SupportValue>
  }

  const tools: Tool[] = [
    { name: 'bab', key: 'bab', icon: '', highlight: true, useBabLogo: true },
    { name: 'GNU Make', key: 'make', icon: 'simple-icons:gnu', highlight: false },
    { name: 'npm scripts', key: 'npm', icon: 'simple-icons:npm', highlight: false },
    { name: 'Just', key: 'just', icon: 'lucide:scroll-text', highlight: false },
    { name: 'Task', key: 'task', icon: 'simple-icons:task', highlight: false },
  ]

  const comparisonFeatures: ComparisonFeature[] = [
    {
      name: 'Single binary',
      icon: 'lucide:package',
      description:
        'Self-contained executable with zero runtime dependencies. No Node.js, Python, or other runtimes needed.',
      support: { bab: true, make: false, npm: false, just: true, task: true },
    },
    {
      name: 'Cross-platform',
      icon: 'lucide:globe',
      description: 'Works on Windows, macOS, and Linux with the same configuration file.',
      support: { bab: true, make: 'partial', npm: true, just: true, task: true },
    },
    {
      name: 'Simple YAML syntax',
      icon: 'lucide:file-code',
      description:
        'Clean, readable configuration. No complex syntax or special characters to learn.',
      support: { bab: true, make: false, npm: false, just: false, task: true },
    },
    {
      name: 'Built-in interactive TUI',
      icon: 'lucide:layout-grid',
      description:
        'Browse and select tasks visually with a built-in TUI. No external tools like fzf required.',
      support: { bab: true, make: false, npm: false, just: 'partial', task: false },
    },
    {
      name: 'Built-in fuzzy search',
      icon: 'lucide:search',
      description:
        'Type to instantly filter tasks. Built into bab, no external fuzzy finder needed.',
      support: { bab: true, make: false, npm: false, just: 'partial', task: false },
    },
    {
      name: 'Smart error hints',
      icon: 'lucide:lightbulb',
      description: 'When you mistype a task name, bab suggests similar tasks you might have meant.',
      support: { bab: true, make: false, npm: false, just: false, task: false },
    },
    {
      name: 'Task dependencies',
      icon: 'lucide:git-branch',
      description: 'Define which tasks must run first. bab handles the order automatically.',
      support: { bab: true, make: true, npm: false, just: true, task: true },
    },
    {
      name: 'Environment variables',
      icon: 'lucide:variable',
      description:
        'Set env vars at global, task, or command level. More specific levels override broader ones.',
      support: { bab: true, make: true, npm: true, just: true, task: true },
    },
    {
      name: 'OS-specific commands',
      icon: 'lucide:monitor-smartphone',
      description:
        'Run different commands on different operating systems from the same config file.',
      support: { bab: true, make: false, npm: false, just: true, task: true },
    },
    {
      name: 'Modular config files',
      icon: 'lucide:file-plus',
      description:
        'Split your config across multiple files. Import and reuse tasks between projects.',
      support: { bab: true, make: true, npm: false, just: true, task: true },
    },
    {
      name: 'Dry-run mode',
      icon: 'lucide:eye',
      description: 'Preview what commands would run without actually executing them.',
      support: { bab: true, make: true, npm: false, just: true, task: true },
    },
    {
      name: 'Shell completions',
      icon: 'lucide:terminal',
      description: 'Tab-complete task names in bash, zsh, fish, and PowerShell.',
      support: { bab: true, make: 'partial', npm: 'partial', just: true, task: true },
    },
    {
      name: 'Full IDE integration',
      icon: 'lucide:code',
      description:
        'VS Code extension and IntelliJ plugin with syntax highlighting, completion, and task running.',
      support: { bab: true, make: 'partial', npm: true, just: 'partial', task: 'partial' },
    },
    {
      name: 'Interactive prompts',
      icon: 'lucide:message-circle-question',
      description:
        'Collect user input during task execution with confirm, input, select, password, and number prompts.',
      support: { bab: true, make: false, npm: false, just: false, task: false },
    },
  ]
</script>
