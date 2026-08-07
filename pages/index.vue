<template>
  <div class="rg-root">

    <!-- ══════════════════════════════════════
         HERO
    ══════════════════════════════════════ -->
    <section class="rg-hero" ref="heroSection">

      <client-only><PetalCanvas /></client-only>

      <div class="rg-hero-bg" aria-hidden="true">
        <div class="rg-blob rg-blob-1"></div>
        <div class="rg-blob rg-blob-2"></div>
        <div class="rg-blob rg-blob-3"></div>
      </div>

      <div class="rg-hero-inner">

        <!-- Logo -->
        <div class="rg-logo-row" :class="{ 'rg-visible': textVisible }">
          <div class="rg-logo-circle">🌸</div>
          <div>
            <p class="rg-brand-name">Regocijo</p>
            <p class="rg-brand-tag">Floristería · Montería</p>
          </div>
        </div>

        <!-- Collage (en móvil va arriba del texto) -->
        <div class="rg-hero-collage" :class="{ 'rg-collage-in': textVisible }" aria-hidden="true">

          <div class="rg-img-frame rg-img-main"
            :style="!isMobile ? { transform: `translate(${parallax.main.x}px,${parallax.main.y}px)` } : {}">
            <div class="rg-img-inner">
              <img src="/Encanto1.jpg" alt="Ramo de rosas" loading="eager" />
              <div class="rg-img-shine"></div>
            </div>
          </div>

          <div class="rg-img-frame rg-img-sec1"
            :style="!isMobile ? { transform: `translate(${parallax.sec1.x}px,${parallax.sec1.y}px)` } : {}">
            <div class="rg-img-inner">
              <img src="/pasioneterna1.jpg" alt="Margaritas" loading="eager" />
              <div class="rg-img-shine"></div>
            </div>
          </div>

          <div class="rg-img-frame rg-img-sec2"
            :style="!isMobile ? { transform: `translate(${parallax.sec2.x}px,${parallax.sec2.y}px)` } : {}">
            <div class="rg-img-inner">
              <img src="/Encanto2.jpg" alt="Flores mixtas" loading="eager" />
              <div class="rg-img-shine"></div>
            </div>
          </div>

          <div class="rg-ring rg-ring-1 rg-desk-only"></div>
          <div class="rg-ring rg-ring-2 rg-desk-only"></div>

          <div class="rg-float-card"
            :style="!isMobile ? { transform: `translate(${parallax.card.x}px,${parallax.card.y}px)` } : {}">
            <span class="rg-float-icon">🚚</span>
            <div>
              <p class="rg-float-title">Agenda Hoy</p>
              <p class="rg-float-sub">Entrega en toda la ciudad</p>
            </div>
          </div>

        </div>

        <!-- Texto -->
        <div class="rg-hero-text">

          <p class="rg-eyebrow" :class="{ 'rg-visible': textVisible }" style="transition-delay:0.1s">
            Florería artesanal
          </p>

          <h1 class="rg-hero-title">
            <span class="rg-line" :class="{ 'rg-visible': textVisible }" style="transition-delay:0.2s">Cada flor</span>
            <span class="rg-line rg-italic" :class="{ 'rg-visible': textVisible }" style="transition-delay:0.35s">cuenta
              una</span>
            <span class="rg-line rg-italic" :class="{ 'rg-visible': textVisible }"
              style="transition-delay:0.5s">historia</span>
          </h1>

          <p class="rg-hero-sub" :class="{ 'rg-visible': textVisible }" style="transition-delay:0.65s">
            Ramos únicos elaborados con flores frescas y amor. Agenda hoy, entrega al siguiente día.
          </p>

          <div class="rg-hero-ctas" :class="{ 'rg-visible': textVisible }" style="transition-delay:0.8s">
            <NuxtLink to="/catalogo" class="rg-btn-primary">
              Explorar colección <span class="rg-btn-arrow">→</span>
            </NuxtLink>
            <NuxtLink to="/contacto" class="rg-btn-ghost">
              Ramo personalizado
            </NuxtLink>
          </div>

          <div class="rg-stats" :class="{ 'rg-visible': textVisible }" style="transition-delay:0.95s">
            <div v-for="s in stats" :key="s.label" class="rg-stat">
              <span class="rg-stat-val">{{ s.value }}</span>
              <span class="rg-stat-lbl">{{ s.label }}</span>
            </div>
          </div>

        </div>
      </div>

      <div class="rg-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" fill="#faf8f3">
          <path d="M0,35 C300,70 600,0 900,40 C1100,65 1300,10 1440,35 L1440,70 L0,70 Z" />
        </svg>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         TRUST BADGES
    ══════════════════════════════════════ -->
    <section class="rg-trust">
      <div class="rg-container">
        <div class="rg-trust-grid">
          <div v-for="(badge, i) in trustBadges" :key="badge.label" class="rg-badge-card rg-reveal"
            :style="{ transitionDelay: `${i * 0.08}s` }">
            <div class="rg-badge-icon">{{ badge.emoji }}</div>
            <p class="rg-badge-title">{{ badge.label }}</p>
            <p class="rg-badge-desc">{{ badge.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         PRODUCTOS DESTACADOS
    ══════════════════════════════════════ -->
    <section class="rg-section">
      <div class="rg-container">
        <div class="rg-section-header rg-reveal">
          <div>
            <p class="rg-eyebrow">Lo más amado</p>
            <h2 class="rg-section-title">Ramos destacados</h2>
          </div>
          <NuxtLink to="/catalogo" class="rg-link-arrow">Ver colección <span>→</span></NuxtLink>
        </div>
        <div class="rg-products-grid">
          <div v-for="(ramo, i) in productosDestacados" :key="ramo.id" class="rg-product-card rg-reveal"
            :style="{ transitionDelay: `${i * 0.1}s` }">
            <ProductCard :ramo="ramo" />
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         MARQUEE + CATEGORÍAS
    ══════════════════════════════════════ -->
    <section class="rg-cats-section">
      <div class="rg-marquee-wrap" aria-hidden="true">
        <div class="rg-marquee-track">
          <span v-for="n in 8" :key="n" class="rg-marquee-item">
            Flores Frescas <span class="rg-marquee-sep">✦</span>
            Ramos Artesanales <span class="rg-marquee-sep">✦</span>
            Entrega al Día Siguiente <span class="rg-marquee-sep">✦</span>
          </span>
        </div>
      </div>

      <div class="rg-container rg-cats-inner">
        <div class="rg-section-header rg-reveal">
          <div>
            <p class="rg-eyebrow">Navega por estilo</p>
            <h2 class="rg-section-title">Colecciones</h2>
          </div>
        </div>
        <div class="rg-cats-grid">
          <NuxtLink v-for="(cat, i) in categorias" :key="cat.nombre" :to="`/catalogo?categoria=${cat.catQuery || cat.nombre}`"
            class="rg-cat-card rg-reveal" :style="{ transitionDelay: `${i * 0.12}s` }" :class="`rg-cat-card--${i}`">
            <div class="rg-cat-img-wrap">
              <img :src="cat.imagen" :alt="cat.nombre" class="rg-cat-img" loading="lazy" />
              <div class="rg-cat-overlay"></div>
            </div>
            <div class="rg-cat-info">
              <p class="rg-cat-name">{{ cat.nombre }}</p>
              <p class="rg-cat-sub">{{ cat.sub }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         CTA BANNER
    ══════════════════════════════════════ -->
    <section class="rg-section">
      <div class="rg-container">
        <div class="rg-cta-banner rg-reveal">
          <div class="rg-cta-bg-circles" aria-hidden="true">
            <div class="rg-cta-circle rg-cta-circle-1"></div>
            <div class="rg-cta-circle rg-cta-circle-2"></div>
          </div>
          <div class="rg-cta-content">
            <div class="rg-cta-text">
              <p class="rg-eyebrow" style="color:#f25480">¿Algo especial en mente?</p>
              <h2 class="rg-cta-title">Ramos <em>personalizados</em></h2>
              <p class="rg-cta-body">
                Bodas, quinceaños, cumpleaños o simplemente porque sí. Diseñamos el ramo perfecto para cada momento.
              </p>
              <NuxtLink to="/contacto" class="rg-btn-primary rg-btn-dark">
                Pedir mi ramo <span class="rg-btn-arrow">→</span>
              </NuxtLink>
            </div>
            <div class="rg-cta-flowers" aria-hidden="true">
              <span class="rg-cta-fl rg-fl-1">🌺</span>
              <span class="rg-cta-fl rg-fl-2">🌸</span>
              <span class="rg-cta-fl rg-fl-3">🌼</span>
              <span class="rg-cta-fl rg-fl-4">🌷</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div style="height:3rem;"></div>

    <Transition name="rg-toast">
      <div v-if="showToast" class="rg-toast">
        <span>🌸</span><span>¡Añadido al carrito!</span>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { useProductosStore } from '~/stores/productos'

const productosStore = useProductosStore()
const productosDestacados = computed(() =>
  productosStore.ramos.filter(r => r.destacado).slice(0, 4)
)

const showToast = ref(false)
watch(() => productosStore.cantidadCarrito, () => {
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2200)
})

const stats = [
  { value: '+100', label: 'Clientes felices' },
  { value: '+30', label: 'Variedades' },
  { value: '4.9★', label: 'Calificación' },
]
const trustBadges = [
  { emoji: '🚚', label: 'Entrega al siguiente día', desc: 'Pedidos antes de las 4pm' },
  { emoji: '💐', label: 'Flores frescas', desc: 'La mejor calidad garantizada' },
  { emoji: '🎁', label: 'Tarjeta personalizada', desc: 'Incluida sin costo adicional' },
  { emoji: '💳', label: 'Pago seguro', desc: 'Efectivo o transferencia' },
]
const categorias = [
  { nombre: 'Rosas', catQuery: 'rosas', sub: 'Pasión y elegancia', imagen: '/pasioneterna5.jpg' },
  { nombre: 'Lirios', catQuery: 'lirios', sub: 'Calidez y cariño', imagen: '/delirio1.jpg' },
  { nombre: 'Mixtos', catQuery: 'mixtos', sub: 'Alegría silvestre', imagen: '/dulceprimavera2.jpg' },
  { nombre: 'Todos', catQuery: 'Todos', sub: 'Colección completa', imagen: '/almaradiante1.jpg' },
]

const petalCanvas = ref<HTMLCanvasElement>()
const heroSection = ref<HTMLElement>()
const textVisible = ref(false)
const isMobile = ref(false)

const parallax = reactive({
  main: { x: 0, y: 0 }, sec1: { x: 0, y: 0 },
  sec2: { x: 0, y: 0 }, card: { x: 0, y: 0 },
})

function onMouseMove(e: MouseEvent) {
  if (isMobile.value) return
  const cx = (e.clientX / window.innerWidth - 0.5) * 2
  const cy = (e.clientY / window.innerHeight - 0.5) * 2
  parallax.main.x = cx * -8; parallax.main.y = cy * -6
  parallax.sec1.x = cx * 12; parallax.sec1.y = cy * 10
  parallax.sec2.x = cx * -14; parallax.sec2.y = cy * 8
  parallax.card.x = cx * 6; parallax.card.y = cy * -4
}

interface Petal { x: number; y: number; vx: number; vy: number; rot: number; vrot: number; alpha: number; color: string; size: number }

function initPetals() {
  const rawCanvas = petalCanvas.value; if (!rawCanvas) return
  const canvas: HTMLCanvasElement = rawCanvas
  const ctx = canvas.getContext('2d')!
  let petals: Petal[] = []
  const colors = ['#ffc5d5', '#f25480', '#ffb3c6', '#ffd6e0', '#e8d5ff', '#ffeaa8']
  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
  function spawn(): Petal {
    return {
      x: Math.random() * canvas.width, y: -20,
      vx: (Math.random() - 0.5) * 0.5, vy: Math.random() * 0.5 + 0.3,
      rot: Math.random() * Math.PI * 2, vrot: (Math.random() - 0.5) * 0.02,
      alpha: Math.random() * 0.4 + 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
    }
  }
  for (let i = 0; i < 28; i++) { const p = spawn(); p.y = Math.random() * canvas.height; petals.push(p) }
  let frame = 0
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); frame++
    if (frame % 45 === 0 && petals.length < 45) petals.push(spawn())
    petals.forEach((p, idx) => {
      p.x += p.vx + Math.sin(frame * 0.01 + idx) * 0.12; p.y += p.vy; p.rot += p.vrot
      if (p.y > canvas.height + 20) { petals[idx] = spawn(); return }
      ctx.save(); ctx.globalAlpha = p.alpha; ctx.translate(p.x, p.y); ctx.rotate(p.rot)
      ctx.fillStyle = p.color; ctx.beginPath()
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore()
    })
    requestAnimationFrame(draw)
  }
  resize(); window.addEventListener('resize', resize); draw()
}

