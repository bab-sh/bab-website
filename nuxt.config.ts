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
    name: 'Bab - Clean commands for any project.',
    description:
      'Modern task runner for defining project commands in YAML. Zero dependencies, cross-platform. Simple, fast, and powerful.',
    defaultLocale: 'en',
  },

  linkChecker: {
    enabled: true,
    failOnError: false,
  },

  routeRules: {
    '/api/**': { robots: false },
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
    cacheMaxAgeSeconds: 3600,
    exclude: ['/api/**'],
  },

  ogImage: {
    enabled: true,
    defaults: {
      component: 'NuxtSeo',
      width: 1200,
      height: 630,
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
        { name: 'msapplication-TileColor', content: '#0a0a0a' },
        { name: 'apple-mobile-web-app-title', content: 'Bab.sh' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],
})
