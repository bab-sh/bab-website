<template>
  <section id="code" class="relative bg-card/30 py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <Badge variant="secondary" class="mb-4 border-bab/20 bg-bab/10 text-bab-light">
          Configuration
        </Badge>
        <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">Simple yet powerful</h2>
        <p class="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
          Define your tasks in a clean YAML file. No complex syntax, no build system knowledge
          required.
        </p>
      </div>

      <div class="grid items-start gap-8 lg:grid-cols-2">
        <div class="code-block overflow-hidden rounded-xl border border-border">
          <div
            class="flex items-center justify-between border-b border-border bg-card/50 px-4 py-3"
          >
            <div class="flex items-center gap-2">
              <BabLogo class="h-4 w-4" />
              <span class="font-mono text-sm text-muted-foreground">babfile.yml</span>
            </div>
            <button
              class="rounded p-1 text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
              @click="copyCode"
            >
              <Copy v-if="!copied" class="h-4 w-4" />
              <Check v-else class="h-4 w-4 text-success" />
            </button>
          </div>
          <pre
            class="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:text-sm"
          ><code><span class="text-tui-match">tasks</span><span class="text-white">:</span>

<span class="task-block" :class="{ 'highlight': highlightedTask === 'setup' || highlightedDepsRef === 'setup' }">  <span class="text-tui-accent">setup</span><span class="text-white">:</span>
    <span class="text-tui-muted">desc</span><span class="text-white">:</span> <span class="text-gray-200">Install dependencies</span>
    <span class="text-tui-muted">run</span><span class="text-white">:</span>
      <span class="text-white">-</span> <span class="text-tui-muted">cmd</span><span class="text-white">:</span> <span class="text-gray-200">npm install</span>
</span>
<span class="task-block" :class="{ 'highlight': highlightedTask === 'lint' || highlightedTaskRef === 'lint' }">  <span class="text-tui-accent">lint</span><span class="text-white">:</span>
    <span class="text-tui-muted">desc</span><span class="text-white">:</span> <span class="text-gray-200">Run linter</span>
    <span class="text-tui-muted">run</span><span class="text-white">:</span>
      <span class="text-white">-</span> <span class="text-tui-muted">cmd</span><span class="text-white">:</span> <span class="text-gray-200">npm run lint</span>
</span>
<span class="task-block" :class="{ 'highlight': highlightedTask === 'dev' }">  <span class="text-tui-accent">dev</span><span class="text-white">:</span>
    <span class="text-tui-muted">desc</span><span class="text-white">:</span> <span class="text-gray-200">Start development server</span>
    <span class="line-ref" :class="{ 'highlight': highlightedFeature === 'deps' || highlightedDepsLine === 'dev-deps' }" @mouseenter="highlightedDepsRef = 'setup'; highlightedDepsLine = 'dev-deps'" @mouseleave="highlightedDepsRef = null; highlightedDepsLine = null"><span class="text-tui-muted">deps</span><span class="text-white">:</span> <span class="text-gray-200">[setup]</span></span>
    <span class="text-tui-muted">run</span><span class="text-white">:</span>
      <span class="text-white">-</span> <span class="text-tui-muted">cmd</span><span class="text-white">:</span> <span class="text-gray-200">npm run dev</span>
