<template>
  <canvas ref="canvasRef" class="petal-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()
let animationFrameId: number | null = null
let resizeHandler: (() => void) | null = null

interface Petal {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vrot: number
  alpha: number
  color: string
  size: number
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let petals: Petal[] = []
  const colors = ['#ffc5d5', '#f25480', '#ffb3c6', '#ffd6e0', '#e8d5ff', '#ffeaa8']

  function resize() {
    if (!canvas) return
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }

  function spawn(): Petal {
    return {
      x: Math.random() * (canvas?.width || 300),
      y: -20,
      vx: (Math.random() - 0.5) * 0.5,
      vy: Math.random() * 0.5 + 0.3,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.02,
      alpha: Math.random() * 0.4 + 0.15,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
    }
  }

  resize()
  for (let i = 0; i < 26; i++) {
    const p = spawn()
    p.y = Math.random() * (canvas.height || 300)
    petals.push(p)
  }

  let frame = 0
  function draw() {
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    frame++
    if (frame % 45 === 0 && petals.length < 40) {
      petals.push(spawn())
    }
    petals.forEach((p, idx) => {
      p.x += p.vx + Math.sin(frame * 0.01 + idx) * 0.12
      p.y += p.vy
      p.rot += p.vrot
      if (p.y > canvas.height + 20) {
        petals[idx] = spawn()
        return
      }
      ctx.save()
      ctx.globalAlpha = p.alpha
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    })
    animationFrameId = requestAnimationFrame(draw)
  }

  resizeHandler = resize
  window.addEventListener('resize', resizeHandler)
  draw()
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
})
</script>

<style scoped>
.petal-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}
</style>
