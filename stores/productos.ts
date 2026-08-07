import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// ──────────────────────────────────────────
//  Types
// ──────────────────────────────────────────
export interface Tamano {
  value: string
  label: string
  flores: string
  precio: number
}

export interface VariantePrecio {
  etiqueta: string
  tamano: string
  precio: number
}

export interface ExtraOpcional {
  nombre: string
  precio: number | null
}

export type Categoria = 'rosas' | 'girasoles' | 'lirios' | 'mixtos'

export interface Ramo {
  id: number
  slug: string
  nombre: string
  categoria: Categoria | string
  descripcion: string
  detalle?: string
  incluye?: string[]
  tamanoTexto?: string
  variantes_precio?: VariantePrecio[]
  precio_base?: number
  colores_disponibles?: string
  extras_opcionales?: ExtraOpcional[]
  imagenes: string[]
  imagen_url: string
  disponible: boolean
  destacado?: boolean
  insignia?: boolean
  tags_busqueda: string[]
  tamanos: Tamano[]
  precio: number
}

// ──────────────────────────────────────────
//  Helpers
// ──────────────────────────────────────────
function precioMinimo(r: Omit<Ramo, 'precio' | 'tamanos'>): number {
  if (r.variantes_precio && r.variantes_precio.length > 0) {
    return Math.min(...r.variantes_precio.map((v) => v.precio))
  }
  return r.precio_base ?? 0
}

function buildTamanos(r: Omit<Ramo, 'precio' | 'tamanos'>): Tamano[] {
  if (r.variantes_precio && r.variantes_precio.length > 0) {
    return r.variantes_precio.map((v, i) => ({
      value: `v${i}`,
      label: v.etiqueta,
      flores: v.etiqueta,
      precio: v.precio,
    }))
  }
  return [
    {
      value: 'unico',
      label: r.tamanoTexto ?? 'Único',
      flores: r.tamanoTexto ?? '',
      precio: r.precio_base ?? 0,
    },
  ]
}

function makeRamo(base: Omit<Ramo, 'precio' | 'tamanos'>): Ramo {
  return {
    ...base,
    precio: precioMinimo(base),
    tamanos: buildTamanos(base),
  }
}

// Placeholder para ramos sin foto real todavía
const PH = '/regocijo.png'

