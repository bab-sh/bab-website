export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/google-fonts', '@nuxt/eslint'],

  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },

  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700, 800],
    },
    display: 'swap',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'bab - Modern Task Runner',
      meta: [
        {
          name: 'description',
          content: 'Modern task runner. Zero dependencies, cross-platform, simple.',
        },
        { name: 'theme-color', content: '#0a0a0a' },
        { name: 'apple-mobile-web-app-title', content: 'Bab.sh' },
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
