import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// ──────────────────────────────────────────
//  Types
// ──────────────────────────────────────────
export type CategoriaFlor = 'flor_principal' | 'follaje' | 'extra'

export interface FloresCatalogo {
  id: string
  nombre: string
  categoria: CategoriaFlor
  precio_unidad: number | null // null = PENDIENTE confirmar con negocio
  emoji: string
  color: string
  cantidad_minima: number
  cantidad_maxima: number
  pendiente?: boolean // marcado si precio aún no confirmado
}

export interface Envoltura {
  id: string
  nombre: string
  color: string
  precio: number
}

export interface Mono {
  id: string
  nombre: string
  color: string
  precio: number
}

// ──────────────────────────────────────────
//  Catálogo de flores para el editor
// ──────────────────────────────────────────
export const FLORES_EDITOR: FloresCatalogo[] = [
  {
    id: 'rosa', nombre: 'Rosa', categoria: 'flor_principal',
    precio_unidad: 7000, emoji: '🌹', color: '#e8a0b0',
    cantidad_minima: 1, cantidad_maxima: 50,
  },
  {
    id: 'lirio', nombre: 'Lirio', categoria: 'flor_principal',
    precio_unidad: 8000, emoji: '🌸', color: '#d4b8e0',
    cantidad_minima: 1, cantidad_maxima: 20,
  },
  {
    id: 'gerbera', nombre: 'Gerbera', categoria: 'flor_principal',
    precio_unidad: 4000, emoji: '🌼', color: '#f5c842',
    cantidad_minima: 1, cantidad_maxima: 30,
  },
  {
    id: 'clavel', nombre: 'Clavel', categoria: 'flor_principal',
    precio_unidad: 3000, emoji: '🌺', color: '#f08080',
    cantidad_minima: 1, cantidad_maxima: 40,
  },
  {
    id: 'girasol', nombre: 'Girasol', categoria: 'flor_principal',
    precio_unidad: null, emoji: '🌻', color: '#f5d020', // VERIFICAR precio
    cantidad_minima: 1, cantidad_maxima: 20, pendiente: true,
  },
  {
    id: 'minirosa', nombre: 'Minirosa', categoria: 'flor_principal',
    precio_unidad: null, emoji: '🌷', color: '#f9b8c8', // VERIFICAR precio
    cantidad_minima: 1, cantidad_maxima: 60, pendiente: true,
  },
  {
    id: 'margarita', nombre: 'Margarita', categoria: 'flor_principal',
    precio_unidad: null, emoji: '🌼', color: '#ffffff', // VERIFICAR precio
    cantidad_minima: 1, cantidad_maxima: 40, pendiente: true,
  },
  {
    id: 'pompon', nombre: 'Pompón', categoria: 'flor_principal',
    precio_unidad: null, emoji: '🪻', color: '#b8a4e0', // VERIFICAR precio
    cantidad_minima: 1, cantidad_maxima: 30, pendiente: true,
  },
]

export const ENVOLTURAS: Envoltura[] = [
  { id: 'coreano-rosa',   nombre: 'Papel coreano rosa',    color: '#ffc5d5', precio: 0 },
  { id: 'coreano-blanco', nombre: 'Papel coreano blanco',  color: '#f5f0eb', precio: 0 },
  { id: 'coreano-verde',  nombre: 'Papel coreano verde',   color: '#c8e6c9', precio: 0 },
  { id: 'negro',          nombre: 'Papel negro elegante',  color: '#2c2c2c', precio: 0 },
]

export const MONOS: Mono[] = [
  { id: 'raso-rosa',    nombre: 'Moño raso rosa',   color: '#f48fb1', precio: 0 },
  { id: 'raso-blanco',  nombre: 'Moño raso blanco', color: '#f5f0eb', precio: 0 },
  { id: 'raso-rojo',    nombre: 'Moño raso rojo',   color: '#e53935', precio: 0 },
  { id: 'raso-dorado',  nombre: 'Moño dorado',      color: '#ffd54f', precio: 0 },
]

// Mapa de total de flores → tamaño aproximado
const MAPA_TAMANO = [
  { min: 1,  max: 3,  codigo: 'XS', nombre: 'Extra Pequeño',  descripcion: 'Detalle sutil' },
  { min: 4,  max: 8,  codigo: 'S',  nombre: 'Pequeño',        descripcion: 'Detalle encantador' },
  { min: 9,  max: 20, codigo: 'M',  nombre: 'Mediano',        descripcion: 'Perfecto para cualquier ocasión' },
  { min: 21, max: 40, codigo: 'L',  nombre: 'Grande',         descripcion: 'Más flores, más emoción' },
  { min: 41, max: 80, codigo: 'XL', nombre: 'Extra Grande',   descripcion: 'Impacta y sorprende' },
  { min: 81, max: Infinity, codigo: 'XXL', nombre: 'Premium', descripcion: 'El más espectacular' },
]

