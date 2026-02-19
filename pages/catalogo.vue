<template>
  <div>

    <!-- HEADER -->
    <section class="catalogo-header">
      <div class="absolute inset-0 pointer-events-none">
        <div style="position:absolute;top:-40px;right:-40px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(255,197,213,0.3) 0%,transparent 70%);"></div>
        <div style="position:absolute;bottom:-20px;left:10%;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(205,220,188,0.25) 0%,transparent 70%);"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 text-center">
        <p class="section-label mb-3">Coleccion completa</p>
        <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.5rem,6vw,4rem);color:#292524;line-height:1;margin-bottom:1rem;">
          Nuestros ramos
        </h1>
        <p style="font-family:'Jost',sans-serif;font-size:0.95rem;color:#78716c;max-width:480px;margin:0 auto;line-height:1.7;">
          Flores frescas, elaboradas con amor. Encuentra el ramo perfecto para cada momento especial.
        </p>
      </div>
    </section>

    <!-- FILTROS -->
    <div class="filtros-sticky">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="filtros-inner">

          <div class="search-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input v-model="busqueda" type="text" placeholder="Buscar por nombre..." class="search-input" />
            <button v-if="busqueda" class="search-clear" @click="busqueda = ''">
              <svg xmlns="http://www.w3.org/2000/svg" style="height:0.9rem;width:0.9rem;" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>

          <div class="filtro-divider"></div>

          <div class="categoria-pills">
            <button v-for="cat in categorias" :key="cat"
              :class="['pill', categoriaActiva === cat ? 'pill--active' : 'pill--idle']"
              @click="seleccionarCategoria(cat)">
              {{ cat }}
            </button>
          </div>

          <div class="filtro-divider hidden md:block"></div>

          <div class="orden-wrapper">
            <label style="font-family:'Jost',sans-serif;font-size:0.75rem;color:#a8a29e;white-space:nowrap;">Ordenar:</label>
            <select v-model="orden" class="orden-select">
              <option value="default">Destacados</option>
              <option value="precio-asc">Menor precio</option>
              <option value="precio-desc">Mayor precio</option>
              <option value="nombre">A a Z</option>
            </select>
          </div>

        </div>
      </div>
    </div>

    <!-- GRID -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-10">

      <div class="resultados-info">
        <p style="font-family:'Jost',sans-serif;font-size:0.85rem;color:#78716c;">
          <span v-if="totalFiltrados === 0">Sin resultados</span>
          <span v-else>
            Mostrando <strong style="color:#292524;">{{ ramosPagina.length }}</strong>
            de <strong style="color:#292524;">{{ totalFiltrados }}</strong> ramos
            <span v-if="categoriaActiva !== 'Todos'"> en <em style="color:#f25480;">{{ categoriaActiva }}</em></span>
          </span>
        </p>
        <div v-if="busqueda || categoriaActiva !== 'Todos'" class="active-filters">
          <span v-if="categoriaActiva !== 'Todos'" class="filter-tag">
            {{ categoriaActiva }}
            <button @click="categoriaActiva = 'Todos'" class="filter-tag-remove">x</button>
          </span>
          <span v-if="busqueda" class="filter-tag">
            "{{ busqueda }}"
            <button @click="busqueda = ''" class="filter-tag-remove">x</button>
          </span>
          <button class="clear-all-btn" @click="limpiarFiltros">Limpiar todo</button>
        </div>
      </div>

      <div v-if="ramosPagina.length > 0" class="productos-grid">
        <article v-for="(ramo, idx) in ramosPagina" :key="ramo.id"
          class="product-card group catalogo-card"
          :style="{ animationDelay: `${idx * 60}ms` }">

          <div class="relative overflow-hidden" style="aspect-ratio:4/3;">
            <img :src="ramo.imagen_url" :alt="ramo.nombre"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy"/>
            <div class="absolute top-3 left-3">
              <span :class="['category-badge', `category-badge--${ramo.categoria.toLowerCase()}`]">{{ ramo.categoria }}</span>
            </div>
            <div v-if="ramo.destacado" class="absolute top-3 right-3">
              <span style="background:#faf4e5;color:#b8903a;" class="category-badge">Destacado</span>
            </div>
            <div class="card-overlay">
              <NuxtLink :to="`/producto/${ramo.id}`" class="btn-primary" style="font-size:0.8rem;padding:0.6rem 1.2rem;">Ver detalle</NuxtLink>
            </div>
          </div>

          <div class="p-5">
            <NuxtLink :to="`/producto/${ramo.id}`" class="card-title-link">
              <h2 class="card-title">{{ ramo.nombre }}</h2>
            </NuxtLink>
            <p class="card-desc">{{ ramo.descripcion }}</p>
            <div class="card-footer">
              <span class="card-price">{{ productosStore.formatPrecio(ramo.precio) }}</span>
              <div class="card-actions">
                <button class="add-btn" title="Agregar al carrito" @click.prevent="agregarConFeedback(ramo)">
                  <svg xmlns="http://www.w3.org/2000/svg" style="height:1rem;width:1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                </button>
                <NuxtLink :to="`/producto/${ramo.id}`" class="ver-btn">Ver mas</NuxtLink>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <span style="font-size:4rem;display:block;margin-bottom:1rem;">🌿</span>
        <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.8rem;color:#44403c;margin-bottom:0.5rem;">Sin resultados</h3>
        <p style="font-family:'Jost',sans-serif;font-size:0.9rem;color:#a8a29e;margin-bottom:1.5rem;">Intenta con otro termino o categoria</p>
        <button class="btn-outline" @click="limpiarFiltros">Ver todos los ramos</button>
      </div>

      <!-- Paginacion -->
      <div v-if="totalPaginas > 1" class="paginacion">
        <button :disabled="paginaActual === 1" class="pag-btn" @click="irPagina(paginaActual - 1)">
          <svg xmlns="http://www.w3.org/2000/svg" style="height:1rem;width:1rem;" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </button>
        <template v-for="p in paginasVisibles" :key="String(p)">
          <span v-if="p === '...'" class="pag-dots">...</span>
          <button v-else :class="['pag-num', paginaActual === p ? 'pag-num--active' : '']" @click="irPagina(Number(p))">{{ p }}</button>
        </template>
        <button :disabled="paginaActual === totalPaginas" class="pag-btn" @click="irPagina(paginaActual + 1)">
          <svg xmlns="http://www.w3.org/2000/svg" style="height:1rem;width:1rem;" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

    </div>

    <Transition name="toast">
      <div v-if="showToast" class="toast-notification">
        <span>🌸</span>
        <span style="font-family:'Jost',sans-serif;font-size:0.85rem;color:#292524;">Agregado al carrito</span>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { useProductosStore } from '~/stores/productos'
