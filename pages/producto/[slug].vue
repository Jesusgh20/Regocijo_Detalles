<template>
  <div v-if="ramo">
    <!-- Migas de pan -->
    <nav class="bc" aria-label="Migas de pan">
      <ol class="wrap bc-list">
        <li><NuxtLink to="/" class="bc-link">Inicio</NuxtLink></li>
        <li><NuxtLink to="/catalogo" class="bc-link">Catálogo</NuxtLink></li>
        <li><NuxtLink :to="`/catalogo?categoria=${ramo.categoria}`" class="bc-link">{{ store.infoCategoria(ramo.categoria).label }}</NuxtLink></li>
        <li aria-current="page" class="bc-now">{{ ramo.nombre }}</li>
      </ol>
    </nav>

    <section class="wrap pd">
      <!-- Galería -->
      <div class="pd-gallery">
        <ProductCarousel :imagenes="ramo.imagenes" :nombre="ramo.nombre" :descripcion="ramo.descripcion" :categoria="ramo.categoria" />
      </div>

      <!-- Información -->
      <div class="pd-info">
        <p class="eyebrow">{{ store.infoCategoria(ramo.categoria).label }}</p>
        <h1 class="display pd-title">{{ ramo.nombre }}</h1>

        <div class="pd-price-row">
          <p class="pd-price" aria-live="polite">
            <span v-if="ramo.precioDesde && tamanoActual === ramo.tamanos[0]" class="pd-from">Desde</span>
            <Transition name="flip" mode="out-in">
              <span :key="precioActual">{{ formatPrecio(precioActual) }}</span>
            </Transition>
          </p>
          <span class="status" :class="ramo.disponible ? 'status--ok' : 'status--no'">
            <span class="status-dot" aria-hidden="true" />
            {{ ramo.disponible ? 'Se prepara por encargo' : 'No disponible por ahora' }}
          </span>
        </div>

        <p class="pd-desc">{{ ramo.descripcion }}</p>
        <p v-if="ramo.detalle" class="pd-note">{{ ramo.detalle }}</p>

        <!-- Tamaño / variante -->
        <fieldset v-if="ramo.tamanos.length > 1" class="sizes">
          <legend class="field-label">Elige tu opción</legend>
          <div class="sizes-grid">
            <label v-for="t in ramo.tamanos" :key="t.value" class="size">
              <input v-model="tamanoSel" type="radio" name="tamano" :value="t.value" class="sr-only" />
              <span class="size-body">
                <span class="size-name">{{ t.label }}</span>
                <span v-if="t.detalle" class="size-detail">{{ t.detalle }}</span>
                <span class="size-price">{{ formatPrecio(t.precio) }}</span>
              </span>
            </label>
          </div>
        </fieldset>
        <p v-else class="pd-size-single">
          <span class="field-label">Tamaño</span>
          {{ tamanoActual.label }}<template v-if="tamanoActual.detalle"> · {{ tamanoActual.detalle }}</template>
        </p>

        <!-- Datos del catálogo que antes no se mostraban -->
        <dl v-if="ramo.colores_disponibles || ramo.incluye?.length || ramo.extras_opcionales?.length" class="facts">
          <div v-if="ramo.colores_disponibles">
            <dt>Colores</dt>
            <dd>{{ ramo.colores_disponibles }}</dd>
          </div>
          <div v-if="ramo.incluye?.length">
            <dt>Incluye</dt>
            <dd><ul><li v-for="i in ramo.incluye" :key="i">{{ i }}</li></ul></dd>
          </div>
          <div v-if="ramo.extras_opcionales?.length">
            <dt>Opcionales</dt>
            <dd>
              <ul>
                <li v-for="e in ramo.extras_opcionales" :key="e.nombre">
                  {{ e.nombre }} — {{ e.precio !== null ? `+${formatPrecio(e.precio)}` : 'valor por confirmar' }}
                </li>
              </ul>
            </dd>
          </div>
        </dl>

        <!-- Acciones -->
        <div ref="accionesEl" class="actions">
          <button type="button" class="btn btn--wine btn--block" :disabled="!ramo.disponible" :class="{ 'btn--ok': agregado }" @click="agregar">
            <svg v-if="!agregado" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9h14l-1.1 11H6.1L5 9z" /><path d="M9 9V7a3 3 0 016 0v2" /></svg>
            <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            {{ !ramo.disponible ? 'No disponible' : agregado ? 'Agregado al carrito' : 'Agregar al carrito' }}
          </button>
          <a :href="whatsappUrl(mensajeWA)" target="_blank" rel="noopener noreferrer" class="btn btn--wa btn--block">
            <IconWhatsApp width="20" height="20" /> Preguntar por este ramo
            <span class="sr-only">(se abre WhatsApp en una pestaña nueva)</span>
          </a>
        </div>

        <ul class="promises">
          <li>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>
            Agenda con 1 a 2 días de anticipación; el mismo día según disponibilidad.
          </li>
          <li>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="17.5" r="1.7" /><circle cx="17" cy="17.5" r="1.7" /></svg>
            Domicilio en {{ NEGOCIO.ciudad }}: el valor se confirma por WhatsApp.
          </li>
          <li>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /></svg>
            El medio de pago se acuerda por WhatsApp al confirmar tu pedido.
          </li>
        </ul>

        <!-- Detalles desplegables (teclado y lectores de pantalla nativos) -->
        <div class="acc">
          <details class="acc-item">
            <summary>Cuidados de tus flores</summary>
            <ul class="acc-body">
              <li>Corta los tallos en diagonal antes de ponerlos en agua.</li>
              <li>Cambia el agua cada dos días.</li>
              <li>Ubícalas lejos de la luz solar directa y de fuentes de calor.</li>
              <li>Retira las hojas que queden bajo el nivel del agua.</li>
              <li>Mantén limpio el recipiente.</li>
            </ul>
          </details>
          <details class="acc-item">
            <summary>Entrega, cambios y garantía</summary>
            <div class="acc-body">
              <p>
                Las flores son productos perecederos y cada arreglo se elabora por encargo. Si tu pedido llega en mal estado,
                escríbenos con fotos lo antes posible y te explicamos la solución (cambio o devolución).
                Lee las condiciones completas en los
                <NuxtLink to="/terminos#cambios" class="link-inline">Términos y condiciones</NuxtLink>.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>

    <!-- Relacionados -->
    <section v-if="relacionados.length" class="section rel" aria-labelledby="rel-titulo">
      <div class="wrap">
        <header class="rel-head">
          <p class="eyebrow">Te puede gustar</p>
          <h2 id="rel-titulo" class="display rel-title">Ramos <em>relacionados</em></h2>
        </header>
        <ul class="rel-grid">
          <li v-for="r in relacionados" :key="r.id"><CatalogCard :ramo="r" /></li>
        </ul>
      </div>
    </section>

    <!-- Barra de compra fija (solo móvil) -->
    <Transition name="bar">
      <div v-if="mostrarBarra && ramo.disponible" class="bar">
        <div class="bar-info">
          <span class="bar-name">{{ ramo.nombre }}</span>
          <span class="bar-price">{{ formatPrecio(precioActual) }}</span>
        </div>
        <button type="button" class="btn btn--wine btn--sm" @click="agregar">Agregar</button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { NEGOCIO } from '~/data/negocio'
