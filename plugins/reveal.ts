/**
 * v-reveal — aparición suave al hacer scroll.
 * Mejora progresiva: en el servidor el contenido es visible (sin JS no se oculta nada) y solo se
 * oculta, al hidratar, lo que está por debajo del pliegue. Respeta prefers-reduced-motion.
 */
export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | null = null

  function observer() {
    if (io) return io
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const el = e.target as HTMLElement
          el.classList.remove('reveal--pending')
          el.classList.add('reveal--in')
          io!.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    return io
  }

  nuxtApp.vueApp.directive('reveal', {
    // SSR: no añadir nada → el HTML llega visible
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const delay = typeof binding.value === 'number' ? binding.value : 0
      el.style.setProperty('--reveal-delay', `${delay}ms`)
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92) return // ya visible: no parpadear
      el.classList.add('reveal--pending')
      observer().observe(el)
    },
    unmounted(el: HTMLElement) {
      io?.unobserve(el)
    },
  })
})
