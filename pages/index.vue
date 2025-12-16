<template>
  <div>
    <HeroSection />
    <FeaturesSection />
    <ComparisonSection />
    <CodeSection />
    <IntegrationsSection />
    <InstallSection />
    <OpenSourceSection />
    <TestimonialsSection />
    <FaqSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    sitemap: {
      priority: 1.0,
    },
  })

  const { data: versionData } = await useFetch<{ version: string }>('/api/github-version')
  const version = computed(() => versionData.value?.version ?? 'Pre-Alpha')

  defineOgImageComponent('Bab', {
    title: 'Modern Task Runner',
    description: 'Zero-dependency, cross-platform task runner with simple YAML configuration.',
    version,
  })

  useSeoMeta({
    title: 'bab - Modern Task Runner | Replace Makefiles & npm Scripts',
    description:
      'bab is a zero-dependency, cross-platform task runner with simple YAML configuration. Replace your Makefiles and npm scripts with clean, readable task definitions.',
    keywords:
      'task runner, build automation, makefile alternative, npm scripts replacement, yaml task runner, cross-platform build tool, developer tools, devops automation, bab',
    author: 'AIO',
    ogUrl: 'https://bab.sh',
    ogType: 'website',
    ogLocale: 'en_US',
    ogSiteName: 'bab',
    ogTitle: 'bab - Modern Task Runner | Zero Dependencies, Cross-Platform',
    ogDescription:
      'Replace your Makefiles and npm scripts with clean YAML. Zero dependencies, works everywhere.',
    twitterCard: 'summary_large_image',
    twitterTitle: 'bab - Modern Task Runner',
    twitterDescription:
      'Zero-dependency, cross-platform task runner with simple YAML. Replace Makefiles & npm scripts.',
    twitterSite: '@babshdev',
    twitterCreator: '@babshdev',
  })

  useSchemaOrg([
    defineWebPage({
      '@type': 'FAQPage',
      name: 'bab - Modern Task Runner',
      description: 'Zero-dependency, cross-platform task runner with simple YAML configuration.',
    }),
    defineSoftwareApp({
      name: 'bab',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, macOS, Linux',
      description:
        'Modern task runner with zero dependencies. Replace Makefiles and npm scripts with clean YAML configuration.',
      downloadUrl: 'https://github.com/bab-sh/bab/releases',
      softwareVersion: 'Pre-Alpha',
      offers: {
        price: 0,
        priceCurrency: 'USD',
      },
    }),
    defineQuestion({
      name: 'What is bab?',
      acceptedAnswer:
        'bab is a modern, zero-dependency task runner designed to replace Makefiles and npm scripts. It uses simple YAML configuration and works seamlessly across Windows, macOS, and Linux.',
    }),
    defineQuestion({
      name: 'How do I install bab?',
      acceptedAnswer:
        'You can install bab using our quick install script, Homebrew, Go, or download the binary directly from GitHub. Visit the installation section at https://bab.sh/#install for detailed instructions.',
    }),
    defineQuestion({
      name: 'Does bab work on Windows?',
      acceptedAnswer:
        'Yes! bab has full cross-platform support. It works on Windows, macOS, and Linux with the same configuration file. You can even define platform-specific commands when needed.',
    }),
    defineQuestion({
      name: 'Can I migrate from Make or npm scripts?',
      acceptedAnswer:
        "Absolutely. bab's YAML syntax is intuitive and easy to learn. Most Makefile or npm script configurations can be converted to bab in minutes. Check the migration guide at https://docs.bab.sh/guide/migration for tips.",
    }),
    defineQuestion({
      name: 'Is bab free to use?',
      acceptedAnswer:
        'Yes, bab is completely free and open source under the MIT license. You can use it for personal projects, commercial applications, or anything in between.',
    }),
    defineQuestion({
      name: 'How do I get help or report issues?',
      acceptedAnswer:
        'Join the Discord community at https://discord.bab.sh for quick help, or open an issue on GitHub at https://github.com/bab-sh/bab/issues for bug reports and feature requests.',
    }),
    defineBreadcrumb({
      itemListElement: [{ name: 'Home', item: '/' }],
    }),
    {
      '@type': 'ItemList',
      '@id': 'https://bab.sh/#navigation',
      name: 'Site Navigation',
      itemListElement: [
        {
          '@type': 'SiteNavigationElement',
          position: 1,
          name: 'Documentation',
          url: 'https://docs.bab.sh',
        },
        {
          '@type': 'SiteNavigationElement',
          position: 2,
          name: 'GitHub',
          url: 'https://github.com/bab-sh/bab',
        },
        {
          '@type': 'SiteNavigationElement',
          position: 3,
          name: 'Discord Community',
          url: 'https://discord.bab.sh',
        },
      ],
    },
  ])
</script>
