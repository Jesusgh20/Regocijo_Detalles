<template>
  <div>

    <!-- ═══════════════════════════════════════
         HERO BANNER
    ═══════════════════════════════════════ -->
    <section class="hero-section relative overflow-hidden">

      <!-- Fondo con gradiente floral -->
      <div class="absolute inset-0" style="background: linear-gradient(160deg, #ffe8ee 0%, #faf8f3 45%, #e6eedd 100%);"></div>

      <!-- Círculos decorativos de fondo -->
      <div class="absolute -top-24 -right-24 rounded-full pointer-events-none"
           style="width:480px; height:480px; background:radial-gradient(circle, rgba(255,197,213,0.35) 0%, transparent 70%);"></div>
      <div class="absolute -bottom-16 -left-16 rounded-full pointer-events-none"
           style="width:360px; height:360px; background:radial-gradient(circle, rgba(205,220,188,0.3) 0%, transparent 70%);"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
           style="width:600px; height:600px; background:radial-gradient(circle, rgba(242,84,128,0.04) 0%, transparent 65%);"></div>

      <div class="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28">
        <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <!-- Texto hero -->
          <div class="flex-1 text-center lg:text-left">

            <!-- Logo placeholder -->
            <div class="inline-flex items-center gap-3 mb-8">
              <div class="logo-placeholder">
                <span class="text-3xl">🌸</span>
              </div>
              <div>
                <p style="font-family:'Cormorant Garamond',Georgia,serif; font-size:1.8rem; line-height:1; color:#292524; font-weight:400;">
                  Regocijo
                </p>
                <p style="font-family:'Jost',sans-serif; font-size:0.65rem; letter-spacing:0.25em; text-transform:uppercase; color:#f25480; margin-top:2px;">
                  Detalles
                </p>
              </div>
            </div>

            <p class="section-label mb-4">Florería artesanal <br>Montería - Córdoba, Colombia</p>

            <h1 class="hero-title mb-6">
              Cada flor<br>
              <em class="text-gradient-floral">cuenta una<br>historia</em>
            </h1>

            <p class="hero-subtitle mb-10">
              Creamos ramos únicos elaborados con flores frescas y amor. Entrega al siguente dia, agenda tu pedido ya para que en ningún momento especial quede sin flores.
            </p>

            <!-- CTAs -->
            <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <NuxtLink to="/catalogo" class="btn-primary">
                Explorar colección
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </NuxtLink>
              <NuxtLink to="/contacto" class="btn-outline">
                Ramo personalizado
              </NuxtLink>
            </div>

            <!-- Trust stats -->
            <div class="flex flex-wrap gap-6 justify-center lg:justify-start mt-12">
              <div v-for="stat in stats" :key="stat.label" class="text-center lg:text-left">
                <p class="stat-number">{{ stat.value }}</p>
                <p class="stat-label">{{ stat.label }}</p>
              </div>
            </div>
          </div>

          <!-- Imagen hero (collage de flores) -->
          <div class="flex-1 w-full max-w-lg lg:max-w-none">
            <div class="hero-image-grid">

              <!-- Imagen principal -->
              <div class="hero-img-main">
                <img
                  src="/Encanto1.jpeg"
                  alt="Ramo de rosas"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Imagen secundaria 1 -->
              <div class="hero-img-secondary-1">
                <img
                  src="/JardinMargaritas1.jpeg"
                  alt="Ramo blanco"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Imagen secundaria 2 -->
              <div class="hero-img-secondary-2">
                <img
                  src="/Encanto2.jpeg"
                  alt="Flores mixtas"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Floating card -->
              <div class="hero-float-card">
                <span class="text-xl">🚚</span>
                <div>
                  <p style="font-family:'Jost',sans-serif; font-size:0.75rem; font-weight:600; color:#292524; white-space:nowrap;">Agenda Hoy</p>
                  <p style="font-family:'Jost',sans-serif; font-size:0.65rem; color:#78716c;">Entragas a toda la ciudad</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- Ola decorativa inferior -->
      <div class="absolute bottom-0 left-0 right-0 pointer-events-none" style="height:60px;">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="w-full h-full" fill="#faf8f3">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"/>
        </svg>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         TRUST BADGES
    ═══════════════════════════════════════ -->
    <section style="background:#faf8f3; padding: 2rem 0;">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="badge in trustBadges" :key="badge.label"
               class="trust-badge-card">
            <span style="font-size:1.5rem;" class="mb-2">{{ badge.emoji }}</span>
            <p style="font-family:'Jost',sans-serif; font-size:0.8rem; font-weight:600; color:#292524; text-align:center;">{{ badge.label }}</p>
            <p style="font-family:'Jost',sans-serif; font-size:0.7rem; color:#78716c; text-align:center;">{{ badge.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         PRODUCTOS DESTACADOS
    ═══════════════════════════════════════ -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 py-20">

      <!-- Header sección -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <p class="section-label mb-3">Lo más amado</p>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif; font-size:2.8rem; color:#292524; line-height:1.1;">
            Ramos destacados
          </h2>
        </div>
        <NuxtLink to="/catalogo"
          style="font-family:'Jost',sans-serif; font-size:0.85rem; color:#f25480; font-weight:500; text-decoration:none; display:flex; align-items:center; gap:0.35rem; white-space:nowrap;"
          class="hover-link-arrow">
          Ver toda la colección
          <svg xmlns="http://www.w3.org/2000/svg" style="height:1rem;width:1rem;" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Grid de productos -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard
          v-for="ramo in productosDestacados"
          :key="ramo.id"
          :ramo="ramo"
        />
      </div>

      <!-- Carrito feedback toast -->
      <Transition name="toast">
        <div v-if="showToast" class="toast-notification">
          <span>🌸</span>
          <span style="font-family:'Jost',sans-serif; font-size:0.85rem;">¡Añadido al carrito!</span>
        </div>
      </Transition>

    </section>

    <!-- ═══════════════════════════════════════
         CATEGORÍAS
    ═══════════════════════════════════════ -->
    <section style="background: linear-gradient(135deg, #fff5f7 0%, #fdf0f3 50%, #f4f7f0 100%); padding: 5rem 0;">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12">
          <p class="section-label mb-3">Navega por estilo</p>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif; font-size:2.8rem; color:#292524;">
            Colecciones
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink
            v-for="cat in categorias"
            :key="cat.nombre"
            :to="`/catalogo?categoria=${cat.nombre}`"
            class="categoria-card group"
          >
            <div class="absolute inset-0 overflow-hidden rounded-2xl">
              <img :src="cat.imagen" :alt="cat.nombre"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(41,37,36,0.7) 0%, transparent 55%);"></div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <p style="font-family:'Cormorant Garamond',Georgia,serif; font-size:1.4rem; color:white; line-height:1.1;">{{ cat.nombre }}</p>
              <p style="font-family:'Jost',sans-serif; font-size:0.7rem; color:rgba(255,255,255,0.7); margin-top:2px;">{{ cat.sub }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         BANNER CTA
    ═══════════════════════════════════════ -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <div class="cta-banner">
        <div class="cta-banner-content">
          <div>
            <p class="section-label mb-3">¿Algo especial en mente?</p>
            <h2 style="font-family:'Cormorant Garamond',Georgia,serif; font-size:2.5rem; color:#292524; line-height:1.1; margin-bottom:0.75rem;">
              Ramos<br><em style="color:#f25480;">personalizados</em>
            </h2>
            <p style="font-family:'Jost',sans-serif; font-size:0.9rem; color:#78716c; line-height:1.7; max-width:340px;">
              Bodas, quinceaños, cumpleaños o simplemente porque sí. Diseñamos el ramo perfecto para cada momento.
            </p>
            <NuxtLink to="/contacto" class="btn-primary" style="margin-top:1.5rem; display:inline-flex;">
              Pedir mi ramo
            </NuxtLink>
          </div>
          <div class="cta-banner-flowers">
            <span class="animate-float" style="font-size:3.5rem; display:block;">🌺</span>
            <span class="animate-float-slow" style="font-size:2.5rem; display:block; margin-top:-0.5rem; margin-left:1.5rem;">🌸</span>
            <span class="animate-float" style="font-size:2rem; display:block; margin-left:-0.5rem; animation-delay: 1s;">🌼</span>
          </div>
        </div>
      </div>
    </section>

    <div style="height:3rem;"></div>

  </div>
</template>

<script setup lang="ts">
import { useProductosStore } from '~/stores/productos'

const productosStore = useProductosStore()

// Solo los destacados, máximo 4
const productosDestacados = computed(() =>
  productosStore.ramos.filter(r => r.destacado).slice(0, 4)
)

// Toast al añadir al carrito
const showToast = ref(false)
const originalAgregar = productosStore.agregarAlCarrito.bind(productosStore)
// Interceptamos para mostrar el toast
watch(() => productosStore.cantidadCarrito, () => {
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2000)
})

const stats = [
  { value: '+100', label: 'clientes felices' },
  { value: '+30',  label: 'variedades' },
  { value: '4.9★', label: 'calificación' },
]

const trustBadges = [
  { emoji: '🚚', label: 'Entraga al siguente día', desc: 'Pedidos antes de las 4pm' },
  { emoji: '💐', label: 'Flores frescas',       desc: 'La mejor calidad en flores' },
  { emoji: '🎁', label: 'Tarjeta Personalizada',       desc: 'Incluida sin costo' },
  { emoji: '💳', label: 'Pago seguro',          desc: 'Efectivo o transferencia' },
]

const categorias = [
  { nombre: 'Margaritas',    sub: 'Ternura y afecto',  imagen: '/JardinMargaritas1.jpeg' },
  { nombre: 'lirios',  sub: 'Calidez y cariño',    imagen: '/Delirio1.jpeg' },
  { nombre: 'Mixto',   sub: 'Alegría silvestre', imagen: '/Encanto1.jpeg' },
  { nombre: 'Todos',sub: 'Edición limitada',  imagen: 'Encanto3.jpeg' },
]

useHead({ title: 'Regocijo Detalles – Flores con alma' })
</script>

<style scoped>
/* ── Hero ─────────────────────────────── */
.hero-section {
  padding-bottom: 0;
  min-height: 90vh;
  display: flex;
  align-items: center;
}

.hero-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.8rem, 7vw, 5rem);
  line-height: 1;
  color: #292524;
  font-weight: 400;
}

