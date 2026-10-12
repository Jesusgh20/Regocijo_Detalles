<template>
  <NuxtLayout>
    <section class="er">
      <div class="wrap er-inner">
        <Ornament variant="bloom" class="er-orn" />
        <p class="eyebrow eyebrow--center">{{ es404 ? 'Error 404' : `Error ${error?.statusCode ?? ''}` }}</p>
        <h1 class="display er-title">
          <template v-if="es404">Esta página <em>se marchitó</em></template>
          <template v-else>Algo salió <em>mal</em></template>
        </h1>
        <p class="lead er-lead">
          <template v-if="es404">No encontramos lo que buscas. Quizás el ramo ya no está en el catálogo o el enlace cambió.</template>
          <template v-else>Tuvimos un problema al mostrar esta página. Inténtalo de nuevo en un momento.</template>
        </p>
        <div class="er-cta">
          <button type="button" class="btn btn--wine" @click="clearError({ redirect: '/' })">Volver al inicio</button>
          <button type="button" class="btn btn--ghost" @click="clearError({ redirect: '/catalogo' })">Ver el catálogo</button>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const es404 = computed(() => props.error?.statusCode === 404)

useHead({ title: computed(() => (es404.value ? 'Página no encontrada' : 'Error') + ' – Regocijo Floristería') })
</script>

<style scoped>
.er { padding-block: clamp(4rem, 12vw, 9rem); text-align: center; }
.er-inner { display: flex; flex-direction: column; align-items: center; gap: 1.25rem; }
.er-orn { width: 6rem; color: var(--rose); opacity: 0.6; transform: rotate(14deg); }
.er-title { font-size: clamp(3rem, 9vw, 6.5rem); }
.er-lead { margin-inline: auto; }
.er-cta { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-top: 1rem; }
</style>
