<template>
  <div>
    <!-- ═════════ HERO ═════════ -->
    <section ref="heroEl" class="hero" aria-labelledby="hero-titulo">
      <ClientOnly><PetalCanvas /></ClientOnly>
      <span class="hero-orb hero-orb--1" aria-hidden="true" />
      <span class="hero-orb hero-orb--2" aria-hidden="true" />

      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="eyebrow hero-in" style="--d: 0ms">Floristería · {{ NEGOCIO.ciudad }}</p>

          <h1 id="hero-titulo" class="display hero-title">
            <span class="line"><span style="--d: 120ms">Cada flor</span></span>
            <span class="line"><span style="--d: 240ms"><em>cuenta una</em></span></span>
            <span class="line"><span style="--d: 360ms"><em>historia</em></span></span>
          </h1>

          <p class="lead hero-in" style="--d: 520ms">
            Ramos preparados uno por uno y entregados a domicilio en {{ NEGOCIO.ciudad }}.
            {{ NEGOCIO.lema }}.
          </p>

          <div class="hero-cta hero-in" style="--d: 640ms">
            <NuxtLink to="/catalogo" class="btn btn--wine">
              Ver el catálogo <svg class="btn-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </NuxtLink>
            <a :href="whatsappUrl('Hola, quiero información sobre sus ramos')" target="_blank" rel="noopener noreferrer" class="btn btn--ghost">
              <IconWhatsApp width="18" height="18" /> Escríbenos por WhatsApp
              <span class="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          </div>

          <dl class="hero-facts hero-in" style="--d: 780ms">
            <div><dt>Diseños</dt><dd>{{ store.ramos.length }}</dd></div>
            <div><dt>Desde</dt><dd>{{ formatPrecio(store.precioMinimo) }}</dd></div>
            <div><dt>Entrega</dt><dd>A domicilio</dd></div>
          </dl>
        </div>

        <!-- Composición de imágenes -->
        <div class="comp" aria-hidden="true">
          <div class="comp-main arch">
            <img src="/encanto1.jpg" alt="" width="1086" height="1448" fetchpriority="high" decoding="async" />
          </div>
          <div class="comp-round">
            <img src="/delirio1.jpg" alt="" width="1086" height="1448" decoding="async" />
          </div>
          <svg class="seal" viewBox="0 0 120 120">
            <defs><path :id="sealId" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" /></defs>
            <circle cx="60" cy="60" r="58" class="seal-bg" />
            <g class="seal-ring">
              <text class="seal-text"><textPath :href="`#${sealId}`" textLength="280" lengthAdjust="spacing">LA BELLEZA DE SENTIR · MONTERÍA · </textPath></text>
            </g>
            <g transform="translate(60 60)" class="seal-orn" stroke="currentColor" stroke-width="1.1">
              <ellipse v-for="a in 6" :key="a" cx="0" cy="-10" rx="4.6" ry="8.5" :transform="`rotate(${(a - 1) * 60})`" />
              <circle r="3" />
            </g>
          </svg>
          <Ornament variant="sprig" class="comp-sprig" />
        </div>
      </div>
    </section>

    <!-- ═════════ MARQUEE ═════════ -->
    <div class="mq" aria-hidden="true">
      <div class="mq-track">
        <span v-for="n in 4" :key="n" class="mq-group">
          Ramos por encargo <i>✦</i> Rosas, lirios, girasoles y más <i>✦</i> {{ NEGOCIO.lema }} <i>✦</i>
        </span>
      </div>
    </div>

    <!-- ═════════ MANIFIESTO ═════════ -->
    <section class="section manifesto">
      <div class="wrap wrap--narrow">
        <p v-reveal class="manifesto-text">
          Un ramo no es solo flores: es lo que quieres decir cuando
          <span class="pill-img"><img src="/dulceprimavera2.jpg" alt="" width="1086" height="1448" loading="lazy" decoding="async" /></span>
          <em>las palabras no alcanzan</em>.
          Por eso armamos cada uno a mano, con papel, listón y
          <span class="pill-img"><img src="/almaradiante1.jpg" alt="" width="1086" height="1448" loading="lazy" decoding="async" /></span>
          mucho cuidado.
        </p>
        <div v-reveal class="manifesto-div"><Ornament variant="divider" /></div>
      </div>
    </section>

    <!-- ═════════ DESTACADOS ═════════ -->
    <section class="section feat" aria-labelledby="feat-titulo">
      <div class="wrap">
        <header v-reveal class="sec-head">
          <div>
            <p class="eyebrow">Para empezar</p>
            <h2 id="feat-titulo" class="display sec-title">Ramos <em>destacados</em></h2>
          </div>
          <NuxtLink to="/catalogo" class="link-draw sec-link">
            Ver todo el catálogo <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </NuxtLink>
        </header>

        <ul v-if="destacados.length" class="feat-grid">
          <li v-for="(r, i) in destacados" :key="r.id" v-reveal="i * 110">
            <CatalogCard :ramo="r" />
          </li>
        </ul>
        <!-- Estado vacío -->
        <div v-else class="empty">
          <Ornament variant="bloom" class="empty-orn" />
          <p>Estamos preparando los ramos destacados.</p>
          <NuxtLink to="/catalogo" class="btn btn--ghost">Ver todo el catálogo</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═════════ COLECCIONES ═════════ -->
    <section class="section cols" aria-labelledby="cols-titulo">
      <div class="wrap">
        <header v-reveal class="sec-head sec-head--center">
          <p class="eyebrow eyebrow--center">Navega por estilo</p>
          <h2 id="cols-titulo" class="display sec-title">Nuestras <em>colecciones</em></h2>
        </header>

        <ul class="cols-grid">
          <li v-for="(c, i) in colecciones" :key="c.slug" v-reveal="i * 100" :class="`cols-item cols-item--${i}`">
            <NuxtLink :to="`/catalogo?categoria=${c.slug}`" class="col-card">
              <span class="col-arch arch">
                <RamoImagen :src="c.imagen" alt="" :categoria="c.slug" class="col-img" />
                <span class="col-shade" aria-hidden="true" />
              </span>
              <span class="col-info">
                <span class="col-name">{{ c.nombre }}</span>
                <span class="col-meta">{{ c.total }} {{ c.total === 1 ? 'ramo' : 'ramos' }}<template v-if="c.sub"> · {{ c.sub }}</template></span>
                <span class="col-go" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                </span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- ═════════ CÓMO PEDIR ═════════ -->
    <section class="section how" aria-labelledby="how-titulo">
      <div class="wrap">
        <header v-reveal class="sec-head sec-head--center">
          <p class="eyebrow eyebrow--center">Es muy sencillo</p>
          <h2 id="how-titulo" class="display sec-title">Cómo <em>pedir</em></h2>
        </header>

        <ol class="steps">
          <li v-for="(s, i) in pasos" :key="s.t" v-reveal="i * 100" class="step">
            <span class="step-num" aria-hidden="true">0{{ i + 1 }}</span>
            <h3 class="step-title">{{ s.t }}</h3>
            <p class="step-text">{{ s.d }}</p>
          </li>
        </ol>
        <p v-reveal class="how-foot">
          Más detalles en nuestros <NuxtLink to="/terminos" class="link-inline">Términos y condiciones</NuxtLink>.
        </p>
      </div>
    </section>

    <!-- ═════════ CTA ═════════ -->
    <section class="section cta-sec">
      <div class="wrap">
        <div v-reveal class="cta on-dark">
          <Ornament variant="bloom" class="cta-orn cta-orn--1" />
          <Ornament variant="sprig" class="cta-orn cta-orn--2" />
          <p class="eyebrow eyebrow--plain cta-eyebrow">¿Algo especial en mente?</p>
          <h2 class="display cta-title">Cuéntanos tu <em>ocasión</em></h2>
          <p class="cta-text">
            Dinos para quién es, los colores que te gustan y tu presupuesto, y te ayudamos a elegir o a armar tu ramo.
          </p>
          <div class="cta-btns">
            <NuxtLink to="/contacto" class="btn btn--light">Hablar con nosotros <svg class="btn-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></NuxtLink>
            <a :href="NEGOCIO.instagram.url" target="_blank" rel="noopener noreferrer" class="cta-ig">
              Ver más en Instagram {{ NEGOCIO.instagram.usuario }}
              <span class="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { NEGOCIO } from '~/data/negocio'
