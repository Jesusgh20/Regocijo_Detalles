<template>
  <Transition name="splash-exit">
    <div v-if="visible" class="splash-overlay" @click="handleSkip">
      <!-- Particle canvas -->
      <canvas ref="canvasRef" class="particle-canvas" />

      <!-- Floating petals layer -->
      <div class="petals-layer">
        <div
          v-for="p in petals"
          :key="p.id"
          class="petal"
          :style="p.style"
        />
      </div>

      <!-- Main content -->
      <div class="splash-content" :class="{ 'content-visible': contentVisible }">
        <!-- Sunburst SVG background -->
        <svg class="sunburst" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(300,300)">
            <line
              v-for="i in 36"
              :key="i"
              x1="0" y1="0"
              x2="0" y2="-320"
              :transform="`rotate(${i * 10})`"
              stroke="#FDE047"
              :stroke-width="i % 3 === 0 ? 2.5 : 1"
              stroke-opacity="0.25"
            />
          </g>
        </svg>

        <!-- Glowing circle -->
        <div class="glow-ring" />
        <div class="glow-ring glow-ring--2" />
        <div class="glow-ring glow-ring--3" />

        <!-- Big flower SVG -->
        <div class="flower-container">
          <svg class="hero-flower" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(100,100)">
              <!-- Petals outer -->
              <ellipse
                v-for="i in 12"
                :key="`outer-${i}`"
                cx="0" cy="-62" rx="14" ry="28"
                :transform="`rotate(${i * 30})`"
                fill="#FDE047"
                opacity="0.9"
              />
              <!-- Petals middle -->
              <ellipse
                v-for="i in 8"
                :key="`mid-${i}`"
                cx="0" cy="-46" rx="11" ry="22"
                :transform="`rotate(${i * 45 + 22})`"
                fill="#FACC15"
              />
              <!-- Center -->
              <circle cx="0" cy="0" r="22" fill="#92400E" />
              <circle cx="0" cy="0" r="16" fill="#78350F" />
              <!-- Center dots -->
              <circle
                v-for="i in 8"
                :key="`dot-${i}`"
                cx="0" cy="-9"
                r="2"
                :transform="`rotate(${i * 45})`"
                fill="#FDE047"
                opacity="0.7"
              />
              <circle cx="0" cy="0" r="4" fill="#FDE047" opacity="0.5" />
            </g>
          </svg>
        </div>

        <!-- Text section -->
        <div class="text-block">
          <p class="eyebrow">Sabado 21 de Marzo de 2026</p>
          <h1 class="hero-title">
            <span class="title-line title-line--1">Día de las</span>
            <span class="title-line title-line--2">Flores Amarillas</span>
          </h1>
          <p class="subtitle">Celebra con el ramo perfecto para alguien especial</p>
        </div>

        <!-- CTA -->
        <button class="cta-btn" @click.stop="enter">
          <span class="cta-text">Ver Ramos</span>
          <span class="cta-arrow">→</span>
          <span class="cta-shimmer" />
        </button>

        <p class="skip-hint" @click.stop="enter">Toca para continuar</p>
      </div>

      <!-- Corner decorations -->
      <div class="corner corner--tl">
        <svg viewBox="0 0 80 80" width="80" height="80">
          <g v-for="i in 3" :key="i">
            <ellipse
              :cx="10 + i * 20" :cy="70 - i * 18"
              :rx="8 - i" :ry="16 - i * 2"
              :transform="`rotate(${-30 + i * 15}, ${10 + i * 20}, ${70 - i * 18})`"
              fill="#FDE047" :opacity="0.5 + i * 0.1"
            />
          </g>
        </svg>
      </div>
      <div class="corner corner--br">
        <svg viewBox="0 0 80 80" width="80" height="80">
          <g v-for="i in 3" :key="i">
            <ellipse
              :cx="70 - i * 20" :cy="10 + i * 18"
              :rx="8 - i" :ry="16 - i * 2"
              :transform="`rotate(${150 + i * 15}, ${70 - i * 20}, ${10 + i * 18})`"
              fill="#FACC15" :opacity="0.5 + i * 0.1"
            />
          </g>
        </svg>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const visible = ref(true)
const contentVisible = ref(false)
const canvasRef = ref<HTMLCanvasElement | null>(null)

