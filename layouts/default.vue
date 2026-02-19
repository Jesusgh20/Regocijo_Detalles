<template>
  <div class="min-h-screen flex flex-col bg-ivory">

    <!-- ── Header ───────────────────────────────── -->
    <header class="sticky top-0 z-50 bg-ivory/90 backdrop-blur-md border-b border-petal-100">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between h-18">

          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <img src="/Logo.png" style="height:44px;width:44px;object-fit:contain;border-radius:50%;" />
            <div>
              <p class="font-display text-xl leading-none text-stone-800 group-hover:text-petal-600 transition-colors">
                Regocijo
              </p>
              <p class="font-body text-xs tracking-[0.2em] uppercase text-petal-400 leading-none mt-0.5">
                Detalles
              </p>
            </div>
          </NuxtLink>

          <!-- Nav desktop -->
          <nav class="hidden md:flex items-center gap-8">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="font-body text-sm text-stone-500 hover:text-petal-600 transition-colors tracking-wide"
              active-class="text-petal-600 font-medium"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <!-- Búsqueda rápida -->
            <button
              class="p-2 rounded-full hover:bg-petal-50 text-stone-500 hover:text-petal-600 transition-colors"
              aria-label="Buscar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            <!-- Carrito -->
            <button
              class="relative p-2 rounded-full hover:bg-petal-50 text-stone-500 hover:text-petal-600 transition-colors"
              aria-label="Ver carrito"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <span
                v-if="productosStore.cantidadCarrito > 0"
                class="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center
                       bg-petal-500 text-white text-[10px] font-medium rounded-full"
              >
                {{ productosStore.cantidadCarrito }}
              </span>
            </button>

            <!-- CTA mobile -->
            <NuxtLink to="/catalogo" class="md:hidden btn-primary text-xs px-4 py-2">
              Catalogo
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- ── Main content ──────────────────────────── -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- ── Footer ────────────────────────────────── -->
    <footer class="bg-stone-800 text-stone-300 mt-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">

          <!-- Brand -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <img src="/Logo.png" style="height:48px;width:48px;object-fit:contain;border-radius:50%;background:rgba(255,255,255,0.08);" />
              <div>
                <p class="font-display text-2xl text-white leading-none">Regocijo</p>
                <p class="font-body text-xs tracking-[0.2em] uppercase text-petal-300 mt-0.5">Detalles</p>
              </div>
            </div>
            <p class="font-body text-sm text-stone-400 leading-relaxed max-w-xs">
              Creamos ramos de flores artesanales que convierten cada momento en un recuerdo eterno.
              Flores frescas, amor en cada pétalo.
            </p>
            <div class="flex gap-3 mt-6">
              <a href="https://www.instagram.com/regocijo_detalles/" target="_blank" rel="noopener" class="p-2 rounded-full bg-stone-700 hover:bg-petal-500 transition-colors text-stone-300 hover:text-white" aria-label="Instagram">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://wa.me/573127506785?text=Hola%20quiero%20información%20sobre%20sus%20ramos" target="_blank" rel="noopener" class="p-2 rounded-full bg-stone-700 hover:bg-petal-500 transition-colors text-stone-300 hover:text-white" aria-label="WhatsApp">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Links -->
          <div>
            <h4 class="font-body text-xs tracking-[0.2em] uppercase text-stone-400 mb-4">Catalogo</h4>
            <ul class="space-y-2">
              <li v-for="link in footerShopLinks" :key="link.to">
                <NuxtLink :to="link.to" class="font-body text-sm text-stone-400 hover:text-petal-300 transition-colors">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-body text-xs tracking-[0.2em] uppercase text-stone-400 mb-4">Contacto</h4>
            <ul class="space-y-3">
              <li class="flex items-start gap-2 text-sm text-stone-400">
                <span class="mt-0.5" aria-hidden="true">📍</span>
                <span>Solo Domicilio</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-stone-400">
                <span aria-hidden="true">📞</span>
                <span>+57 323 4999029</span>
                <span>+57 312 7506785</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-stone-400">
                <span aria-hidden="true">✉️</span>
                <span>hola@regocijodetalles.co</span>
              </li>
              <li class="flex items-center gap-2 text-sm text-stone-400">
                <span aria-hidden="true">🕐</span>
                <span>Lun – Sáb: 8 am – 7 pm</span>
              </li>
            </ul>
          </div>

        </div>

        <!-- Bottom bar -->
        <div class="mt-16 pt-8 border-t border-stone-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="font-body text-xs text-stone-500">
            © {{ new Date().getFullYear() }} Regocijo Detalles · Hecho con 🌺 en Colombia
          </p>
          <div class="flex gap-6">
            <a href="#" class="font-body text-xs text-stone-500 hover:text-petal-300 transition-colors">Privacidad</a>
            <a href="#" class="font-body text-xs text-stone-500 hover:text-petal-300 transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { useProductosStore } from '~/stores/productos'

const productosStore = useProductosStore()

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catalogo' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

const footerShopLinks = [
  { to: '/catalogo', label: 'Todos los ramos' },
  { to: '/catalogo?categoria=Rosa', label: 'Rosas' },
  { to: '/catalogo?categoria=Especial', label: 'Ediciones especiales' },
  { to: '/catalogo?categoria=Blanco', label: 'Ramos blancos' },
]
</script>