// ──────────────────────────────────────────
//  Store del editor
// ──────────────────────────────────────────
export const useEditorStore = defineStore('editor', () => {
  // Flores seleccionadas: Map de id → cantidad
  const seleccion = ref<Map<string, number>>(new Map())

  const envolturaSeleccionada = ref<string>(ENVOLTURAS[0].id)
  const monoSeleccionado = ref<string>(MONOS[0].id)

  // ── Getters ────────────────────────────
  const floresActivas = computed(() => {
    const result: { flor: FloresCatalogo; cantidad: number }[] = []
    for (const [id, cantidad] of seleccion.value.entries()) {
      if (cantidad > 0) {
        const flor = FLORES_EDITOR.find(f => f.id === id)
        if (flor) result.push({ flor, cantidad })
      }
    }
    return result
  })

  const totalFlores = computed(() =>
    [...seleccion.value.values()].reduce((a, b) => a + b, 0)
  )

  const envoltura = computed(() =>
    ENVOLTURAS.find(e => e.id === envolturaSeleccionada.value) ?? ENVOLTURAS[0]
  )

  const mono = computed(() =>
    MONOS.find(m => m.id === monoSeleccionado.value) ?? MONOS[0]
  )

  const precioTotal = computed(() => {
    let total = 0
    for (const { flor, cantidad } of floresActivas.value) {
      if (flor.precio_unidad !== null) {
        total += flor.precio_unidad * cantidad
      }
    }
    total += envoltura.value.precio
    total += mono.value.precio
    return total
  })

  const tienePrecioIncompleto = computed(() =>
    floresActivas.value.some(({ flor }) => flor.precio_unidad === null)
  )

  const tamanoAproximado = computed(() => {
    const n = totalFlores.value
    return MAPA_TAMANO.find(t => n >= t.min && n <= t.max) ?? MAPA_TAMANO[0]
  })

  // Lista expandida de flores en orden de inserción (para renderizar en lienzo)
  // Intercalada para que no queden bloques del mismo tipo
  const floresParaLienzo = computed(() => {
    // Crea un array con todas las flores individuales mezcladas
    const grupos = floresActivas.value.map(({ flor, cantidad }) =>
      Array.from({ length: cantidad }, (_, i) => ({ flor, idx: i }))
    )
    // Round-robin: toma 1 de cada grupo en turno
    const resultado: { flor: FloresCatalogo; variantIdx: number }[] = []
    let seguir = true
    let turno = 0
    while (seguir) {
      seguir = false
      for (const grupo of grupos) {
        if (turno < grupo.length) {
          resultado.push({ flor: grupo[turno].flor, variantIdx: turno })
          seguir = true
        }
      }
      turno++
    }
    return resultado
  })

  // ── Actions ────────────────────────────
  function setCantidad(id: string, cantidad: number) {
    const flor = FLORES_EDITOR.find(f => f.id === id)
    if (!flor) return
    const val = Math.max(0, Math.min(cantidad, flor.cantidad_maxima))
    if (val === 0) {
      seleccion.value.delete(id)
    } else {
      seleccion.value.set(id, val)
    }
    // Forzar reactividad del Map
    seleccion.value = new Map(seleccion.value)
  }

  function getCantidad(id: string): number {
    return seleccion.value.get(id) ?? 0
  }

  function incrementar(id: string) {
    setCantidad(id, getCantidad(id) + 1)
  }

  function decrementar(id: string) {
    setCantidad(id, getCantidad(id) - 1)
  }

  function limpiar() {
    seleccion.value = new Map()
  }

  function formatPrecio(precio: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP', minimumFractionDigits: 0,
    }).format(precio)
  }

  return {
    seleccion,
    envolturaSeleccionada,
    monoSeleccionado,
    floresActivas,
    totalFlores,
    envoltura,
    mono,
    precioTotal,
    tienePrecioIncompleto,
    tamanoAproximado,
    floresParaLienzo,
    setCantidad,
    getCantidad,
    incrementar,
    decrementar,
    limpiar,
    formatPrecio,
  }
})
