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
    title: 'Clean commands for any project.',
    description: 'Modern task runner. Zero dependencies. Any platform.',
    version,
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
    ogImageAlt: 'Bab - Modern task runner for defining project commands in YAML',
  })

  useSchemaOrg([
    defineWebSite({
      name: 'Bab',
      alternateName: ['Bab Task Runner', 'Bab CLI', 'babfile'],
      description:
        'Modern task runner for defining project commands in YAML. Zero dependencies, cross-platform.',
    }),
    defineWebPage({
      '@type': 'FAQPage',
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
    defineQuestion({
      name: 'What is bab?',
      acceptedAnswer:
        'bab is a modern, zero-dependency task runner that uses simple YAML configuration. It works seamlessly across Windows, macOS, and Linux with features like an interactive TUI, fuzzy search, and IDE integration.',
    }),
    defineQuestion({
      name: 'How do I install bab?',
      acceptedAnswer:
        'You can install bab using our quick install script, Homebrew, Go, or download the binary directly from GitHub. On macOS/Linux run: curl -fsSL https://bab.sh/install | sh. On Windows: iwr -useb https://bab.sh/install.ps1 | iex. Visit https://bab.sh/#install for all installation options.',
    }),
    defineQuestion({
      name: 'Does bab work on Windows?',
      acceptedAnswer:
        'Yes! bab has full cross-platform support. It works on Windows, macOS, and Linux with the same configuration file. You can even define platform-specific commands when needed. No WSL or Cygwin required.',
    }),
    defineQuestion({
      name: 'What are the main features of bab?',
      acceptedAnswer:
        'bab offers an interactive TUI with fuzzy search, task dependencies, environment variables, platform-specific commands, shell completions, dry-run mode, and first-class IDE support for VS Code and IntelliJ. All in a single binary with zero dependencies.',
    }),
    defineQuestion({
      name: 'Why use bab instead of Make?',
      acceptedAnswer:
        "Make uses cryptic syntax with tabs, automatic variables ($@, $<), and shell-specific commands. bab uses clean YAML that's easy to read and write. Make doesn't work well on Windows without extra tools - bab works identically on all platforms. bab also offers an interactive TUI, fuzzy search, and IDE integration that Make lacks.",
    }),
    defineQuestion({
      name: 'Why use bab instead of npm scripts?',
      acceptedAnswer:
        "npm scripts are limited to Node.js projects and require escaping complex commands in JSON strings. bab works with any project type and uses readable YAML. bab supports task dependencies, environment variables, platform-specific commands, and an interactive mode - features npm scripts don't have natively.",
    }),
    defineQuestion({
      name: 'Why use bab instead of Taskfile?',
      acceptedAnswer:
        "Both bab and Taskfile use YAML and are written in Go. bab differentiates with an interactive TUI featuring fuzzy search, smart error hints, and first-class IDE support for VS Code and IntelliJ. If you like Taskfile, you'll feel right at home with bab's similar approach but enhanced developer experience.",
    }),
    defineQuestion({
      name: 'Why use bab instead of Just?',
      acceptedAnswer:
        'Just uses its own custom syntax while bab uses standard YAML that developers already know. bab offers an interactive TUI with fuzzy search, IDE plugins, and a more visual task selection experience. Both are excellent tools - choose bab if you prefer YAML and want built-in interactivity.',
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