function initReveal() {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('rg-in'); io.unobserve(e.target) } }),
    { threshold: 0.08 }
  )
  document.querySelectorAll('.rg-reveal').forEach(el => io.observe(el))
}

onMounted(() => {
  isMobile.value = window.innerWidth < 1024
  window.addEventListener('resize', () => { isMobile.value = window.innerWidth < 1024 })
  setTimeout(() => { textVisible.value = true }, 80)
  window.addEventListener('mousemove', onMouseMove)
  initPetals()
  setTimeout(initReveal, 200)
})
onUnmounted(() => { window.removeEventListener('mousemove', onMouseMove) })

useHead({ title: 'Regocijo Floristería – Flores con alma' })
</script>

<style scoped>
/* ══════════════════════════════════════
   VARIABLES
══════════════════════════════════════ */
.rg-root {
  --pink: #f25480;
  --pink-lt: #ffe8ee;
  --pink-md: #ffc5d5;
  --green-lt: #e6eedd;
  --cream: #faf8f3;
  --stone: #78716c;
  --dark: #1c1917;
  --serif: 'Cormorant Garamond', Georgia, serif;
  --sans: 'Jost', sans-serif;
  overflow-x: hidden;
}

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
.rg-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(150deg, #ffe8ee 0%, #faf8f3 55%, #edf2e5 100%);
}

