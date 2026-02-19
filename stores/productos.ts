import { defineStore } from 'pinia'

// ──────────────────────────────────────────
//  Types
// ──────────────────────────────────────────
export interface Tamano {
  value: string
  label: string
  flores: string
  precio: number          // precio específico por tamaño
}

export interface Ramo {
  id: number
  nombre: string
  descripcion: string
  precio: number
  imagen_url: string
  imagenes: string[]       // carrusel con 3 imágenes distintas del ramo
  categoria: 'Rosa' | 'Blanco' | 'Mixto' | 'Especial' | string
  disponible: boolean
  destacado?: boolean
  tamanos: Tamano[]
}

// ──────────────────────────────────────────
//  Store
// ──────────────────────────────────────────
export const useProductosStore = defineStore('productos', () => {

  const ramos = ref<Ramo[]>([
    {
      id: 1,
      nombre: 'Jardín Margaritas',
      descripcion:
        'Ramillete de flores blancas (color opcional) con pétalos suaves y delicados como copos de nieve que caen suavemente, un regalo de pureza y serenidad, un símbolo de esperanza y renovación.',
      precio: 60000,          // precio del tamaño más pequeño
      imagen_url: '/JardinMargaritas1.jpeg',
      imagenes: [
        '/JardinMargaritas1.jpeg',
        '/JardinMargaritas2.jpeg',
        '/JardinMargaritas3.jpeg',
      ],
      categoria: 'Margaritas',
      disponible: true,
      destacado: true,
      tamanos: [
        { value: 'pequeno',  label: 'Pequeño',  flores: '6 flores',   precio: 60000  },
        { value: 'mediano',  label: 'Mediano',  flores: '12 flores',  precio: 80000  },
        { value: 'grande',   label: 'Grande',   flores: '20 flores',  precio: 100000  },
      ],
    },
    {
      id: 2,
      nombre: 'Delirio',
      descripcion:
        'No tiene xd',
      precio: 100000,
      imagen_url: '/Delirio1.jpeg',
      imagenes: [
        '/Delirio1.jpeg',
        '/Delirio2.jpeg',
      ],
      categoria: 'Lirios',
      disponible: true,
      destacado: true,
      tamanos: [
        { value: 'pequeno',  label: 'Pequeño',  flores: '6 flores',   precio: 100000  },
        { value: 'mediano',  label: 'Grande',  flores: '12 flores',  precio: 120000  },
      ],
    },
    {
      id: 3,
      nombre: 'Encanto',
      descripcion:
        'Un delicado juego de flores que transmite dulzura, calma y elegancia. Ideal para expresar cariño sincero.',
      precio: 100000,
      imagen_url: '/Encanto1.jpeg',
      imagenes: [
        '/Encanto1.jpeg',
        '/Encanto2.jpeg',
        '/Encanto3.jpeg',
        '/Encanto4.jpeg',
      ],
      categoria: 'Mixto',
      disponible: true,
      destacado: false,
      tamanos: [
        { value: 'pequeno',  label: '2 Colores',  flores: '6 flores',   precio: 100000 },
        { value: 'mediano',  label: '3 Colores',  flores: '12 flores',  precio: 130000 },
        { value: 'grande',   label: '4 Colores',   flores: '20 flores',  precio: 160000 },
      ],
    },
  ])

  const carritoItems = ref<{ ramo: Ramo; cantidad: number; tamano: Tamano }[]>([])
  const categoriaActiva = ref<string>('Todos')
  const busqueda = ref<string>('')

  // ── Getters ────────────────────────────
  const ramosFiltrados = computed(() => {
    let lista = ramos.value
    if (categoriaActiva.value !== 'Todos') {
      lista = lista.filter((r) => r.categoria === categoriaActiva.value)
    }
    if (busqueda.value.trim()) {
      const q = busqueda.value.toLowerCase()
      lista = lista.filter(
        (r) =>
          r.nombre.toLowerCase().includes(q) ||
          r.descripcion.toLowerCase().includes(q),
      )
    }
    return lista
  })

  const ramoDestacados = computed(() => ramos.value.filter((r) => r.destacado))

  const categorias = computed(() => {
    const cats = [...new Set(ramos.value.map((r) => r.categoria))]
    return ['Todos', ...cats]
  })

  const totalCarrito = computed(() =>
    carritoItems.value.reduce(
      (acc, item) => acc + item.tamano.precio * item.cantidad,
      0,
    ),
  )

  const cantidadCarrito = computed(() =>
    carritoItems.value.reduce((acc, item) => acc + item.cantidad, 0),
  )

  // ── Actions ────────────────────────────
  function agregarAlCarrito(ramo: Ramo, tamano?: Tamano) {
    // Si no se pasa tamaño, usa el mediano por defecto
    const tamanoFinal = tamano ?? ramo.tamanos.find(t => t.value === 'mediano') ?? ramo.tamanos[0]
    const existing = carritoItems.value.find(
      (i) => i.ramo.id === ramo.id && i.tamano.value === tamanoFinal.value
    )
    if (existing) {
      existing.cantidad++
    } else {
      carritoItems.value.push({ ramo, cantidad: 1, tamano: tamanoFinal })
    }
  }

  function quitarDelCarrito(ramoId: number, tamanoValue?: string) {
    const idx = carritoItems.value.findIndex(
      (i) => i.ramo.id === ramoId && (!tamanoValue || i.tamano.value === tamanoValue)
    )
    if (idx !== -1) {
      if (carritoItems.value[idx].cantidad > 1) {
        carritoItems.value[idx].cantidad--
      } else {
        carritoItems.value.splice(idx, 1)
      }
    }
  }

  function vaciarCarrito() {
    carritoItems.value = []
  }

  function getRamoById(id: number): Ramo | undefined {
    return ramos.value.find((r) => r.id === id)
  }

  function setCategoriaActiva(cat: string) {
    categoriaActiva.value = cat
  }

  function formatPrecio(precio: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(precio)
  }

  return {
    ramos,
    carritoItems,
    categoriaActiva,
    busqueda,
    ramosFiltrados,
    ramoDestacados,
    categorias,
    totalCarrito,
    cantidadCarrito,
    agregarAlCarrito,
    quitarDelCarrito,
    vaciarCarrito,
    getRamoById,
    setCategoriaActiva,
    formatPrecio,
  }
})