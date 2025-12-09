<template>
  <section id="community" class="relative py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <Badge variant="secondary" class="border-bab/20 bg-bab/10 text-bab-light mb-4">
          Open Source
        </Badge>
        <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">
          Built by the community, for the community
        </h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
          bab is free, open source, and MIT licensed. Join our growing community of developers.
        </p>
      </div>

      <div class="mx-auto mb-16 grid max-w-4xl gap-8 md:grid-cols-3">
        <Card class="card-hover border-border bg-card/50 text-center">
          <CardContent class="pt-6">
            <div class="text-gradient mb-2 text-4xl font-bold">MIT</div>
            <div class="text-muted-foreground">Licensed</div>
          </CardContent>
        </Card>
        <Card class="card-hover border-border bg-card/50 text-center">
          <CardContent class="pt-6">
            <div class="text-gradient mb-2 text-4xl font-bold">100%</div>
            <div class="text-muted-foreground">Free & Open</div>
          </CardContent>
        </Card>
        <Card class="card-hover border-border bg-card/50 text-center">
          <CardContent class="pt-6">
            <div class="text-gradient mb-2 text-4xl font-bold">Go</div>
            <div class="text-muted-foreground">Powered</div>
          </CardContent>
        </Card>
      </div>

      <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          size="lg"
          variant="outline"
          class="border-discord text-discord hover:bg-discord/10"
          as-child
        >
          <a href="https://discord.bab.sh" target="_blank" rel="noopener">
            <Icon icon="simple-icons:discord" class="mr-2 h-5 w-5" />
            Join Discord
          </a>
        </Button>
        <Button size="lg" variant="outline" as-child>
          <a href="https://github.com/bab-sh/bab" target="_blank" rel="noopener">
            <Icon icon="simple-icons:github" class="mr-2 h-5 w-5" />
            Star on GitHub
          </a>
        </Button>
        <Button size="lg" variant="outline" as-child>
          <a href="https://docs.bab.sh" target="_blank" rel="noopener">
            <BookOpen class="mr-2 h-5 w-5" />
            Read the Docs
          </a>
        </Button>
      </div>

      <div class="mt-16">
        <Card
          class="border-bab/20 from-bab/10 to-bab-light/10 mx-auto max-w-3xl overflow-hidden bg-gradient-to-br via-transparent"
        >
          <CardContent class="px-8 py-8">
            <div class="mb-6 text-center">
              <h3 class="mb-2 text-2xl font-bold text-white">Want to contribute?</h3>
              <p class="text-muted-foreground text-sm">We welcome contributions of all kinds!</p>
            </div>

            <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div class="flex items-center gap-2">
                <a
                  v-for="item in contributionTypes"
                  :key="item.label"
                  :href="item.href"
                  target="_blank"
                  rel="noopener"
                  class="group border-border bg-card/80 hover:border-bab/50 hover:bg-bab/10 flex h-10 w-10 items-center justify-center rounded-full border transition-all"
                  :title="item.label"
                >
                  <component
                    :is="item.icon"
                    class="text-muted-foreground group-hover:text-bab-light h-4 w-4 transition-colors"
                  />
                </a>
              </div>

              <Button as-child>
                <a
                  href="https://github.com/bab-sh/bab/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener"
                >
                  <Heart class="mr-2 h-4 w-4" />
                  Start Contributing
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { BookOpen, Heart, Code, FileText, Bug, Lightbulb } from 'lucide-vue-next'
  import { Badge } from '@/components/ui/badge'
  import { Button } from '@/components/ui/button'
  import { Card, CardContent } from '@/components/ui/card'

  const contributionTypes = [
    { icon: Code, label: 'Code', href: 'https://github.com/bab-sh/bab' },
    { icon: FileText, label: 'Docs', href: 'https://github.com/bab-sh/bab/tree/main/docs' },
    { icon: Bug, label: 'Issues', href: 'https://github.com/bab-sh/bab/issues' },
    { icon: Lightbulb, label: 'Ideas', href: 'https://github.com/bab-sh/bab/discussions' },
  ]
</script>
