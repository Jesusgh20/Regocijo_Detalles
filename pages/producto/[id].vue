<template>
  <div>

    <!-- 404 -->
    <div v-if="!ramo" class="not-found">
      <span style="font-size:4rem;">🌿</span>
      <h2>Ramo no encontrado</h2>
      <NuxtLink to="/catalogo" class="btn-primary" style="margin-top:1.5rem;display:inline-flex;">
        Ver todos los ramos
      </NuxtLink>
    </div>

    <div v-else>

      <!-- BREADCRUMB -->
      <div style="background:#faf8f3;border-bottom:1px solid #ffe8ee;">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-2"
             style="font-family:'Jost',sans-serif;font-size:0.78rem;color:#a8a29e;">
          <NuxtLink to="/" class="breadcrumb-link">Inicio</NuxtLink>
          <span>/</span>
          <NuxtLink to="/catalogo" class="breadcrumb-link">Catálogo</NuxtLink>
          <span>/</span>
          <span style="color:#44403c;font-weight:500;">{{ ramo.nombre }}</span>
        </div>
      </div>

      <!-- CONTENIDO -->
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div class="detalle-grid">

          <!-- ── CARRUSEL ── -->
          <div class="carrusel-col">
            <div class="main-image-wrapper">
              <Transition :name="transitionName" mode="out-in">
                <img
                  :key="imagenActiva"
                  :src="imagenes[imagenActiva]"
                  :alt="`${ramo.nombre} - imagen ${imagenActiva + 1}`"
                  class="main-image"
                />
              </Transition>

              <div style="position:absolute;top:1rem;left:1rem;">
                <span :class="['category-badge', `category-badge--${ramo.categoria.toLowerCase()}`]">
                  {{ ramo.categoria }}
                </span>
              </div>
              <div v-if="ramo.destacado" style="position:absolute;top:1rem;right:1rem;">
                <span style="background:#faf4e5;color:#b8903a;" class="category-badge">✦ Destacado</span>
              </div>

              <button v-if="imagenes.length > 1" class="carrusel-arrow carrusel-arrow--left"
                      @click="navegarCarrusel(-1)" aria-label="Anterior">
                <svg xmlns="http://www.w3.org/2000/svg" style="height:1.1rem;width:1.1rem;" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </button>
              <button v-if="imagenes.length > 1" class="carrusel-arrow carrusel-arrow--right"
                      @click="navegarCarrusel(1)" aria-label="Siguiente">
                <svg xmlns="http://www.w3.org/2000/svg" style="height:1.1rem;width:1.1rem;" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
              </button>

              <div v-if="imagenes.length > 1" class="carrusel-dots">
                <button v-for="(_, idx) in imagenes" :key="idx"
                  :class="['carrusel-dot', imagenActiva === idx ? 'carrusel-dot--active' : '']"
                  @click="irImagen(idx)" />
              </div>
            </div>

            <div v-if="imagenes.length > 1" class="thumbnails">
              <button v-for="(img, idx) in imagenes" :key="idx"
                :class="['thumb', imagenActiva === idx ? 'thumb--active' : '']"
                @click="irImagen(idx)">
                <img :src="img" :alt="`Miniatura ${idx + 1}`" style="width:100%;height:100%;object-fit:cover;" />
              </button>
            </div>
          </div>

          <!-- ── INFO ── -->
          <div class="info-col">

            <!-- Nombre -->
            <div style="margin-bottom:1.5rem;">
              <p class="section-label mb-2">{{ ramo.categoria }}</p>
              <h1 class="producto-title">{{ ramo.nombre }}</h1>

              <!-- PRECIO DINÁMICO según tamaño seleccionado -->
              <div class="precio-row">
                <Transition name="precio-flip" mode="out-in">
                  <span :key="tamanoSeleccionado" class="precio-principal">
                    {{ store.formatPrecio(precioActual) }}
                  </span>
                </Transition>
                <span class="disponibilidad" :class="ramo.disponible ? 'disponible--si' : 'disponible--no'">
                  <span class="disponibilidad-dot"></span>
                  {{ ramo.disponible ? 'Disponible' : 'Agotado' }}
                </span>
              </div>
              <!-- Indicador de precio base en cards -->
              <p class="precio-desde">
                Desde {{ store.formatPrecio(ramo.precio) }} — precio según tamaño
              </p>
            </div>

            <!-- Descripción -->
            <div class="descripcion-block">
              <p class="descripcion-texto">{{ ramo.descripcion }}</p>
            </div>

            <!-- SELECTOR DE TAMAÑO CON PRECIO -->
            <div class="opcion-grupo">
              <p class="opcion-label">
                Tamaño del ramo
                <span style="font-weight:400;color:#a8a29e;font-size:0.72rem;">— el precio cambia según el tamaño</span>
              </p>
              <div class="tamano-grid">
                <button
                  v-for="tam in ramo.tamanos"
                  :key="tam.value"
                  :class="['tamano-pill', tamanoSeleccionado === tam.value ? 'tamano-pill--active' : '']"
                  @click="tamanoSeleccionado = tam.value"
                >
                  <span class="tamano-nombre">{{ tam.label }}</span>
                  <span class="tamano-flores">{{ tam.flores }}</span>
                  <span class="tamano-precio" :class="tamanoSeleccionado === tam.value ? 'tamano-precio--active' : ''">
                    {{ store.formatPrecio(tam.precio) }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Dedicatoria -->
            <div class="opcion-grupo">
              <p class="opcion-label">
                Dedicatoria
                <span style="font-weight:400;color:#a8a29e;font-size:0.72rem;">(opcional)</span>
              </p>
              <textarea
                v-model="dedicatoria"
                placeholder="Escribe un mensaje especial para incluir en el ramo..."
                class="dedicatoria-input"
                rows="3"
              />
            </div>

            <div class="floral-divider" style="margin:1.5rem 0;">
              <span style="font-size:1rem;color:#ffc5d5;">✿</span>
            </div>

            <!-- ACCIONES -->
            <div class="acciones">
              <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
                <svg style="height:1.25rem;width:1.25rem;flex-shrink:0;" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
                </svg>
                Contactar por WhatsApp
              </a>

              <button class="carrito-btn" :disabled="!ramo.disponible" @click="agregarAlCarrito">
                <svg xmlns="http://www.w3.org/2000/svg" style="height:1.1rem;width:1.1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                {{ ramo.disponible ? 'Añadir al carrito' : 'Agotado' }}
              </button>
            </div>

            <!-- Entrega info -->
            <div class="entrega-info">
              <div v-for="info in entregaInfo" :key="info.texto" class="entrega-item">
                <span style="font-size:1rem;">{{ info.emoji }}</span>
                <span style="font-family:'Jost',sans-serif;font-size:0.78rem;color:#78716c;">{{ info.texto }}</span>
              </div>
            </div>

          </div>
        </div>

        <!-- TABS -->
        <div style="margin-top:4rem;">
          <div class="tabs-header">
            <button v-for="tab in tabs" :key="tab.id"
              :class="['tab-btn', tabActivo === tab.id ? 'tab-btn--active' : '']"
              @click="tabActivo = tab.id">
              {{ tab.label }}
            </button>
          </div>
          <div class="tab-content">
            <div v-if="tabActivo === 'detalles'" class="tab-panel">
              <div class="detalles-grid">
                <div v-for="d in detalles" :key="d.label" class="detalle-item">
                  <span class="detalle-label">{{ d.label }}</span>
                  <span class="detalle-valor">{{ d.valor }}</span>
                </div>
              </div>
            </div>
            <div v-if="tabActivo === 'cuidados'" class="tab-panel">
              <ul class="cuidados-list">
                <li v-for="c in cuidados" :key="c" class="cuidado-item">
                  <span style="color:#f25480;flex-shrink:0;">✿</span>
                  <span style="font-family:'Jost',sans-serif;font-size:0.88rem;color:#57534e;line-height:1.6;">{{ c }}</span>
                </li>
              </ul>
            </div>
            <div v-if="tabActivo === 'ocasiones'" class="tab-panel">
              <div class="ocasiones-wrap">
                <span v-for="o in ocasiones" :key="o" class="ocasion-tag">{{ o }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RELACIONADOS -->
        <div v-if="relacionados.length" style="margin-top:4rem;">
          <p class="section-label mb-2">También te puede gustar</p>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2rem;color:#292524;margin-bottom:2rem;">Ramos relacionados</h2>
          <div class="relacionados-grid">
            <article v-for="rel in relacionados" :key="rel.id" class="product-card group">
              <div class="relative overflow-hidden" style="aspect-ratio:4/3;">
                <img :src="rel.imagen_url" :alt="rel.nombre" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy"/>
                <div class="rel-overlay">
                  <NuxtLink :to="`/producto/${rel.id}`" class="btn-primary" style="font-size:0.78rem;padding:0.5rem 1rem;">Ver ramo</NuxtLink>
                </div>
              </div>
              <div class="p-4">
                <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.1rem;color:#292524;margin-bottom:0.2rem;">{{ rel.nombre }}</p>
                <p style="font-family:'Jost',sans-serif;font-size:0.75rem;color:#a8a29e;">Desde</p>
                <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.2rem;color:#d43868;font-weight:500;">{{ store.formatPrecio(rel.precio) }}</p>
              </div>
            </article>
          </div>
        </div>

      </div>
    </div>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="showToast" class="toast-notification">
        <span>🌸</span>
        <span style="font-family:'Jost',sans-serif;font-size:0.85rem;color:#292524;">¡Añadido al carrito!</span>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { useProductosStore } from '~/stores/productos'
import type { Tamano } from '~/stores/productos'

const route = useRoute()
const store = useProductosStore()

const id   = computed(() => Number(route.params.id))
const ramo = computed(() => store.getRamoById(id.value) ?? null)

// Carrusel — usa el array real de imagenes del store
const imagenes = computed(() => ramo.value?.imagenes ?? [])

const imagenActiva   = ref(0)
const transitionName = ref('slide-left')

function navegarCarrusel(dir: 1 | -1) {
  transitionName.value = dir === 1 ? 'slide-left' : 'slide-right'
  imagenActiva.value = (imagenActiva.value + dir + imagenes.value.length) % imagenes.value.length
}
function irImagen(idx: number) {
  transitionName.value = idx > imagenActiva.value ? 'slide-left' : 'slide-right'
  imagenActiva.value = idx
}

// ── Tamaño seleccionado (mediano por defecto) ──
const tamanoSeleccionado = ref('mediano')

// Resetear al cambiar de producto
watch(id, () => { tamanoSeleccionado.value = 'mediano'; imagenActiva.value = 0 })

// ── Precio reactivo según tamaño ──────────────
const precioActual = computed<number>(() => {
  if (!ramo.value) return 0
  const tam = ramo.value.tamanos.find(t => t.value === tamanoSeleccionado.value)
  return tam?.precio ?? ramo.value.precio
})

const tamanoActual = computed<Tamano | undefined>(() =>
  ramo.value?.tamanos.find(t => t.value === tamanoSeleccionado.value)
)

// Dedicatoria
const dedicatoria = ref('')

// WhatsApp
const WHATSAPP_NUMBER = '573112345678'

const whatsappUrl = computed(() => {
  if (!ramo.value || !tamanoActual.value) return '#'
  let msg = `Hola! Me interesa el ramo *${ramo.value.nombre}*`
  msg += `\nTamaño: ${tamanoActual.value.label} (${tamanoActual.value.flores})`
  msg += `\nPrecio: ${store.formatPrecio(precioActual.value)}`
  if (dedicatoria.value.trim()) msg += `\nDedicatoria: "${dedicatoria.value.trim()}"`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
})

// Carrito — pasa el tamaño con precio correcto
const showToast = ref(false)

function agregarAlCarrito() {
  if (!ramo.value || !tamanoActual.value) return
  store.agregarAlCarrito(ramo.value, tamanoActual.value)
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2200)
}

// Tabs
const tabActivo = ref('detalles')
const tabs = [
  { id: 'detalles',  label: 'Detalles'  },
  { id: 'cuidados',  label: 'Cuidados'  },
  { id: 'ocasiones', label: 'Ocasiones' },
]

const detalles = computed(() => ramo.value && tamanoActual.value ? [
  { label: 'Categoría', valor: ramo.value.categoria },
  { label: 'Tamaño',    valor: `${tamanoActual.value.label} — ${tamanoActual.value.flores}` },
  { label: 'Precio',    valor: store.formatPrecio(precioActual.value) },
  { label: 'Disponible', valor: ramo.value.disponible ? 'Sí' : 'No' },
  { label: 'Empaque',   valor: 'Papel kraft + cinta satinada' },
  { label: 'Entrega',   valor: 'Mismo día (pedidos antes 4pm)' },
] : [])

const cuidados = [
  'Corta los tallos en diagonal antes de ponerlos en agua.',
  'Cambia el agua cada dos días para mantener la frescura.',
  'Ubícalos lejos de la luz solar directa y fuentes de calor.',
  'Agrega el sobre de nutrientes incluido al primer cambio de agua.',
  'Retira las hojas que estén por debajo del nivel del agua.',
  'Mantén el recipiente limpio para evitar bacterias.',
]

const ocasiones = [
  'Cumpleaños 🎂', 'Aniversario 💕', 'San Valentín ❤️',
  'Día de la Madre 🌷', 'Bodas 💐', 'Grado 🎓',
  'Bebé recién nacido 👶', 'Condolencias 🕊️', 'Sin motivo ✨', 'Pedida de mano 💍',
]

const relacionados = computed(() =>
  store.ramos.filter(r => r.id !== id.value && r.categoria === ramo.value?.categoria).slice(0, 3)
)

const entregaInfo = [
  { emoji: '🚚', texto: 'Entrega el mismo día en Bogotá' },
  { emoji: '🎁', texto: 'Empaque regalo incluido sin costo' },
  { emoji: '💳', texto: 'PSE, tarjeta de crédito o efectivo' },
]

useHead(() => ({
  title: ramo.value ? `${ramo.value.nombre} – Regocijo Detalles` : 'Producto – Regocijo Detalles',
  meta: ramo.value ? [{ name: 'description', content: ramo.value.descripcion }] : [],
}))
</script>

<style scoped>
.not-found {
  min-height: 60vh; display: flex; flex-direction: column;
  align-items: center; justify-content: center; text-align: center; gap: 0.75rem;
  font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.6rem; color: #44403c;
}
.breadcrumb-link { color: #a8a29e; text-decoration: none; transition: color 0.15s; }
.breadcrumb-link:hover { color: #f25480; }

.detalle-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
@media (min-width: 768px)  { .detalle-grid { grid-template-columns: 1fr 1fr; align-items: start; } }
@media (min-width: 1024px) { .detalle-grid { grid-template-columns: 55% 1fr; gap: 4rem; } }

/* Carrusel */
.main-image-wrapper { position: relative; border-radius: 1.5rem; overflow: hidden; aspect-ratio: 4/3; background: #f5f5f4; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
.main-image { width: 100%; height: 100%; object-fit: cover; display: block; }
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active { transition: all 0.35s ease; position: absolute; inset: 0; }
.slide-left-enter-from  { transform: translateX(60px);  opacity: 0; }
.slide-left-leave-to    { transform: translateX(-60px); opacity: 0; }
.slide-right-enter-from { transform: translateX(-60px); opacity: 0; }
.slide-right-leave-to   { transform: translateX(60px);  opacity: 0; }
.carrusel-arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #44403c; box-shadow: 0 4px 16px rgba(0,0,0,0.12); transition: all 0.15s; z-index: 10; }
.carrusel-arrow:hover { background: white; color: #f25480; }
.carrusel-arrow--left  { left: 0.75rem; }
.carrusel-arrow--right { right: 0.75rem; }
.carrusel-dots { position: absolute; bottom: 0.75rem; left: 50%; transform: translateX(-50%); display: flex; gap: 0.4rem; z-index: 10; }
.carrusel-dot { width: 8px; height: 8px; border-radius: 50%; border: none; background: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.2s; padding: 0; }
.carrusel-dot--active { background: white; width: 22px; border-radius: 4px; }
.thumbnails { display: flex; gap: 0.6rem; margin-top: 0.75rem; }
.thumb { width: 72px; height: 72px; border-radius: 0.75rem; overflow: hidden; border: 2px solid transparent; cursor: pointer; transition: border-color 0.2s; padding: 0; background: none; flex-shrink: 0; }
.thumb--active { border-color: #f25480; box-shadow: 0 0 0 2px rgba(242,84,128,0.2); }

/* Info */
.info-col { display: flex; flex-direction: column; }
.producto-title { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(2rem,4vw,2.8rem); color: #292524; line-height: 1.05; margin-bottom: 0.75rem; font-weight: 400; }
.precio-row { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.3rem; }
.precio-principal { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 2.4rem; color: #d43868; font-weight: 500; line-height: 1; display: block; }

/* Animación flip del precio */
.precio-flip-enter-active, .precio-flip-leave-active { transition: all 0.2s ease; }
.precio-flip-enter-from { opacity: 0; transform: translateY(-8px) scale(0.96); }
.precio-flip-leave-to   { opacity: 0; transform: translateY(8px)  scale(0.96); }

.precio-desde { font-family: 'Jost', sans-serif; font-size: 0.75rem; color: #a8a29e; margin-bottom: 1.25rem; }

.disponibilidad { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.3rem 0.8rem; border-radius: 9999px; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; }
.disponible--si { background: #e6eedd; color: #44602e; }
.disponible--no { background: #fee2e2; color: #991b1b; }
.disponibilidad-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

.descripcion-block { background: linear-gradient(135deg, #fff5f7, #fdf0f3); border-radius: 1rem; padding: 1.25rem; border-left: 3px solid #ffc5d5; margin-bottom: 1.5rem; }
.descripcion-texto { font-family: 'Jost', sans-serif; font-size: 0.9rem; color: #57534e; line-height: 1.8; margin: 0; }

.opcion-grupo { margin-bottom: 1.5rem; }
.opcion-label { font-family: 'Jost', sans-serif; font-size: 0.78rem; font-weight: 600; color: #292524; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.6rem; }

/* Grid de tamaños con precio */
.tamano-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
@media (min-width: 420px) { .tamano-grid { grid-template-columns: repeat(4, 1fr); } }

.tamano-pill {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 0.7rem 0.4rem; border-radius: 0.875rem;
  border: 1.5px solid #e7e5e4; background: white;
  cursor: pointer; transition: all 0.18s; gap: 0.15rem;
}
.tamano-pill:hover { border-color: #ffa0ba; background: #fff5f7; }
.tamano-pill--active {
  border-color: #f25480; background: #fff5f7;
  box-shadow: 0 0 0 3px rgba(242,84,128,0.12);
}
.tamano-nombre { font-family: 'Jost', sans-serif; font-size: 0.82rem; font-weight: 700; color: #292524; }
.tamano-flores { font-family: 'Jost', sans-serif; font-size: 0.65rem; color: #a8a29e; }
.tamano-precio {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 0.95rem; font-weight: 600; color: #78716c;
  margin-top: 0.15rem;
  transition: color 0.18s;
}
.tamano-precio--active { color: #d43868; }

.dedicatoria-input { width: 100%; padding: 0.75rem 1rem; background: white; border: 1.5px solid #e7e5e4; border-radius: 0.875rem; font-family: 'Jost', sans-serif; font-size: 0.85rem; color: #44403c; resize: none; outline: none; transition: border-color 0.2s, box-shadow 0.2s; line-height: 1.6; }
.dedicatoria-input::placeholder { color: #a8a29e; }
.dedicatoria-input:focus { border-color: #ffa0ba; box-shadow: 0 0 0 3px rgba(255,197,213,0.25); }

.acciones { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem; }
.whatsapp-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.875rem 1.5rem; background: #25D366; color: white; font-family: 'Jost', sans-serif; font-weight: 600; font-size: 0.9rem; border-radius: 9999px; text-decoration: none; transition: all 0.2s; box-shadow: 0 4px 20px rgba(37,211,102,0.3); }
.whatsapp-btn:hover { background: #1fba59; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,211,102,0.35); }
.carrito-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.875rem 1.5rem; background: white; color: #f25480; font-family: 'Jost', sans-serif; font-weight: 600; font-size: 0.9rem; border-radius: 9999px; border: 2px solid #f25480; cursor: pointer; transition: all 0.2s; }
.carrito-btn:hover:not(:disabled) { background: #f25480; color: white; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(242,84,128,0.25); }
.carrito-btn:disabled { opacity: 0.4; cursor: not-allowed; border-color: #e7e5e4; color: #a8a29e; }
.entrega-info { display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem; background: #f4f7f0; border-radius: 1rem; border: 1px solid #cddcbc; }
.entrega-item { display: flex; align-items: center; gap: 0.6rem; }

/* Tabs */
.tabs-header { display: flex; border-bottom: 2px solid #ffe8ee; }
.tab-btn { padding: 0.75rem 1.5rem; font-family: 'Jost', sans-serif; font-size: 0.85rem; font-weight: 500; color: #a8a29e; background: none; border: none; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.15s; }
.tab-btn:hover { color: #f25480; }
.tab-btn--active { color: #f25480; border-bottom-color: #f25480; }
.tab-content { padding: 2rem; background: white; border: 1px solid #ffe8ee; border-top: none; border-radius: 0 0 1rem 1rem; }
.detalles-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
@media (min-width: 640px) { .detalles-grid { grid-template-columns: repeat(3, 1fr); } }
.detalle-item { display: flex; flex-direction: column; gap: 0.2rem; padding: 0.75rem; background: #faf8f3; border-radius: 0.75rem; }
.detalle-label { font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #a8a29e; }
.detalle-valor { font-family: 'Jost', sans-serif; font-size: 0.88rem; color: #292524; font-weight: 500; }
.cuidados-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.cuidado-item { display: flex; align-items: flex-start; gap: 0.75rem; }
.ocasiones-wrap { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.ocasion-tag { padding: 0.4rem 1rem; background: #fff5f7; color: #a8264f; border: 1px solid #ffc5d5; border-radius: 9999px; font-family: 'Jost', sans-serif; font-size: 0.82rem; font-weight: 500; }

/* Relacionados */
.relacionados-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
@media (min-width: 580px)  { .relacionados-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .relacionados-grid { grid-template-columns: repeat(3, 1fr); } }
.rel-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; background: rgba(242,84,128,0.08); backdrop-filter: blur(2px); }
.group:hover .rel-overlay { opacity: 1; }

/* Toast */
.toast-notification { position: fixed; bottom: 2rem; right: 2rem; background: white; border: 1px solid #ffc5d5; border-radius: 1rem; padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 8px 30px rgba(242,84,128,0.2); z-index: 200; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px) scale(0.95); }
</style>