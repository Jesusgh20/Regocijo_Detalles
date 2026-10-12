<template>
  <div>
    <PageHero eyebrow="Colección completa">
      <template #title>Nuestros <em>ramos</em></template>
      Elige el ramo perfecto para cada momento. Cada diseño se arma a mano por encargo.
    </PageHero>

    <!-- Filtros -->
    <div class="fb">
      <div class="wrap fb-inner" role="search" aria-label="Filtrar el catálogo">
        <div class="fb-search">
          <label for="buscar" class="sr-only">Buscar ramos por nombre, flor u ocasión</label>
          <svg class="fb-search-ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
          <input
            id="buscar"
            ref="buscarEl"
            v-model="busqueda"
            type="search"
            class="input fb-input"
            placeholder="Buscar: rosas, lirios, peluche…"
            autocomplete="off"
            enterkeyhint="search"
          />
        </div>

        <div class="fb-chips" role="group" aria-label="Filtrar por categoría">
          <button
            v-for="c in categorias"
            :key="c.slug"
            type="button"
            class="chip"
            :aria-pressed="categoriaActiva === c.slug"
            @click="categoriaActiva = c.slug"
          >
            {{ c.label }} <span class="chip-n" aria-hidden="true">{{ c.total }}</span>
            <span class="sr-only">({{ c.total }} {{ c.total === 1 ? 'ramo' : 'ramos' }})</span>
          </button>
        </div>

        <div class="fb-sort">
          <label for="orden" class="field-label">Ordenar</label>
          <select id="orden" v-model="orden" class="input fb-select">
            <option value="default">Destacados primero</option>
            <option value="precio-asc">Menor precio</option>
            <option value="precio-desc">Mayor precio</option>
            <option value="nombre">Nombre (A–Z)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Resultados -->
    <section id="resultados" class="wrap res" aria-labelledby="resultados-t">
      <h2 id="resultados-t" class="sr-only">Resultados</h2>
      <div class="res-head">
        <p class="res-count" role="status" aria-live="polite">
          <template v-if="total === 0">Sin resultados</template>
          <template v-else>
            Mostrando <strong>{{ pagina.length }}</strong> de <strong>{{ total }}</strong> {{ total === 1 ? 'ramo' : 'ramos' }}<template v-if="categoriaActiva !== 'todos'"> en <em>{{ etiquetaCat(categoriaActiva) }}</em></template>
          </template>
        </p>
        <div v-if="hayFiltros" class="res-tags">
          <button v-if="categoriaActiva !== 'todos'" type="button" class="tag" @click="categoriaActiva = 'todos'" :aria-label="`Quitar filtro ${etiquetaCat(categoriaActiva)}`">
            {{ etiquetaCat(categoriaActiva) }} <span aria-hidden="true">×</span>
          </button>
          <button v-if="busqueda.trim()" type="button" class="tag" @click="busqueda = ''" :aria-label="`Quitar búsqueda ${busqueda}`">
            “{{ busqueda }}” <span aria-hidden="true">×</span>
          </button>
          <button type="button" class="link-inline res-clear" @click="limpiar">Limpiar todo</button>
        </div>
      </div>

      <ul v-if="pagina.length" class="grid">
        <li v-for="(r, i) in pagina" :key="r.id" class="grid-item" :style="{ '--i': i }">
          <CatalogCard :ramo="r" :prioridad="i < 3" />
        </li>
      </ul>

      <!-- Estado vacío -->
      <div v-else class="empty">
        <Ornament variant="sprig" class="empty-orn" />
        <h2 class="empty-title">No encontramos ese ramo</h2>
        <p class="empty-text">
          Prueba con otra palabra (por ejemplo «rosas» o «peluche») o quita los filtros para ver todo el catálogo.
        </p>
        <div class="empty-btns">
          <button type="button" class="btn btn--wine" @click="limpiar">Ver todos los ramos</button>
          <a :href="whatsappUrl(`Hola, estoy buscando un ramo${busqueda.trim() ? ': ' + busqueda.trim() : ''}`)" target="_blank" rel="noopener noreferrer" class="btn btn--ghost">
            <IconWhatsApp width="18" height="18" /> Pregúntanos por WhatsApp
            <span class="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        </div>
      </div>

      <!-- Paginación -->
      <nav v-if="totalPaginas > 1" class="pag" aria-label="Paginación del catálogo">
        <button type="button" class="pag-btn" :disabled="paginaActual === 1" aria-label="Página anterior" @click="irPagina(paginaActual - 1)">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <template v-for="p in paginasVisibles" :key="String(p)">
          <span v-if="p === '…'" class="pag-dots" aria-hidden="true">…</span>
          <button v-else type="button" class="pag-btn pag-num" :aria-current="paginaActual === p ? 'page' : undefined" :aria-label="`Página ${p}`" @click="irPagina(Number(p))">{{ p }}</button>
        </template>
        <button type="button" class="pag-btn" :disabled="paginaActual === totalPaginas" aria-label="Página siguiente" @click="irPagina(paginaActual + 1)">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </nav>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useProductosStore } from '~/stores/productos'

