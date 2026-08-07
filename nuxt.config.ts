import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/css/tailwind.css'],

  modules: [
    '@pinia/nuxt',
  ],

  vite: {
    plugins: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore — known type conflict between @tailwindcss/vite and Nuxt's internal Vite version
      tailwindcss(),
    ],
  },

  app: {
    head: {
      title: 'Regocijo Floristería – Ramos de Flores',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Descubre nuestra colección de hermosos ramos de flores artesanales. Entrega a domicilio en toda la ciudad.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/regocijosinfondo.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/regocijosinfondo.png' },
        { rel: 'shortcut icon', href: '/regocijosinfondo.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/regocijosinfondo.png' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteName: 'Regocijo Floristería',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    },
  },
})