import { useProductosStore } from '~/stores/productos'

const store = useProductosStore()
const sealId = useId()

const destacados = computed(() => store.ramosDestacados.filter((r) => r.imagen_url).slice(0, 3))

const LEMAS: Record<string, string> = {
  rosas: 'Pasión y elegancia',
  lirios: 'Delicadeza y aroma',
  mixtos: 'Alegría de colores',
  girasoles: 'Luz y energía',
}
// Las colecciones salen de las categorías que tienen ramos; la foto es la del primer ramo
// (destacados primero) que tenga una.
const colecciones = computed(() =>
  store.categoriasConRamos.map((c) => {
    const delaCat = store.ramos.filter((r) => r.categoria === c.slug)
    const conFoto = [...delaCat].sort((a, b) => Number(!!b.destacado) - Number(!!a.destacado)).find((r) => r.imagen_url)
    return {
      slug: c.slug,
      nombre: c.label,
      total: delaCat.length,
      imagen: conFoto?.imagen_url ?? null,
      sub: LEMAS[c.slug] ?? '',
    }
  }),
)

const pasos = [
  { t: 'Elige tu ramo', d: 'Explora el catálogo y escoge el diseño, el tamaño y los colores que prefieras.' },
  { t: 'Agéndalo por WhatsApp', d: 'Arma tu pedido en el carrito y envíanoslo con la fecha y la dirección de entrega.' },
  { t: 'Confirma el pago', d: 'Te confirmamos disponibilidad y el valor del domicilio. El pedido se agenda con anticipo o pago completo.' },
  { t: 'Recíbelo en tu puerta', d: `Entregamos a domicilio en ${NEGOCIO.ciudad}. Las entregas comienzan a las ${NEGOCIO.entregasDesde}` },
]

