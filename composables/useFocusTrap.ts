import { nextTick, onBeforeUnmount, watch, type Ref } from 'vue'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Atrapa el foco dentro de un diálogo (cajón/menú), cierra con Escape,
 * bloquea el scroll del fondo y devuelve el foco al elemento que lo abrió.
 */
export function useFocusTrap(
  open: Ref<boolean>,
  container: Ref<HTMLElement | null | undefined>,
  close: () => void,
) {
  let previo: HTMLElement | null = null

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      close()
      return
    }
    if (e.key !== 'Tab' || !container.value) return
    const items = [...container.value.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null,
    )
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  watch(open, async (v) => {
    if (!import.meta.client) return
    if (v) {
      previo = document.activeElement as HTMLElement | null
      document.addEventListener('keydown', onKey)
      document.documentElement.style.overflow = 'hidden'
      await nextTick()
      const primero =
        container.value?.querySelector<HTMLElement>('[data-autofocus]') ??
        container.value?.querySelector<HTMLElement>(FOCUSABLE)
      primero?.focus()
    } else {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      previo?.focus?.()
    }
  })

  onBeforeUnmount(() => {
    if (!import.meta.client) return
    document.removeEventListener('keydown', onKey)
    document.documentElement.style.overflow = ''
  })
}