.hero-subtitle {
  font-family: 'Jost', sans-serif;
  font-size: 1rem;
  color: #78716c;
  line-height: 1.8;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 1024px) {
  .hero-subtitle { margin-left: 0; margin-right: 0; }
}

/* ── Logo placeholder ─────────────────── */
.logo-placeholder {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffe8ee, #fdf0f3);
  border: 2px solid #ffc5d5;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(242, 84, 128, 0.15);
}

/* ── Stats ────────────────────────────── */
.stat-number {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.6rem;
  color: #f25480;
  line-height: 1;
  font-weight: 500;
}

.stat-label {
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  color: #a8a29e;
  text-transform: uppercase;
  margin-top: 2px;
}

/* ── Hero image grid ──────────────────── */
.hero-image-grid {
  position: relative;
  height: 480px;
}

.hero-img-main {
  position: absolute;
  top: 0; left: 0;
  width: 65%; height: 80%;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.hero-img-secondary-1 {
  position: absolute;
  top: 10%; right: 0;
  width: 38%; height: 48%;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.1);
}

.hero-img-secondary-2 {
  position: absolute;
  bottom: 0; right: 8%;
  width: 38%; height: 40%;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.1);
}

.hero-float-card {
  position: absolute;
  bottom: 12%; left: 3%;
  background: white;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 8px 30px rgba(242, 84, 128, 0.15);
  border: 1px solid #ffe8ee;
  animation: float 5s ease-in-out infinite;
}

