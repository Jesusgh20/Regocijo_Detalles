<template>
  <div class="lienzo-wrapper" ref="wrapperRef">
    <!-- Fondo decorativo -->
    <div class="lienzo-bg"></div>

    <!-- Canvas SVG principal -->
    <svg
      class="lienzo-svg"
      :viewBox="`0 0 ${SIZE} ${SIZE}`"
      :width="SIZE"
      :height="SIZE"
    >
      <!-- Envoltura (cono de papel) -->
      <defs>
        <clipPath id="cono-clip">
          <polygon :points="conoPoints" />
        </clipPath>
        <linearGradient id="env-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" :stop-color="envoltura.color" stop-opacity="0.9" />
          <stop offset="100%" :stop-color="envolturaOscuro" stop-opacity="1" />
        </linearGradient>
      </defs>

      <!-- Papel de envoltura (atrás de todo) -->
      <polygon
        :points="conoPoints"
        fill="url(#env-grad)"
        stroke="rgba(0,0,0,0.08)"
        stroke-width="1"
      />
      <!-- Pliegue/reflejo del papel -->
      <polygon
        :points="conoReflejoPoints"
        fill="rgba(255,255,255,0.15)"
      />

      <!-- Flores (renderizadas con phyllotaxis) -->
      <TransitionGroup name="flor-anim">
        <g
          v-for="(item, i) in floresConPosicion"
          :key="`${item.flor.id}-${i}`"
          :transform="`translate(${item.x}, ${item.y}) rotate(${item.rotacion}) scale(${item.escala})`"
          :style="{ zIndex: item.zIndex }"
        >
          <!-- Círculo de fondo de la flor -->
          <circle
            :r="RADIO_FLOR"
            :fill="item.flor.color"
            fill-opacity="0.92"
            stroke="rgba(255,255,255,0.6)"
            stroke-width="1.5"
          />
          <!-- Emoji de la flor como texto -->
          <text
            text-anchor="middle"
            dominant-baseline="central"
            :font-size="RADIO_FLOR * 1.3"
          >{{ item.flor.emoji }}</text>
        </g>
      </TransitionGroup>

      <!-- Moño (encima de todo) -->
      <g v-if="totalFlores > 0" :transform="`translate(${CENTER}, ${BASE_Y})`">
        <!-- Lazo izquierdo -->
        <ellipse cx="-12" cy="-4" rx="14" ry="8" :fill="mono.color" fill-opacity="0.9" transform="rotate(-20 -12 -4)" />
        <!-- Lazo derecho -->
        <ellipse cx="12" cy="-4" rx="14" ry="8" :fill="mono.color" fill-opacity="0.9" transform="rotate(20 12 -4)" />
        <!-- Nudo central -->
        <circle cx="0" cy="0" r="7" :fill="monoOscuro" />
        <!-- Cintas colgantes -->
        <path d="M -4 6 Q -8 20 -12 32" :stroke="mono.color" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8" />
        <path d="M 4 6 Q 10 20 14 32" :stroke="mono.color" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8" />
      </g>

      <!-- Estado vacío -->
      <g v-if="totalFlores === 0">
        <circle :cx="CENTER" :cy="CENTER - 20" r="48" fill="rgba(255,197,213,0.18)" stroke="rgba(242,84,128,0.2)" stroke-width="1.5" stroke-dasharray="6 4" />
        <text :x="CENTER" :y="CENTER - 28" text-anchor="middle" font-size="32">🌸</text>
        <text :x="CENTER" :y="CENTER + 5" text-anchor="middle" font-family="'Jost', sans-serif" font-size="12" fill="#a8a29e">Agrega flores</text>
        <text :x="CENTER" :y="CENTER + 22" text-anchor="middle" font-family="'Jost', sans-serif" font-size="11" fill="#c4bfbb">para ver tu ramo</text>
      </g>
    </svg>

    <!-- Indicador de tamaño -->
    <div v-if="totalFlores > 0" class="tamaño-badge">
      <span class="tamaño-codigo">{{ tamanoAproximado.codigo }}</span>
      <span class="tamaño-nombre">{{ tamanoAproximado.nombre }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useEditorStore, type FloresCatalogo } from '~/stores/editor'

const store = useEditorStore()
const { envoltura, mono, totalFlores, floresParaLienzo, tamanoAproximado } = storeToRefs(store)