import { useProductosStore } from '~/stores/productos'

// Una instancia nueva por producto: reinicia tamaño, estado y scroll de la galería
definePageMeta({ key: (route) => route.fullPath })

const route = useRoute()
const store = useProductosStore()
const { mostrar } = useToast()
const { abrir } = useCarritoUI()

const param = String(route.params.slug)
const esNumerico = /^\d+$/.test(param)
const ramo = esNumerico ? store.getRamoById(Number(param)) : store.getRamoBySlug(param)

if (!ramo) {
  throw createError({ statusCode: 404, statusMessage: 'Ramo no encontrado', fatal: true })
}
// Enlaces antiguos (/producto/4) → URL con nombre (/producto/pasion-eterna), con redirección permanente
if (esNumerico) {
  await navigateTo(`/producto/${ramo.slug}`, { redirectCode: 301, replace: true })
}

const tamanoSel = ref(ramo.tamanos[0].value)
const tamanoActual = computed(() => ramo.tamanos.find((t) => t.value === tamanoSel.value) ?? ramo.tamanos[0])
const precioActual = computed(() => tamanoActual.value.precio)

const relacionados = computed(() =>
  store.ramos.filter((r) => r.id !== ramo.id && r.categoria === ramo.categoria).slice(0, 3),
)

const mensajeWA = computed(
  () => `Hola, me interesa el ramo ${ramo.nombre} (${tamanoActual.value.label}) de ${formatPrecio(precioActual.value)}. ¿Tienen disponibilidad para la fecha que necesito?`,
)