const store = useProductosStore()
const route = useRoute()
const router = useRouter()

const etiquetaCat = (slug: string) => store.infoCategoria(slug).label
const existeCat = (slug: string) => store.categorias.some((c) => c.slug === slug)

const POR_PAGINA = 9
const ORDENES = ['default', 'precio-asc', 'precio-desc', 'nombre']

/** Sin tildes y en minúsculas: «pasion» encuentra «Pasión» */
const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
const q1 = (v: unknown) => (Array.isArray(v) ? v[0] : v) as string | undefined

// Estado inicial desde la URL (sirve también en SSR → sin parpadeo)
const catInicial = q1(route.query.categoria)?.toLowerCase()
const busqueda = ref(q1(route.query.q) ?? '')
const categoriaActiva = ref<string>(catInicial && existeCat(catInicial) ? catInicial : 'todos')
const orden = ref(ORDENES.includes(q1(route.query.orden) ?? '') ? (q1(route.query.orden) as string) : 'default')
const paginaActual = ref(1)
const buscarEl = ref<HTMLInputElement | null>(null)

const categorias = computed(() => [
  { slug: 'todos', label: 'Todos', total: store.ramos.length },
  ...store.categoriasConRamos.map((c) => ({
    slug: c.slug,
    label: c.label,
    total: store.ramos.filter((r) => r.categoria === c.slug).length,
  })),
])

const filtrados = computed(() => {
  let lista = [...store.ramos]
  if (categoriaActiva.value !== 'todos') lista = lista.filter((r) => r.categoria === categoriaActiva.value)
  const q = norm(busqueda.value.trim())
  if (q) {
    lista = lista.filter((r) =>
      [r.nombre, r.descripcion, r.categoria, ...r.tags_busqueda].some((t) => norm(t).includes(q)),
    )
  }
  switch (orden.value) {
    case 'precio-asc': lista.sort((a, b) => a.precio - b.precio); break
    case 'precio-desc': lista.sort((a, b) => b.precio - a.precio); break
    case 'nombre': lista.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')); break
    // Con foto primero (el catálogo abre mostrando los ramos que ya tienen fotografía), luego destacados
    default: lista.sort((a, b) =>
      Number(!!b.imagen_url) - Number(!!a.imagen_url) || Number(!!b.destacado) - Number(!!a.destacado) || a.id - b.id)
  }
  return lista
})

const total = computed(() => filtrados.value.length)
const totalPaginas = computed(() => Math.max(1, Math.ceil(total.value / POR_PAGINA)))
const pagina = computed(() => filtrados.value.slice((paginaActual.value - 1) * POR_PAGINA, paginaActual.value * POR_PAGINA))
const hayFiltros = computed(() => categoriaActiva.value !== 'todos' || !!busqueda.value.trim())

const paginasVisibles = computed<(number | string)[]>(() => {
  const n = totalPaginas.value
  const a = paginaActual.value
  if (n <= 5) return Array.from({ length: n }, (_, i) => i + 1)
  const out: (number | string)[] = [1]
  if (a > 3) out.push('…')
  for (let i = Math.max(2, a - 1); i <= Math.min(n - 1, a + 1); i++) out.push(i)
  if (a < n - 2) out.push('…')
  out.push(n)
  return out
})

watch([busqueda, categoriaActiva, orden], () => { paginaActual.value = 1 })

// Reflejar los filtros en la URL (compartible) sin llenar el historial
const enCatalogo = () => route.path === '/catalogo'

watch([busqueda, categoriaActiva, orden], () => {
  if (!enCatalogo()) return // la página se está cerrando (transición): no tocar la nueva ruta
  const query: Record<string, string> = {}
  if (categoriaActiva.value !== 'todos') query.categoria = categoriaActiva.value
  if (busqueda.value.trim()) query.q = busqueda.value.trim()
  if (orden.value !== 'default') query.orden = orden.value
  router.replace({ query })
})