// ──────────────────────────────────────────
//  Dataset — 26 ramos del catálogo PDF
// ──────────────────────────────────────────
const RamosData: Ramo[] = [
  makeRamo({
    id: 1, slug: 'doble-amor', nombre: 'Doble Amor', categoria: 'rosas',
    descripcion: '2 rosas del color de su preferencia con un toque de gipsofila blanca.',
    tamanoTexto: 'XS', precio_base: 20000,
    colores_disponibles: 'Color de su preferencia',
    imagenes: [PH], imagen_url: PH, disponible: true,
    tags_busqueda: ['rosas', 'detalle pequeño', 'economico'],
  }),
  makeRamo({
    id: 2, slug: 'tres-latidos', nombre: 'Tres Latidos', categoria: 'rosas',
    descripcion: '3 rosas del color de su preferencia, con un toque de gipsofila blanca.',
    tamanoTexto: 'XS', precio_base: 25000,
    colores_disponibles: 'Color de su preferencia',
    imagenes: [PH], imagen_url: PH, disponible: true,
    tags_busqueda: ['rosas', 'detalle pequeño'],
  }),
  makeRamo({
    id: 3, slug: 'dulce-romance', nombre: 'Dulce Romance', categoria: 'rosas',
    descripcion: '5 rosas del color de su preferencia, con un toque de gipsofila blanca y follaje.',
    tamanoTexto: 'S', precio_base: 50000,
    colores_disponibles: 'Color de su preferencia',
    imagenes: [PH], imagen_url: PH, disponible: true,
    tags_busqueda: ['rosas', 'romantico'],
  }),
  makeRamo({
    id: 4, slug: 'pasion-eterna', nombre: 'Pasión Eterna', categoria: 'rosas',
    descripcion: 'Bouquet de rosas redondo rodeado de gipsofila. Color de su preferencia. Mariposas doradas.',
    detalle: 'Dos colores de rosas a partir de las 40 unidades.',
    variantes_precio: [
      { etiqueta: '20 rosas', tamano: 'S', precio: 80000 },
      { etiqueta: '40 rosas', tamano: 'M', precio: 140000 },
      { etiqueta: '60 rosas', tamano: 'L', precio: 190000 },
      { etiqueta: '80 rosas', tamano: 'L2', precio: 250000 },
      { etiqueta: '100 rosas', tamano: 'XL', precio: 340000 },
    ],
    colores_disponibles: 'Color de su preferencia; 2 colores desde 40 unidades',
    imagenes: ['/pasioneterna1.jpg', '/pasioneterna2.jpg', '/pasioneterna3.jpg', '/pasioneterna4.jpg', '/pasioneterna5.jpg', '/pasioneterna6.jpg', '/pasioneterna7.jpg', '/pasioneterna8.jpg', '/pasioneterna9.jpg'],
    imagen_url: '/pasioneterna1.jpg',
    disponible: true,
    tags_busqueda: ['rosas', 'grande', 'mariposas', 'premium'],
  }),
  makeRamo({
    id: 5, slug: 'pasion-pura', nombre: 'Pasión Pura', categoria: 'rosas',
    descripcion: 'Bouquet de rosas en diseño vertical. Color de su preferencia.',
    detalle: 'Dos colores de rosas a partir de las 40 unidades.',
    variantes_precio: [
      { etiqueta: '10 rosas', tamano: 'S', precio: 70000 },
      { etiqueta: '20 rosas', tamano: 'M', precio: 90000 },
      { etiqueta: '40 rosas', tamano: 'L', precio: 140000 },
    ],
    colores_disponibles: 'Color de su preferencia; 2 colores desde 40 unidades',
    imagenes: ['/pasionpura1.jpg', '/pasionpura2.jpg', '/pasionpura3.jpg', '/pasionpura4.jpg', '/pasionpura5.jpg', '/pasionpura6.jpg', '/pasionpura7.jpg'],
    imagen_url: '/pasionpura1.jpg',
    disponible: true,
    tags_busqueda: ['rosas', 'vertical'],
  }),
  makeRamo({
    id: 6, slug: 'velvet-kiss', nombre: 'Velvet Kiss', categoria: 'mixtos',
    descripcion: 'Arreglo de rosas en caja de corazón con maquillajes.',
    tamanoTexto: 'M', precio_base: 210000,
    incluye: ['Brillo Labial (Atenea/Anik)', 'Blush (Atenea)', 'Beauty blender', 'Pestañina (Prosa)', 'Pinzas de cabello'],
    colores_disponibles: 'Color de su preferencia',
    imagenes: ['/velvetkiss1.jpg', '/velvetkiss2.jpg'],
    imagen_url: '/velvetkiss1.jpg',
    disponible: true,
    tags_busqueda: ['caja corazon', 'regalo', 'maquillaje', 'rosas'],
  }),
  makeRamo({
    id: 7, slug: 'susurro-de-rosas', nombre: 'Susurro de Rosas', categoria: 'rosas',
    descripcion: 'Bouquet con minirosas, follaje y un toque de gipsofila.',
    detalle: 'Las minirosas tienen flores de menor tamaño y varios botones por tallo.',
    variantes_precio: [
      { etiqueta: '1 color', tamano: 'S', precio: 70000 },
      { etiqueta: '2 colores', tamano: 'S', precio: 90000 }, // VERIFICAR precio 2 colores
    ],
    extras_opcionales: [{ nombre: 'Lirio adicional', precio: 8000 }],
    imagenes: ['/susurroderosas1.jpg'],
    imagen_url: '/susurroderosas1.jpg',
    disponible: true,
    tags_busqueda: ['minirosas', 'rosas'],
  }),
  makeRamo({
    id: 8, slug: 'royal-princess', nombre: 'Royal Princess', categoria: 'rosas',
    descripcion: 'Bouquet de 150 rosas, lirios y flores complementarias, listón con mensaje y mariposas. Color de su preferencia.', // VERIFICAR 3a flor
    tamanoTexto: 'XXL', precio_base: 480000,
    colores_disponibles: 'Color de su preferencia',
    imagenes: ['/royalprincess1.jpg', '/royalprincess2.jpg', '/royalprincess3.jpg'],
    imagen_url: '/royalprincess1.jpg',
    disponible: true, destacado: true,
    tags_busqueda: ['premium', 'cumpleaños', 'xxl', 'lujo', 'rosas'],
  }),
  makeRamo({
    id: 9, slug: 'love', nombre: 'Love', categoria: 'rosas',
    descripcion: 'Bouquet de 40 rosas, gerberas, hortensias y lazos. Color de su preferencia.',
    tamanoTexto: 'XL', precio_base: 250000,
    colores_disponibles: 'Color de su preferencia',
    imagenes: ['/love1.jpg'],
    imagen_url: '/love1.jpg',
    disponible: true,
    tags_busqueda: ['rosas', 'gerberas', 'hortensias'],
  }),
  makeRamo({
    id: 10, slug: 'corazon-enamorado', nombre: 'Corazón Enamorado', categoria: 'rosas', // VERIFICAR nombre real
    descripcion: 'Arreglo de rosas rojas y blancas en forma de corazón. Incluye cinta personalizable.',
    tamanoTexto: 'XL', precio_base: 360000,
    imagenes: [PH], imagen_url: PH, disponible: true,
    tags_busqueda: ['rosas', 'corazon', 'propuesta', 'aniversario'],
  }),
  makeRamo({
    id: 11, slug: 'destello', nombre: 'Destello', categoria: 'girasoles',
    descripcion: '1 girasol envuelto en papel coreano.',
    tamanoTexto: 'XS', precio_base: 15000,
    imagenes: [PH], imagen_url: PH, disponible: true,
    tags_busqueda: ['girasoles', 'detalle pequeño'],
  }),
  makeRamo({
    id: 12, slug: 'resplandor', nombre: 'Resplandor', categoria: 'girasoles',
    descripcion: '3 girasoles con un toque de gipsofila blanca.',
    tamanoTexto: 'S', precio_base: 40000,
    imagenes: [PH], imagen_url: PH, disponible: true,
    tags_busqueda: ['girasoles'],
  }),
  makeRamo({
    id: 13, slug: 'rayo-de-sol', nombre: 'Rayo de Sol', categoria: 'girasoles',
    descripcion: '3 girasoles en diseño de cascada, con un toque de gipsofila blanca y follaje verde.',
    tamanoTexto: 'S', precio_base: 45000,
    imagenes: [PH], imagen_url: PH, disponible: true,
    tags_busqueda: ['girasoles'],
  }),
  makeRamo({
    id: 14, slug: 'amanecer', nombre: 'Amanecer', categoria: 'girasoles',
    descripcion: 'Bouquet de girasoles con follaje verde y toque de gipsofila.',
    variantes_precio: [
      { etiqueta: '5 girasoles', tamano: 'M', precio: 80000 },
      { etiqueta: '7 girasoles', tamano: 'L', precio: 110000 },
      { etiqueta: '10 girasoles', tamano: 'XL', precio: 140000 },
    ],
    extras_opcionales: [{ nombre: 'Girasol adicional', precio: 5000 }],
    imagenes: [PH], imagen_url: PH, disponible: true,
    tags_busqueda: ['girasoles'],
  }),
  makeRamo({
    id: 15, slug: 'lirio-individual', nombre: 'Lirio Individual / Trío de Lirios', categoria: 'lirios', // VERIFICAR si es ítem propio
    descripcion: 'Bouquet sencillo con lirio(s) blanco o rosa, envoltura elegante.',
    variantes_precio: [
      { etiqueta: '1 lirio', tamano: 'XS', precio: 15000 },
      { etiqueta: '3 lirios', tamano: 'S', precio: 45000 },
    ],
    imagenes: [PH], imagen_url: PH, disponible: true,
    tags_busqueda: ['lirios'],
  }),
  makeRamo({
    id: 16, slug: 'delirio', nombre: 'Delirio', categoria: 'lirios',
    descripcion: 'Bouquet de lirios en envoltura oscura elegante con moño rosa.',
    variantes_precio: [
      { etiqueta: '7 lirios', tamano: 'M', precio: 120000 },
      { etiqueta: '10 lirios', tamano: 'L', precio: 150000 },
    ],
    imagenes: ['/delirio1.jpg'],
    imagen_url: '/delirio1.jpg',
    disponible: true, destacado: true,
    tags_busqueda: ['lirios', 'elegante'],
  }),
  makeRamo({
    id: 17, slug: 'pequeno-jardin', nombre: 'Pequeño Jardín', categoria: 'mixtos',
    descripcion: 'Ramo mixto en diseño de cono con margaritas, pinocho, pompón, claveles y/o minirosas.',
    tamanoTexto: 'S', precio_base: 40000,
    imagenes: ['/pequeñojardin1.jpg'], imagen_url: '/pequeñojardin1.jpg',
    disponible: true,
    tags_busqueda: ['mixto', 'economico'],
  }),
  makeRamo({
    id: 18, slug: 'dulce-primavera', nombre: 'Dulce Primavera', categoria: 'mixtos',
    descripcion: 'Ramo mixto en diseño de cono con margaritas, pinocho, pompón, claveles, rosas y/o minirosas.',
    tamanoTexto: 'M', precio_base: 70000,
    imagenes: ['/dulceprimavera1.jpg', '/dulceprimavera2.jpg'],
    imagen_url: '/dulceprimavera1.jpg',
    disponible: true,
    tags_busqueda: ['mixto'],
  }),
  makeRamo({
    id: 19, slug: 'majestad-v1', nombre: 'Majestad (Versión 1)', categoria: 'mixtos',
    descripcion: 'Bouquet redondo mixto de claveles, margaritas, astromelias y un lirio.',
    tamanoTexto: 'M', precio_base: 90000,
    imagenes: [PH], imagen_url: PH, disponible: true,
    tags_busqueda: ['mixto'],
  }),
  makeRamo({
    id: 20, slug: 'majestad-v2', nombre: 'Majestad (Versión 2)', categoria: 'mixtos',
    descripcion: 'Bouquet redondo mixto de clavellina china, rosas y un lirio.',
    tamanoTexto: 'M', precio_base: 110000,
    imagenes: ['/v2majestad1.jpg', '/v2majestad2.jpg'], imagen_url: '/v2majestad1.jpg',
    disponible: true,
    tags_busqueda: ['mixto', 'rosas', 'lirios'],
  }),
  makeRamo({
    id: 21, slug: 'encanto', nombre: 'Encanto', categoria: 'mixtos',
    descripcion: 'Bouquet redondo mixto, disponible en 3 combinaciones de flores y tamaños.',
    variantes_precio: [
      { etiqueta: '2 tipos (minirosas y margaritas)', tamano: 'S', precio: 80000 },
      { etiqueta: '3 tipos (minirosas, margaritas y claveles)', tamano: 'M', precio: 90000 },
      { etiqueta: '4 tipos (margaritas, minirosas, claveles y pinochos)', tamano: 'L', precio: 100000 },
    ],
    imagenes: ['/encanto1.jpg', '/encanto2.jpg'], imagen_url: '/encanto1.jpg',
    disponible: true,
    tags_busqueda: ['mixto'],
  }),
  makeRamo({
    id: 22, slug: 'alma-radiante', nombre: 'Alma Radiante', categoria: 'mixtos',
    descripcion: 'Bouquet en diseño vertical con minirosas, claveles, margaritas y lirios.',
    tamanoTexto: 'M', precio_base: 150000,
    incluye: ['Caja de chocolates Ferrero Rocher'],
    extras_opcionales: [{ nombre: 'Chocolates adicionales', precio: null }],
    imagenes: ['/almaradiante1.jpg'],
    imagen_url: '/almaradiante1.jpg',
    disponible: true,
    tags_busqueda: ['mixto', 'chocolates', 'regalo'],
  }),
  makeRamo({
    id: 23, slug: 'dulzura', nombre: 'Dulzura', categoria: 'mixtos',
    descripcion: 'Bouquet en diseño vertical de margaritas, clavellina o clavel y gerberas.',
    tamanoTexto: 'M', precio_base: 90000,
    imagenes: [PH], imagen_url: PH, disponible: true,
    tags_busqueda: ['mixto', 'gerberas'],
  }),
  makeRamo({
    id: 24, slug: 'ternura', nombre: 'Ternura', categoria: 'mixtos',
    descripcion: 'Bouquet mixto en diseño vertical con margaritas, claveles y pinochos.',
    detalle: 'El valor del peluche es adicional al precio del ramo.',
    tamanoTexto: 'L y XL', precio_base: 120000,
    incluye: ['Peluche (Snoopy, oso u otro personaje, según disponibilidad)'],
    extras_opcionales: [{ nombre: 'Peluche', precio: null }],
    imagenes: ['/ternura1.jpg', '/ternura2.jpg', '/ternura3.jpg', '/ternura4.jpg', '/ternura5.jpg', '/ternura6.jpg'],
    imagen_url: '/ternura1.jpg',
    disponible: true,
    tags_busqueda: ['mixto', 'peluche', 'regalo', 'infantil'],
  }),
  makeRamo({
    id: 25, slug: 'regocijo', nombre: 'Regocijo', categoria: 'mixtos',
    descripcion: 'Bouquet con lirios, gerberas, minirosas o claveles, margaritas o pompón.',
    detalle: 'Los colores y flores pueden ser reemplazados por otros según disponibilidad.',
    tamanoTexto: 'XL', precio_base: 190000,
    imagenes: ['/regocijo.png', '/regocijoinfo.jpeg'],
    imagen_url: '/regocijo.png',
    disponible: true, destacado: true, insignia: true,
    tags_busqueda: ['insignia', 'mixto', 'lirios', 'gerberas'],
  }),
  makeRamo({
    id: 26, slug: 'rh', nombre: 'RH', categoria: 'mixtos', // VERIFICAR nombre completo
    descripcion: 'Arreglo en caja de corazón con gerberas, estatice, margaritas y clavellina.',
    tamanoTexto: 'L', precio_base: 180000,
    imagenes: ['/rh1.jpg', '/rh2.jpg', '/rh3.jpg'],
    imagen_url: '/rh1.jpg',
    disponible: true,
    tags_busqueda: ['caja corazon', 'mixto', 'gerberas'],
  }),
]