// Parallax suave del hero (solo escritorio y sin «reducir movimiento»)
const heroEl = ref<HTMLElement | null>(null)
let raf = 0
function onMove(e: PointerEvent) {
  if (raf || !heroEl.value) return
  raf = requestAnimationFrame(() => {
    raf = 0
    const r = heroEl.value!.getBoundingClientRect()
    heroEl.value!.style.setProperty('--mx', String(((e.clientX - r.left) / r.width - 0.5) * 2))
    heroEl.value!.style.setProperty('--my', String(((e.clientY - r.top) / r.height - 0.5) * 2))
  })
}
onMounted(() => {
  const ok = window.matchMedia('(hover: hover) and (min-width: 960px) and (prefers-reduced-motion: no-preference)').matches
  if (ok) heroEl.value?.addEventListener('pointermove', onMove, { passive: true })
})
onBeforeUnmount(() => {
  heroEl.value?.removeEventListener('pointermove', onMove)
  cancelAnimationFrame(raf)
})

useHead({
  title: 'Regocijo Floristería – La belleza de sentir',
  meta: [{ name: 'description', content: 'Ramos de flores hechos a mano, con entrega a domicilio en Montería, Córdoba. Rosas, lirios, girasoles y ramos mixtos.' }],
})
</script>

<style scoped>
/* ───────── HERO ───────── */
.hero { position: relative; overflow: hidden; padding-block: clamp(2.5rem, 6vw, 5rem) clamp(4rem, 9vw, 8rem);
  background: radial-gradient(60rem 40rem at 90% 0%, rgba(240, 205, 212, 0.65), transparent 60%), radial-gradient(40rem 30rem at 0% 100%, rgba(223, 232, 214, 0.7), transparent 60%), var(--cream); }
.hero-orb { position: absolute; border-radius: 50%; filter: blur(60px); pointer-events: none; }
.hero-orb--1 { width: 20rem; height: 20rem; top: 10%; left: 38%; background: rgba(227, 196, 124, 0.28); animation: drift 14s ease-in-out infinite; }
.hero-orb--2 { width: 16rem; height: 16rem; bottom: 0; right: 8%; background: rgba(233, 160, 180, 0.35); animation: drift 18s ease-in-out infinite reverse; }
@keyframes drift { 50% { transform: translate(2rem, -1.5rem) scale(1.1); } }

.hero-grid { position: relative; z-index: 2; display: grid; gap: 3.5rem; align-items: center; }
@media (min-width: 960px) { .hero-grid { grid-template-columns: 1.08fr 0.92fr; gap: 2rem; } }

.hero-title { font-size: clamp(3.6rem, 11.5vw, 8.6rem); margin: 1.4rem 0 1.6rem; }
.line { display: block; overflow: hidden; padding-bottom: 0.08em; margin-bottom: -0.08em; }
.line > span { display: inline-block; animation: rise 1.1s var(--ease-out) both; animation-delay: var(--d); }
@keyframes rise { from { transform: translateY(105%); } }
.hero-in { animation: fade-up 1s var(--ease-out) both; animation-delay: var(--d); }
@keyframes fade-up { from { opacity: 0; transform: translateY(1.2rem); } }

.hero-cta { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 2rem; }
.hero-facts { display: flex; flex-wrap: wrap; gap: 0.5rem 2.5rem; margin: 2.75rem 0 0; padding-top: 1.5rem; border-top: 1px solid var(--line); }
.hero-facts div { display: flex; flex-direction: column; gap: 0.1rem; }
.hero-facts dt { font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); }
.hero-facts dd { margin: 0; font: 400 1.7rem/1.1 var(--serif); color: var(--wine-deep); }

