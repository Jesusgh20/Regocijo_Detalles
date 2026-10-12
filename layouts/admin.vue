<template>
  <div class="adm">
    <a href="#contenido" class="skip-link">Saltar al contenido</a>
    <NuxtLoadingIndicator color="#8c1f45" :height="3" />

    <header class="adm-hd">
      <div class="wrap adm-hd-in">
        <NuxtLink to="/admin/ramos" class="adm-brand">
          <img src="/regocijosinfondo.png" alt="" width="36" height="36" />
          <span><strong>Regocijo</strong> · Panel</span>
        </NuxtLink>

        <nav v-if="admin.esAdmin.value" class="adm-nav" aria-label="Panel">
          <NuxtLink to="/admin/ramos" class="adm-link">Ramos</NuxtLink>
          <NuxtLink to="/admin/categorias" class="adm-link">Categorías</NuxtLink>
          <a href="/" target="_blank" rel="noopener" class="adm-link">Ver el sitio<span class="sr-only"> (se abre en una pestaña nueva)</span> ↗</a>
          <button type="button" class="btn btn--ghost btn--sm" @click="cerrarSesion">Cerrar sesión</button>
        </nav>
      </div>
    </header>

    <main id="contenido" class="adm-main wrap" tabindex="-1">
      <slot />
    </main>

    <AppToast />
  </div>
</template>

<script setup lang="ts">
const admin = useAdmin()

useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }], title: 'Panel – Regocijo' })

onMounted(() => { if (!admin.listo.value) admin.iniciar() })

async function cerrarSesion() {
  await admin.salir()
  await navigateTo('/admin')
}
</script>

<style scoped>
.adm { min-height: 100vh; display: flex; flex-direction: column; }
.adm-hd { position: sticky; top: 0; z-index: 40; background: rgba(251, 246, 239, 0.94); backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }
.adm-hd-in { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; padding-block: 0.75rem; }
.adm-brand { display: inline-flex; align-items: center; gap: 0.6rem; color: var(--ink); text-decoration: none; font: 400 1.35rem var(--serif); }
.adm-brand strong { font-weight: 600; }
.adm-nav { display: flex; align-items: center; gap: 0.25rem 1.4rem; flex-wrap: wrap; }
.adm-link { color: var(--ink); text-decoration: none; padding: 0.4rem 0; font-size: 0.95rem; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size 0.35s var(--ease-out), color 0.2s; }
.adm-link:hover, .adm-link.router-link-active { color: var(--wine); background-size: 100% 1px; }
.adm-main { flex: 1; padding-block: 2rem 4rem; outline: none; }
</style>