import type { Ramo } from '~/stores/productos'

const productosStore = useProductosStore()
const route = useRoute()

const busqueda        = ref('')
const categoriaActiva = ref('Todos')
const orden           = ref('default')
const paginaActual    = ref(1)
const POR_PAGINA      = 6

onMounted(() => {
  if (route.query.categoria) categoriaActiva.value = route.query.categoria as string
  if (route.query.q)         busqueda.value        = route.query.q as string
})

const categorias = computed(() => {
  const cats = [...new Set(productosStore.ramos.map(r => r.categoria))]
  return ['Todos', ...cats]
})

const ramosFiltrados = computed(() => {
  let lista = [...productosStore.ramos]
  if (categoriaActiva.value !== 'Todos') lista = lista.filter(r => r.categoria === categoriaActiva.value)
  if (busqueda.value.trim()) {
    const q = busqueda.value.toLowerCase()
    lista = lista.filter(r => r.nombre.toLowerCase().includes(q) || r.descripcion.toLowerCase().includes(q))
  }
  switch (orden.value) {
    case 'precio-asc':  lista.sort((a, b) => a.precio - b.precio); break
    case 'precio-desc': lista.sort((a, b) => b.precio - a.precio); break
    case 'nombre':      lista.sort((a, b) => a.nombre.localeCompare(b.nombre)); break
    default:            lista.sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0))
  }
  return lista
})

const totalFiltrados = computed(() => ramosFiltrados.value.length)
const totalPaginas   = computed(() => Math.max(1, Math.ceil(totalFiltrados.value / POR_PAGINA)))

const ramosPagina = computed(() => {
  const inicio = (paginaActual.value - 1) * POR_PAGINA
  return ramosFiltrados.value.slice(inicio, inicio + POR_PAGINA)
})

