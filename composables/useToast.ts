/** Aviso breve global (reemplaza 3 implementaciones duplicadas en index, catálogo y ficha). */
interface ToastState {
  visible: boolean
  mensaje: string
  accion?: { label: string; fn: () => void }
}

let timer: ReturnType<typeof setTimeout> | undefined

export function useToast() {
  const toast = useState<ToastState>('toast', () => ({ visible: false, mensaje: '' }))

  function mostrar(mensaje: string, accion?: ToastState['accion'], ms = 3600) {
    if (timer) clearTimeout(timer)
    toast.value = { visible: true, mensaje, accion }
    timer = setTimeout(() => { toast.value.visible = false }, ms)
  }
  function ocultar() {
    if (timer) clearTimeout(timer)
    toast.value.visible = false
  }
  return { toast, mostrar, ocultar }
}