.rg-petal-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.rg-hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.rg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(55px);
  opacity: 0.4;
}

.rg-blob-1 {
  width: 400px;
  height: 400px;
  top: -90px;
  right: -50px;
  background: radial-gradient(circle, #ffc5d5, transparent 70%);
  animation: blobFloat 8s ease-in-out infinite;
}

.rg-blob-2 {
  width: 320px;
  height: 320px;
  bottom: -70px;
  left: -40px;
  background: radial-gradient(circle, #cddcbc, transparent 70%);
  animation: blobFloat 11s ease-in-out infinite reverse;
}

.rg-blob-3 {
  width: 240px;
  height: 240px;
  top: 45%;
  left: 40%;
  background: radial-gradient(circle, #ffecd5, transparent 70%);
  animation: blobFloat 14s ease-in-out infinite 2s;
}

@keyframes blobFloat {

  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(10px, -16px) scale(1.04);
  }

  66% {
    transform: translate(-7px, 9px) scale(0.97);
  }
}

/* ── Layout interno hero (mobile-first: columna) ── */
.rg-hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.75rem 1.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .rg-hero-inner {
    flex-direction: row;
    align-items: center;
    gap: 4rem;
    padding: 5rem 2rem 2rem;
  }
}

/* Logo */
.rg-logo-row {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.rg-logo-row.rg-visible {
  opacity: 1;
  transform: translateY(0);
}

.rg-logo-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--pink-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
  box-shadow: 0 3px 16px rgba(242, 84, 128, 0.18);
}

.rg-brand-name {
  font-family: var(--serif);
  font-size: 1.45rem;
  color: var(--dark);
  line-height: 1;
  margin: 0;
}

.rg-brand-tag {
  font-family: var(--sans);
  font-size: 0.55rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--pink);
  margin: 2px 0 0;
}