// Agregar al carrito (con estado de confirmación)
const agregado = ref(false)
let t: ReturnType<typeof setTimeout>
function agregar() {
  store.agregarAlCarrito(ramo, tamanoActual.value)
  agregado.value = true
  clearTimeout(t)
  t = setTimeout(() => { agregado.value = false }, 1800)
  mostrar(`${ramo.nombre} se agregó al carrito`, { label: 'Ver carrito', fn: abrir })
}

// Barra fija móvil: solo cuando los botones principales salen de pantalla
const accionesEl = ref<HTMLElement | null>(null)
const mostrarBarra = ref(false)
let io: IntersectionObserver | null = null
onMounted(() => {
  if (!accionesEl.value) return
  io = new IntersectionObserver(([e]) => { mostrarBarra.value = !e.isIntersecting && e.boundingClientRect.top < 0 })
  io.observe(accionesEl.value)
})
onBeforeUnmount(() => { io?.disconnect(); clearTimeout(t) })

useSeoMeta({
  title: `${ramo.nombre} – Regocijo Floristería`,
  description: `${ramo.descripcion} Desde ${formatPrecio(ramo.precio)}. Entrega a domicilio en ${NEGOCIO.ciudad}.`,
  ogTitle: `${ramo.nombre} – Regocijo Floristería`,
  ogImage: ramo.imagen_url ?? undefined,
})
</script>

<style scoped>
.bc { border-bottom: 1px solid var(--line); background: rgba(255, 253, 249, 0.6); }
.bc-list { display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem 0; list-style: none; margin: 0 auto; padding-block: 0.9rem; font-size: 0.85rem; }
.bc-list li + li::before { content: '/'; margin-inline: 0.6rem; color: var(--line-strong); }
.bc-link { color: var(--muted); text-decoration: none; transition: color 0.2s; }
.bc-link:hover { color: var(--wine); text-decoration: underline; }
.bc-now { color: var(--ink); font-weight: 500; }

.pd { display: grid; gap: 3rem; padding-block: clamp(2rem, 5vw, 4rem); align-items: start; grid-template-columns: minmax(0, 1fr); }
.pd > * { min-width: 0; }
@media (min-width: 900px) { .pd { grid-template-columns: minmax(0, 1.02fr) minmax(0, 1fr); gap: 4.5rem; } .pd-gallery { position: sticky; top: calc(var(--header-h) + 1.5rem); } }

