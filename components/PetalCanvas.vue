<template>
  <canvas ref="canvasRef" class="petal-canvas" aria-hidden="true"></canvas>
</template>

<script setup lang="ts">
/**
 * Pétalos que caen. Decorativo.
 * - No se anima si la persona pidió «reducir movimiento».
 * - Se pausa cuando la pestaña está oculta o el lienzo sale de pantalla (ahorra batería).
 * - Un único motor reutilizado en todas las páginas (antes había una copia muerta en index.vue).
 */
const props = withDefaults(defineProps<{ cantidad?: number }>(), { cantidad: 26 })

const canvasRef = ref<HTMLCanvasElement>()
let raf = 0
let cleanup: (() => void) | null = null

interface Petal { x: number; y: number; vx: number; vy: number; rot: number; vrot: number; alpha: number; color: string; size: number }

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const colores = ['#f0cdd4', '#e9a0b4', '#f7e4e6', '#e3c47c', '#dfe8d6']
  let petals: Petal[] = []
  let frame = 0
  let visible = true

  const resize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  const spawn = (): Petal => ({
    x: Math.random() * (canvas.width || 300),
    y: -20,
    vx: (Math.random() - 0.5) * 0.5,
    vy: Math.random() * 0.5 + 0.3,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.02,
    alpha: Math.random() * 0.4 + 0.2,
    color: colores[Math.floor(Math.random() * colores.length)],
    size: Math.random() * 6 + 3,
  })

  resize()
  for (let i = 0; i < props.cantidad; i++) {
    const p = spawn()
    p.y = Math.random() * (canvas.height || 300)
    petals.push(p)
  }

  function draw() {
    if (!visible || document.hidden) { raf = 0; return }
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
    frame++
    if (frame % 45 === 0 && petals.length < props.cantidad + 14) petals.push(spawn())
    petals.forEach((p, idx) => {
      p.x += p.vx + Math.sin(frame * 0.01 + idx) * 0.12
      p.y += p.vy
      p.rot += p.vrot
      if (p.y > canvas!.height + 20) { petals[idx] = spawn(); return }
      ctx!.save()
      ctx!.globalAlpha = p.alpha
      ctx!.translate(p.x, p.y)
      ctx!.rotate(p.rot)
      ctx!.fillStyle = p.color
      ctx!.beginPath()
      ctx!.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2)
      ctx!.fill()
      ctx!.restore()
    })
    raf = requestAnimationFrame(draw)
  }
  const arrancar = () => { if (!raf) raf = requestAnimationFrame(draw) }

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) arrancar() })
  io.observe(canvas)
  const onVis = () => { if (!document.hidden) arrancar() }
  document.addEventListener('visibilitychange', onVis)
  window.addEventListener('resize', resize, { passive: true })
  arrancar()

  cleanup = () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    document.removeEventListener('visibilitychange', onVis)
    window.removeEventListener('resize', resize)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<style scoped>
.petal-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