/* ── Collage ── */
.rg-hero-collage {
  position: relative;
  width: 100%;
  flex-shrink: 0;
  height: 250px;
  /* mobile */
  opacity: 0;
  transition: opacity 0.7s ease 0.15s;
}

.rg-hero-collage.rg-collage-in {
  opacity: 1;
}

@media (min-width: 400px) {
  .rg-hero-collage {
    height: 290px;
  }
}

@media (min-width: 560px) {
  .rg-hero-collage {
    height: 340px;
  }
}

@media (min-width: 1024px) {
  .rg-hero-collage {
    flex: 1;
    height: 500px;
    max-width: 520px;
  }
}

.rg-img-frame {
  position: absolute;
  overflow: hidden;
  transition: transform 0.12s ease-out;
  will-change: transform;
}

.rg-img-inner {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.rg-img-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: imgBreath 8s ease-in-out infinite;
}

@keyframes imgBreath {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.04);
  }
}

.rg-img-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 55%);
  pointer-events: none;
}

/* Imágenes — tamaños mobile */
.rg-img-main {
  top: 0;
  left: 0;
  width: 62%;
  height: 82%;
  border-radius: 1.35rem;
  box-shadow: 0 14px 44px rgba(0, 0, 0, 0.13);
  animation: imgIn 0.7s 0.3s both;
}

