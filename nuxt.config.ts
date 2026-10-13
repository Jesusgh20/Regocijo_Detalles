import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/css/tailwind.css'],

  modules: ['@pinia/nuxt'],

  vite: {
    plugins: [
      // @ts-ignore — conflicto de tipos conocido entre @tailwindcss/vite y el Vite interno de Nuxt
      tailwindcss(),
    ],
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'es-CO' },
      title: 'Regocijo Floristería – La belleza de sentir',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Ramos de flores hechos a mano, con entrega a domicilio en Montería, Córdoba. Rosas, lirios, girasoles y ramos mixtos.',
        },
        { name: 'theme-color', content: '#fbf6ef' },
        { property: 'og:site_name', content: 'Regocijo Floristería' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'es_CO' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },

  // /editar-ramo se eliminó: se redirige para no dejar enlaces rotos en buscadores o chats guardados.
  routeRules: {
    '/editar-ramo': { redirect: { to: '/catalogo', statusCode: 301 } },
    // Panel de administración: solo en el navegador (no se renderiza en servidor) y fuera de buscadores
    '/admin': { ssr: false, headers: { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' } },
    '/admin/**': { ssr: false, headers: { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' } },
    // Cabeceras de seguridad básicas. (No se activa una CSP estricta porque Vue/Nuxt inyectan estilos en línea;
    //  si más adelante agregas terceros, define una CSP a medida.)
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()',
      },
    },
  },

  runtimeConfig: {
    public: {
      siteName: 'Regocijo Floristería',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      // Se llenan con NUXT_PUBLIC_SUPABASE_URL y NUXT_PUBLIC_SUPABASE_ANON_KEY (ver SUPABASE.md).
      // La clave «anon» es pública por diseño; la protección real son las políticas RLS de supabase/setup.sql.
      // También acepta los nombres que crea la integración de Vercel con Supabase (solo las variables PÚBLICAS;
      // nunca se lee SUPABASE_SECRET_KEY ni la contraseña de la base de datos).
      supabaseUrl:
        process.env.NUXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
      supabaseAnonKey:
        process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        '',
    },
  },
})
