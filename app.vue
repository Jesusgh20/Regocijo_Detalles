<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useProductosStore } from '~/stores/productos'

const { public: cfg } = useRuntimeConfig()

useSeoMeta({
  ogTitle: 'Regocijo Floristería – La belleza de sentir',
  ogDescription: 'Ramos de flores artesanales con entrega a domicilio en Montería, Córdoba.',
  ogImage: `${cfg.siteUrl}/og-image.jpg`,
  ogImageAlt: 'Ramo de flores rosadas y blancas de Regocijo Floristería',
  twitterCard: 'summary_large_image',
})

// Catálogo desde la base de datos (si está configurada). Si no está o falla, el store conserva el catálogo del código.
const store = useProductosStore()
const { data: catalogo } = await useAsyncData('catalogo', () => $fetch('/api/catalogo').catch(() => null), {
  default: () => null,
})
if (catalogo.value) store.cargarCatalogo(catalogo.value)
</script>