@media (max-width: 768px) {
  .hero-image-grid { height: 320px; }
}

/* ── Trust badges ─────────────────────── */
.trust-badge-card {
  background: white;
  border-radius: 1.25rem;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 2px 15px rgba(0,0,0,0.05);
  border: 1px solid #ffe8ee;
  transition: transform 0.2s, box-shadow 0.2s;
}
.trust-badge-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(242, 84, 128, 0.1);
}

/* ── Categorías ───────────────────────── */
.categoria-card {
  position: relative;
  aspect-ratio: 3/4;
  border-radius: 1rem;
  overflow: hidden;
  display: block;
  text-decoration: none;
}

/* ── CTA Banner ───────────────────────── */
.cta-banner {
  background: linear-gradient(135deg, #ffe8ee 0%, #fdf0f3 60%, #e6eedd 100%);
  border-radius: 2rem;
  padding: 3rem;
  border: 1px solid #ffc5d5;
  position: relative;
  overflow: hidden;
}

.cta-banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.cta-banner-flowers {
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.8;
}

@media (max-width: 640px) {
  .cta-banner { padding: 2rem 1.5rem; }
  .cta-banner-flowers { display: none; }
}

/* ── Toast ────────────────────────────── */
.toast-notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: white;
  border: 1px solid #ffc5d5;
  border-radius: 1rem;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 8px 30px rgba(242, 84, 128, 0.2);
  z-index: 100;
}

.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(10px) scale(0.95); }

/* ── Hover link ───────────────────────── */
.hover-link-arrow { transition: gap 0.2s; }
.hover-link-arrow:hover { gap: 0.6rem; }

/* ── Scale hover util ─────────────────── */
.group-hover\:scale-108:hover { transform: scale(1.08); }
</style>