// Cambios externos (p. ej. los enlaces del pie estando ya en el catálogo)
watch(() => route.query, (qs) => {
  if (!enCatalogo()) return
  const c = q1(qs.categoria)?.toLowerCase()
  categoriaActiva.value = c && existeCat(c) ? c : 'todos'
  busqueda.value = q1(qs.q) ?? ''
  if (q1(qs.buscar)) buscarEl.value?.focus()
})

onMounted(() => { if (q1(route.query.buscar)) buscarEl.value?.focus() })

function irPagina(p: number) {
  paginaActual.value = Math.min(Math.max(1, p), totalPaginas.value)
  document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
function limpiar() {
  busqueda.value = ''
  categoriaActiva.value = 'todos'
  orden.value = 'default'
}

useHead({
  title: 'Catálogo de ramos – Regocijo Floristería',
  meta: [{ name: 'description', content: 'Catálogo de ramos de rosas, lirios, girasoles y mixtos con entrega a domicilio en Montería.' }],
})
</script>

<style scoped>
/* Barra de filtros pegajosa */
.fb { position: sticky; top: var(--header-h); z-index: 40; background: rgba(251, 246, 239, 0.92); backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
.fb-inner { display: grid; gap: 0.9rem; padding-block: 0.9rem; }
@media (min-width: 1024px) { .fb-inner { grid-template-columns: minmax(14rem, 20rem) 1fr auto; align-items: center; gap: 1.75rem; } }
.fb-search { position: relative; }
.fb-search-ico { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--muted); pointer-events: none; }
.fb-input { padding-left: 2.8rem; border-radius: 9999px; }
.fb-input::-webkit-search-cancel-button { cursor: pointer; }
.fb-chips { position: relative; display: flex; gap: 0.5rem; overflow-x: auto; padding: 0.3rem 0.15rem; scrollbar-width: none; }
.fb-chips::-webkit-scrollbar { display: none; }
.chip { white-space: nowrap; }
.chip-n { margin-left: 0.4rem; font-size: 0.74rem; color: var(--muted); }
.chip[aria-pressed='true'] .chip-n { color: var(--blush); }
.fb-sort { display: flex; align-items: center; gap: 0.6rem; }
.fb-sort .field-label { white-space: nowrap; font-size: 0.72rem; }
.fb-select { border-radius: 9999px; min-width: 11.5rem; }

/* Resultados */
.res { padding-block: 2.5rem 1rem; }
.res-head { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem 1.5rem; margin-bottom: 2rem; }
.res-count { font-size: 0.95rem; color: var(--body); }
.res-count strong { color: var(--ink); font-weight: 600; }
.res-count em { color: var(--wine); }
.res-tags { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
.tag { display: inline-flex; align-items: center; gap: 0.5rem; min-height: 2.25rem; padding: 0.2rem 0.9rem; background: var(--blush); color: var(--wine-deep); border: 0; border-radius: 9999px; font: 500 0.82rem var(--sans); cursor: pointer; transition: background 0.2s, transform 0.2s var(--ease-out); }
.tag:hover { background: var(--blush-deep); transform: translateY(-1px); }
.res-clear { background: none; border: 0; padding: 0.4rem; cursor: pointer; font: inherit; font-size: 0.85rem; }

.grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.75rem; grid-template-columns: 1fr; }
@media (min-width: 600px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); gap: 2.25rem; } }
.grid-item { animation: card-in 0.8s var(--ease-out) both; animation-delay: calc(var(--i) * 70ms); }
@keyframes card-in { from { opacity: 0; transform: translateY(1.5rem); } }

/* Vacío */
.empty { display: grid; justify-items: center; text-align: center; gap: 1rem; padding: 4rem 1rem 5rem; }
.empty-orn { width: 5.5rem; color: var(--rose); opacity: 0.6; }
.empty-title { font-size: clamp(2rem, 4vw, 3rem); }
.empty-text { max-width: 26rem; color: var(--body); }
.empty-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-top: 0.75rem; }

/* Paginación */
.pag { display: flex; align-items: center; justify-content: center; gap: 0.4rem; margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid var(--line); }
.pag-btn { display: grid; place-items: center; min-width: 2.9rem; height: 2.9rem; padding: 0 0.5rem; border: 1.5px solid var(--line-strong); background: var(--paper); border-radius: 50%; color: var(--ink); font: 500 0.95rem var(--sans); cursor: pointer; transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.2s var(--ease-out); }
.pag-btn:hover:not(:disabled) { border-color: var(--wine); color: var(--wine); transform: translateY(-2px); }
.pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.pag-num[aria-current='page'] { background: var(--wine); border-color: var(--wine); color: #fff; }
.pag-dots { width: 2rem; text-align: center; color: var(--muted); }
</style>