// ──────────────────────────────────────────
//  Flores adicionales (Mixtos)
// ──────────────────────────────────────────
export const FLORES_ADICIONALES = [
  { flor: 'Rosa', precio: 7000 },
  { flor: 'Lirio', precio: 8000 },
  { flor: 'Flor adicional', precio: 5000 }, // VERIFICAR nombre (tapado en PDF)
  { flor: 'Gerbera', precio: 4000 },
  { flor: 'Clavel', precio: 3000 },
  { flor: 'Tulipán', precio: 15000 },
]

// ──────────────────────────────────────────
//  Guía de tamaños
// ──────────────────────────────────────────
export const GUIA_TAMANOS = [
  { codigo: 'XS', nombre: 'Extra Small', descripcion: 'Pequeño detalle, transmite emociones sutiles' },
  { codigo: 'S',  nombre: 'Pequeño',     descripcion: 'Ideal para detalles sutiles' },
  { codigo: 'M',  nombre: 'Mediano',     descripcion: 'Perfecto para cualquier ocasión' },
  { codigo: 'L',  nombre: 'Grande',      descripcion: 'Más flores, más emociones' },
  { codigo: 'XL', nombre: 'Extra Grande',descripcion: 'Impacta, sorprende y enamora' },
  { codigo: 'XXL',nombre: 'Premium',     descripcion: 'El regalo más impresionante' },
]