</span>
<span class="task-block" :class="{ 'highlight': highlightedTask === 'build' || highlightedTaskRef === 'build' }">  <span class="text-tui-accent">build</span><span class="text-white">:</span>
    <span class="text-tui-muted">desc</span><span class="text-white">:</span> <span class="text-gray-200">Build for production</span>
    <span class="line-ref" :class="{ 'highlight': highlightedFeature === 'deps' || highlightedDepsLine === 'build-deps' }" @mouseenter="highlightedDepsRef = 'setup'; highlightedDepsLine = 'build-deps'" @mouseleave="highlightedDepsRef = null; highlightedDepsLine = null"><span class="text-tui-muted">deps</span><span class="text-white">:</span> <span class="text-gray-200">[setup]</span></span>
    <span class="text-tui-muted">run</span><span class="text-white">:</span>
      <span class="line-ref" :class="{ 'highlight': highlightedFeature === 'composition' || highlightedTaskRef === 'lint' }" @mouseenter="highlightedTaskRef = 'lint'" @mouseleave="highlightedTaskRef = null"><span class="text-white">-</span> <span class="text-tui-muted">task</span><span class="text-white">:</span> <span class="text-tui-accent">lint</span></span>
      <span class="text-white">-</span> <span class="text-tui-muted">cmd</span><span class="text-white">:</span> <span class="text-gray-200">npm run build</span>
</span>
<span class="task-block" :class="{ 'highlight': highlightedTask === 'deploy' }">  <span class="text-tui-accent">deploy</span><span class="text-white">:</span>
    <span class="text-tui-muted">desc</span><span class="text-white">:</span> <span class="text-gray-200">Deploy to production</span>
    <span class="text-tui-muted">run</span><span class="text-white">:</span>
      <span class="line-ref" :class="{ 'highlight': highlightedFeature === 'composition' || highlightedTaskRef === 'build' }" @mouseenter="highlightedTaskRef = 'build'" @mouseleave="highlightedTaskRef = null"><span class="text-white">-</span> <span class="text-tui-muted">task</span><span class="text-white">:</span> <span class="text-tui-accent">build</span></span>
      <span class="text-white">-</span> <span class="text-tui-muted">cmd</span><span class="text-white">:</span> <span class="text-gray-200">./scripts/deploy.sh</span>
        <span class="line-ref" :class="{ 'highlight': highlightedFeature === 'platforms' || highlightedPlatformsRef }" @mouseenter="highlightedPlatformsRef = true" @mouseleave="highlightedPlatformsRef = false"><span class="text-tui-muted">platforms</span><span class="text-white">:</span> <span class="text-gray-200">[linux, darwin]</span></span>
      <span class="text-white">-</span> <span class="text-tui-muted">cmd</span><span class="text-white">:</span> <span class="text-gray-200">powershell scripts/deploy.ps1</span>
        <span class="line-ref" :class="{ 'highlight': highlightedFeature === 'platforms' || highlightedPlatformsRef }" @mouseenter="highlightedPlatformsRef = true" @mouseleave="highlightedPlatformsRef = false"><span class="text-tui-muted">platforms</span><span class="text-white">:</span> <span class="text-gray-200">[windows]</span></span>