.rg-img-sec1 {
  top: 6%;
  right: 0;
  width: 40%;
  height: 50%;
  border-radius: 1.1rem;
  box-shadow: 0 9px 30px rgba(0, 0, 0, 0.1);
  animation: imgIn 0.7s 0.5s both;
}

.rg-img-sec2 {
  bottom: 0;
  right: 6%;
  width: 40%;
  height: 40%;
  border-radius: 1.1rem;
  box-shadow: 0 9px 30px rgba(0, 0, 0, 0.1);
  animation: imgIn 0.7s 0.7s both;
}

@keyframes imgIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(14px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Imágenes — tamaños desktop */
@media (min-width:1024px) {
  .rg-img-main {
    width: 64%;
    height: 76%;
    border-radius: 2rem;
  }

  .rg-img-sec1 {
    top: 8%;
    width: 40%;
    height: 48%;
    border-radius: 1.5rem;
  }

  .rg-img-sec2 {
    bottom: 0;
    right: 6%;
    width: 40%;
    height: 38%;
    border-radius: 1.5rem;
  }
}

.rg-desk-only {
  display: none;
}

@media (min-width:1024px) {
  .rg-desk-only {
    display: block;
  }
}

.rg-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px dashed;
  pointer-events: none;
  opacity: 0.35;
}

.rg-ring-1 {
  width: 100px;
  height: 100px;
  top: -12px;
  right: 32px;
  border-color: var(--pink);
  animation: spinSlow 20s linear infinite;
}

.rg-ring-2 {
  width: 70px;
  height: 70px;
  bottom: 22px;
  left: 56%;
  border-color: #8fba6e;
  animation: spinSlow 28s linear infinite reverse;
}

@keyframes spinSlow {
  to {
    transform: rotate(360deg);
  }
}

/* Float card */
.rg-float-card {
  position: absolute;
  bottom: 13%;
  left: 2%;
  background: white;
  border-radius: 0.85rem;
  padding: 0.5rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  box-shadow: 0 5px 24px rgba(242, 84, 128, 0.18);
  border: 1px solid var(--pink-lt);
  z-index: 5;
  transition: transform 0.15s ease-out;
  animation: floatCard 5s ease-in-out infinite, fadeInUp 0.7s 0.9s both;
}

.rg-float-icon {
  font-size: 1.1rem;
}

.rg-float-title {
  font-family: var(--sans);
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--dark);
  white-space: nowrap;
  margin: 0;
}

.rg-float-sub {
  font-family: var(--sans);
  font-size: 0.56rem;
  color: var(--stone);
  margin: 0;
}

