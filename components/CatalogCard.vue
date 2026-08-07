<template>
  <article class="catalog-card group">
    <div class="relative overflow-hidden" style="aspect-ratio:4/3; border-radius:1rem 1rem 0 0;">
      <img
        :src="ramo.imagen_url"
        :alt="ramo.nombre"
        class="card-img"
        loading="lazy"
      />

      <!-- Category badge -->
      <div class="absolute top-3 left-3 flex gap-2">
        <span :class="['category-badge', `cat-${ramo.categoria}`]">{{ labelCategoria }}</span>
      </div>

      <!-- Insignia badge -->
      <div v-if="ramo.insignia" class="absolute top-3 right-3">
        <span class="category-badge" style="background:#fdf4e3;color:#b8872a;">⭐ Favorito</span>
      </div>
      <div v-else-if="ramo.destacado" class="absolute top-3 right-3">
        <span class="category-badge" style="background:#fdf4e3;color:#b8872a;">Destacado</span>
      </div>

      <!-- Hover overlay -->
      <div class="card-overlay">
        <NuxtLink :to="`/producto/${ramo.id}`" class="btn-primary" style="font-size:0.8rem;padding:0.6rem 1.2rem;">
          Ver detalle
        </NuxtLink>
      </div>
    </div>

    <div class="p-5">
      <NuxtLink :to="`/producto/${ramo.id}`" class="card-title-link">
        <h2 class="card-title">{{ ramo.nombre }}</h2>
      </NuxtLink>
      <p class="card-desc">{{ ramo.descripcion }}</p>

      <!-- Incluye (kits) -->
      <p v-if="ramo.incluye && ramo.incluye.length" class="card-incluye">
        🎁 Incluye: {{ ramo.incluye.slice(0, 2).join(', ') }}{{ ramo.incluye.length > 2 ? '...' : '' }}
      </p>

      <div class="card-footer">
        <div>
          <p class="card-price-label">{{ tieneVariantes ? 'Desde' : 'Precio' }}</p>
          <span class="card-price">{{ store.formatPrecio(ramo.precio) }}</span>
        </div>
        <div class="card-actions">
          <button class="add-btn" title="Agregar al carrito" @click.prevent="agregarAlCarrito(ramo)">
            <svg xmlns="http://www.w3.org/2000/svg" style="height:1rem;width:1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </button>
          <NuxtLink :to="`/producto/${ramo.id}`" class="ver-btn">Ver más</NuxtLink>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Ramo } from '~/stores/productos'
import { useProductosStore } from '~/stores/productos'

const store = useProductosStore()
const props = defineProps<{ ramo: Ramo }>()

const tieneVariantes = computed(() =>
  props.ramo.variantes_precio && props.ramo.variantes_precio.length > 0
)

const CATEGORIA_LABELS: Record<string, string> = {
  rosas: 'Rosas 🌹',
  girasoles: 'Girasoles 🌻',
  lirios: 'Lirios 🌸',
  mixtos: 'Mixto 💐',
}

const labelCategoria = computed(() =>
  CATEGORIA_LABELS[props.ramo.categoria] ?? props.ramo.categoria
)

function agregarAlCarrito(r: Ramo) {
  store.agregarAlCarrito(r)
  // Abre el drawer del carrito
  const carritoAbierto = useState('carritoAbierto', () => false)
  carritoAbierto.value = true
}
</script>

<style scoped>
.catalog-card {
  border-radius: 1rem;
  overflow: hidden;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: cardIn 0.4s ease both;
}
.catalog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(242,84,128,0.13);
}
@keyframes cardIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

.card-img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s ease;
}
.catalog-card:hover .card-img { transform: scale(1.08); }

.card-overlay {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  opacity: 0;
  background: rgba(242,84,128,0.07);
  backdrop-filter: blur(2px);
  transition: opacity 0.3s;
}
.catalog-card:hover .card-overlay { opacity: 1; }

/* Category badges */
.category-badge {
  display: inline-block; padding: 0.22rem 0.65rem;
  border-radius: 9999px; font-family: 'Jost', sans-serif;
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.04em;
  text-transform: uppercase; backdrop-filter: blur(8px);
}
.cat-rosas     { background: rgba(255,197,213,0.85); color: #a8264f; }
.cat-girasoles { background: rgba(255,236,153,0.9);  color: #92670a; }
.cat-lirios    { background: rgba(213,197,255,0.85); color: #5b3fa8; }
.cat-mixtos    { background: rgba(205,220,188,0.85); color: #3a6e2a; }

/* Card text */
.card-title-link { text-decoration: none; }
.card-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.2rem; color: #292524;
  margin-bottom: 0.3rem; transition: color 0.15s; line-height: 1.2;
}
.card-title-link:hover .card-title { color: #f25480; }
.card-desc {
  font-family: 'Jost', sans-serif; font-size: 0.78rem; color: #78716c;
  line-height: 1.6; margin-bottom: 0.6rem;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.card-incluye {
  font-family: 'Jost', sans-serif; font-size: 0.7rem; color: #a8a29e;
  margin-bottom: 0.75rem; white-space: nowrap; overflow: hidden;
  text-overflow: ellipsis;
}
.card-footer { display: flex; align-items: flex-end; justify-content: space-between; }
.card-price-label {
  font-family: 'Jost', sans-serif; font-size: 0.65rem; color: #a8a29e;
  text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 0.1rem;
}
.card-price { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.35rem; color: #d43868; font-weight: 500; }
.card-actions { display: flex; align-items: center; gap: 0.5rem; }
.add-btn {
  width: 34px; height: 34px; border-radius: 50%;
  background: #fff5f7; border: 1px solid #ffc5d5;
  color: #f25480; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
}
.add-btn:hover { background: #f25480; color: white; border-color: #f25480; transform: scale(1.1); }
.ver-btn {
  font-family: 'Jost', sans-serif; font-size: 0.78rem;
  font-weight: 500; color: #f25480; text-decoration: none;
  transition: color 0.15s; white-space: nowrap;
}
.ver-btn:hover { color: #d43868; }
</style>
