import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  modules: ['shadcn-nuxt', '@nuxt/fonts', '@nuxt/eslint'],

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
        weights: [400, 500, 600, 700, 800],
      },
    ],
    defaults: {
      weights: [400, 500, 600, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'bab - Modern Task Runner',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Modern task runner. Zero dependencies, cross-platform, simple.',
        },
        { name: 'theme-color', content: '#0a0a0a' },
        { name: 'apple-mobile-web-app-title', content: 'Bab.sh' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
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
        { rel: 'canonical', href: 'https://bab.sh' },
        { rel: 'preconnect', href: 'https://cdn.bab.sh' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],
})