/* Composición */
.comp { position: relative; width: min(100%, 31rem); aspect-ratio: 4 / 5; margin-inline: auto; }
.comp-main { position: absolute; top: 0; right: 0; width: 78%; height: 94%; box-shadow: var(--shadow-lift); background: var(--blush);
  animation: arch-in 1.4s var(--ease-out) 0.2s both; transform: translate3d(calc(var(--mx, 0) * -10px), calc(var(--my, 0) * -8px), 0); transition: transform 0.4s var(--ease-out); }
.comp-main img, .comp-round img { width: 100%; height: 100%; object-fit: cover; display: block; }
@keyframes arch-in { from { clip-path: inset(100% 0 0 0 round 999px 999px 1rem 1rem); } to { clip-path: inset(0 0 0 0 round 999px 999px 1rem 1rem); } }
.comp-round { position: absolute; left: 0; bottom: 3%; width: 40%; aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 7px solid var(--cream);
  box-shadow: var(--shadow-lift); animation: fade-up 1.2s var(--ease-out) 0.7s both; transform: translate3d(calc(var(--mx, 0) * 14px), calc(var(--my, 0) * 10px), 0); transition: transform 0.4s var(--ease-out); }
.seal { position: absolute; top: 5%; left: 1%; width: 28%; max-width: 8.5rem; filter: drop-shadow(0 10px 18px rgba(42, 26, 31, 0.18)); animation: fade-up 1.2s var(--ease-out) 0.9s both; }
.seal-bg { fill: var(--cream); stroke: var(--line-strong); stroke-width: 1; }
.seal-ring { transform-origin: 60px 60px; animation: spin-slow 28s linear infinite; }
.seal-text { font: 600 9.5px var(--sans); letter-spacing: 0.1em; fill: var(--wine-deep); }
.seal-orn { color: var(--rose); fill: none; }
@keyframes spin-slow { to { transform: rotate(360deg); } }
.comp-sprig { position: absolute; right: -6%; bottom: -4%; width: 22%; color: var(--sage); opacity: 0.35; transform: rotate(20deg); z-index: -1; }

/* ───────── MARQUEE ───────── */
.mq { position: relative; z-index: 2; overflow: hidden; background: var(--ink); color: var(--cream); padding-block: 1.1rem; border-block: 1px solid rgba(255, 255, 255, 0.08); }
.mq-track { display: flex; width: max-content; animation: mq 46s linear infinite; }
.mq:hover .mq-track { animation-play-state: paused; }
.mq-group { font: 300 clamp(1.5rem, 3vw, 2.2rem)/1 var(--serif); font-style: italic; white-space: nowrap; padding-right: 0; }
.mq-group i { font-style: normal; color: var(--gold-soft); margin-inline: 1.4rem; font-size: 0.7em; }
@keyframes mq { to { transform: translateX(-50%); } }

/* ───────── MANIFIESTO ───────── */
.manifesto { text-align: center; }
.manifesto-text { font: 300 clamp(1.9rem, 4.6vw, 3.4rem)/1.35 var(--serif); letter-spacing: -0.015em; color: var(--ink); }
.manifesto-text em { color: var(--wine); }
.pill-img { display: inline-block; vertical-align: middle; width: 2.6em; height: 1.15em; margin-inline: 0.15em; border-radius: 999px; overflow: hidden; transform: translateY(-0.08em); }
.pill-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.8s var(--ease-out); }
.pill-img:hover img { transform: scale(1.25); }
.manifesto-div { width: min(18rem, 60%); margin: 2.5rem auto 0; color: var(--rose); opacity: 0.8; }

/* ───────── ENCABEZADOS DE SECCIÓN ───────── */
.sec-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 1.25rem; margin-bottom: clamp(2rem, 5vw, 3.5rem); }
.sec-head--center { flex-direction: column; align-items: center; text-align: center; }
.sec-title { font-size: clamp(2.6rem, 6.5vw, 4.8rem); margin-top: 0.8rem; }
.sec-link { display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 500; color: var(--wine); padding-block: 0.4rem; }
.sec-link svg { transition: transform 0.4s var(--ease-out); }
.sec-link:hover svg { transform: translateX(5px); }

/* ───────── DESTACADOS ───────── */
.feat-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.75rem; grid-template-columns: 1fr; }
@media (min-width: 640px) { .feat-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 980px) { .feat-grid { grid-template-columns: repeat(3, 1fr); gap: 2.25rem; } .feat-grid > li:nth-child(2) { margin-top: 3rem; } }
.empty { text-align: center; padding: 3rem 1rem; display: grid; justify-items: center; gap: 1rem; }
.empty-orn { width: 5rem; color: var(--rose); opacity: 0.55; }