// ── Petals data ──────────────────────────────────────────────
const PETAL_COUNT = 22
const petalColors = ['#FDE047', '#FACC15', '#EAB308', '#FEF08A', '#FEF9C3', '#FCD34D']

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  id: i,
  style: {
    left: `${Math.random() * 100}%`,
    top: `${-10 - Math.random() * 20}%`,
    width: `${10 + Math.random() * 18}px`,
    height: `${10 + Math.random() * 18}px`,
    background: petalColors[Math.floor(Math.random() * petalColors.length)],
    animationDuration: `${4 + Math.random() * 6}s`,
    animationDelay: `${Math.random() * 4}s`,
    borderRadius: `${30 + Math.random() * 50}% ${70 - Math.random() * 20}% ${40 + Math.random() * 30}% ${60 + Math.random() * 20}%`,
    opacity: 0.6 + Math.random() * 0.4,
  }
}))

// ── Formatted date ───────────────────────────────────────────
const formattedDate = computed(() => {
  return new Date().toLocaleDateString('es-CO', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })
})

// ── Particle canvas ──────────────────────────────────────────
type Particle = {
  x: number; y: number; vx: number; vy: number
  r: number; alpha: number; color: string; spin: number; angle: number
}

let animFrame = 0
let particles: Particle[] = []
const colors = ['#FDE047', '#FACC15', '#EAB308', '#F59E0B', '#FEF08A']

function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -0.3 - Math.random() * 0.5,
    r: 2 + Math.random() * 4,
    alpha: 0.2 + Math.random() * 0.6,
    color: colors[Math.floor(Math.random() * colors.length)],
    spin: (Math.random() - 0.5) * 0.06,
    angle: Math.random() * Math.PI * 2,
  }))
}

function drawParticles() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    p.angle += p.spin
    if (p.y < -20) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
    if (p.x < -20) p.x = canvas.width + 10
    if (p.x > canvas.width + 20) p.x = -10

    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.angle)
    ctx.globalAlpha = p.alpha

    // Draw petal shape
    ctx.beginPath()
    ctx.ellipse(0, 0, p.r, p.r * 2.2, 0, 0, Math.PI * 2)
    ctx.fillStyle = p.color
    ctx.fill()

    ctx.restore()
  }

  animFrame = requestAnimationFrame(drawParticles)
}

// ── Navigation ───────────────────────────────────────────────
function enter() {
  visible.value = false
  setTimeout(() => router.push('/'), 700)
}

function handleSkip() {
  enter()
}

// ── Resize ───────────────────────────────────────────────────
function onResize() {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth
    canvasRef.value.height = window.innerHeight
  }
}

// ── Lifecycle ────────────────────────────────────────────────
onMounted(() => {
  initCanvas()
  drawParticles()
  window.addEventListener('resize', onResize)

  // Stagger content in
  setTimeout(() => { contentVisible.value = true }, 200)
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
/* ── Base overlay ─────────────────────────────────────────── */
.splash-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: linear-gradient(135deg, #1a0a00 0%, #2d1507 30%, #0f0800 70%, #1a0e00 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}

/* ── Canvas ───────────────────────────────────────────────── */
.particle-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* ── Floating petals ──────────────────────────────────────── */
.petals-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.petal {
  position: absolute;
  animation: petalFall linear infinite;
  transform-origin: center center;
}

@keyframes petalFall {
  0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: var(--o, 0.7); }
  50%  { transform: translateY(60vh) translateX(40px) rotate(180deg) scale(0.8); }
  100% { transform: translateY(120vh) translateX(-20px) rotate(360deg) scale(0.5); opacity: 0; }
}

/* ── Sunburst ─────────────────────────────────────────────── */
.sunburst {
  position: absolute;
  width: min(700px, 110vw);
  height: min(700px, 110vw);
  animation: sunRotate 25s linear infinite;
  pointer-events: none;
}

@keyframes sunRotate {
  to { transform: rotate(360deg); }
}

/* ── Glow rings ───────────────────────────────────────────── */
.glow-ring {
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  border: 1.5px solid rgba(253, 224, 71, 0.18);
  animation: ringPulse 3s ease-in-out infinite;
  pointer-events: none;
}
.glow-ring--2 {
  width: 420px; height: 420px;
  border-color: rgba(253, 224, 71, 0.10);
  animation-delay: -1s;
}
.glow-ring--3 {
  width: 520px; height: 520px;
  border-color: rgba(253, 224, 71, 0.06);
  animation-delay: -2s;
}

@keyframes ringPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.06); opacity: 0.5; }
}

/* ── Main content ─────────────────────────────────────────── */
.splash-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.9s cubic-bezier(.22,1,.36,1), transform 0.9s cubic-bezier(.22,1,.36,1);
}

.splash-content.content-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Flower ───────────────────────────────────────────────── */
.flower-container {
  margin-bottom: -8px;
  animation: flowerFloat 4s ease-in-out infinite;
  filter: drop-shadow(0 0 32px rgba(253,224,71,0.45)) drop-shadow(0 0 64px rgba(250,204,21,0.2));
}

@keyframes flowerFloat {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50%       { transform: translateY(-14px) rotate(2deg); }
}