const paginasVisibles = computed((): (number | string)[] => {
  const total = totalPaginas.value
  const actual = paginaActual.value
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | string)[] = [1]
  if (actual > 3) pages.push('...')
  for (let i = Math.max(2, actual - 1); i <= Math.min(total - 1, actual + 1); i++) pages.push(i)
  if (actual < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

watch([busqueda, categoriaActiva, orden], () => { paginaActual.value = 1 })

function irPagina(p: number) {
  paginaActual.value = p
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function seleccionarCategoria(cat: string) { categoriaActiva.value = cat }
function limpiarFiltros() {
  busqueda.value = ''
  categoriaActiva.value = 'Todos'
  orden.value = 'default'
}

const showToast = ref(false)
let toastTimer: ReturnType<typeof setTimeout>
function agregarConFeedback(ramo: Ramo) {
  productosStore.agregarAlCarrito(ramo)
  showToast.value = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { showToast.value = false }, 2000)
}

useHead({ title: 'Catalogo - Regocijo Detalles' })
</script>

<style scoped>
.catalogo-header {
  position: relative; overflow: hidden;
  background: linear-gradient(160deg, #ffe8ee 0%, #faf8f3 50%, #e6eedd 100%);
}
.filtros-sticky {
  position: sticky; top: 72px; z-index: 40;
  background: rgba(250,248,243,0.93);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #ffe8ee;
  padding: 0.875rem 0;
}
.filtros-inner { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
.search-wrapper { position: relative; flex: 1; min-width: 160px; max-width: 260px; }
.search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); height: 1rem; width: 1rem; color: #a8a29e; pointer-events: none; }
.search-input { width: 100%; padding: 0.55rem 2.1rem 0.55rem 2.3rem; background: white; border: 1px solid #e7e5e4; border-radius: 9999px; font-family: 'Jost', sans-serif; font-size: 0.83rem; color: #44403c; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
.search-input::placeholder { color: #a8a29e; }
.search-input:focus { border-color: #ffa0ba; box-shadow: 0 0 0 3px rgba(255,197,213,0.3); }
.search-clear { position: absolute; right: 0.7rem; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #a8a29e; padding: 0; display: flex; align-items: center; }
.search-clear:hover { color: #f25480; }
.filtro-divider { width: 1px; height: 22px; background: #e7e5e4; flex-shrink: 0; }
.categoria-pills { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.pill { padding: 0.38rem 0.9rem; border-radius: 9999px; font-family: 'Jost', sans-serif; font-size: 0.78rem; font-weight: 500; cursor: pointer; transition: all 0.15s; white-space: nowrap; border: none; }
.pill--idle { background: white; color: #78716c; border: 1px solid #e7e5e4; }
.pill--idle:hover { border-color: #ffa0ba; color: #f25480; }
.pill--active { background: #f25480; color: white; box-shadow: 0 4px 14px rgba(242,84,128,0.25); }
.orden-wrapper { display: flex; align-items: center; gap: 0.45rem; }
.orden-select { padding: 0.45rem 1.8rem 0.45rem 0.7rem; background: white; border: 1px solid #e7e5e4; border-radius: 0.65rem; font-family: 'Jost', sans-serif; font-size: 0.78rem; color: #44403c; cursor: pointer; outline: none; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 20 20' fill='%23a8a29e'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.55rem center; }
.orden-select:focus { border-color: #ffa0ba; }
.resultados-info { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.active-filters { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }
.filter-tag { display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.2rem 0.65rem; background: #ffe8ee; color: #a8264f; border-radius: 9999px; font-family: 'Jost', sans-serif; font-size: 0.72rem; font-weight: 500; }
.filter-tag-remove { background: none; border: none; cursor: pointer; color: #f25480; font-size: 1rem; line-height: 1; padding: 0; }
.clear-all-btn { background: none; border: none; cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.72rem; color: #a8a29e; text-decoration: underline; padding: 0; }
.clear-all-btn:hover { color: #f25480; }
.productos-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
@media (min-width: 580px) { .productos-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .productos-grid { grid-template-columns: repeat(3, 1fr); } }
.catalogo-card { animation: cardIn 0.4s ease both; }
@keyframes cardIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
.card-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; background: rgba(242,84,128,0.07); backdrop-filter: blur(2px); }
.group:hover .card-overlay { opacity: 1; }
.card-title-link { text-decoration: none; }
.card-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.2rem; color: #292524; margin-bottom: 0.3rem; transition: color 0.15s; }
.card-title-link:hover .card-title { color: #f25480; }
.card-desc { font-family: 'Jost', sans-serif; font-size: 0.78rem; color: #78716c; line-height: 1.6; margin-bottom: 0.9rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.card-footer { display: flex; align-items: center; justify-content: space-between; }
.card-price { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.35rem; color: #d43868; font-weight: 500; }
.card-actions { display: flex; align-items: center; gap: 0.5rem; }
.add-btn { width: 32px; height: 32px; border-radius: 50%; background: #fff5f7; border: 1px solid #ffc5d5; color: #f25480; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
.add-btn:hover { background: #f25480; color: white; border-color: #f25480; transform: scale(1.08); }
.ver-btn { font-family: 'Jost', sans-serif; font-size: 0.78rem; font-weight: 500; color: #f25480; text-decoration: none; transition: color 0.15s; white-space: nowrap; }
.ver-btn:hover { color: #d43868; }
.empty-state { text-align: center; padding: 5rem 1rem; }
.paginacion { display: flex; align-items: center; justify-content: center; gap: 0.4rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #ffe8ee; }
.pag-btn { width: 38px; height: 38px; border-radius: 0.65rem; background: white; border: 1px solid #e7e5e4; color: #78716c; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
.pag-btn:hover:not(:disabled) { border-color: #ffa0ba; color: #f25480; }
.pag-btn:disabled { opacity: 0.3; cursor: default; }
.pag-num { width: 38px; height: 38px; border-radius: 0.65rem; background: white; border: 1px solid #e7e5e4; font-family: 'Jost', sans-serif; font-size: 0.85rem; color: #44403c; cursor: pointer; transition: all 0.15s; }
.pag-num:hover:not(.pag-num--active) { border-color: #ffa0ba; color: #f25480; }
.pag-num--active { background: #f25480; border-color: #f25480; color: white; box-shadow: 0 4px 14px rgba(242,84,128,0.28); }
.pag-dots { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; font-family: 'Jost', sans-serif; color: #a8a29e; }
.toast-notification { position: fixed; bottom: 2rem; right: 2rem; background: white; border: 1px solid #ffc5d5; border-radius: 1rem; padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 8px 30px rgba(242,84,128,0.2); z-index: 200; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px) scale(0.95); }
</style>