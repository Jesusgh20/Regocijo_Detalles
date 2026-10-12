<template>
  <div class="app">
    <a href="#contenido" class="skip-link">Saltar al contenido</a>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator color="#8c1f45" :height="3" />

    <!-- Franja informativa (datos reales de las políticas de servicio) -->
    <aside class="topbar" aria-label="Información de pedidos">
      <span>Pedidos con 1 a 2 días de anticipación</span>
      <span class="topbar-sep" aria-hidden="true">✦</span>
      <span>Entrega a domicilio en {{ NEGOCIO.ciudad }}</span>
    </aside>

    <!-- ── Header ─────────────────────────────── -->
    <header ref="headerEl" class="hd" :class="{ 'hd--scrolled': scrolled }">
      <div class="wrap hd-inner">
        <NuxtLink to="/" class="brand">
          <img src="/regocijosinfondo.png" alt="" width="44" height="44" class="brand-logo" />
          <span class="brand-text"><span class="brand-name">Regocijo</span>{{ ' ' }}<span class="brand-tag">Floristería</span></span>
        </NuxtLink>

        <nav class="nav" aria-label="Principal">
          <NuxtLink v-for="l in navLinks" :key="l.to" :to="l.to" class="nav-link link-draw">{{ l.label }}</NuxtLink>
        </nav>

        <div class="hd-actions">
          <NuxtLink to="/catalogo?buscar=1" class="icon-btn" aria-label="Buscar ramos en el catálogo">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
          </NuxtLink>

          <button type="button" class="icon-btn" aria-haspopup="dialog" :aria-label="etiquetaCarrito" @click="abrir">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9h14l-1.1 11H6.1L5 9z" /><path d="M9 9V7a3 3 0 016 0v2" /></svg>
            <Transition name="pop">
              <span v-if="store.cantidadCarrito > 0" :key="store.cantidadCarrito" class="cart-badge" aria-hidden="true">{{ store.cantidadCarrito }}</span>
            </Transition>
          </button>

          <button
            type="button"
            class="icon-btn menu-btn"
            :aria-expanded="menu"
            aria-controls="menu-movil"
            :aria-label="menu ? 'Cerrar menú' : 'Abrir menú'"
            @click="menu = !menu"
          >
            <svg v-if="!menu" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>
            <svg v-else viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Menú móvil -->
    <Transition name="menu">
      <nav v-if="menu" id="menu-movil" class="mm" aria-label="Menú móvil" :style="{ top: menuTop }">
        <div class="mm-nav">
          <NuxtLink v-for="(l, i) in navLinks" :key="l.to" :to="l.to" class="mm-link" :style="{ '--i': i }">
            <span class="mm-num" aria-hidden="true">0{{ i + 1 }}</span>{{ l.label }}
          </NuxtLink>
        </div>
        <div class="mm-foot">
          <a :href="whatsappUrl()" target="_blank" rel="noopener noreferrer" class="btn btn--wa btn--block">
            <IconWhatsApp width="20" height="20" /> Escríbenos por WhatsApp
            <span class="sr-only">(se abre en una pestaña nueva)</span>
          </a>
          <p class="mm-hours">{{ NEGOCIO.horarios[0].dia }}: {{ NEGOCIO.horarios[0].hora }}</p>
        </div>
      </nav>
    </Transition>

    <!-- ── Contenido ───────────────────────────── -->
    <main id="contenido" class="main" tabindex="-1" :inert="menu">
      <slot />
    </main>

    <!-- ── Footer ──────────────────────────────── -->
    <footer class="ft on-dark" :inert="menu">
      <p class="ft-giant" aria-hidden="true">Regocijo</p>
      <div class="wrap ft-inner">
        <div class="ft-brand">
          <p class="ft-lema">{{ NEGOCIO.lema }}.</p>
          <p class="ft-about">
            Ramos de flores artesanales, armados a mano y entregados a domicilio en {{ NEGOCIO.ciudad }}, {{ NEGOCIO.departamento }}.
          </p>
          <div class="ft-social">
            <a :href="NEGOCIO.instagram.url" target="_blank" rel="noopener noreferrer" class="ft-icon" :aria-label="`Instagram ${NEGOCIO.instagram.usuario} (se abre en una pestaña nueva)`">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" /></svg>
            </a>
            <a :href="whatsappUrl()" target="_blank" rel="noopener noreferrer" class="ft-icon" aria-label="WhatsApp (se abre en una pestaña nueva)">
              <IconWhatsApp width="20" height="20" />
            </a>
          </div>
        </div>

        <nav class="ft-col" aria-labelledby="ft-cat">
          <h2 id="ft-cat" class="ft-h">Catálogo</h2>
          <ul>
            <li v-for="l in footerShop" :key="l.to"><NuxtLink :to="l.to" class="ft-link">{{ l.label }}</NuxtLink></li>
          </ul>
        </nav>

        <nav class="ft-col" aria-labelledby="ft-info">
          <h2 id="ft-info" class="ft-h">Información</h2>
          <ul>
            <li><NuxtLink to="/nosotros" class="ft-link">Nosotros</NuxtLink></li>
            <li><NuxtLink to="/contacto" class="ft-link">Contacto</NuxtLink></li>
            <li><NuxtLink to="/terminos" class="ft-link">Términos y condiciones</NuxtLink></li>
            <li><NuxtLink to="/privacidad" class="ft-link">Política de privacidad</NuxtLink></li>
            <li><NuxtLink to="/cookies" class="ft-link">Política de cookies</NuxtLink></li>
          </ul>
        </nav>

        <div class="ft-col">
          <h2 class="ft-h">Contacto</h2>
          <address class="ft-addr">
            <p>{{ NEGOCIO.ciudad }}, {{ NEGOCIO.departamento }} · {{ NEGOCIO.modalidad }}</p>
            <p v-for="t in NEGOCIO.telefonos" :key="t.e164"><a :href="`tel:+${t.e164}`" class="ft-link">{{ t.display }}</a></p>
            <p v-if="NEGOCIO.email"><a :href="`mailto:${NEGOCIO.email}`" class="ft-link">{{ NEGOCIO.email }}</a></p>
            <p v-for="h in NEGOCIO.horarios" :key="h.dia" class="ft-hours"><span>{{ h.dia }}</span> {{ h.hora }}</p>
          </address>
        </div>
      </div>

      <div class="wrap ft-bar">
        <p>© {{ anio }} {{ NEGOCIO.nombre }}<template v-if="NEGOCIO.nit"> · NIT {{ NEGOCIO.nit }}</template> · {{ NEGOCIO.pais }}</p>
        <p>Esta tienda no usa cookies ni rastreadores. <NuxtLink to="/cookies" class="ft-link">Saber más</NuxtLink></p>
      </div>
    </footer>

    <CarritoDrawer />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