@keyframes floatCard {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Texto ── */
.rg-hero-text {
  width: 100%;
}

@media (min-width:1024px) {
  .rg-hero-text {
    flex: 1;
  }
}

.rg-eyebrow {
  font-family: var(--sans);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--stone);
  margin: 0 0 0.55rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.rg-eyebrow.rg-visible {
  opacity: 1;
  transform: translateY(0);
}

.rg-hero-title {
  display: flex;
  flex-direction: column;
  font-family: var(--serif);
  font-size: clamp(2.6rem, 9vw, 5rem);
  font-weight: 400;
  line-height: 1;
  color: var(--dark);
  margin: 0 0 0.9rem;
}

.rg-line {
  display: block;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}

.rg-line.rg-visible {
  opacity: 1;
  transform: translateY(0);
}

.rg-italic {
  font-style: italic;
  color: var(--pink);
}

.rg-hero-sub {
  font-family: var(--sans);
  font-size: 0.93rem;
  color: var(--stone);
  line-height: 1.75;
  margin: 0 0 1.4rem;
  max-width: 400px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.rg-hero-sub.rg-visible {
  opacity: 1;
  transform: translateY(0);
}

/* CTAs — en mobile ocupan el ancho completo cada uno */
.rg-hero-ctas {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.5rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.rg-hero-ctas.rg-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (min-width:480px) {
  .rg-hero-ctas {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.rg-btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: var(--pink);
  color: white;
  font-family: var(--sans);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  padding: 0.9rem 1.6rem;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(242, 84, 128, 0.3);
  transition: background 0.22s, transform 0.18s, box-shadow 0.22s;
  width: 100%;
}

@media (min-width:480px) {
  .rg-btn-primary {
    width: auto;
  }
}

.rg-btn-primary:active {
  transform: scale(0.97);
}

@media (min-width:1024px) {
  .rg-btn-primary:hover {
    background: #d63d69;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(242, 84, 128, 0.4);
  }

  .rg-btn-primary:hover .rg-btn-arrow {
    transform: translateX(4px);
  }
}

.rg-btn-arrow {
  display: inline-block;
  transition: transform 0.2s;
}

.rg-btn-ghost {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--dark);
  font-family: var(--sans);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.9rem 1.4rem;
  border-radius: 50px;
  border: 1.5px solid #d4c4c4;
  text-decoration: none;
  transition: border-color 0.22s, color 0.22s, transform 0.18s;
  width: 100%;
}

@media (min-width:480px) {
  .rg-btn-ghost {
    width: auto;
  }
}

.rg-btn-ghost:active {
  transform: scale(0.97);
}

@media (min-width:1024px) {
  .rg-btn-ghost:hover {
    border-color: var(--pink);
    color: var(--pink);
    transform: translateY(-2px);
  }
}

.rg-btn-dark {
  background: var(--dark);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

@media (min-width:1024px) {
  .rg-btn-dark:hover {
    background: #292524;
  }
}

/* Stats */
.rg-stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.rg-stats.rg-visible {
  opacity: 1;
  transform: translateY(0);
}

.rg-stat-val {
  font-family: var(--serif);
  font-size: 1.5rem;
  color: var(--pink);
  line-height: 1;
  display: block;
}

.rg-stat-lbl {
  font-family: var(--sans);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #a8a29e;
  margin-top: 2px;
  display: block;
}

/* Ola */
.rg-wave {
  position: relative;
  height: 55px;
  z-index: 2;
  margin-top: 1.25rem;
}

@media (min-width:1024px) {
  .rg-wave {
    margin-top: 0;
  }
}

.rg-wave svg {
  width: 100%;
  height: 100%;
}

/* ══════════════════════════════════════
   CONTENEDOR BASE
══════════════════════════════════════ */
.rg-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.25rem;
}

@media (min-width:640px) {
  .rg-container {
    padding: 0 1.5rem;
  }
}

@media (min-width:1024px) {
  .rg-container {
    padding: 0 2rem;
  }
}

/* ══════════════════════════════════════
   TRUST BADGES
══════════════════════════════════════ */
.rg-trust {
  background: var(--cream);
  padding: 1.75rem 0;
}

.rg-trust-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

@media (min-width:768px) {
  .rg-trust-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

.rg-badge-card {
  background: white;
  border-radius: 1rem;
  padding: 1.1rem 0.75rem;
  text-align: center;
  border: 1px solid #ffe8ee;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  transition: transform 0.25s, box-shadow 0.25s;
}

@media (min-width:1024px) {
  .rg-badge-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 26px rgba(242, 84, 128, 0.1);
  }
}

.rg-badge-icon {
  font-size: 1.4rem;
  margin-bottom: 0.3rem;
}

.rg-badge-title {
  font-family: var(--sans);
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--dark);
  margin: 0 0 0.15rem;
}

.rg-badge-desc {
  font-family: var(--sans);
  font-size: 0.62rem;
  color: var(--stone);
  margin: 0;
}

/* ══════════════════════════════════════
   SECCIONES
══════════════════════════════════════ */
.rg-section {
  padding: 3rem 0;
}

@media (min-width:768px) {
  .rg-section {
    padding: 5rem 0;
  }
}

.rg-section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (min-width:768px) {
  .rg-section-header {
    margin-bottom: 2.5rem;
  }
}

.rg-section-title {
  font-family: var(--serif);
  font-size: clamp(1.75rem, 5vw, 2.8rem);
  color: var(--dark);
  font-weight: 400;
  margin: 0;
  line-height: 1.1;
}

.rg-link-arrow {
  font-family: var(--sans);
  font-size: 0.8rem;
  color: var(--pink);
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* ── Productos ── */
.rg-products-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

@media (min-width:768px) {
  .rg-products-grid {
    gap: 1.1rem;
  }
}

@media (min-width:900px) {
  .rg-products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width:1200px) {
  .rg-products-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}

.rg-product-card {
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(.34, 1.4, .64, 1), box-shadow 0.3s;
}

@media (min-width:1024px) {
  .rg-product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.1);
  }
}

/* ══════════════════════════════════════
   MARQUEE + CATEGORÍAS
══════════════════════════════════════ */
.rg-cats-section {
  background: linear-gradient(135deg, #fff5f7 0%, #f8faf4 100%);
  padding-bottom: 3rem;
}

@media (min-width:768px) {
  .rg-cats-section {
    padding-bottom: 5rem;
  }
}

.rg-cats-inner {
  padding-top: 2rem;
}

@media (min-width:768px) {
  .rg-cats-inner {
    padding-top: 3.5rem;
  }
}

.rg-marquee-wrap {
  overflow: hidden;
  background: var(--pink);
  padding: 0.6rem 0;
  white-space: nowrap;
}

.rg-marquee-track {
  display: inline-flex;
  animation: marquee 28s linear infinite;
}

.rg-marquee-item {
  font-family: var(--sans);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: white;
  font-weight: 500;
  padding: 0 1.1rem;
}

.rg-marquee-sep {
  opacity: 0.6;
  margin: 0 0.35rem;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

/* Categorías grid */
.rg-cats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

@media (min-width:768px) {
  .rg-cats-grid {
    gap: 0.85rem;
  }
}

@media (min-width:1024px) {
  .rg-cats-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

.rg-cat-card {
  position: relative;
  border-radius: 1.25rem;
  overflow: hidden;
  text-decoration: none;
  aspect-ratio: 3/4;
  display: flex;
  align-items: flex-end;
  transition: transform 0.35s cubic-bezier(.34, 1.4, .64, 1), box-shadow 0.35s;
}

@media (min-width:1024px) {
  .rg-cat-card--0 {
    margin-top: 1.25rem;
  }

  .rg-cat-card--2 {
    margin-top: 1.25rem;
  }

  .rg-cat-card:hover {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.14);
  }

  .rg-cat-card:hover .rg-cat-img {
    transform: scale(1.07);
  }

  .rg-cat-card:hover .rg-cat-overlay {
    background: linear-gradient(to top, rgba(242, 84, 128, 0.65) 0%, rgba(28, 25, 23, 0.05) 60%, transparent 80%);
  }
}

.rg-cat-img-wrap {
  position: absolute;
  inset: 0;
}

.rg-cat-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.65s ease;
}

.rg-cat-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(28, 25, 23, 0.72) 0%, rgba(28, 25, 23, 0.05) 55%, transparent 80%);
  transition: background 0.35s;
}