/* ───────── COLECCIONES ───────── */
.cols { background: linear-gradient(180deg, transparent, var(--blush) 20%, var(--blush) 80%, transparent); }
.cols-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 2rem 1.25rem; grid-template-columns: repeat(2, 1fr); }
@media (min-width: 960px) { .cols-grid { grid-template-columns: repeat(4, 1fr); gap: 1.75rem; } .cols-item--1, .cols-item--3 { margin-top: 3rem; } }
.col-card { display: block; text-decoration: none; color: inherit; }
.col-arch { position: relative; display: block; aspect-ratio: 3 / 4; background: var(--blush-deep); transition: box-shadow 0.6s var(--ease-out), transform 0.6s var(--ease-out); }
.col-card:hover .col-arch, .col-card:focus-visible .col-arch { box-shadow: var(--shadow-lift); transform: translateY(-6px); }
.col-img { position: absolute; inset: 0; }
.col-img :deep(.ri-img) { transition: transform 1.4s var(--ease-out), opacity 0.7s; }
.col-card:hover .col-img :deep(.ri-img) { transform: scale(1.08); }
.col-shade { position: absolute; inset: 0; background: linear-gradient(to top, rgba(111, 21, 54, 0.38), transparent 45%); opacity: 0; transition: opacity 0.5s; pointer-events: none; }
.col-card:hover .col-shade { opacity: 1; }
.col-info { position: relative; display: grid; gap: 0.15rem; padding: 1.1rem 3.4rem 0 0.25rem; }
.col-name { font: 400 clamp(1.7rem, 3vw, 2.3rem)/1 var(--serif); color: var(--ink); transition: color 0.3s; }
.col-card:hover .col-name { color: var(--wine); }
.col-meta { font-size: 0.85rem; color: var(--muted); }
.col-go { position: absolute; right: 0.25rem; top: 1rem; display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border-radius: 50%; border: 1px solid var(--line-strong); color: var(--ink); transition: background 0.35s, color 0.35s, transform 0.5s var(--ease-out), border-color 0.35s; }
.col-card:hover .col-go { background: var(--wine); border-color: var(--wine); color: #fff; transform: rotate(45deg); }

/* ───────── CÓMO PEDIR ───────── */
.steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 2.5rem 2rem; grid-template-columns: 1fr; counter-reset: s; }
@media (min-width: 640px) { .steps { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 980px) { .steps { grid-template-columns: repeat(4, 1fr); } }
.step { position: relative; padding-top: 1.25rem; border-top: 1px solid var(--line-strong); }
.step-num { display: block; font: 300 5.5rem/0.9 var(--serif); font-style: italic; color: transparent; -webkit-text-stroke: 1.2px var(--rose); margin-bottom: 0.75rem; transition: color 0.5s; }
.step:hover .step-num { color: var(--blush-deep); }
.step-title { font-size: 1.75rem; margin-bottom: 0.5rem; }
.step-text { font-size: 0.97rem; color: var(--body); }
.how-foot { margin-top: 2.5rem; text-align: center; font-size: 0.92rem; color: var(--muted); }

/* ───────── CTA ───────── */
.cta { position: relative; overflow: hidden; text-align: center; padding: clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem); border-radius: 2.5rem;
  background: radial-gradient(40rem 22rem at 80% 0%, rgba(184, 48, 92, 0.55), transparent 65%), linear-gradient(160deg, var(--wine), var(--wine-deep)); color: #f6e7ea; }
.cta-eyebrow { color: var(--gold-soft); }
.cta-title { font-size: clamp(2.8rem, 7vw, 5.5rem); color: #fff; margin: 1rem 0; }
.cta-title em { color: var(--gold-soft); }
.cta-text { max-width: 34rem; margin: 0 auto 2rem; font-size: 1.08rem; line-height: 1.75; }
.cta-btns { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1rem 1.75rem; }
.cta-ig { color: #fff; text-decoration: underline; text-underline-offset: 0.25em; text-decoration-thickness: 1px; transition: text-decoration-thickness 0.2s; }
.cta-ig:hover { text-decoration-thickness: 2px; }
.cta-orn { position: absolute; pointer-events: none; color: rgba(255, 255, 255, 0.16); }
.cta-orn--1 { width: 11rem; left: -2rem; top: -1rem; transform: rotate(-20deg); }
.cta-orn--2 { width: 8rem; right: 1rem; bottom: -1rem; transform: rotate(18deg); }
</style>