// ── Dimensiones del SVG ────────────────
const SIZE   = 320
const CENTER = SIZE / 2
const BASE_Y = SIZE - 40         // base del ramo donde se juntan los tallos
const K      = 18                // constante de espaciado phyllotaxis
const RADIO_FLOR = 18            // radio de cada flor en px del SVG

// Puntos del cono de envoltura
const conoPoints = computed(() => {
  const top = CENTER - 10
  const baseLeft  = 30
  const baseRight = SIZE - 30
  const tip       = BASE_Y + 28
  return `${baseLeft},${top} ${baseRight},${top} ${CENTER},${tip}`
})

const conoReflejoPoints = computed(() => {
  const top = CENTER - 10
  return `${CENTER - 20},${top} ${CENTER + 60},${top} ${CENTER + 10},${BASE_Y + 10}`
})

// Darker version of envoltura color for gradient
const envolturaOscuro = computed(() => darken(envoltura.value.color, 30))
const monoOscuro = computed(() => darken(mono.value.color, 25))

function darken(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, (n >> 16) - amount)
  const g = Math.max(0, ((n >> 8) & 0xff) - amount)
  const b = Math.max(0, (n & 0xff) - amount)
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`
}

// ── Phyllotaxis (ángulo áureo) ─────────
const ANGULO_AUREO = 137.5 * (Math.PI / 180)
const AREA_RADIUS  = 90   // radio máximo del área circular del ramo

interface FlorConPos {
  flor: FloresCatalogo
  x: number
  y: number
  rotacion: number
  escala: number
  zIndex: number
}

const floresConPosicion = computed<FlorConPos[]>(() => {
  return floresParaLienzo.value
    // Separar follaje (va atrás) y flores normales
    .slice()
    .sort((a, b) => {
      if (a.flor.categoria === 'follaje' && b.flor.categoria !== 'follaje') return -1
      if (a.flor.categoria !== 'follaje' && b.flor.categoria === 'follaje') return 1
      return 0
    })
    .map((item, i) => {
      const angle  = i * ANGULO_AUREO
      const radius = Math.min(K * Math.sqrt(i + 1), AREA_RADIUS)

      const x = CENTER + radius * Math.cos(angle)
      const y = (CENTER - 20) + radius * Math.sin(angle) * 0.8 // ligeramente achatado para parecer bouquet

      // Variación pseudoaleatoria pero determinística
      const seed = (i * 7919 + item.flor.id.charCodeAt(0) * 31) % 100
      const rotacion = (seed / 100) * 30 - 15          // ±15°
      const escala   = 0.88 + (seed % 23) / 100        // 0.88–1.10

      return {
        flor: item.flor,
        x, y,
        rotacion,
        escala,
        zIndex: item.flor.categoria === 'follaje' ? 0 : i + 1,
      }
    })
})
</script>

<style scoped>
.lienzo-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 40%, #fff5f7 0%, #faf8f3 60%, #f0ede8 100%);
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow:
    inset 0 2px 12px rgba(242,84,128,0.06),
    0 8px 40px rgba(0,0,0,0.06);
  border: 1px solid rgba(255,197,213,0.3);
  min-height: 340px;
}
.lienzo-bg {
  position: absolute; inset: 0; border-radius: 1.5rem;
  background: repeating-linear-gradient(
    45deg, transparent, transparent 20px,
    rgba(242,84,128,0.015) 20px, rgba(242,84,128,0.015) 21px
  );
  pointer-events: none;
}
.lienzo-svg {
  position: relative; z-index: 1;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.12));
  max-width: 100%;
  height: auto;
}

/* Animaciones de flores */
.flor-anim-enter-active {
  transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.flor-anim-leave-active {
  transition: all 0.18s ease-in;
}
.flor-anim-enter-from {
  opacity: 0;
  transform: scale(0);
}
.flor-anim-leave-to {
  opacity: 0;
  transform: scale(0);
}

/* Badge de tamaño */
.tamaño-badge {
  position: absolute;
  bottom: 1rem; right: 1rem;
  display: flex; align-items: center; gap: 0.4rem;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  border: 1px solid #ffc5d5;
  border-radius: 9999px;
  padding: 0.3rem 0.8rem;
  box-shadow: 0 2px 10px rgba(242,84,128,0.15);
}
.tamaño-codigo {
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem; font-weight: 700;
  color: #f25480; letter-spacing: 0.08em;
  text-transform: uppercase;
}
.tamaño-nombre {
  font-family: 'Jost', sans-serif;
  font-size: 0.68rem; color: #78716c;
}
</style>
