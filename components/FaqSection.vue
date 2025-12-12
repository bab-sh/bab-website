<template>
  <section id="faq" class="relative py-24">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <Badge variant="secondary" class="border-bab/20 bg-bab/10 text-bab-light mb-4"> FAQ </Badge>
        <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">Frequently asked questions</h2>
        <p class="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
          Everything you need to know about bab.
        </p>
      </div>

      <Accordion type="single" collapsible class="w-full space-y-4">
        <AccordionItem
          v-for="faq in faqs"
          :key="faq.question"
          :value="faq.question"
          class="border-border bg-card/50 rounded-lg border px-6"
        >
          <AccordionTrigger class="text-left text-white hover:no-underline">
            {{ faq.question }}
          </AccordionTrigger>
          <AccordionContent class="text-muted-foreground">
            <p>
              <template v-for="(segment, index) in faq.answer" :key="index">
                <a
                  v-if="segment.link"
                  :href="segment.link.href"
                  :target="segment.link.external ? '_blank' : undefined"
                  :rel="segment.link.external ? 'noopener noreferrer' : undefined"
                  class="text-bab-light hover:underline"
                >
                  {{ segment.text }}
                </a>
                <template v-else>{{ segment.text }}</template>
              </template>
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div class="mt-12 text-center">
        <p class="text-muted-foreground mb-4 text-sm">Still have questions?</p>
        <div class="flex flex-wrap justify-center gap-4">
          <Button variant="outline" as-child>
            <a href="https://docs.bab.sh" target="_blank" rel="noopener noreferrer">
              <Icon name="lucide:book-open" class="mr-2 h-4 w-4" />
              Read the docs
            </a>
          </Button>
          <Button variant="outline" as-child>
            <a href="https://discord.bab.sh" target="_blank" rel="noopener noreferrer">
              <Icon name="simple-icons:discord" class="mr-2 h-4 w-4" />
              Join Discord
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion'
  import { Badge } from '@/components/ui/badge'
  import { Button } from '@/components/ui/button'

  interface FaqSegment {
    text: string
    link?: {
      href: string
      external?: boolean
    }
  }

  interface Faq {
    question: string
    answer: FaqSegment[]
  }

  const faqs: Faq[] = [
    {
      question: 'What is bab?',
      answer: [
        {
          text: 'bab is a modern, zero-dependency task runner designed to replace Makefiles and npm scripts. It uses simple YAML configuration and works seamlessly across Windows, macOS, and Linux.',
        },
      ],
    },
    {
      question: 'How do I install bab?',
      answer: [
        {
          text: 'You can install bab using our quick install script, Homebrew, Go, or download the binary directly from GitHub. Check the ',
        },
        { text: 'installation section', link: { href: '#install' } },
        { text: ' for detailed instructions.' },
      ],
    },
    {
      question: 'Does bab work on Windows?',
      answer: [
        {
          text: 'Yes! bab has full cross-platform support. It works on Windows, macOS, and Linux with the same configuration file. You can even define platform-specific commands when needed.',
        },
      ],
    },
    {
      question: 'Can I migrate from Make or npm scripts?',
      answer: [
        {
          text: "Absolutely. bab's YAML syntax is intuitive and easy to learn. Most Makefile or npm script configurations can be converted to bab in minutes. Check our ",
        },
        {
          text: 'migration guide',
          link: { href: 'https://docs.bab.sh/guide/migration', external: true },
        },
        { text: ' for tips.' },
      ],
    },
    {
      question: 'Is bab free to use?',
      answer: [
        {
          text: 'Yes, bab is completely free and open source under the MIT license. You can use it for personal projects, commercial applications, or anything in between.',
        },
      ],
    },
    {
      question: 'How do I get help or report issues?',
      answer: [
        { text: 'Join our ' },
        {
          text: 'Discord community',
          link: { href: 'https://discord.bab.sh', external: true },
        },
        { text: ' for quick help, or open an issue on ' },
        {
          text: 'GitHub',
          link: { href: 'https://github.com/bab-sh/bab/issues', external: true },
        },
        { text: ' for bug reports and feature requests.' },
      ],
    },
  ]
</script>
