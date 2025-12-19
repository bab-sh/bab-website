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
            <p v-html="faq.answer" />
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
  interface Faq {
    question: string
    answer: string
  }

  const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, '')

  const faqs: Faq[] = Object.freeze([
    {
      question: 'What is Bab?',
      answer:
        'Bab is a <strong>modern task runner</strong> that brings <strong>clean, consistent commands</strong> to any project. It helps automate recurring tasks and standardize workflows across your projects and teams. <strong>Simple to learn, powerful to use</strong>, and perfectly integrates in already existing projects with <a href="https://docs.bab.sh/integrations" target="_blank" rel="noopener noreferrer" class="text-bab-light hover:underline">IDE plugins</a>, <a href="https://github.com/bab-sh/setup-bab" target="_blank" rel="noopener noreferrer" class="text-bab-light hover:underline">GitHub Actions</a>, and more.',
    },
    {
      question: 'What problems does Bab solve?',
      answer:
        'Bab eliminates <strong>scattered scripts</strong>, <strong>cryptic Makefiles</strong>, and platform specific setups. Define your tasks once in readable <strong>YAML</strong> and <strong>run them anywhere</strong>. Spend less time on setup and more time actually coding.',
    },
    {
      question: 'Why use YAML for task configuration?',
      answer:
        '<strong>YAML</strong> is readable, widely known, and supported by every editor. <strong>No special syntax to learn</strong>, just define your tasks in a format you already understand. The <strong>Babfile</strong> format is designed to stay <strong>clean and organized</strong> even as your project grows.',
    },
    {
      question: 'Who should use Bab?',
      answer:
        'Any developer or team that wants <strong>consistent, shareable and clean</strong> project commands. Bab works with <strong>every framework, language, and project type</strong>. Great for <strong>solo projects</strong>, <strong>monorepos</strong>, and teams across different operating systems.',
    },
    {
      question: 'Does Bab work on all platforms?',
      answer:
        'Yes. Bab runs natively on <strong>Windows, macOS, and Linux</strong> without any additional tools. The same Babfile works everywhere, and you can define <strong>platform specific commands</strong> when needed or use <strong>native actions</strong> that handle platform compatibility automatically for you.',
    },
    {
      question: 'Is Bab free and open source?',
      answer:
        'Yes. Bab is completely <strong>free</strong> and <a href="https://github.com/bab-sh/bab" target="_blank" rel="noopener noreferrer" class="text-bab-light hover:underline">open source</a> under the <strong>MIT license</strong>. Use it for personal projects, commercial work, or anything in between.',
    },
    {
      question: 'How can I contribute to Bab?',
      answer:
        'There are many ways to help! <strong>Star the repo</strong> on <a href="https://github.com/bab-sh/bab" target="_blank" rel="noopener noreferrer" class="text-bab-light hover:underline">GitHub</a>, <strong>share Bab</strong> with your team, <strong>submit a testimonial</strong>, report bugs, suggest features, or <strong>contribute code</strong>. Join our <a href="https://discord.bab.sh" target="_blank" rel="noopener noreferrer" class="text-bab-light hover:underline">Discord</a> to connect with other contributors.',
    },
    {
      question: 'How do I submit a testimonial?',
      answer:
        'We would love to feature your experience on bab.sh! Check out the <a href="https://github.com/bab-sh/bab-website/blob/main/TESTIMONIALS.md" target="_blank" rel="noopener noreferrer" class="text-bab-light hover:underline">testimonial guide</a> for detailed instructions on how to submit yours.',
    },
    {
      question: 'How do I get help?',
      answer:
        'Join our <a href="https://discord.bab.sh" target="_blank" rel="noopener noreferrer" class="text-bab-light hover:underline">Discord community</a> for <strong>quick help</strong>, or open an issue on <a href="https://github.com/bab-sh/bab/issues" target="_blank" rel="noopener noreferrer" class="text-bab-light hover:underline">GitHub</a> for <strong>bug reports</strong> and <strong>feature requests</strong>. We love hearing about your experiences and ideas for making Bab even better.',
    },
    {
      question: 'What are Interactive Prompts?',
      answer:
        'Interactive Prompts let you collect <strong>user input during task execution</strong>. You can ask for <strong>confirmations</strong>, <strong>text input</strong>, <strong>selections</strong>, <strong>passwords</strong>, and more. Prompts are defined in your Babfile and the collected values are stored in <strong>variables</strong> you can use throughout your tasks.',
    },
  ]) as Faq[]

  const faqSchemaData = faqs.map((faq) => ({
    name: faq.question,
    acceptedAnswer: stripHtml(faq.answer),
  }))

  useSchemaOrg(faqSchemaData.map((faq) => defineQuestion(faq)))
</script>