</span></code></pre>
        </div>

        <div class="space-y-6">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="feature-card flex gap-4 rounded-lg border border-border bg-card/50 p-4"
            :class="{
              active: isFeatureActive(benefit.featureId),
              'cursor-pointer': benefit.featureId,
            }"
            @mouseenter="highlightedFeature = benefit.featureId"
            @mouseleave="highlightedFeature = null"
          >
            <div
              class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-bab/10"
            >
              <component :is="benefit.icon" class="h-5 w-5 text-bab-light" />
            </div>
            <div>
              <h3 class="mb-1 font-semibold text-white">{{ benefit.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ benefit.description }}</p>
            </div>
          </div>

          <div
            class="rounded-lg border border-border bg-card/50 p-4 transition-colors hover:border-bab/20"
          >
            <h4 class="mb-3 font-semibold text-white">Run your tasks:</h4>
            <div class="space-y-2 font-mono text-sm">
              <div
                v-for="cmd in taskCommands"
                :key="cmd.taskId ?? 'interactive'"
                class="flex items-center gap-1"
              >
                <span class="select-none text-tui-muted">$</span>
                <span class="text-white">bab</span>
                <span
                  v-if="cmd.taskId"
                  class="task-trigger"
                  :class="{ active: highlightedTask === cmd.taskId }"
                  @mouseenter="highlightedTask = cmd.taskId"
                  @mouseleave="highlightedTask = null"
                  >{{ cmd.taskId }}</span
                >
                <span class="ml-2 text-tui-dim">{{ cmd.comment }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { Copy, Check, GitBranch, Globe, Layers } from 'lucide-vue-next'
  import { Badge } from '@/components/ui/badge'

  const copied = ref(false)
  const highlightedTask = ref<string | null>(null)
  const highlightedTaskRef = ref<string | null>(null)
  const highlightedDepsRef = ref<string | null>(null)
  const highlightedDepsLine = ref<string | null>(null)
  const highlightedPlatformsRef = ref(false)
  const highlightedFeature = ref<string | null>(null)

  const taskCommands = [
    { taskId: 'dev', comment: '# Start dev server' },
    { taskId: 'build', comment: '# Build for production' },
    { taskId: 'deploy', comment: '# Deploy to production' },
    { taskId: null, comment: '# Interactive mode' },
  ]

  const benefits = [
    {
      icon: Layers,
      title: 'Task Composition',
      description:
        'Reference other tasks with task: to compose complex workflows from simple building blocks.',
      featureId: 'composition',
    },
    {
      icon: GitBranch,
      title: 'Task Dependencies',
      description:
        'Define deps and bab automatically runs prerequisites first. No more manual ordering.',
      featureId: 'deps',
    },
    {
      icon: Globe,
      title: 'Platform-Specific Commands',
      description: 'Different commands for different operating systems. Write once, run anywhere.',
      featureId: 'platforms',
    },
  ]

  const isFeatureActive = (featureId: string | null) => {
    if (!featureId) return false
    if (highlightedFeature.value === featureId) return true
    if (
      featureId === 'composition' &&
      (highlightedTaskRef.value === 'lint' || highlightedTaskRef.value === 'build')
    )
      return true
    if (featureId === 'deps' && highlightedDepsLine.value) return true
    if (featureId === 'platforms' && highlightedPlatformsRef.value) return true
    return false
  }

  const codeExample = `tasks:

  setup:
    desc: Install dependencies
    run:
      - cmd: npm install

  lint:
    desc: Run linter
    run:
      - cmd: npm run lint

  dev:
    desc: Start development server
    deps: [setup]
    run:
      - cmd: npm run dev

  build:
    desc: Build for production
    deps: [setup]
    run:
      - task: lint
      - cmd: npm run build

  deploy:
    desc: Deploy to production
    run:
      - task: build
      - cmd: ./scripts/deploy.sh
        platforms: [linux, darwin]
      - cmd: powershell scripts/deploy.ps1
        platforms: [windows]`

  const copyCode = async () => {
    await navigator.clipboard.writeText(codeExample)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
</script>

<style scoped>
  .task-block {
    display: block;
    margin: 0 -12px;
    padding: 2px 12px;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .task-block.highlight {
    background: rgba(208, 157, 247, 0.2);
    box-shadow: 0 0 8px rgba(208, 157, 247, 0.15);
  }

  .task-trigger {
    display: inline-block;
    padding: 2px 6px;
    margin: -2px 0 -2px -2px;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .task-trigger:hover,
  .task-trigger.active {
    background: rgba(208, 157, 247, 0.25);
    color: #e5b5fe;
  }

  .task-trigger.active {
    box-shadow: 0 0 12px rgba(208, 157, 247, 0.3);
  }

  .line-ref {
    display: inline;
    padding: 1px 4px;
    margin: -1px -4px;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .line-ref:hover,
  .line-ref.highlight {
    background: rgba(208, 157, 247, 0.2);
    box-shadow: 0 0 8px rgba(208, 157, 247, 0.15);
  }

  .feature-card {
    transition: all 0.2s ease;
  }

  .feature-card.active {
    border-color: rgba(208, 157, 247, 0.4);
    background: rgba(208, 157, 247, 0.08);
    box-shadow: 0 0 20px rgba(208, 157, 247, 0.15);
  }
</style>