// ──────────────────────────────────────────
//  Store
// ──────────────────────────────────────────
export const useProductosStore = defineStore('productos', () => {

  const ramos = ref<Ramo[]>(RamosData)
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
          r.descripcion.toLowerCase().includes(q) ||
          r.categoria.toLowerCase().includes(q) ||
          (r.tags_busqueda ?? []).some((t) => t.toLowerCase().includes(q)),
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
    carritoItems.value.reduce((acc: number, item) => acc + item.tamano.precio * item.cantidad, 0),
  )

  const cantidadCarrito = computed(() =>
    carritoItems.value.reduce((acc: number, item) => acc + item.cantidad, 0),
  )

  // ── Actions ────────────────────────────
  function agregarAlCarrito(ramo: Ramo, tamano?: Tamano) {
    const tamanoFinal = tamano ?? ramo.tamanos.find((t) => t.value === 'mediano') ?? ramo.tamanos[0]
    const existing = carritoItems.value.find(
      (i) => i.ramo.id === ramo.id && i.tamano.value === tamanoFinal.value,
    )
    if (existing) {
      existing.cantidad++
    } else {
      carritoItems.value.push({ ramo, cantidad: 1, tamano: tamanoFinal })
    }
  }

  function quitarDelCarrito(ramoId: number, tamanoValue?: string) {
    const idx = carritoItems.value.findIndex(
      (i) => i.ramo.id === ramoId && (!tamanoValue || i.tamano.value === tamanoValue),
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

  function getRamoBySlug(slug: string): Ramo | undefined {
    return ramos.value.find((r) => r.slug === slug)
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
    getRamoBySlug,
    setCategoriaActiva,
    formatPrecio,
  }
})