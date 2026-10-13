import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// ──────────────────────────────────────────
//  Tipos
// ──────────────────────────────────────────
export interface Tamano {
  value: string
  label: string
  detalle: string
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

/** Slug de categoría (ahora dinámico: la administradora puede crear las suyas) */
export type Categoria = string

export interface CategoriaInfo {
  slug: string
  label: string
  /** Texto corto para la etiqueta de la tarjeta (p. ej. «Mixto» en singular) */
  singular: string
  orden: number
}

export interface Ramo {
  id: number
  slug: string
  nombre: string
  categoria: Categoria
  descripcion: string
  detalle?: string
  incluye?: string[]
  tamanoTexto?: string
  variantes_precio?: VariantePrecio[]
  precio_base?: number
  colores_disponibles?: string
  extras_opcionales?: ExtraOpcional[]
  /** Fotos reales. Vacío = aún no hay foto (se muestra un estado vacío elegante, no el logo). */
  imagenes: string[]
  /** Primera foto, o null si el ramo aún no tiene foto */
  imagen_url: string | null
  disponible: boolean
  destacado?: boolean
  insignia?: boolean
  tags_busqueda: string[]
  tamanos: Tamano[]
  precio: number
  /** true si el precio es "desde" (hay varias variantes de precio) */
  precioDesde: boolean
}

export interface CartItem {
  ramo: Ramo
  tamano: Tamano
  cantidad: number
}

// ──────────────────────────────────────────
//  Catálogo auxiliar
// ──────────────────────────────────────────
/** Categorías iniciales (se usan hasta que se carguen las de la base de datos) */
export const CATEGORIAS_SEED: CategoriaInfo[] = [
  { slug: 'rosas', label: 'Rosas', singular: 'Rosas', orden: 1 },
  { slug: 'lirios', label: 'Lirios', singular: 'Lirios', orden: 2 },
  { slug: 'mixtos', label: 'Mixtos', singular: 'Mixto', orden: 3 },
  { slug: 'girasoles', label: 'Girasoles', singular: 'Girasoles', orden: 4 },
]

/** Convierte un texto en slug: «Pasión Eterna» → «pasion-eterna» */
export function slugify(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

/** Guía de tamaños (se muestra en la ficha para que «M» o «XL» signifiquen algo) */
export const GUIA_TAMANOS: Record<string, { nombre: string; descripcion: string }> = {
  XS: { nombre: 'Extra pequeño', descripcion: 'Un detalle sutil' },
  S: { nombre: 'Pequeño', descripcion: 'Ideal para detalles sutiles' },
  M: { nombre: 'Mediano', descripcion: 'Perfecto para cualquier ocasión' },
  L: { nombre: 'Grande', descripcion: 'Más flores, más emoción' },
  XL: { nombre: 'Extra grande', descripcion: 'Impacta, sorprende y enamora' },
  XXL: { nombre: 'Premium', descripcion: 'El regalo más impresionante' },
}

// ──────────────────────────────────────────
//  Helpers de construcción
// ──────────────────────────────────────────
export type RamoBase = Omit<Ramo, 'precio' | 'tamanos' | 'imagen_url' | 'precioDesde'>

function buildTamanos(r: RamoBase): Tamano[] {
  if (r.variantes_precio?.length) {
    return r.variantes_precio.map((v, i) => ({
      value: `v${i}`,
      label: v.etiqueta,
      detalle: GUIA_TAMANOS[v.tamano] ? `Tamaño ${v.tamano} · ${GUIA_TAMANOS[v.tamano].nombre}` : `Tamaño ${v.tamano}`,
      precio: v.precio,
    }))
  }
  const guia = r.tamanoTexto ? GUIA_TAMANOS[r.tamanoTexto] : undefined
  return [
    {
      value: 'unico',
      label: guia ? `${guia.nombre} (${r.tamanoTexto})` : `Tamaño ${r.tamanoTexto ?? 'único'}`,
      detalle: guia?.descripcion ?? '',
      precio: r.precio_base ?? 0,
    },
  ]
}

export function makeRamo(base: RamoBase): Ramo {
  const tamanos = buildTamanos(base)
  const precios = tamanos.map((t) => t.precio)
  return {
    ...base,
    imagen_url: base.imagenes[0] ?? null,
    tamanos,
    precio: Math.min(...precios),
    precioDesde: new Set(precios).size > 1,
  }
}

/**
 * Texto alternativo por foto. La primera describe el arreglo con la descripción del catálogo;
 * las demás indican la vista. (Si quieres alt más específico, escríbelo aquí por ramo.)
 */
export function altImagen(ramo: Pick<Ramo, 'nombre' | 'descripcion' | 'imagenes'>, i: number): string {
  if (i === 0) return `Ramo ${ramo.nombre}: ${ramo.descripcion}`
  return `Ramo ${ramo.nombre}, foto ${i + 1} de ${ramo.imagenes.length}`
}

// ──────────────────────────────────────────
//  Dataset — 26 ramos del catálogo
//  Los comentarios VERIFICAR marcan datos que el negocio debe confirmar antes de publicar.
// ──────────────────────────────────────────
export const RAMOS_SEED: RamoBase[] = [
  {
    id: 1, slug: 'doble-amor', nombre: 'Doble Amor', categoria: 'rosas',
    descripcion: '2 rosas del color que prefieras con un toque de gipsofila blanca.',
    tamanoTexto: 'XS', precio_base: 20000,
    colores_disponibles: 'El color que prefieras',
    imagenes: [], disponible: true,
    tags_busqueda: ['rosas', 'detalle pequeño', 'economico'],
  },
  {
    id: 2, slug: 'tres-latidos', nombre: 'Tres Latidos', categoria: 'rosas',
    descripcion: '3 rosas del color que prefieras, con un toque de gipsofila blanca.',
    tamanoTexto: 'XS', precio_base: 25000,
    colores_disponibles: 'El color que prefieras',
    imagenes: [], disponible: true,
    tags_busqueda: ['rosas', 'detalle pequeño'],
  },
  {
    id: 3, slug: 'dulce-romance', nombre: 'Dulce Romance', categoria: 'rosas',
    descripcion: '5 rosas del color que prefieras, con un toque de gipsofila blanca y follaje.',
    tamanoTexto: 'S', precio_base: 50000,
    colores_disponibles: 'El color que prefieras',
    imagenes: [], disponible: true,
    tags_busqueda: ['rosas', 'romantico'],
  },
  {
    id: 4, slug: 'pasion-eterna', nombre: 'Pasión Eterna', categoria: 'rosas',
    descripcion: 'Ramo de rosas redondo rodeado de gipsofila. El color que prefieras. Mariposas doradas.',
    detalle: 'Dos colores de rosas a partir de las 40 unidades.',
    variantes_precio: [
      { etiqueta: '20 rosas', tamano: 'S', precio: 80000 },
      { etiqueta: '40 rosas', tamano: 'M', precio: 140000 },
      { etiqueta: '60 rosas', tamano: 'L', precio: 190000 },
      { etiqueta: '80 rosas', tamano: 'L', precio: 250000 },
      { etiqueta: '100 rosas', tamano: 'XL', precio: 340000 },
    ],
    colores_disponibles: 'El color que prefieras; 2 colores desde 40 unidades',
    imagenes: ['/pasioneterna1.jpg', '/pasioneterna2.jpg', '/pasioneterna3.jpg', '/pasioneterna4.jpg', '/pasioneterna5.jpg', '/pasioneterna6.jpg', '/pasioneterna7.jpg', '/pasioneterna8.jpg', '/pasioneterna9.jpg'],
    disponible: true, destacado: true,
    tags_busqueda: ['rosas', 'grande', 'mariposas', 'premium'],
  },
  {
    id: 5, slug: 'pasion-pura', nombre: 'Pasión Pura', categoria: 'rosas',
    descripcion: 'Ramo de rosas en diseño vertical. El color que prefieras.',
    detalle: 'Dos colores de rosas a partir de las 40 unidades.',
    variantes_precio: [
      { etiqueta: '10 rosas', tamano: 'S', precio: 70000 },
      { etiqueta: '20 rosas', tamano: 'M', precio: 90000 },
      { etiqueta: '40 rosas', tamano: 'L', precio: 140000 },
    ],
    colores_disponibles: 'El color que prefieras; 2 colores desde 40 unidades',
    imagenes: ['/pasionpura1.jpg', '/pasionpura2.jpg', '/pasionpura3.jpg', '/pasionpura4.jpg', '/pasionpura5.jpg', '/pasionpura6.jpg', '/pasionpura7.jpg'],
    disponible: true,
    tags_busqueda: ['rosas', 'vertical'],
  },
  {
    id: 6, slug: 'velvet-kiss', nombre: 'Velvet Kiss', categoria: 'mixtos',
    descripcion: 'Arreglo de rosas en caja de corazón con maquillajes.',
    tamanoTexto: 'M', precio_base: 210000,
    incluye: ['Brillo Labial (Atenea/Anik)', 'Blush (Atenea)', 'Beauty blender', 'Pestañina (Prosa)', 'Pinzas de cabello'],
    colores_disponibles: 'El color que prefieras',
    imagenes: ['/velvetkiss1.jpg', '/velvetkiss2.jpg'],
    disponible: true,
    tags_busqueda: ['caja corazon', 'regalo', 'maquillaje', 'rosas'],
  },
  {
    id: 7, slug: 'susurro-de-rosas', nombre: 'Susurro de Rosas', categoria: 'rosas',
    descripcion: 'Ramo con minirosas, follaje y un toque de gipsofila.',
    detalle: 'Las minirosas tienen flores de menor tamaño y varios botones por tallo.',
    variantes_precio: [
      { etiqueta: '1 color', tamano: 'S', precio: 70000 },
      { etiqueta: '2 colores', tamano: 'S', precio: 90000 }, // VERIFICAR precio 2 colores
    ],
    extras_opcionales: [{ nombre: 'Lirio adicional', precio: 8000 }],
    imagenes: ['/susurroderosas1.jpg'],
    disponible: true,
    tags_busqueda: ['minirosas', 'rosas'],
  },
  {
    id: 8, slug: 'royal-princess', nombre: 'Royal Princess', categoria: 'rosas',
    descripcion: 'Ramo de 150 rosas, lirios y flores complementarias, listón con mensaje y mariposas. El color que prefieras.', // VERIFICAR 3a flor
    tamanoTexto: 'XXL', precio_base: 480000,
    colores_disponibles: 'El color que prefieras',
    imagenes: ['/royalprincess1.jpg', '/royalprincess2.jpg', '/royalprincess3.jpg'],
    disponible: true, destacado: true,
    tags_busqueda: ['premium', 'cumpleaños', 'xxl', 'lujo', 'rosas'],
  },
  {
    id: 9, slug: 'love', nombre: 'Love', categoria: 'rosas',
    descripcion: 'Ramo de 40 rosas, gerberas, hortensias y lazos. El color que prefieras.',
    tamanoTexto: 'XL', precio_base: 250000,
    colores_disponibles: 'El color que prefieras',
    imagenes: ['/love1.jpg'],
    disponible: true,
    tags_busqueda: ['rosas', 'gerberas', 'hortensias'],
  },
  {
    id: 10, slug: 'corazon-enamorado', nombre: 'Corazón Enamorado', categoria: 'rosas', // VERIFICAR nombre real y descripción
    descripcion: 'Arreglo de rosas rojas y blancas en forma de corazón. Incluye cinta personalizable.',
    tamanoTexto: 'XL', precio_base: 360000,
    imagenes: [], disponible: true,
    tags_busqueda: ['rosas', 'corazon', 'propuesta', 'aniversario'],
  },
  {
    id: 11, slug: 'destello', nombre: 'Destello', categoria: 'girasoles',
    descripcion: '1 girasol envuelto en papel coreano.',
    tamanoTexto: 'XS', precio_base: 15000,
    imagenes: [], disponible: true,
    tags_busqueda: ['girasoles', 'detalle pequeño'],
  },
  {
    id: 12, slug: 'resplandor', nombre: 'Resplandor', categoria: 'girasoles',
    descripcion: '3 girasoles con un toque de gipsofila blanca.',
    tamanoTexto: 'S', precio_base: 40000,
    imagenes: [], disponible: true,
    tags_busqueda: ['girasoles'],
  },
  {
    id: 13, slug: 'rayo-de-sol', nombre: 'Rayo de Sol', categoria: 'girasoles',
    descripcion: '3 girasoles en diseño de cascada, con un toque de gipsofila blanca y follaje verde.',
    tamanoTexto: 'S', precio_base: 45000,
    imagenes: [], disponible: true,
    tags_busqueda: ['girasoles'],
  },
  {
    id: 14, slug: 'amanecer', nombre: 'Amanecer', categoria: 'girasoles',
    descripcion: 'Ramo de girasoles con follaje verde y toque de gipsofila.',
    variantes_precio: [
      { etiqueta: '5 girasoles', tamano: 'M', precio: 80000 },
      { etiqueta: '7 girasoles', tamano: 'L', precio: 110000 },
      { etiqueta: '10 girasoles', tamano: 'XL', precio: 140000 },
    ],
    extras_opcionales: [{ nombre: 'Girasol adicional', precio: 5000 }],
    imagenes: [], disponible: true,
    tags_busqueda: ['girasoles'],
  },
  {
    id: 15, slug: 'lirio-individual', nombre: 'Lirio Individual / Trío de Lirios', categoria: 'lirios', // VERIFICAR si es ítem propio
    descripcion: 'Ramo sencillo con lirio(s) blanco o rosa, envoltura elegante.',
    variantes_precio: [
      { etiqueta: '1 lirio', tamano: 'XS', precio: 15000 },
      { etiqueta: '3 lirios', tamano: 'S', precio: 45000 },
    ],
    imagenes: [], disponible: true,
    tags_busqueda: ['lirios'],
  },
  {
    id: 16, slug: 'delirio', nombre: 'Delirio', categoria: 'lirios',
    descripcion: 'Ramo de lirios en envoltura oscura elegante con moño rosa.',
    variantes_precio: [
      { etiqueta: '7 lirios', tamano: 'M', precio: 120000 },
      { etiqueta: '10 lirios', tamano: 'L', precio: 150000 },
    ],
    imagenes: ['/delirio1.jpg'],
    disponible: true, destacado: true,
    tags_busqueda: ['lirios', 'elegante'],
  },
  {
    id: 17, slug: 'pequeno-jardin', nombre: 'Pequeño Jardín', categoria: 'mixtos',
    descripcion: 'Ramo mixto en diseño de cono con margaritas, pinocho, pompón, claveles y/o minirosas.',
    tamanoTexto: 'S', precio_base: 40000,
    imagenes: ['/pequenojardin1.jpg'],
    disponible: true,
    tags_busqueda: ['mixto', 'economico'],
  },
  {
    id: 18, slug: 'dulce-primavera', nombre: 'Dulce Primavera', categoria: 'mixtos',
    descripcion: 'Ramo mixto en diseño de cono con margaritas, pinocho, pompón, claveles, rosas y/o minirosas.',
    tamanoTexto: 'M', precio_base: 70000,
    imagenes: ['/dulceprimavera1.jpg', '/dulceprimavera2.jpg'],
    disponible: true,
    tags_busqueda: ['mixto'],
  },
  {
    id: 19, slug: 'majestad-v1', nombre: 'Majestad (Versión 1)', categoria: 'mixtos',
    descripcion: 'Ramo redondo mixto de claveles, margaritas, astromelias y un lirio.',
    tamanoTexto: 'M', precio_base: 90000,
    imagenes: [], disponible: true,
    tags_busqueda: ['mixto'],
  },
  {
    id: 20, slug: 'majestad-v2', nombre: 'Majestad (Versión 2)', categoria: 'mixtos',
    descripcion: 'Ramo redondo mixto de clavellina china, rosas y un lirio.',
    tamanoTexto: 'M', precio_base: 110000,
    imagenes: ['/v2majestad1.jpg', '/v2majestad2.jpg'],
    disponible: true,
    tags_busqueda: ['mixto', 'rosas', 'lirios'],
  },
  {
    id: 21, slug: 'encanto', nombre: 'Encanto', categoria: 'mixtos',
    descripcion: 'Ramo redondo mixto, disponible en 3 combinaciones de flores y tamaños.',
    variantes_precio: [
      { etiqueta: '2 tipos (minirosas y margaritas)', tamano: 'S', precio: 80000 },
      { etiqueta: '3 tipos (minirosas, margaritas y claveles)', tamano: 'M', precio: 90000 },
      { etiqueta: '4 tipos (margaritas, minirosas, claveles y pinochos)', tamano: 'L', precio: 100000 },
    ],
    imagenes: ['/encanto1.jpg', '/encanto2.jpg'],
    disponible: true,
    tags_busqueda: ['mixto'],
  },
  {
    id: 22, slug: 'alma-radiante', nombre: 'Alma Radiante', categoria: 'mixtos',
    descripcion: 'Ramo en diseño vertical con minirosas, claveles, margaritas y lirios.',
    tamanoTexto: 'M', precio_base: 150000,
    incluye: ['Caja de chocolates Ferrero Rocher'],
    extras_opcionales: [{ nombre: 'Chocolates adicionales', precio: null }],
    imagenes: ['/almaradiante1.jpg'],
    disponible: true,
    tags_busqueda: ['mixto', 'chocolates', 'regalo'],
  },
  {
    id: 23, slug: 'dulzura', nombre: 'Dulzura', categoria: 'mixtos',
    descripcion: 'Ramo en diseño vertical de margaritas, clavellina o clavel y gerberas.',
    tamanoTexto: 'M', precio_base: 90000,
    imagenes: [], disponible: true,
    tags_busqueda: ['mixto', 'gerberas'],
  },
  {
    id: 24, slug: 'ternura', nombre: 'Ternura', categoria: 'mixtos',
    descripcion: 'Ramo mixto en diseño vertical con margaritas, claveles y pinochos, con peluche (Snoopy, oso u otro personaje, según disponibilidad).',
    detalle: 'El valor del peluche es adicional al precio del ramo.',
    tamanoTexto: 'L y XL', precio_base: 120000,
    extras_opcionales: [{ nombre: 'Peluche', precio: null }],
    imagenes: ['/ternura1.jpg', '/ternura2.jpg', '/ternura3.jpg', '/ternura4.jpg', '/ternura5.jpg', '/ternura6.jpg'],
    disponible: true,
    tags_busqueda: ['mixto', 'peluche', 'regalo', 'infantil'],
  },
  {
    id: 25, slug: 'regocijo', nombre: 'Regocijo', categoria: 'mixtos',
    descripcion: 'Ramo con lirios, gerberas, minirosas o claveles, margaritas o pompón.',
    detalle: 'Los colores y flores pueden ser reemplazados por otros según disponibilidad.',
    tamanoTexto: 'XL', precio_base: 190000,
    imagenes: [], // VERIFICAR: antes usaba el logo y la tarjeta de contacto como "fotos"; agrega una foto real del ramo
    disponible: true, destacado: true, insignia: true,
    tags_busqueda: ['insignia', 'mixto', 'lirios', 'gerberas'],
  },
  {
    id: 26, slug: 'rh', nombre: 'RH', categoria: 'mixtos', // VERIFICAR nombre completo
    descripcion: 'Arreglo en caja de corazón con gerberas, estatice, margaritas y clavellina.',
    tamanoTexto: 'L', precio_base: 180000,
    imagenes: ['/rh1.jpg', '/rh2.jpg', '/rh3.jpg'],
    disponible: true,
    tags_busqueda: ['caja corazon', 'mixto', 'gerberas'],
  },
]

// ──────────────────────────────────────────
//  Store
// ──────────────────────────────────────────
export const useProductosStore = defineStore('productos', () => {
  const ramos = ref<Ramo[]>(RAMOS_SEED.map(makeRamo))
  const categorias = ref<CategoriaInfo[]>(CATEGORIAS_SEED)
  /** 'local' = catálogo escrito en el código; 'remoto' = leído de la base de datos */
  const fuente = ref<'local' | 'remoto'>('local')

  /** Reemplaza el catálogo por el de la base de datos (solo si trae ramos) */
  function cargarCatalogo(datos: { ramos?: RamoBase[]; categorias?: CategoriaInfo[] } | null | undefined) {
    if (!datos?.ramos?.length) return
    ramos.value = datos.ramos.map(makeRamo)
    if (datos.categorias?.length) categorias.value = datos.categorias
    else {
      // Sin tabla de categorías: se deducen de los ramos
      const slugs = [...new Set(datos.ramos.map((r) => r.categoria))]
      categorias.value = slugs.map((slug, i) => ({ slug, label: slug.charAt(0).toUpperCase() + slug.slice(1), singular: slug, orden: i }))
    }
    fuente.value = 'remoto'
  }

  /** Categorías que tienen al menos un ramo (las vacías no se muestran al público) */
  const categoriasConRamos = computed(() =>
    [...categorias.value]
      .sort((a, b) => a.orden - b.orden)
      .filter((c) => ramos.value.some((r) => r.categoria === c.slug)),
  )
  const infoCategoria = (slug: string): CategoriaInfo =>
    categorias.value.find((c) => c.slug === slug) ?? { slug, label: slug, singular: slug, orden: 99 }
  const carritoItems = ref<CartItem[]>([])

  const ramosDestacados = computed(() => ramos.value.filter((r) => r.destacado))

  const totalCarrito = computed(() =>
    carritoItems.value.reduce((acc, item) => acc + item.tamano.precio * item.cantidad, 0),
  )
  const cantidadCarrito = computed(() =>
    carritoItems.value.reduce((acc, item) => acc + item.cantidad, 0),
  )

  const precioMinimo = computed(() => Math.min(...ramos.value.map((r) => r.precio)))

  function agregarAlCarrito(ramo: Ramo, tamano?: Tamano) {
    const tamanoFinal = tamano ?? ramo.tamanos[0]
    const existente = carritoItems.value.find(
      (i) => i.ramo.id === ramo.id && i.tamano.value === tamanoFinal.value,
    )
    if (existente) existente.cantidad++
    else carritoItems.value.push({ ramo, cantidad: 1, tamano: tamanoFinal })
  }

  /** Resta una unidad (y elimina el ítem al llegar a 0) */
  function quitarDelCarrito(ramoId: number, tamanoValue: string) {
    const idx = carritoItems.value.findIndex((i) => i.ramo.id === ramoId && i.tamano.value === tamanoValue)
    if (idx === -1) return
    if (carritoItems.value[idx].cantidad > 1) carritoItems.value[idx].cantidad--
    else carritoItems.value.splice(idx, 1)
  }

  /** Elimina el ítem completo sin importar la cantidad */
  function eliminarDelCarrito(ramoId: number, tamanoValue: string) {
    carritoItems.value = carritoItems.value.filter(
      (i) => !(i.ramo.id === ramoId && i.tamano.value === tamanoValue),
    )
  }

  function vaciarCarrito() {
    carritoItems.value = []
  }

  const getRamoBySlug = (slug: string) => ramos.value.find((r) => r.slug === slug)
  const getRamoById = (id: number) => ramos.value.find((r) => r.id === id)

  return {
    ramos,
    categorias,
    fuente,
    categoriasConRamos,
    infoCategoria,
    cargarCatalogo,
    carritoItems,
    ramosDestacados,
    totalCarrito,
    cantidadCarrito,
    precioMinimo,
    agregarAlCarrito,
    quitarDelCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
    getRamoBySlug,
    getRamoById,
  }
})
