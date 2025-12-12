<template>
  <div class="terminal w-full max-w-[min(100%,42rem)] overflow-hidden rounded-xl shadow-2xl">
    <div class="terminal-header flex items-center gap-2 px-4 py-3">
      <div class="flex gap-2">
        <div class="bg-tui-red h-3 w-3 rounded-full" />
        <div class="bg-tui-yellow h-3 w-3 rounded-full" />
        <div class="bg-success h-3 w-3 rounded-full" />
      </div>
      <span class="text-tui-muted ml-2 font-mono text-xs">~/project</span>
    </div>

    <div class="bg-tui-bg min-h-80 transform-gpu overflow-hidden p-4 font-mono text-sm">
      <div v-if="phase === 'typing'" class="flex h-5 items-center">
        <span class="text-tui-muted">$</span>
        <span class="ml-2 text-white">{{ typedCommand }}</span>
        <span
          class="inline-block h-3.5 w-[7px] shrink-0 transform-gpu bg-white"
          :class="{ 'cursor-blink': !isTypingCommand }"
        />
      </div>

      <div v-else-if="phase === 'tui'" class="space-y-0">
        <div class="flex h-5 items-center">
          <span class="text-tui-match font-bold">&gt;</span>
          <span class="ml-2 text-white">{{ searchQuery }}</span>
          <span
            v-if="showTuiCursor"
            class="bg-tui-match inline-block h-3.5 w-[7px] shrink-0 transform-gpu"
            :class="{ 'cursor-blink': !isTypingSearch }"
          />
        </div>

        <div class="flex h-5 items-center overflow-hidden font-mono">
          <span class="border-tui-separator/50 flex-1 border-t" />
          <span class="text-tui-dim shrink-0 px-2">
            {{ filteredTasks.length }}/{{ tasks.length }}
          </span>
          <span class="border-tui-separator/50 w-4 shrink-0 border-t" />
          <span class="text-tui-dim shrink-0 px-2"> bab.sh </span>
          <span class="border-tui-separator/50 w-4 shrink-0 border-t" />
        </div>

        <div class="transform-gpu">
          <div
            v-for="(task, index) in filteredTasks"
            :key="task.name"
            class="flex h-6 transform-gpu items-baseline"
          >
            <span
              class="inline-block w-4 shrink-0"
              :class="selectedIndex === index ? 'text-tui-accent' : 'opacity-0'"
              >│</span
            >
            <span class="flex items-center gap-2">
              <span class="shrink-0 text-white">
                <template v-if="searchQuery && task.matchIndices">
                  <template v-for="(char, charIndex) in task.name" :key="charIndex"
                    ><span
                      :class="
                        task.matchIndices.includes(charIndex) ? 'text-tui-match' : 'text-white'
                      "
                      >{{ char }}</span
                    ></template
                  >
                </template>
                <template v-else>{{ task.name }}</template>
              </span>

              <span class="text-tui-muted truncate italic">{{ task.desc }}</span>
            </span>
          </div>

          <div v-if="filteredTasks.length === 0" class="text-tui-muted py-2 pl-4 italic">
            No matching tasks :(
          </div>
        </div>
      </div>

      <div v-else-if="phase === 'executing'" class="space-y-0">
        <div class="text-tui-dim flex h-5 items-center">$ bab build:core</div>
        <div class="flex h-5 items-center gap-2">
          <span class="text-tui-match">●</span>
          <span class="text-tui-accent">Running</span>
          <span class="font-bold text-white">build:core</span>
        </div>
        <div v-if="executionStep >= 1" class="text-tui-dim flex h-5 items-center gap-2">
          <span>▶</span>
          <span>lint</span>
        </div>
        <div v-if="executionStep >= 2" class="text-tui-dim flex h-5 items-center gap-2">
          <span>$</span>
          <span>eslint src/</span>
        </div>
        <div v-if="executionStep >= 3" class="text-tui-dim flex h-5 items-center gap-2">
          <span>▶</span>
          <span>test</span>
        </div>
        <div v-if="executionStep >= 4" class="text-tui-dim flex h-5 items-center gap-2">
          <span>$</span>
          <span>npm run test</span>
        </div>
        <div v-if="executionStep >= 5" class="flex h-5 items-center">
          <span class="text-success font-bold">PASS</span>
          <span class="text-white">&nbsp;src/utils.test.ts</span>
        </div>
        <div v-if="executionStep >= 6" class="flex h-5 items-center">
          <span class="text-success font-bold">PASS</span>
          <span class="text-white">&nbsp;src/api.test.ts</span>
        </div>
        <div v-if="executionStep >= 7" class="flex h-5 items-center">
          <span class="text-success font-bold">PASS</span>
          <span class="text-white">&nbsp;src/components.test.ts</span>
        </div>
        <div v-if="executionStep >= 8" class="text-tui-dim flex h-5 items-center gap-2">
          <span>$</span>
          <span>npm run build</span>
        </div>
        <div v-if="executionStep >= 9" class="flex h-5 items-center">
          <span class="text-tui-muted">dist/index.js</span>
          <span class="text-success">&nbsp;24.8 kB</span>
        </div>
        <div v-if="executionStep >= 10" class="flex h-5 items-center">
          <span class="text-tui-muted">dist/index.css</span>
          <span class="text-success">&nbsp;8.2 kB</span>
        </div>
        <div v-if="executionStep >= 11" class="text-tui-dim flex h-5 items-center gap-2">
          <span>$</span>
          <span>cp -r dist/ out/</span>
        </div>
        <div v-if="executionStep >= 12" class="flex h-5 items-center gap-2">
          <span class="text-success">✔</span>
          <span class="text-success font-bold">build:core</span>
          <span class="text-tui-dim">completed in</span>
          <span class="text-white">1.8s</span>
        </div>
      </div>

      <div v-else-if="phase === 'clearing'" class="space-y-0">
        <div class="text-tui-dim flex h-5 items-center">$ bab build:core</div>
        <div class="flex h-5 items-center gap-2">
          <span class="text-success">✔</span>
          <span class="text-success font-bold">build:core</span>
          <span class="text-tui-dim">completed in</span>
          <span class="text-white">1.8s</span>
        </div>
        <div class="flex h-5 items-center">
          <span class="text-tui-muted">$</span>
          <span class="ml-2 text-white">{{ clearCommand }}</span>
          <span
            class="inline-block h-3.5 w-[7px] shrink-0 transform-gpu bg-white"
            :class="{ 'cursor-blink': !isTypingClear }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Task {
    name: string
    desc: string
    matchIndices?: number[]
  }

  const tasks: Task[] = [
    { name: 'build', desc: 'Build all packages' },
    { name: 'build:admin', desc: 'Build admin dashboard' },
    { name: 'build:core', desc: 'Build core library' },
    { name: 'build:storefront', desc: 'Build storefront app' },
    { name: 'dev', desc: 'Start dev server' },
    { name: 'deploy', desc: 'Deploy to production' },
    { name: 'test', desc: 'Run all tests' },
  ]

  const phase = ref<'typing' | 'tui' | 'executing' | 'clearing'>('typing')
  const typedCommand = ref('')
  const searchQuery = ref('')
  const selectedIndex = ref(0)
  const showTuiCursor = ref(true)
  const isTypingCommand = ref(false)
  const isTypingSearch = ref(false)
  const executionStep = ref(0)
  const clearCommand = ref('')
  const isTypingClear = ref(false)

  const filteredTasks = computed(() => {
    if (!searchQuery.value) {
      return tasks.map((t) => ({ ...t, matchIndices: undefined }))
    }

    const query = searchQuery.value.toLowerCase()
    return tasks
      .map((task) => {
        const name = task.name.toLowerCase()
        const indices: number[] = []
        let queryIndex = 0

        for (let i = 0; i < name.length && queryIndex < query.length; i++) {
          if (name[i] === query[queryIndex]) {
            indices.push(i)
            queryIndex++
          }
        }

        if (queryIndex === query.length) {
          return { ...task, matchIndices: indices }
        }
        return null
      })
      .filter((t): t is Task & { matchIndices: number[] } => t !== null)
  })

  let isAnimating = true
  let animationId = 0

  const sleep = (ms: number, jitter = 0): Promise<boolean> => {
    const currentId = animationId
    const actualDelay = jitter > 0 ? ms + (Math.random() * jitter * 2 - jitter) : ms
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(isAnimating && animationId === currentId)
      }, actualDelay)
    })
  }

  const typeText = async (
    target: typeof typedCommand | typeof searchQuery,
    text: string,
    baseDelay = 100,
  ): Promise<boolean> => {
    for (const char of text) {
      if (!isAnimating) return false
      target.value += char
      const variance = baseDelay * 0.4
      const delay = baseDelay + (Math.random() * variance * 2 - variance)
      const shouldContinue = await sleep(delay)
      if (!shouldContinue) return false
    }
    return true
  }

  const runAnimation = async () => {
    if (!(await sleep(600))) return
    isTypingCommand.value = true
    if (!(await typeText(typedCommand, 'bab', 110))) return
    isTypingCommand.value = false
    if (!(await sleep(350, 50))) return

    phase.value = 'tui'
    if (!(await sleep(700, 100))) return

    isTypingSearch.value = true
    if (!(await typeText(searchQuery, 'bui', 140))) return
    isTypingSearch.value = false
    if (!(await sleep(500, 100))) return

    if (!(await sleep(450, 50))) return
    selectedIndex.value = 1
    if (!(await sleep(350, 50))) return
    selectedIndex.value = 2
    if (!(await sleep(550, 50))) return

    showTuiCursor.value = false
    if (!(await sleep(250))) return

    phase.value = 'executing'
    if (!(await sleep(300, 100))) return
    executionStep.value = 1
    if (!(await sleep(150, 50))) return
    executionStep.value = 2
    if (!(await sleep(600, 150))) return
    executionStep.value = 3
    if (!(await sleep(150, 50))) return
    executionStep.value = 4
    if (!(await sleep(400, 100))) return
    executionStep.value = 5
    if (!(await sleep(300, 80))) return
    executionStep.value = 6
    if (!(await sleep(350, 80))) return
    executionStep.value = 7
    if (!(await sleep(250, 50))) return
    executionStep.value = 8
    if (!(await sleep(500, 100))) return
    executionStep.value = 9
    if (!(await sleep(150, 50))) return
    executionStep.value = 10
    if (!(await sleep(200, 50))) return
    executionStep.value = 11
    if (!(await sleep(300, 50))) return
    executionStep.value = 12

    if (!(await sleep(1500))) return

    phase.value = 'clearing'
    if (!(await sleep(500))) return

    isTypingClear.value = true
    if (!(await typeText(clearCommand, 'clear', 110))) return
    isTypingClear.value = false

    if (!(await sleep(400))) return

    resetState()
    if (!(await sleep(300))) return
    runAnimation()
  }

  const resetState = () => {
    phase.value = 'typing'
    typedCommand.value = ''
    searchQuery.value = ''
    selectedIndex.value = 0
    showTuiCursor.value = true
    isTypingCommand.value = false
    isTypingSearch.value = false
    executionStep.value = 0
    clearCommand.value = ''
    isTypingClear.value = false
  }

  onMounted(() => {
    isAnimating = true
    animationId++
    runAnimation()
  })

  onUnmounted(() => {
    isAnimating = false
    animationId++
  })
</script>

<style scoped>
  .terminal {
    background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.03),
      0 25px 50px -12px rgba(0, 0, 0, 0.6),
      0 0 80px -20px rgba(175, 135, 255, 0.15);
    transform: translateZ(0);
    will-change: transform;
    backface-visibility: hidden;
  }

  .terminal-header {
    background: linear-gradient(180deg, #2d2d2d 0%, #1f1f1f 100%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    transform: translateZ(0);
  }

  .cursor-blink {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }
</style>
