<template>
  <div>

    <!-- ══════════════════════════════════════
         HERO
    ══════════════════════════════════════ -->
    <section class="nosotros-hero">
      <client-only><PetalCanvas /></client-only>
      <div class="absolute inset-0 pointer-events-none">
        <div style="position:absolute;top:-60px;right:-40px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(255,197,213,0.35) 0%,transparent 70%);"></div>
        <div style="position:absolute;bottom:-40px;left:8%;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(205,220,188,0.3) 0%,transparent 70%);"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
        <p class="section-label mb-4">Nuestra historia</p>
        <h1 class="nosotros-title">
          Dos mujeres,<br>
          <em class="text-gradient-floral">un sueño florido</em>
        </h1>
        <p class="nosotros-subtitle">
          Regocijo Floristería nació del amor por las flores y la convicción de que cada momento merece ser celebrado con belleza.
        </p>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         HISTORIA
    ══════════════════════════════════════ -->
    <section class="max-w-4xl mx-auto px-6 lg:px-8 py-20">

      <div class="historia-grid">

        <!-- Imagen decorativa izquierda -->
        <div class="historia-img-col">
          <div class="historia-img-wrapper">
            <!-- Reemplaza este src con tu foto real -->
            <img
              src=""
              alt="Las fundadoras de Regocijo Floristería"
              class="historia-img"
            />
            <div class="historia-img-badge">
              <span style="font-size:1.5rem;">🌸</span>
              <div>
                <p style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1.1rem;color:#292524;line-height:1;">Desde 2022</p>
                <p style="font-family:'Jost',sans-serif;font-size:0.7rem;color:#78716c;">Montería, Córdoba</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Texto historia -->
        <div class="historia-texto-col">
          <p class="section-label mb-4">Cómo empezó todo</p>
          <h2 class="historia-titulo">Un café, una idea y muchas flores</h2>

          <div class="historia-parrafos">
            <p>
              Todo comenzó en una tarde lluviosa de 2022, cuando <strong>Valentina</strong> y <strong>Sofía</strong>
              se encontraron tomando café y hablando, como siempre, de su pasión compartida: las flores.
              Las dos habían crecido rodeadas de jardines, y desde pequeñas soñaban con crear algo propio que
              pusiera color y alegría en la vida de las personas.
            </p>
            <p>
              Lo que empezó como una conversación informal se convirtió esa misma noche en un plan de negocio
              escrito en una servilleta. Días después, con mucha ilusión y una inversión inicial modesta,
              Regocijo Floristería abrió sus puertas — o más bien, comenzó a llegar a las puertas de sus clientes.
            </p>
            <p>
              Hoy, más de dos años después, cada ramo que sale de nuestras manos lleva consigo el mismo cuidado
              y amor de ese primer día. Porque para nosotras, las flores no son solo un producto: son el idioma
              con el que le decimos al mundo que lo queremos.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         FUNDADORAS
    ══════════════════════════════════════ -->
    <section style="background: linear-gradient(135deg, #fff5f7 0%, #fdf0f3 50%, #f4f7f0 100%); padding: 5rem 0;">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">

        <div class="text-center mb-14">
          <p class="section-label mb-3">Las personas detrás de cada ramo</p>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2.8rem;color:#292524;line-height:1.1;">
            Nuestras fundadoras
          </h2>
        </div>

        <div class="fundadoras-grid">

          <!-- Fundadora 1 -->
          <div class="fundadora-card">
            <div class="fundadora-foto-wrapper">
              <!-- Reemplaza este src con la foto real de la fundadora 1 -->
              <img
                src=""
                alt="Valentina"
                class="fundadora-foto"
              />
              <div class="fundadora-foto-ring"></div>
            </div>
            <div class="fundadora-info">
              <h3 class="fundadora-nombre">Valentina Ruiz</h3>
              <p class="fundadora-rol">Co-fundadora · Diseño floral</p>
              <div class="floral-divider" style="margin:1rem 0;">
                <span style="font-size:0.8rem;color:#ffc5d5;">✿</span>
              </div>
              <p class="fundadora-bio">
                Con estudios en diseño y una obsesión por las peonías, Valentina es quien da vida a cada
                composición. Su ojo para el color y la forma convierte cada ramo en una pequeña obra de arte.
                Cuando no está entre flores, la encuentras leyendo o explorando mercados de antigüedades.
              </p>
              <div class="fundadora-frase">
                <span style="font-size:1.2rem;color:#ffc5d5;">"</span>
                <em style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1rem;color:#57534e;">
                  Las flores son el lenguaje más honesto que existe.
                </em>
                <span style="font-size:1.2rem;color:#ffc5d5;">"</span>
              </div>
            </div>
          </div>

          <!-- Fundadora 2 -->
          <div class="fundadora-card">
            <div class="fundadora-foto-wrapper">
              <!-- Reemplaza este src con la foto real de la fundadora 2 -->
              <img
                src=""
                alt="Sofía"
                class="fundadora-foto"
              />
              <div class="fundadora-foto-ring"></div>
            </div>
            <div class="fundadora-info">
              <h3 class="fundadora-nombre">Sofía Morales</h3>
              <p class="fundadora-rol">Co-fundadora · Operaciones y entregas</p>
              <div class="floral-divider" style="margin:1rem 0;">
                <span style="font-size:0.8rem;color:#ffc5d5;">✿</span>
              </div>
              <p class="fundadora-bio">
                Sofía es la energía que mueve a Regocijo Floristería. Administradora de empresas de corazón,
                se asegura de que cada ramo llegue a tiempo, perfecto y con una sonrisa. Su favorita es
                la lavanda, y su mayor satisfacción es ver la cara de felicidad de los clientes.
              </p>
              <div class="fundadora-frase">
                <span style="font-size:1.2rem;color:#ffc5d5;">"</span>
                <em style="font-family:'Cormorant Garamond',Georgia,serif;font-size:1rem;color:#57534e;">
                  Cada entrega es una oportunidad de alegrarle el día a alguien.
                </em>
                <span style="font-size:1.2rem;color:#ffc5d5;">"</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         VALORES
    ══════════════════════════════════════ -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div class="text-center mb-14">
        <p class="section-label mb-3">Lo que nos mueve</p>
        <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2.8rem;color:#292524;line-height:1.1;">
          Nuestros valores
        </h2>
      </div>
      <div class="valores-grid">
        <div v-for="valor in valores" :key="valor.titulo" class="valor-card">
          <span class="valor-emoji">{{ valor.emoji }}</span>
          <h3 class="valor-titulo">{{ valor.titulo }}</h3>
          <p class="valor-desc">{{ valor.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         NUMEROS
    ══════════════════════════════════════ -->
    <section style="background:#292524;padding:4rem 0;">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="numeros-grid">
          <div v-for="num in numeros" :key="num.label" class="numero-item">
            <p class="numero-valor">{{ num.valor }}</p>
            <p class="numero-label">{{ num.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════
         CTA FINAL
    ══════════════════════════════════════ -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="cta-nosotros">
        <div style="text-align:center;">
          <span class="animate-float" style="font-size:3rem;display:block;margin-bottom:1rem;">💐</span>
          <h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2.5rem;color:#292524;margin-bottom:0.75rem;">
            Sé parte de nuestra historia
          </h2>
          <p style="font-family:'Jost',sans-serif;font-size:0.9rem;color:#78716c;max-width:420px;margin:0 auto 2rem;line-height:1.8;">
            Cada ramo que pides nos ayuda a seguir haciendo lo que amamos. Gracias por confiar en nosotras.
          </p>
          <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
            <NuxtLink to="/catalogo" class="btn-primary">Ver nuestros ramos</NuxtLink>
            <NuxtLink to="/contacto" class="btn-outline">Escribirnos</NuxtLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const valores = [
  {
    emoji: '🌸',
    titulo: 'Frescura garantizada',
    desc: 'Trabajamos solo con flores cortadas el mismo día. Nada de flores que han pasado días en bodega.',
  },
  {
    emoji: '🤍',
    titulo: 'Hecho con amor',
    desc: 'Cada ramo es armado a mano, con atención a cada detalle, porque sabemos que lo vas a regalar con el corazón.',
  },
  {
    emoji: '🌱',
    titulo: 'Compromiso local',
    desc: 'Compramos a floricultores colombianos. Apoyar lo nuestro es parte de nuestra identidad.',
  },
  {
    emoji: '✨',
    titulo: 'Experiencia especial',
    desc: 'Desde el empaque hasta la entrega, queremos que recibir un ramo de Regocijo sea un momento memorable.',
  },
]

const numeros = [
  { valor: '+100', label: 'Clientes felices' },
  { valor: '+1.200', label: 'Ramos entregados' },
  { valor: '1+', label: 'Años de historia' },
  { valor: '100%', label: 'Flores colombianas' },
]

useHead({ title: 'Nosotros – Regocijo Floristería' })
</script>

<style scoped>
/* ── Hero ────────────────────────────────── */
.nosotros-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, #ffe8ee 0%, #faf8f3 50%, #e6eedd 100%);
}
.nosotros-title {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(2.8rem, 7vw, 5rem);
  color: #292524;
  line-height: 1;
  margin-bottom: 1.25rem;
  font-weight: 400;
}
.nosotros-subtitle {
  font-family: 'Jost', sans-serif;
  font-size: 1rem;
  color: #78716c;
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.8;
}

/* ── Historia ────────────────────────────── */
.historia-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 768px) {
  .historia-grid { grid-template-columns: 1fr 1.2fr; gap: 4rem; }
}

.historia-img-col {}

.historia-img-wrapper {
  position: relative;
  border-radius: 2rem;
  overflow: visible;
}
.historia-img {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  border-radius: 2rem;
  box-shadow: 0 20px 60px rgba(242,84,128,0.12);
  display: block;
}
.historia-img-badge {
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  background: white;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 8px 30px rgba(242,84,128,0.15);
  border: 1px solid #ffe8ee;
}

.historia-texto-col {}
.historia-titulo {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 2.2rem;
  color: #292524;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}
.historia-parrafos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.historia-parrafos p {
  font-family: 'Jost', sans-serif;
  font-size: 0.9rem;
  color: #57534e;
  line-height: 1.9;
}
.historia-parrafos strong {
  color: #f25480;
  font-weight: 600;
}

/* ── Fundadoras ──────────────────────────── */
.fundadoras-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 640px) {
  .fundadoras-grid { grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
}

.fundadora-card {
  background: white;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 4px 40px rgba(242,84,128,0.07);
  border: 1px solid #ffe8ee;
  transition: transform 0.3s, box-shadow 0.3s;
}
.fundadora-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 50px rgba(242,84,128,0.13);
}

.fundadora-foto-wrapper {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}
.fundadora-foto {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.5s;
}
.fundadora-card:hover .fundadora-foto { transform: scale(1.04); }
.fundadora-foto-ring {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(242,84,128,0.15) 0%, transparent 50%);
}

.fundadora-info {
  padding: 1.75rem;
}
.fundadora-nombre {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.6rem;
  color: #292524;
  margin-bottom: 0.2rem;
}
.fundadora-rol {
  font-family: 'Jost', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #f25480;
}
.fundadora-bio {
  font-family: 'Jost', sans-serif;
  font-size: 0.85rem;
  color: #78716c;
  line-height: 1.8;
  margin-bottom: 1rem;
}
.fundadora-frase {
  display: flex;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #fff5f7, #fdf0f3);
  border-radius: 0.75rem;
  border-left: 3px solid #ffc5d5;
}

/* ── Valores ─────────────────────────────── */
.valores-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .valores-grid { grid-template-columns: repeat(4, 1fr); }
}

.valor-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem 1.5rem;
  text-align: center;
  border: 1px solid #ffe8ee;
  box-shadow: 0 2px 20px rgba(0,0,0,0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}
.valor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 40px rgba(242,84,128,0.1);
}
.valor-emoji {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.75rem;
}
.valor-titulo {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.2rem;
  color: #292524;
  margin-bottom: 0.5rem;
}
.valor-desc {
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  color: #78716c;
  line-height: 1.7;
}

/* ── Números ─────────────────────────────── */
.numeros-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  text-align: center;
}
@media (min-width: 640px) {
  .numeros-grid { grid-template-columns: repeat(4, 1fr); }
}
.numero-valor {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 3rem;
  color: #ffc5d5;
  line-height: 1;
  margin-bottom: 0.4rem;
  font-weight: 400;
}
.numero-label {
  font-family: 'Jost', sans-serif;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #a8a29e;
}

/* ── CTA ─────────────────────────────────── */
.cta-nosotros {
  background: linear-gradient(135deg, #fff5f7 0%, #fdf0f3 60%, #e6eedd 100%);
  border-radius: 2rem;
  padding: 4rem 2rem;
  border: 1px solid #ffc5d5;
}
</style>