.pd-title { font-size: clamp(2.8rem, 6vw, 4.8rem); margin: 0.9rem 0 1rem; }
.pd-price-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem 1.5rem; margin-bottom: 1.5rem; }
.pd-price { display: flex; align-items: baseline; gap: 0.6rem; font: 400 clamp(2.4rem, 5vw, 3.2rem)/1 var(--serif); color: var(--wine); }
.pd-from { font: 500 0.75rem var(--sans); letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
.flip-enter-active, .flip-leave-active { transition: opacity 0.2s, transform 0.3s var(--ease-out); }
.flip-enter-from { opacity: 0; transform: translateY(-0.5rem); }
.flip-leave-to { opacity: 0; transform: translateY(0.5rem); }

.status { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 0.9rem; border-radius: 9999px; font: 500 0.8rem var(--sans); }
.status--ok { background: var(--sage-soft); color: var(--sage); }
.status--no { background: #fdecea; color: var(--danger); }
.status-dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: currentColor; }
.status--ok .status-dot { animation: pulse 2.4s ease-in-out infinite; }
@keyframes pulse { 50% { opacity: 0.35; transform: scale(0.8); } }

.pd-desc { font-size: 1.1rem; line-height: 1.8; color: var(--body); }
.pd-note { margin-top: 1rem; padding: 0.9rem 1.1rem; border-left: 3px solid var(--gold-soft); background: #fbf1dc; color: #5c4400; border-radius: 0 0.8rem 0.8rem 0; font-size: 0.95rem; }

/* Tamaños (radios nativos estilizados) */
.sizes { border: 0; padding: 0; margin: 2rem 0 0; }
.sizes legend { margin-bottom: 0.8rem; padding: 0; }
.sizes-grid { display: grid; gap: 0.6rem; grid-template-columns: repeat(auto-fill, minmax(10.5rem, 1fr)); }
.size { display: block; cursor: pointer; }
.size-body { display: flex; flex-direction: column; gap: 0.15rem; height: 100%; padding: 0.85rem 1rem; background: var(--paper); border: 1.5px solid var(--line-strong); border-radius: 1rem; transition: border-color 0.25s, background 0.25s, box-shadow 0.25s, transform 0.3s var(--ease-out); }
.size:hover .size-body { border-color: var(--wine); transform: translateY(-2px); }
.size input:checked + .size-body { border-color: var(--wine); background: #fdf1f3; box-shadow: 0 0 0 3px rgba(140, 31, 69, 0.14); }
.size input:focus-visible + .size-body { outline: 3px solid var(--wine); outline-offset: 3px; }
.size-name { font-weight: 500; color: var(--ink); line-height: 1.3; }
.size-detail { font-size: 0.78rem; color: var(--muted); line-height: 1.35; }
.size-price { margin-top: auto; padding-top: 0.35rem; font: 500 1.3rem var(--serif); color: var(--wine); }
.pd-size-single { margin-top: 1.75rem; color: var(--body); }
.pd-size-single .field-label { display: block; margin-bottom: 0.25rem; }

.facts { margin: 1.75rem 0 0; display: grid; gap: 1rem; padding: 1.25rem 1.4rem; background: var(--paper); border: 1px solid var(--line); border-radius: 1.2rem; }
.facts > div { display: grid; gap: 0.2rem; }
.facts dt { font: 500 0.72rem var(--sans); letter-spacing: 0.2em; text-transform: uppercase; color: var(--rose); }
.facts dd { margin: 0; font-size: 0.97rem; }
.facts ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.2rem; }
.facts li::before { content: '✿'; color: var(--rose); margin-right: 0.55rem; font-size: 0.8em; }

.actions { display: grid; gap: 0.75rem; margin-top: 2rem; }
@media (min-width: 560px) { .actions { grid-template-columns: 1fr 1fr; } }
.btn--ok { background: var(--sage); }

.promises { list-style: none; margin: 1.75rem 0 0; padding: 1.25rem 0 0; border-top: 1px solid var(--line); display: grid; gap: 0.9rem; font-size: 0.95rem; }
.promises li { display: grid; grid-template-columns: 1.6rem 1fr; gap: 0.8rem; align-items: start; }
.promises svg { color: var(--rose); margin-top: 0.1rem; }

.acc { margin-top: 1.75rem; border-top: 1px solid var(--line); }
.acc-item { border-bottom: 1px solid var(--line); }
.acc-item summary { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 1.1rem 0.15rem; cursor: pointer; list-style: none; font: 400 1.5rem var(--serif); color: var(--ink); transition: color 0.2s; }
.acc-item summary::-webkit-details-marker { display: none; }
.acc-item summary::after { content: '+'; font: 300 1.8rem/1 var(--sans); color: var(--wine); transition: transform 0.4s var(--ease-out); }
.acc-item[open] summary::after { transform: rotate(45deg); }
.acc-item summary:hover { color: var(--wine); }
.acc-body { margin: 0; padding: 0 0.15rem 1.25rem; font-size: 0.97rem; display: grid; gap: 0.5rem; }
ul.acc-body { list-style: none; }
ul.acc-body li::before { content: '✿'; color: var(--rose); margin-right: 0.6rem; font-size: 0.8em; }

/* Relacionados */
.rel { background: var(--blush); }
.rel-head { margin-bottom: 2.5rem; }
.rel-title { font-size: clamp(2.4rem, 5vw, 3.6rem); margin-top: 0.7rem; }
.rel-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.75rem; grid-template-columns: 1fr; }
@media (min-width: 640px) { .rel-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 980px) { .rel-grid { grid-template-columns: repeat(3, 1fr); } }

/* Barra fija móvil */
.bar { position: fixed; z-index: 60; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.75rem var(--gutter) calc(0.75rem + env(safe-area-inset-bottom)); background: rgba(255, 253, 249, 0.96); backdrop-filter: blur(12px); border-top: 1px solid var(--line); box-shadow: 0 -12px 30px -18px rgba(42, 26, 31, 0.4); }
.bar-info { display: flex; flex-direction: column; line-height: 1.2; min-width: 0; }
.bar-name { font: 400 1.15rem var(--serif); color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bar-price { font: 500 1rem var(--serif); color: var(--wine); }
@media (min-width: 900px) { .bar { display: none; } }
.bar-enter-active, .bar-leave-active { transition: transform 0.45s var(--ease-out); }
.bar-enter-from, .bar-leave-to { transform: translateY(100%); }
</style>