.hero-flower {
  width: clamp(120px, 25vw, 180px);
  height: clamp(120px, 25vw, 180px);
  animation: petalSpin 18s linear infinite;
}

@keyframes petalSpin {
  to { transform: rotate(360deg); }
}

/* ── Text ─────────────────────────────────────────────────── */
.text-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin: 20px 0 28px;
}

.eyebrow {
  font-family: 'Georgia', serif;
  font-size: clamp(11px, 2vw, 13px);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(253, 224, 71, 0.55);
  margin: 0;
}

.hero-title {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.05;
}

.title-line {
  display: block;
  font-family: 'Georgia', 'Times New Roman', serif;
  font-weight: 700;
  color: #FDE047;
  text-shadow: 0 0 40px rgba(253,224,71,0.6), 0 0 80px rgba(250,204,21,0.3);
  animation: titleGlow 3s ease-in-out infinite;
}

.title-line--1 {
  font-size: clamp(32px, 7vw, 56px);
  color: #FEF9C3;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideInLeft 0.8s 0.4s cubic-bezier(.22,1,.36,1) forwards,
             titleGlow 3s 1s ease-in-out infinite;
}

.title-line--2 {
  font-size: clamp(38px, 9vw, 72px);
  opacity: 0;
  transform: translateX(20px);
  animation: slideInRight 0.8s 0.65s cubic-bezier(.22,1,.36,1) forwards,
             titleGlow 3s 1.2s ease-in-out infinite;
}

@keyframes slideInLeft {
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slideInRight {
  to { opacity: 1; transform: translateX(0); }
}
@keyframes titleGlow {
  0%, 100% { text-shadow: 0 0 40px rgba(253,224,71,0.6), 0 0 80px rgba(250,204,21,0.3); }
  50%       { text-shadow: 0 0 60px rgba(253,224,71,0.9), 0 0 120px rgba(250,204,21,0.5); }
}

.subtitle {
  font-family: 'Georgia', serif;
  font-size: clamp(14px, 2.5vw, 17px);
  color: rgba(254, 249, 195, 0.7);
  margin: 0;
  letter-spacing: 0.03em;
  opacity: 0;
  animation: fadeUp 0.8s 1s cubic-bezier(.22,1,.36,1) forwards;
}

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
  from { opacity: 0; transform: translateY(10px); }
}

/* ── CTA Button ───────────────────────────────────────────── */
.cta-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  border-radius: 100px;
  border: 1.5px solid rgba(253, 224, 71, 0.6);
  background: rgba(253, 224, 71, 0.08);
  color: #FDE047;
  font-family: 'Georgia', serif;
  font-size: clamp(15px, 2.5vw, 18px);
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s, transform 0.2s;
  opacity: 0;
  animation: fadeUp 0.8s 1.3s cubic-bezier(.22,1,.36,1) forwards;
  backdrop-filter: blur(4px);
}

.cta-btn:hover {
  background: rgba(253, 224, 71, 0.18);
  border-color: #FDE047;
  transform: scale(1.04);
}

.cta-arrow {
  display: inline-block;
  transition: transform 0.3s;
}

.cta-btn:hover .cta-arrow {
  transform: translateX(5px);
}

.cta-shimmer {
  position: absolute;
  top: 0; left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 60%, transparent 80%);
  animation: shimmer 3s 2s ease-in-out infinite;
}

@keyframes shimmer {
  to { left: 200%; }
}

/* ── Skip hint ────────────────────────────────────────────── */
.skip-hint {
  margin-top: 18px;
  font-size: 12px;
  color: rgba(253, 224, 71, 0.3);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.2s;
  opacity: 0;
  animation: fadeUp 0.6s 1.8s ease forwards;
}

.skip-hint:hover {
  color: rgba(253, 224, 71, 0.6);
}

/* ── Corner flowers ───────────────────────────────────────── */
.corner {
  position: absolute;
  pointer-events: none;
  animation: cornerSway 5s ease-in-out infinite;
}

.corner--tl { top: 12px; left: 12px; }
.corner--br { bottom: 12px; right: 12px; transform: rotate(180deg); }

@keyframes cornerSway {
  0%, 100% { transform: rotate(0deg); }
  50%       { transform: rotate(5deg); }
}

.corner--br {
  animation: cornerSwayBr 5s 1.5s ease-in-out infinite;
}

@keyframes cornerSwayBr {
  0%, 100% { transform: rotate(180deg); }
  50%       { transform: rotate(175deg); }
}

/* ── Exit transition ──────────────────────────────────────── */
.splash-exit-leave-active {
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(.4,0,1,1);
}

.splash-exit-leave-to {
  opacity: 0;
  transform: scale(1.06);
}
</style>