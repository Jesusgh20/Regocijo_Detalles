<template>
  <article class="cc" :class="{ 'cc--sin-foto': !ramo.imagen_url }">
    <div class="cc-media">
      <RamoImagen
        :src="ramo.imagen_url"
        :alt="altImagen(ramo, 0)"
        :nombre="ramo.nombre"
        :categoria="ramo.categoria"
        :prioridad="prioridad"
        class="cc-img cc-img--a"
      />
      <!-- Segunda foto: aparece al pasar el cursor (solo escritorio) -->
      <RamoImagen
        v-if="ramo.imagenes[1]"
        :src="ramo.imagenes[1]"
        alt=""
        class="cc-img cc-img--b"
        aria-hidden="true"
      />

      <div class="cc-badges">
        <span class="badge">{{ store.infoCategoria(ramo.categoria).singular }}</span>
        <span v-if="ramo.insignia" class="badge badge--gold">Insignia</span>
        <span v-else-if="ramo.destacado" class="badge badge--gold">Destacado</span>
      </div>

      <!-- Acción rápida -->
      <NuxtLink
        v-if="tieneVariantes"
        :to="`/producto/${ramo.slug}`"
        class="cc-quick"
        :aria-label="`Elegir tamaño de ${ramo.nombre}`"
        title="Elegir tamaño"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </NuxtLink>
      <button
        v-else
        type="button"
        class="cc-quick"
        :class="{ 'cc-quick--ok': agregado }"
        :aria-label="agregado ? `${ramo.nombre} agregado al carrito` : `Agregar ${ramo.nombre} al carrito`"
        :title="agregado ? 'Agregado' : 'Agregar al carrito'"
        @click="agregar"
      >
        <svg v-if="!agregado" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </button>
    </div>

    <div class="cc-body">
      <h3 class="cc-title">
        <NuxtLink :to="`/producto/${ramo.slug}`" class="cc-link">{{ ramo.nombre }}</NuxtLink>
      </h3>
      <p class="cc-desc">{{ ramo.descripcion }}</p>
      <p class="cc-price">
        <span v-if="ramo.precioDesde" class="cc-price-label">Desde</span>
        {{ formatPrecio(ramo.precio) }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { altImagen, useProductosStore, type Ramo } from '~/stores/productos'

const props = defineProps<{ ramo: Ramo; prioridad?: boolean }>()

const store = useProductosStore()
const { mostrar } = useToast()
const { abrir } = useCarritoUI()

const tieneVariantes = computed(() => props.ramo.tamanos.length > 1)
const agregado = ref(false)
let t: ReturnType<typeof setTimeout>

function agregar() {
  store.agregarAlCarrito(props.ramo)
  agregado.value = true
  clearTimeout(t)
  t = setTimeout(() => { agregado.value = false }, 1600)
  mostrar(`${props.ramo.nombre} se agregó al carrito`, { label: 'Ver carrito', fn: abrir })
}
onBeforeUnmount(() => clearTimeout(t))
</script>

<style scoped>
.cc {
  position: relative;
  display: flex; flex-direction: column;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 1.5rem;
  overflow: hidden;
  transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out), border-color 0.3s;
}
.cc:hover, .cc:focus-within { transform: translateY(-6px); box-shadow: var(--shadow-lift); border-color: var(--blush-deep); }

.cc-media { position: relative; aspect-ratio: 4 / 5; background: var(--blush); overflow: hidden; }
.cc-img { position: absolute; inset: 0; }
.cc-img--a :deep(.ri-img) { transition: transform 1.2s var(--ease-out), opacity 0.7s var(--ease-out); }
.cc:hover .cc-img--a :deep(.ri-img) { transform: scale(1.06); }
.cc-img--b { opacity: 0; transition: opacity 0.6s var(--ease-out); }
@media (hover: hover) { .cc:hover .cc-img--b { opacity: 1; } }

.cc-badges { position: absolute; top: 0.9rem; left: 0.9rem; right: 0.9rem; display: flex; gap: 0.4rem; flex-wrap: wrap; z-index: 2; pointer-events: none; }
.badge--gold { background: var(--ink); color: var(--gold-soft); }

.cc-quick {
  position: absolute; right: 0.9rem; bottom: 0.9rem; z-index: 4;
  display: grid; place-items: center;
  width: 3rem; height: 3rem; border-radius: 50%;
  border: 0; cursor: pointer; text-decoration: none;
  background: var(--paper); color: var(--ink);
  box-shadow: 0 8px 24px -8px rgba(42, 26, 31, 0.5);
  transition: background 0.3s, color 0.3s, transform 0.35s var(--ease-out);
}
.cc-quick:hover { background: var(--wine); color: #fff; transform: scale(1.1) rotate(90deg); }
.cc-quick:active { transform: scale(0.92); }
.cc-quick--ok, .cc-quick--ok:hover { background: var(--sage); color: #fff; transform: none; }
a.cc-quick:hover { transform: scale(1.1); }

.cc-body { display: flex; flex-direction: column; gap: 0.4rem; padding: 1.25rem 1.4rem 1.5rem; flex: 1; }
.cc-title { font-size: 1.6rem; line-height: 1.1; }
/* Enlace extendido: toda la tarjeta es clicable, pero el botón rápido queda por encima */
.cc-link { color: var(--ink); text-decoration: none; transition: color 0.25s; }
.cc-link::after { content: ''; position: absolute; inset: 0; z-index: 3; }
.cc:hover .cc-link { color: var(--wine); }
.cc-link:focus-visible { outline: none; }
.cc:has(.cc-link:focus-visible) { outline: 3px solid var(--wine); outline-offset: 3px; }
.cc-desc {
  font-size: 0.92rem; line-height: 1.6; color: var(--body);
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.cc-price { margin-top: auto; padding-top: 0.5rem; font: 500 1.55rem var(--serif); color: var(--wine); }
.cc-price-label { font: 500 0.7rem var(--sans); letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin-right: 0.35rem; }
</style>
