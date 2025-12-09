<template>
  <section id="community" class="py-24 relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <Badge variant="secondary" class="mb-4 bg-bab/10 border-bab/20 text-bab-light">
          Open Source
        </Badge>
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
          Built by the community, for the community
        </h2>
        <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
          bab is free, open source, and MIT licensed.
          Join our growing community of developers.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
        <Card class="bg-card/50 border-border text-center card-hover">
          <CardContent class="pt-6">
            <div class="text-4xl font-bold text-gradient mb-2">MIT</div>
            <div class="text-muted-foreground">Licensed</div>
          </CardContent>
        </Card>
        <Card class="bg-card/50 border-border text-center card-hover">
          <CardContent class="pt-6">
            <div class="text-4xl font-bold text-gradient mb-2">100%</div>
            <div class="text-muted-foreground">Free & Open</div>
          </CardContent>
        </Card>
        <Card class="bg-card/50 border-border text-center card-hover">
          <CardContent class="pt-6">
            <div class="text-4xl font-bold text-gradient mb-2">Go</div>
            <div class="text-muted-foreground">Powered</div>
          </CardContent>
        </Card>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
        <Button
          size="lg"
          variant="outline"
          as-child
        >
          <a href="https://github.com/bab-sh/bab" target="_blank" rel="noopener">
            <Icon icon="simple-icons:github" class="mr-2 h-5 w-5" />
            Star on GitHub
          </a>
        </Button>
        <Button
          size="lg"
          variant="outline"
          as-child
        >
          <a href="https://docs.bab.sh" target="_blank" rel="noopener">
            <BookOpen class="mr-2 h-5 w-5" />
            Read the Docs
          </a>
        </Button>
      </div>

      <div class="mt-16">
        <Card class="bg-gradient-to-br from-bab/10 via-transparent to-bab-light/10 border-bab/20 max-w-3xl mx-auto overflow-hidden">
          <CardContent class="py-8 px-8">
            <div class="text-center mb-6">
              <h3 class="text-2xl font-bold text-white mb-2">
                Want to contribute?
              </h3>
              <p class="text-muted-foreground text-sm">
                We welcome contributions of all kinds!
              </p>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div class="flex items-center gap-2">
                <a
                  v-for="item in contributionTypes"
                  :key="item.label"
                  :href="item.href"
                  target="_blank"
                  rel="noopener"
                  class="w-10 h-10 rounded-full bg-card/80 border border-border flex items-center justify-center hover:border-bab/50 hover:bg-bab/10 transition-all group"
                  :title="item.label"
                >
                  <component :is="item.icon" class="h-4 w-4 text-muted-foreground group-hover:text-bab-light transition-colors" />
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