.rg-cat-info {
  position: relative;
  padding: 0.9rem;
  z-index: 2;
  width: 100%;
}

.rg-cat-name {
  font-family: var(--serif);
  font-size: 1.25rem;
  color: white;
  margin: 0;
  line-height: 1.1;
}

.rg-cat-sub {
  font-family: var(--sans);
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 2px 0 0;
}

/* ══════════════════════════════════════
   CTA BANNER
══════════════════════════════════════ */
.rg-cta-banner {
  position: relative;
  background: linear-gradient(135deg, var(--pink-lt) 0%, #fdf2f5 50%, var(--green-lt) 100%);
  border-radius: 1.75rem;
  padding: 2rem 1.5rem;
  border: 1px solid var(--pink-md);
  overflow: hidden;
}

@media (min-width:640px) {
  .rg-cta-banner {
    padding: 2.75rem 2.5rem;
    border-radius: 2rem;
  }
}

@media (min-width:1024px) {
  .rg-cta-banner {
    padding: 3.5rem;
    border-radius: 2.5rem;
  }
}

.rg-cta-bg-circles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.rg-cta-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.13;
}

.rg-cta-circle-1 {
  width: 260px;
  height: 260px;
  background: var(--pink);
  top: -90px;
  right: -50px;
}

.rg-cta-circle-2 {
  width: 180px;
  height: 180px;
  background: #8fba6e;
  bottom: -55px;
  left: 28%;
}

