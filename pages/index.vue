<template>
  <div>
    <HeroSection />
    <FeaturesSection />
    <CodeSection />
    <IntegrationsSection />
    <InstallSection />
    <OpenSourceSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'bab - Modern Task Runner | Replace Makefiles & npm Scripts',
    description:
      'bab is a zero-dependency, cross-platform task runner with simple YAML configuration. Replace your Makefiles and npm scripts with clean, readable task definitions.',
    keywords:
      'task runner, build automation, makefile alternative, npm scripts replacement, yaml task runner, cross-platform build tool, developer tools, devops automation, bab',
    author: 'AIO',
    ogTitle: 'bab - Modern Task Runner | Zero Dependencies, Cross-Platform',
    ogDescription:
      'Replace your Makefiles and npm scripts with clean YAML. Zero dependencies, works everywhere.',
    ogImage: 'https://cdn.bab.sh/l/og-image',
    ogUrl: 'https://bab.sh',
    ogType: 'website',
    ogSiteName: 'bab',
    ogLocale: 'en_US',
    twitterCard: 'summary_large_image',
    twitterTitle: 'bab - Modern Task Runner',
    twitterDescription:
      'Zero-dependency, cross-platform task runner with simple YAML. Replace Makefiles & npm scripts.',
    twitterImage: 'https://cdn.bab.sh/l/og-image',
    twitterSite: '@babshdev',
    robots: 'index, follow',
  })

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'bab',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Windows, macOS, Linux',
          description:
            'Modern task runner with zero dependencies. Replace Makefiles and npm scripts with clean YAML configuration.',
          url: 'https://bab.sh',
          downloadUrl: 'https://github.com/bab-sh/bab/releases',
          softwareVersion: 'Pre-Alpha',
          author: {
            '@type': 'Organization',
            name: 'AIO',
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        }),
      },
    ],
  })
</script>
