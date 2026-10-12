<template>
  <!-- Adornos botánicos de línea (decorativos: aria-hidden). Usan currentColor para heredar el color. -->
  <svg
    v-if="variant === 'sprig'"
    viewBox="0 0 120 220"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M60 214 C 58 170, 66 120, 56 70 C 52 48, 58 26, 62 8" />
    <path d="M59 188 C 40 184, 26 172, 22 154 C 40 156, 54 166, 59 188Z" />
    <path d="M60 160 C 80 156, 94 144, 98 126 C 80 128, 66 138, 60 160Z" />
    <path d="M58 132 C 40 126, 28 112, 26 94 C 44 98, 55 110, 58 132Z" />
    <path d="M57 104 C 76 98, 88 84, 90 66 C 72 70, 60 84, 57 104Z" />
    <path d="M55 74 C 40 66, 32 52, 34 36 C 48 42, 55 56, 55 74Z" />
    <path d="M58 48 C 72 42, 80 30, 80 16 C 66 20, 59 32, 58 48Z" />
    <circle cx="62" cy="8" r="3" />
  </svg>

  <svg
    v-else-if="variant === 'bloom'"
    viewBox="-60 -90 120 190"
    fill="none"
    stroke="currentColor"
    stroke-width="1.3"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <g transform="translate(0,-34)">
      <ellipse v-for="a in 8" :key="a" cx="0" cy="-23" rx="9" ry="19" :transform="`rotate(${(a - 1) * 45})`" />
      <circle r="9" />
      <circle r="3.5" />
    </g>
    <path d="M0 -4 C 2 30, -3 60, 0 96" />
    <path d="M0 52 C -18 50, -30 40, -34 26 C -16 28, -4 38, 0 52Z" />
    <path d="M0 70 C 18 68, 30 58, 34 44 C 16 46, 4 56, 0 70Z" />
  </svg>

  <svg
    v-else-if="variant === 'sunflower'"
    viewBox="-100 -100 200 200"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <ellipse v-for="a in 18" :key="`o${a}`" cx="0" cy="-62" rx="9" ry="26" :transform="`rotate(${(a - 1) * 20})`" />
    <ellipse v-for="a in 18" :key="`i${a}`" cx="0" cy="-44" rx="7" ry="18" :transform="`rotate(${(a - 1) * 20 + 10})`" />
    <circle r="27" />
    <circle r="19" />
    <circle v-for="(p, i) in semillas" :key="i" :cx="p[0]" :cy="p[1]" r="1.6" fill="currentColor" stroke="none" />
  </svg>

  <!-- Divisor floral horizontal -->
  <svg
    v-else
    viewBox="0 0 320 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.2"
    stroke-linecap="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M2 12 H 132" />
    <path d="M188 12 H 318" />
    <g transform="translate(160,12)">
      <ellipse v-for="a in 6" :key="a" cx="0" cy="-6.5" rx="3" ry="5.5" :transform="`rotate(${(a - 1) * 60})`" />
      <circle r="2" fill="currentColor" />
    </g>
    <circle cx="140" cy="12" r="1.6" fill="currentColor" />
    <circle cx="180" cy="12" r="1.6" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'sprig' | 'bloom' | 'sunflower' | 'divider' }>(), { variant: 'divider' })

// Semillas del girasol en espiral (ángulo áureo)
const semillas = Array.from({ length: 46 }, (_, i) => {
  const r = 2.6 * Math.sqrt(i + 1)
  const a = i * 2.39996
  return [+(r * Math.cos(a)).toFixed(1), +(r * Math.sin(a)).toFixed(1)]
})
</script>
