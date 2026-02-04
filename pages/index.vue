<template>
  <main>
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
  </main>
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
    title: 'Clean commands for any project.',
    description: 'Modern task runner. Zero dependencies. Any platform.',
    version,
  })

  useHead({
    link: [{ rel: 'canonical', href: 'https://bab.sh' }],
  })

  useSeoMeta({
    title: 'Bab - Clean commands for any project.',
    description:
      'Modern task runner for defining project commands in clean YAML syntax. Zero dependencies, works on Windows, macOS, and Linux. Simple, fast, and powerful.',
    keywords:
      'task runner, build automation, yaml task runner, cross-platform task runner, build tool, command runner, project automation, developer tools, devops automation, makefile alternative, make alternative, gnu make alternative, npm scripts alternative, npm scripts replacement, taskfile alternative, just alternative, gulp alternative, grunt alternative, rake alternative, yarn scripts alternative, go task runner, single binary task runner, ci cd automation, monorepo task runner, babfile, bab',
    author: 'AIO',
    ogUrl: 'https://bab.sh',
    ogType: 'website',
    ogLocale: 'en_US',
    ogSiteName: 'Bab',
    ogTitle: 'Bab - Clean commands for any project.',
    ogDescription:
      'Modern task runner for defining project commands in YAML. Zero dependencies, cross-platform. Simple, fast, and powerful.',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Bab - Clean commands for any project.',
    twitterDescription:
      'Modern task runner for defining project commands in YAML. Zero dependencies, cross-platform. Simple, fast, and powerful.',
    twitterSite: '@babshdev',
    twitterCreator: '@babshdev',
    ogImage: 'https://bab.sh/og-image.png',
    ogImageAlt: 'Bab - Modern task runner for defining project commands in YAML',
    twitterImage: 'https://bab.sh/og-image.png',
  })

  useSchemaOrg([
    defineWebSite({
      name: 'Bab',
      alternateName: ['Bab Task Runner', 'Bab CLI', 'babfile'],
      description:
        'Modern task runner for defining project commands in YAML. Zero dependencies, cross-platform.',
    }),
    defineWebPage({
      name: 'Bab - Clean commands for any project.',
      alternativeHeadline: 'Modern Cross-Platform Task Runner',
      description:
        'Modern task runner for defining project commands in clean YAML syntax. Zero dependencies, works on Windows, macOS, and Linux.',
    }),
    defineSoftwareApp({
      name: 'bab',
      alternateName: 'Bab Task Runner',
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Build Tool',
      operatingSystem: 'Windows, macOS, Linux',
      description:
        'Modern task runner for defining project commands in YAML. Zero dependencies, cross-platform. Simple, fast, and powerful.',
      keywords:
        'task runner, build automation, yaml, cross-platform, developer tools, makefile alternative, npm scripts alternative, taskfile alternative',
      downloadUrl: 'https://github.com/bab-sh/bab/releases',
      softwareVersion: 'Pre-Alpha',
      softwareRequirements: 'None - single binary with zero dependencies',
      releaseNotes: 'https://github.com/bab-sh/bab/releases',
      license: 'https://opensource.org/licenses/MIT',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: 0,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
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
