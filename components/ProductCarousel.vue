<template>
  <div class="pc" role="region" aria-roledescription="carrusel" :aria-label="`Fotos de ${nombre}`">
    <div
      ref="marco"
      class="pc-frame"
      tabindex="0"
      :aria-label="total > 1 ? 'Usa las flechas izquierda y derecha para cambiar de foto' : undefined"
      @keydown.left.prevent="ir(-1)"
      @keydown.right.prevent="ir(1)"
      @pointerdown="onDown"
      @pointerup="onUp"
      @pointercancel="arrastrando = false"
    >
      <Transition name="pc-fade" mode="out-in">
        <RamoImagen
          :key="activa"
          :src="imagenes[activa] ?? null"
          :alt="altImagen({ nombre, descripcion, imagenes }, activa)"
          :nombre="nombre"
          :categoria="categoria"
          :prioridad="activa === 0"
          class="pc-img"
        />
      </Transition>

      <template v-if="total > 1">
        <button type="button" class="pc-arrow pc-arrow--l" aria-label="Foto anterior" @click="ir(-1)">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button type="button" class="pc-arrow pc-arrow--r" aria-label="Foto siguiente" @click="ir(1)">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
        <p class="pc-count" aria-hidden="true">{{ activa + 1 }} / {{ total }}</p>
      </template>
    </div>

    <!-- Anuncio para lectores de pantalla -->
    <p class="sr-only" aria-live="polite">{{ total > 1 ? `Foto ${activa + 1} de ${total}` : '' }}</p>

    <ul v-if="total > 1" class="pc-thumbs" aria-label="Miniaturas">
      <li v-for="(img, i) in imagenes" :key="img">
        <button
          type="button"
          class="pc-thumb"
          :class="{ 'pc-thumb--on': i === activa }"
          :aria-label="`Ver foto ${i + 1} de ${total}`"
          :aria-current="i === activa ? 'true' : undefined"
          @click="activa = i"
        >
          <img :src="img" alt="" loading="lazy" decoding="async" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { altImagen } from '~/stores/productos'

const props = defineProps<{
  imagenes: string[]
  nombre: string
  descripcion: string
  categoria?: string
}>()

const activa = ref(0)
const total = computed(() => props.imagenes.length)
const marco = ref<HTMLElement | null>(null)

watch(() => props.imagenes, () => { activa.value = 0 })

function ir(dir: 1 | -1) {
  if (total.value < 2) return
  activa.value = (activa.value + dir + total.value) % total.value
}

// Deslizar con el dedo (o arrastrar con el mouse)
let x0 = 0
let y0 = 0
const arrastrando = ref(false)
function onDown(e: PointerEvent) {
  if ((e.target as HTMLElement).closest('button')) return
  arrastrando.value = true
  x0 = e.clientX
  y0 = e.clientY
}
function onUp(e: PointerEvent) {
  if (!arrastrando.value) return
  arrastrando.value = false
  const dx = e.clientX - x0
  const dy = e.clientY - y0
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) ir(dx < 0 ? 1 : -1)
}
</script>

<style scoped>
.pc-frame {
  position: relative; aspect-ratio: 4 / 5; overflow: hidden;
  border-radius: 999px 999px 2rem 2rem;
  background: var(--blush);
  box-shadow: var(--shadow-lift);
  touch-action: pan-y;
  cursor: grab;
}
.pc-frame:active { cursor: grabbing; }
.pc-img { position: absolute; inset: 0; }
.pc-fade-enter-active, .pc-fade-leave-active { transition: opacity 0.35s var(--ease-out); }
.pc-fade-enter-from, .pc-fade-leave-to { opacity: 0; }

.pc-arrow {
  position: absolute; top: 50%; z-index: 3; transform: translateY(-50%);
  display: grid; place-items: center; width: 3rem; height: 3rem;
  border: 0; border-radius: 50%; cursor: pointer;
  background: rgba(255, 253, 249, 0.92); color: var(--ink);
  box-shadow: 0 8px 22px -8px rgba(42, 26, 31, 0.45);
  transition: background 0.25s, color 0.25s, transform 0.3s var(--ease-out);
}
.pc-arrow:hover { background: var(--wine); color: #fff; }
.pc-arrow:active { transform: translateY(-50%) scale(0.92); }
.pc-arrow--l { left: 1rem; }
.pc-arrow--r { right: 1rem; }
.pc-count {
  position: absolute; bottom: 1.1rem; left: 50%; z-index: 3; transform: translateX(-50%);
  padding: 0.25rem 0.8rem; border-radius: 9999px;
  background: rgba(42, 26, 31, 0.78); color: var(--cream);
  font: 500 0.78rem var(--sans); letter-spacing: 0.12em;
}

.pc-thumbs { display: flex; gap: 0.6rem; margin: 1rem 0 0; padding: 0.35rem; list-style: none; overflow-x: auto; scrollbar-width: thin; }
.pc-thumb {
  display: block; width: 4.25rem; height: 5.25rem; padding: 0; flex-shrink: 0;
  border: 2px solid transparent; border-radius: 0.9rem; overflow: hidden; cursor: pointer;
  background: var(--blush); opacity: 0.7;
  transition: opacity 0.25s, border-color 0.25s, transform 0.3s var(--ease-out);
}
.pc-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.pc-thumb:hover { opacity: 1; transform: translateY(-3px); }
.pc-thumb--on { opacity: 1; border-color: var(--wine); }
</style>