.rg-cta-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.rg-cta-text {
  flex: 1;
  min-width: 200px;
}

.rg-cta-title {
  font-family: var(--serif);
  font-size: clamp(1.9rem, 5vw, 3.2rem);
  color: var(--dark);
  font-weight: 400;
  line-height: 1.1;
  margin: 0.4rem 0 0.85rem;
}

.rg-cta-title em {
  color: var(--pink);
}

.rg-cta-body {
  font-family: var(--sans);
  font-size: 0.88rem;
  color: var(--stone);
  line-height: 1.75;
  max-width: 360px;
  margin: 0 0 1.4rem;
}

.rg-cta-flowers {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  opacity: 0.82;
  flex-shrink: 0;
}

@media (min-width:640px) {
  .rg-cta-flowers {
    display: flex;
  }
}

.rg-cta-fl {
  display: block;
  animation: floatPetal 4s ease-in-out infinite;
}

.rg-fl-1 {
  font-size: 3rem;
  animation-delay: 0s;
}

.rg-fl-2 {
  font-size: 2.3rem;
  animation-delay: 0.8s;
  margin-left: 0.9rem;
}

.rg-fl-3 {
  font-size: 1.8rem;
  animation-delay: 1.6s;
  margin-left: -0.4rem;
}

.rg-fl-4 {
  font-size: 2.3rem;
  animation-delay: 2.4s;
  margin-left: 0.6rem;
}

@keyframes floatPetal {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-8px) rotate(7deg);
  }
}

/* ══════════════════════════════════════
   REVEAL
══════════════════════════════════════ */
.rg-reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.rg-reveal.rg-in {
  opacity: 1;
  transform: translateY(0);
}

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
.rg-toast {
  position: fixed;
  bottom: 1.1rem;
  right: 1.1rem;
  background: white;
  border: 1px solid var(--pink-md);
  border-radius: 0.85rem;
  padding: 0.7rem 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--sans);
  font-size: 0.82rem;
  color: var(--dark);
  box-shadow: 0 7px 26px rgba(242, 84, 128, 0.18);
  z-index: 200;
}

.rg-toast-enter-active,
.rg-toast-leave-active {
  transition: all 0.3s ease;
}

.rg-toast-enter-from,
.rg-toast-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
</style>