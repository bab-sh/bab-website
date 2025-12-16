import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  features: {
    inlineStyles: true,
  },

  nitro: {
    compressPublicAssets: true,
  },

  modules: ['shadcn-nuxt', '@nuxt/fonts', '@nuxt/eslint', '@nuxt/icon', 'nuxt-svgo', '@nuxtjs/seo'],

  site: {
    url: 'https://bab.sh',
    name: 'bab - Modern Task Runner',
    description:
      'bab is a modern, zero-dependency task runner for developers. Cross-platform CLI tool to replace Makefiles and npm scripts with simple YAML configuration.',
    defaultLocale: 'en',
  },

  sitemap: {
    xslColumns: [
      { label: 'URL', width: '65%' },
      { label: 'Priority', width: '12%', select: 'sitemap:priority' },
      { label: 'Last Modified', width: '23%', select: 'sitemap:lastmod' },
    ],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'bab',
      url: 'https://bab.sh',
      logo: 'https://cdn.bab.sh/l/og-image',
      sameAs: [
        'https://github.com/bab-sh/bab',
        'https://x.com/babshdev',
        'https://discord.bab.sh',
        'https://www.instagram.com/babshdev',
        'https://www.reddit.com/r/babsh/',
        'https://www.threads.com/@babshdev',
      ],
    },
  },

  svgo: {
    autoImportPath: './assets/images/',
    defaultImport: 'component',
  },

  icon: {
    serverBundle: {
      collections: ['lucide', 'simple-icons'],
    },
    mode: 'css',
    class: 'icon',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },

  fonts: {
    families: [
      {
        name: 'Montserrat',
        provider: 'google',
        weights: [400, 500, 600, 700],
        display: 'swap',
      },
    ],
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      preload: true,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'generator', content: 'Nuxt' },
        { name: 'rating', content: 'general' },
        { name: 'theme-color', content: '#0a0a0a' },
        { name: 'apple-mobile-web-app-title', content: 'Bab.sh' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/assets/favicon/favicon-96x96.png',
          sizes: '96x96',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/assets/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: '/assets/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/assets/favicon/site.webmanifest' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],
})
