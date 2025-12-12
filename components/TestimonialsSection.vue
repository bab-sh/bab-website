<template>
  <section id="testimonials" class="relative py-24">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <Badge variant="secondary" class="border-bab/20 bg-bab/10 text-bab-light mb-4">
          Community
        </Badge>
        <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">Loved by developers</h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
          See what developers are saying about bab.
        </p>
      </div>

      <div class="flex justify-center gap-6">
        <Card
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.github"
          class="border-border bg-card/50 flex max-w-md flex-col"
        >
          <CardContent class="flex flex-1 flex-col pt-6">
            <p class="text-muted-foreground mb-3 text-xs">
              since {{ formatDate(testimonial.since) }}
            </p>
            <p class="text-muted-foreground mb-6 flex-1 text-sm leading-relaxed">
              "{{ testimonial.quote }}"
            </p>
            <a
              :href="profiles[index]?.html_url ?? `https://github.com/${testimonial.github}`"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <img
                :src="profiles[index]?.avatar_url ?? `https://github.com/${testimonial.github}.png`"
                :alt="profiles[index]?.name ?? testimonial.github"
                class="h-10 w-10 rounded-full object-cover"
              >
              <div>
                <p class="flex items-center gap-1 text-sm font-medium text-white">
                  {{ profiles[index]?.name ?? testimonial.github }}
                  <Icon
                    name="lucide:external-link"
                    class="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </p>
                <p class="text-muted-foreground text-xs">{{ testimonial.role }}</p>
              </div>
            </a>
          </CardContent>
        </Card>
      </div>

      <div class="mt-12 text-center">
        <p class="text-muted-foreground mb-4 text-sm">Want to share your experience with bab?</p>
        <Button variant="outline" as-child>
          <a
            href="https://github.com/bab-sh/bab-website/blob/main/TESTIMONIALS.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="lucide:message-square" class="mr-2 h-4 w-4" />
            Share your story
          </a>
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { Card, CardContent } from '@/components/ui/card'
  import { Badge } from '@/components/ui/badge'
  import { Button } from '@/components/ui/button'
  import testimonialsData from '@/data/testimonials.json'

  interface TestimonialData {
    github: string
    role: string
    quote: string
    since: string
  }

  interface GitHubProfile {
    login: string
    name: string | null
    avatar_url: string
    html_url: string
    cached: boolean
  }

  const testimonials = (testimonialsData as TestimonialData[]).map((t) => ({
    ...t,
    since: new Date(t.since),
  }))

  const formatDate = (date: Date) => {
    return date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '.')
  }

  const profileResults = await Promise.all(
    testimonials.map((t) => useFetch<GitHubProfile>(`/api/github-profile?username=${t.github}`)),
  )

  const profiles = computed(() => profileResults.map((result) => result.data.value))
</script>
