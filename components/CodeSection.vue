<template>
  <section id="code" class="relative py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <Badge variant="secondary" class="border-bab/20 bg-bab/10 text-bab-light mb-4">
          Configuration
        </Badge>
        <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">Simple yet powerful</h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
          Define your tasks in a clean YAML file. No complex syntax, no build system knowledge
          required.
        </p>
      </div>

      <div class="grid items-start gap-8 lg:grid-cols-2">
        <div class="border-border overflow-hidden rounded-xl border">
          <div
            class="border-border bg-card/50 flex items-center justify-between border-b px-4 py-3"
          >
            <div class="flex items-center gap-2">
              <SvgoBabLogo class="h-4 w-4" />
              <span class="text-muted-foreground font-mono text-sm">babfile.yml</span>
            </div>
            <button
              class="text-muted-foreground rounded p-1 transition-colors hover:bg-white/5 hover:text-white"
              @click="copyCode"
            >
              <Icon v-if="!copied" name="lucide:copy" class="h-4 w-4" />
              <Icon v-else name="lucide:check" class="text-success h-4 w-4" />
            </button>
          </div>
          <pre
            class="overflow-x-auto p-4 font-mono text-xs leading-snug sm:text-sm"
          ><code><template v-for="(line, i) in lines" :key="i"><span class="code-line" :class="lineClasses(line, i)" @mouseenter="hover(line, i)" @mouseleave="unhover()"><template v-for="(t, j) in line.tokens" :key="j"><span :class="t.c">{{ t.t }}</span></template></span></template></code></pre>
        </div>

        <div class="space-y-6">
          <div
            v-for="f in features"
            :key="f.id"
            class="feature-card border-border bg-card/50 flex cursor-pointer gap-4 rounded-lg border p-4"
            :class="{ active: active === f.id }"
            @mouseenter="highlight = f.id"
            @mouseleave="highlight = null"
          >
            <div class="bg-bab/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              <Icon :name="f.icon" class="text-bab-light h-5 w-5" />
            </div>
            <div>
              <h3 class="mb-1 font-semibold text-white">{{ f.title }}</h3>
              <p class="text-muted-foreground text-sm">{{ f.desc }}</p>
            </div>
          </div>

          <div
            class="border-border bg-card/50 hover:border-bab/20 rounded-lg border p-4 transition-colors"
          >
            <h4 class="mb-3 font-semibold text-white">Run your tasks:</h4>
            <div class="space-y-2 font-mono text-sm">
              <div v-for="c in commands" :key="c.task ?? 'i'" class="flex items-center gap-1">
                <span class="text-tui-muted select-none">$</span>
                <span class="text-white">bab</span>
                <span
                  v-if="c.task"
                  class="task-cmd"
                  :class="{ active: highlight === `task-${c.task}` }"
                  @mouseenter="highlight = `task-${c.task}`"
                  @mouseleave="highlight = null"
                  >{{ c.task }}</span
                >
                <span class="text-tui-dim ml-2">{{ c.comment }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { Badge } from '@/components/ui/badge'

  interface Token {
    t: string
    c: string
  }
  interface Line {
    tokens: Token[]
    group?: string
    feature?: string
    ref?: string
  }

  const styles = {
    keyword: 'text-tui-match',
    key: 'text-tui-muted',
    accent: 'text-tui-accent',
    value: 'text-gray-200',
    punct: 'text-white',
  } as const

  const features = [
    {
      id: 'vars',
      icon: 'lucide:braces',
      title: 'Variables',
      desc: 'Define vars at global or task level. Reference them anywhere with ${{ var_name }} syntax.',
    },
    {
      id: 'composition',
      icon: 'lucide:layers',
      title: 'Task Composition',
      desc: 'Reference other tasks with task: to compose complex workflows from simple building blocks.',
    },
    {
      id: 'deps',
      icon: 'lucide:git-branch',
      title: 'Task Dependencies',
      desc: 'Define deps and bab automatically runs prerequisites first. No more manual ordering.',
    },
    {
      id: 'env',
      icon: 'lucide:variable',
      title: 'Environment Variables',
      desc: 'Set env vars at global, task, or command level. More specific levels override broader ones.',
    },
    {
      id: 'platforms',
      icon: 'lucide:globe',
      title: 'Platform-Specific Commands',
      desc: 'Different commands for different operating systems. Write once, run anywhere.',
    },
    {
      id: 'log',
      icon: 'lucide:message-square',
      title: 'Log Messages',
      desc: 'Add informational log messages with levels: debug, info, warn, error.',
    },
  ]

  const commands = [
    { task: 'dev', comment: '# Start dev server' },
    { task: 'build', comment: '# Build the application' },
    { task: 'setup', comment: '# Install dependencies' },
    { task: 'deploy', comment: '# Deploy to production' },
    { task: null, comment: '# Interactive mode' },
  ]

  const token = (text: string, style = ''): Token => ({ t: text, c: style })
  const keyword = (text: string) => token(text, styles.keyword)
  const key = (text: string) => token(text, styles.key)
  const taskName = (text: string) => token(text, styles.accent)
  const value = (text: string) => token(text, styles.value)
  const punct = (text: string) => token(text, styles.punct)
  const indent = (n: number) => token(' '.repeat(n))

  const L = {
    empty: (): Line => ({ tokens: [{ t: '\n', c: '' }] }),
    raw: (tokens: Token[]): Line => ({ tokens }),
    task: (tokens: Token[], name: string): Line => ({ tokens, group: `task-${name}` }),
    feature: (tokens: Token[], task: string, feat: string, ref?: string): Line => ({
      tokens,
      group: `task-${task}`,
      feature: feat,
      ref,
    }),
    global: (tokens: Token[], group: string, feature?: string): Line => ({
      tokens,
      group,
      feature,
    }),
  }

  const lines: Line[] = [
    L.global([keyword('vars'), punct(':')], 'vars', 'vars'),
    L.global([indent(2), key('app_name'), punct(':'), indent(1), value('myapp')], 'vars', 'vars'),
    L.global([indent(2), key('version'), punct(':'), indent(1), value('"1.0.0"')], 'vars', 'vars'),
    L.empty(),
    L.global([keyword('env'), punct(':')], 'env', 'env'),
    L.global(
      [indent(2), key('APP_NAME'), punct(':'), indent(1), value('${{ app_name }}')],
      'env',
      'vars',
    ),
    L.empty(),
    L.raw([keyword('tasks'), punct(':')]),
    L.task([indent(2), taskName('dev'), punct(':')], 'dev'),
    L.task(
      [indent(4), key('desc'), punct(':'), indent(1), value('Start development server')],
      'dev',
    ),
    L.feature(
      [indent(4), key('deps'), punct(':'), indent(1), value('[setup]')],
      'dev',
      'deps',
      'task-setup',
    ),
    L.task([indent(4), key('run'), punct(':')], 'dev'),
    L.task(
      [indent(6), punct('-'), indent(1), key('cmd'), punct(':'), indent(1), value('npm run dev')],
      'dev',
    ),
    L.empty(),
    L.task([indent(2), taskName('build'), punct(':')], 'build'),
    L.task(
      [indent(4), key('desc'), punct(':'), indent(1), value('Build the application')],
      'build',
    ),
    L.feature(
      [indent(4), key('deps'), punct(':'), indent(1), value('[setup]')],
      'build',
      'deps',
      'task-setup',
    ),
    L.feature([indent(4), key('vars'), punct(':')], 'build', 'vars'),
    L.feature([indent(6), key('target'), punct(':'), indent(1), value('release')], 'build', 'vars'),
    L.task([indent(4), key('run'), punct(':')], 'build'),
    L.feature(
      [
        indent(6),
        punct('-'),
        indent(1),
        key('log'),
        punct(':'),
        indent(1),
        value('Building ${{ app_name }} v${{ version }}...'),
      ],
      'build',
      'vars',
    ),
    L.task(
      [
        indent(6),
        punct('-'),
        indent(1),
        key('cmd'),
        punct(':'),
        indent(1),
        value('go build -o app'),
      ],
      'build',
    ),
    L.feature(
      [indent(6), punct('-'), indent(1), key('log'), punct(':'), indent(1), value('Done!')],
      'build',
      'log',
    ),
    L.feature([indent(8), key('level'), punct(':'), indent(1), value('info')], 'build', 'log'),
    L.empty(),
    L.task([indent(2), taskName('setup'), punct(':')], 'setup'),
    L.task([indent(4), key('desc'), punct(':'), indent(1), value('Install dependencies')], 'setup'),
    L.feature([indent(4), key('env'), punct(':')], 'setup', 'env'),
    L.feature([indent(6), key('CI'), punct(':'), indent(1), value('"true"')], 'setup', 'env'),
    L.task([indent(4), key('run'), punct(':')], 'setup'),
    L.task(
      [indent(6), punct('-'), indent(1), key('cmd'), punct(':'), indent(1), value('./install.sh')],
      'setup',
    ),
    L.feature(
      [indent(8), key('platforms'), punct(':'), indent(1), value('[darwin, linux]')],
      'setup',
      'platforms',
    ),
    L.task(
      [indent(6), punct('-'), indent(1), key('cmd'), punct(':'), indent(1), value('install.bat')],
      'setup',
    ),
    L.feature(
      [indent(8), key('platforms'), punct(':'), indent(1), value('[windows]')],
      'setup',
      'platforms',
    ),
    L.empty(),
    L.task([indent(2), taskName('deploy'), punct(':')], 'deploy'),
    L.task(
      [indent(4), key('desc'), punct(':'), indent(1), value('Deploy to production')],
      'deploy',
    ),
    L.task([indent(4), key('run'), punct(':')], 'deploy'),
    L.feature(
      [indent(6), punct('-'), indent(1), key('task'), punct(':'), indent(1), taskName('build')],
      'deploy',
      'composition',
      'task-build',
    ),
    L.task(
      [indent(6), punct('-'), indent(1), key('cmd'), punct(':'), indent(1), value('./deploy.sh')],
      'deploy',
    ),
    L.feature([indent(8), key('env'), punct(':')], 'deploy', 'env'),
    L.feature(
      [indent(10), key('TARGET'), punct(':'), indent(1), value('production')],
      'deploy',
      'env',
    ),
  ]

  const copied = ref(false)
  const highlight = ref<string | null>(null)
  const hoverIdx = ref<number | null>(null)
  const hoverRef = ref<string | null>(null)

  const getBlockIndices = (idx: number): Set<number> => {
    const feature = lines[idx]?.feature
    if (!feature) return new Set([idx])
    const indices = new Set([idx])
    for (let i = idx - 1; i >= 0 && lines[i]?.feature === feature; i--) indices.add(i)
    for (let i = idx + 1; i < lines.length && lines[i]?.feature === feature; i++) indices.add(i)
    return indices
  }

  const hoverBlock = computed(() =>
    hoverIdx.value !== null ? getBlockIndices(hoverIdx.value) : null,
  )
  const active = computed(() => highlight.value || lines[hoverIdx.value!]?.feature || null)

  const isHit = (ln: Line | undefined, i: number): boolean => {
    if (!ln) return false
    return !!(
      hoverBlock.value?.has(i) ||
      (highlight.value && ln.group === highlight.value) ||
      (highlight.value && ln.feature === highlight.value) ||
      (hoverRef.value && ln.group === hoverRef.value)
    )
  }

  const lineClasses = (ln: Line, i: number) => {
    const hit = isHit(ln, i)
    const isRef = hoverRef.value && ln.group === hoverRef.value
    const isEdge = (offset: number) => !isHit(lines[i + offset], i + offset)
    return {
      interactive: !!ln.feature,
      highlight: hit && !isRef,
      'highlight-ref': isRef,
      'highlight-start': hit && isEdge(-1),
      'highlight-end': hit && isEdge(1),
    }
  }

  const hover = (ln: Line, i: number) => {
    if (!ln.feature) return
    hoverIdx.value = i
    if (ln.ref) hoverRef.value = ln.ref
  }

  const unhover = () => {
    hoverIdx.value = null
    hoverRef.value = null
  }

  const codeText = lines
    .map((l) => {
      const text = l.tokens.map((t) => t.t).join('')
      return text === '\n' ? '' : text
    })
    .join('\n')

  const copyCode = async () => {
    await navigator.clipboard.writeText(codeText)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
</script>

<style scoped>
  .code-line,
  .task-cmd,
  .feature-card {
    --hl: 208, 157, 247;
  }

  .code-line {
    display: block;
    margin: 0 -13px;
    padding: 1px 13px;
    box-sizing: border-box;
    border: 0 solid rgba(var(--hl), 0.5);
    transition-property: background, border-radius;
    transition-duration: 0.2s, 0s;
    transition-delay: 0s, 0.2s;
  }

  .code-line.interactive {
    cursor: pointer;
  }
  .code-line.interactive:hover:not(.highlight):not(.highlight-ref) {
    background: rgba(var(--hl), 0.1);
    border-radius: 4px;
  }

  .code-line.highlight {
    background: rgba(var(--hl), 0.2);
  }
  .code-line.highlight-ref {
    padding: 0 12px;
    border-width: 1px;
    background: transparent;
  }

  .code-line.highlight-start {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .code-line.highlight-end {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .code-line.highlight-ref:not(.highlight-start) {
    border-top-width: 0;
    padding-top: 1px;
  }
  .code-line.highlight-ref:not(.highlight-end) {
    border-bottom-width: 0;
    padding-bottom: 1px;
  }

  .code-line.highlight-start,
  .code-line.highlight-end {
    transition: background 0.2s;
  }

  .task-cmd {
    padding: 2px 6px;
    margin: -2px 0 -2px -2px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .task-cmd:hover,
  .task-cmd.active {
    background: rgba(var(--hl), 0.25);
    color: #e5b5fe;
  }

  .feature-card {
    transition: all 0.2s;
  }
  .feature-card.active {
    border-color: rgba(var(--hl), 0.4);
    background: rgba(var(--hl), 0.08);
    box-shadow: 0 0 20px rgba(var(--hl), 0.15);
  }
</style>