import { NEGOCIO } from '~/data/negocio'
import { useProductosStore } from '~/stores/productos'

const store = useProductosStore()
const { abrir } = useCarritoUI()
const route = useRoute()

// Menú móvil: patrón «disclosure». Escape cierra, el fondo queda inerte y sin scroll mientras está abierto.
const menu = ref(false)
const headerEl = ref<HTMLElement | null>(null)
const menuTop = ref('0px') // el menú empieza justo debajo del encabezado (la franja superior puede ocupar 1 o 2 líneas)
function onKey(e: KeyboardEvent) { if (e.key === 'Escape') menu.value = false }
watch(menu, (v) => {
  if (!import.meta.client) return
  if (v && headerEl.value) menuTop.value = `${Math.max(0, Math.round(headerEl.value.getBoundingClientRect().bottom))}px`
  document.documentElement.style.overflow = v ? 'hidden' : ''
  if (v) document.addEventListener('keydown', onKey)
  else document.removeEventListener('keydown', onKey)
})
watch(() => route.fullPath, () => { menu.value = false })

const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 12 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})

const anio = new Date().getFullYear()

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]
const footerShop = [
  { to: '/catalogo', label: 'Todos los ramos' },
  { to: '/catalogo?categoria=rosas', label: 'Rosas' },
  { to: '/catalogo?categoria=girasoles', label: 'Girasoles' },
  { to: '/catalogo?categoria=lirios', label: 'Lirios' },
  { to: '/catalogo?categoria=mixtos', label: 'Mixtos' },
]

const etiquetaCarrito = computed(() => {
  const n = store.cantidadCarrito
  return n === 0 ? 'Abrir carrito (vacío)' : `Abrir carrito, ${n} ${n === 1 ? 'ramo' : 'ramos'}`
})
</script>

<style scoped>
.app { min-height: 100vh; display: flex; flex-direction: column; position: relative; }
/* clip (no hidden): evita que adornos decorativos creen scroll horizontal sin romper los elementos sticky */
.main { flex: 1; position: relative; z-index: 1; outline: none; overflow-x: clip; }

/* Franja superior */
.topbar {
  position: relative; z-index: 2;
  display: flex; justify-content: center; align-items: center; gap: 0.9rem; flex-wrap: wrap;
  padding: 0.55rem 1rem; background: var(--ink); color: var(--cream);
  font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; text-align: center;
}
.topbar-sep { color: var(--gold-soft); }

/* Header */
.hd {
  position: sticky; top: 0; z-index: 50;
  background: rgba(251, 246, 239, 0.86); backdrop-filter: blur(14px) saturate(1.2);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
}
.hd--scrolled { border-color: var(--line); box-shadow: 0 10px 30px -22px rgba(42, 26, 31, 0.5); background: rgba(251, 246, 239, 0.94); }
.hd-inner { height: var(--header-h); display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; }

.brand { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: var(--ink); }
.brand-logo { width: 2.75rem; height: 2.75rem; object-fit: contain; transition: transform 0.7s var(--ease-out); }
.brand:hover .brand-logo { transform: rotate(18deg) scale(1.06); }
.brand-text { display: flex; flex-direction: column; line-height: 1; }
.brand-name { font: 500 1.9rem/0.9 var(--serif); letter-spacing: -0.01em; }
.brand-tag { font-size: 0.62rem; letter-spacing: 0.34em; text-transform: uppercase; color: var(--rose); margin-top: 0.3rem; }

