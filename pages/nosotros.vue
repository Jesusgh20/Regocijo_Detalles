<template>
  <div>
    <PageHero eyebrow="Quiénes somos">
      <template #title>La belleza de <em>sentir</em></template>
      Somos una floristería de {{ NEGOCIO.ciudad }} que prepara ramos por encargo y los lleva a domicilio.
    </PageHero>

    <!-- Qué hacemos -->
    <section class="section">
      <div class="wrap about">
        <div v-reveal class="about-media">
          <div class="about-arch arch">
            <img src="/pasionpura3.jpg" alt="Ramo de rosas rojas y rosadas con gipsofila, envuelto en papel blanco y sostenido con una mano" width="1500" height="2000" loading="lazy" decoding="async" />
          </div>
          <div class="about-round">
            <img src="/dulceprimavera2.jpg" alt="Ramo mixto de margaritas y claveles de colores en envoltura rosada" width="1086" height="1448" loading="lazy" decoding="async" />
          </div>
        </div>

        <div class="about-text">
          <p v-reveal class="eyebrow">Qué hacemos</p>
          <h2 v-reveal="80" class="display about-title">Flores armadas <em>a mano</em></h2>
          <p v-reveal="140">
            {{ NEGOCIO.nombre }} es una floristería de {{ NEGOCIO.ciudad }}, {{ NEGOCIO.departamento }}. Preparamos ramos de rosas, lirios, girasoles y mixtos, y los entregamos a domicilio.
          </p>
          <p v-reveal="200">
            Cada diseño se hace con el color y el tamaño que prefieras. Como trabajamos con flores naturales,
            un ramo puede variar un poco en flores, color o decoración según la disponibilidad del día.
          </p>
          <div v-reveal="260" class="about-div"><Ornament variant="divider" /></div>
          <p v-reveal="300" class="about-sign">{{ NEGOCIO.lema }}.</p>
        </div>
      </div>
    </section>

    <!-- Principios -->
    <section class="section pr" aria-labelledby="pr-t">
      <div class="wrap">
        <header v-reveal class="center">
          <p class="eyebrow eyebrow--center">Cómo trabajamos</p>
          <h2 id="pr-t" class="display pr-title">Lo que nos <em>importa</em></h2>
        </header>
        <ul class="pr-grid">
          <li v-for="(p, i) in principios" :key="p.t" v-reveal="i * 100" class="pr-card">
            <span class="pr-ico" aria-hidden="true"><Ornament :variant="p.o" /></span>
            <h3 class="pr-h">{{ p.t }}</h3>
            <p>{{ p.d }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Galería -->
    <section class="section gal" aria-labelledby="gal-t">
      <div class="wrap">
        <header v-reveal class="center">
          <p class="eyebrow eyebrow--center">Nuestro trabajo</p>
          <h2 id="gal-t" class="display pr-title">Algunos de nuestros <em>ramos</em></h2>
        </header>
        <ul class="gal-grid">
          <li v-for="(g, i) in galeria" :key="g.src" v-reveal="(i % 3) * 90" :class="`gal-item gal-item--${i}`">
            <img :src="g.src" :alt="g.alt" loading="lazy" decoding="async" />
          </li>
        </ul>
        <p v-reveal class="center gal-cta">
          <NuxtLink to="/catalogo" class="btn btn--wine">Ver el catálogo completo <svg class="btn-arrow" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></NuxtLink>
        </p>
      </div>
    </section>

    <!-- Contacto -->
    <section class="section">
      <div class="wrap wrap--narrow">
        <div v-reveal class="end">
          <h2 class="display end-title">¿Hablamos de tu <em>próximo ramo</em>?</h2>
          <p class="end-text">Escríbenos y te ayudamos a elegir. También nos encuentras en Instagram.</p>
          <div class="end-btns">
            <NuxtLink to="/contacto" class="btn btn--wine">Ir a contacto</NuxtLink>
            <a :href="NEGOCIO.instagram.url" target="_blank" rel="noopener noreferrer" class="btn btn--ghost">
              {{ NEGOCIO.instagram.usuario }}<span class="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { NEGOCIO } from '~/data/negocio'

const principios = [
  { o: 'bloom' as const, t: 'Uno por uno', d: 'Cada ramo se prepara con atención a los colores, el papel y el listón.' },
  { o: 'sprig' as const, t: 'A tu medida', d: 'Elige el color de tus flores y el tamaño. Cuéntanos la ocasión y te ayudamos a decidir.' },
  { o: 'sunflower' as const, t: 'A domicilio', d: `Llevamos tu ramo hasta la puerta en ${NEGOCIO.ciudad}. El valor del domicilio se confirma antes de pagar.` },
]

const galeria = [
  { src: '/pasioneterna3.jpg', alt: 'Ramo redondo de rosas rojas rodeado de gipsofila, con envoltura oscura y lazo rojo' },
  { src: '/velvetkiss1.jpg', alt: 'Caja en forma de corazón con rosas rosadas y detalles de maquillaje' },
  { src: '/dulceprimavera1.jpg', alt: 'Ramo mixto de flores de colores en un cono de papel rosado' },
  { src: '/rh1.jpg', alt: 'Arreglo en caja de corazón rosada con gerberas, margaritas y flores moradas' },
  { src: '/royalprincess1.jpg', alt: 'Ramo grande de rosas y lirios rosados con listón y mariposas doradas' },
  { src: '/ternura5.jpg', alt: 'Ramo mixto en tonos rosados con un peluche de perro blanco y negro' },
]

useHead({
  title: 'Nosotros – Regocijo Floristería',
  meta: [{ name: 'description', content: 'Regocijo es una floristería de Montería que prepara ramos por encargo y los entrega a domicilio.' }],
})
</script>

<style scoped>
.center { text-align: center; display: grid; justify-items: center; }
.about { display: grid; gap: 3.5rem; align-items: center; }
@media (min-width: 900px) { .about { grid-template-columns: 0.9fr 1.1fr; gap: 6rem; } }
.about-media { position: relative; max-width: 28rem; margin-inline: auto; width: 100%; }
.about-arch { aspect-ratio: 3 / 4; box-shadow: var(--shadow-lift); background: var(--blush); }
.about-arch img, .about-round img { width: 100%; height: 100%; object-fit: cover; display: block; }
.about-round { position: absolute; right: -3%; bottom: -6%; width: 42%; aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 7px solid var(--cream); box-shadow: var(--shadow-lift); }
.about-title { font-size: clamp(2.8rem, 6vw, 4.6rem); margin: 0.9rem 0 1.5rem; }
.about-text p:not(.eyebrow):not(.about-sign) { font-size: 1.1rem; line-height: 1.85; margin-bottom: 1.1rem; max-width: 36rem; }
.about-div { width: 12rem; color: var(--rose); margin: 1.75rem 0 1rem; opacity: 0.8; }
.about-sign { font: italic 300 2.2rem/1.1 var(--serif); color: var(--wine); }

.pr { background: var(--blush); }
.pr-title { font-size: clamp(2.5rem, 5.5vw, 4.2rem); margin: 0.9rem 0 3rem; }
.pr-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 1.5rem; grid-template-columns: 1fr; }
@media (min-width: 800px) { .pr-grid { grid-template-columns: repeat(3, 1fr); } }
.pr-card { padding: 2.25rem 2rem; background: var(--paper); border: 1px solid var(--line); border-radius: 2rem; transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out); }
.pr-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lift); }
.pr-ico { display: block; width: 3.5rem; height: 3.5rem; margin-bottom: 1.25rem; color: var(--rose); transition: transform 0.7s var(--ease-out); }
.pr-card:hover .pr-ico { transform: rotate(14deg) scale(1.08); }
.pr-h { font-size: 1.9rem; margin-bottom: 0.5rem; }

.gal-grid { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.9rem; grid-template-columns: repeat(2, 1fr); }
@media (min-width: 800px) { .gal-grid { grid-template-columns: repeat(3, 1fr); gap: 1.25rem; } }
.gal-item { aspect-ratio: 4 / 5; overflow: hidden; border-radius: 1.5rem; background: var(--blush); }
@media (min-width: 800px) { .gal-item--1, .gal-item--4 { transform: translateY(2rem); } }
.gal-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 1.2s var(--ease-out); }
.gal-item:hover img { transform: scale(1.07); }
.gal-cta { margin-top: 4rem; }

.end { text-align: center; padding: clamp(2.5rem, 6vw, 4.5rem) 1.5rem; border: 1px solid var(--line-strong); border-radius: 2.5rem; background: var(--paper); }
.end-title { font-size: clamp(2.4rem, 5.5vw, 4rem); }
.end-text { margin: 1rem auto 2rem; max-width: 28rem; }
.end-btns { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
</style>