.nav { display: none; gap: 2.25rem; align-items: center; }
.nav-link { padding: 0.5rem 0; font-size: 0.92rem; letter-spacing: 0.04em; color: var(--ink); }
.nav-link:hover { color: var(--wine); }
.nav-link.router-link-exact-active { color: var(--wine); font-weight: 500; }
@media (min-width: 880px) { .nav { display: flex; } .menu-btn { display: none; } }

.hd-actions { display: flex; align-items: center; gap: 0.25rem; }
.cart-badge {
  position: absolute; top: 0.2rem; right: 0.1rem;
  min-width: 1.15rem; height: 1.15rem; padding: 0 0.3rem; border-radius: 9999px;
  display: grid; place-items: center;
  background: var(--wine); color: #fff; font-size: 0.68rem; font-weight: 600; line-height: 1;
}
.pop-enter-active { animation: pop 0.45s var(--ease-out); }
@keyframes pop { from { transform: scale(0); } 60% { transform: scale(1.25); } to { transform: scale(1); } }

/* Menú móvil */
.mm {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 45; padding: 1.5rem var(--gutter) 2rem;
  display: flex; flex-direction: column; justify-content: space-between;
  background: var(--cream); overflow-y: auto;
}
.mm-nav { display: grid; gap: 0.25rem; }
.mm-link {
  display: flex; align-items: baseline; gap: 1rem; padding: 0.6rem 0;
  font: 300 clamp(2.6rem, 11vw, 4rem)/1.05 var(--serif); letter-spacing: -0.02em; color: var(--ink); text-decoration: none;
  border-bottom: 1px solid var(--line);
  animation: mm-in 0.7s var(--ease-out) both; animation-delay: calc(var(--i) * 70ms + 120ms);
  transition: color 0.25s, padding-left 0.4s var(--ease-out);
}
.mm-link:hover { color: var(--wine); padding-left: 0.6rem; }
.mm-link.router-link-exact-active { color: var(--wine); font-style: italic; }
.mm-num { font: 500 0.75rem var(--sans); letter-spacing: 0.2em; color: var(--muted); }
@keyframes mm-in { from { opacity: 0; transform: translateY(1.5rem); } }
.mm-foot { display: grid; gap: 0.75rem; margin-top: 2rem; }
.mm-hours { font-size: 0.85rem; color: var(--muted); text-align: center; }
.menu-enter-active, .menu-leave-active { transition: opacity 0.35s var(--ease-out); }
.menu-enter-from, .menu-leave-to { opacity: 0; }

/* Footer */
.ft { position: relative; z-index: 1; margin-top: 6rem; background: var(--ink); color: #d9cace; overflow: hidden; padding-top: 4.5rem; }
.ft-giant {
  position: absolute; left: 50%; bottom: -0.18em; transform: translateX(-50%);
  font: 300 clamp(7rem, 26vw, 24rem)/0.8 var(--serif); letter-spacing: -0.04em; white-space: nowrap;
  color: rgba(251, 246, 239, 0.05); pointer-events: none; user-select: none;
}
.ft-inner { position: relative; display: grid; gap: 2.75rem; padding-bottom: 3.5rem; }
@media (min-width: 760px) { .ft-inner { grid-template-columns: 1.5fr 1fr 1fr 1.3fr; gap: 3rem; } }
.ft-lema { font: 300 clamp(2rem, 4vw, 2.8rem)/1.05 var(--serif); font-style: italic; color: var(--cream); }
.ft-about { margin-top: 1rem; max-width: 20rem; font-size: 0.95rem; line-height: 1.7; }
.ft-social { display: flex; gap: 0.6rem; margin-top: 1.5rem; }
.ft-icon {
  display: grid; place-items: center; width: 2.9rem; height: 2.9rem; border-radius: 50%;
  border: 1px solid rgba(251, 246, 239, 0.28); color: var(--cream);
  transition: background 0.3s, color 0.3s, border-color 0.3s, transform 0.35s var(--ease-out);
}
.ft-icon:hover { background: var(--gold-soft); border-color: var(--gold-soft); color: var(--ink); transform: translateY(-3px); }
.ft-h { font: 500 0.74rem var(--sans); letter-spacing: 0.24em; text-transform: uppercase; color: var(--gold-soft); margin-bottom: 1.1rem; }
.ft-col ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.55rem; }
.ft-link { color: #d9cace; text-decoration: none; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size 0.4s var(--ease-out), color 0.25s; }
.ft-link:hover { color: #fff; background-size: 100% 1px; }
.ft-addr { font-style: normal; display: grid; gap: 0.45rem; font-size: 0.95rem; }
.ft-hours { font-size: 0.85rem; line-height: 1.4; }
.ft-hours span { display: block; color: #b9a7ad; }
.ft-bar {
  position: relative; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.75rem;
  padding-block: 1.5rem 2.25rem; border-top: 1px solid rgba(251, 246, 239, 0.14); font-size: 0.82rem; color: #b9a7ad;
}
</style>
