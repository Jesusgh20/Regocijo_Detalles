/**
 * Conversión entre las filas de Supabase y los objetos del catálogo del sitio.
 * (Tablas `ramos` y `categorias`: ver supabase/setup.sql)
 */
import type { CategoriaInfo, ExtraOpcional, RamoBase, VariantePrecio } from '~/stores/productos'

export interface RamoRow {
  id: number
  slug: string
  nombre: string
  categoria: string
  descripcion: string
  detalle: string | null
  incluye: string[] | null
  tamano_texto: string | null
  precio_base: number | null
  variantes_precio: VariantePrecio[] | null
  colores_disponibles: string | null
  extras_opcionales: ExtraOpcional[] | null
  imagenes: string[] | null
  disponible: boolean
  destacado: boolean
  insignia: boolean
  tags_busqueda: string[] | null
  publicado: boolean
  orden: number
}

export interface CategoriaRow {
  slug: string
  label: string
  singular: string | null
  orden: number
}

const arr = <T>(v: T[] | null | undefined): T[] => (Array.isArray(v) ? v : [])

export function rowToBase(r: RamoRow): RamoBase {
  return {
    id: r.id,
    slug: r.slug,
    nombre: r.nombre,
    categoria: r.categoria,
    descripcion: r.descripcion,
    detalle: r.detalle || undefined,
    incluye: arr(r.incluye).length ? arr(r.incluye) : undefined,
    tamanoTexto: r.tamano_texto || undefined,
    precio_base: r.precio_base ?? undefined,
    variantes_precio: arr(r.variantes_precio).length ? arr(r.variantes_precio) : undefined,
    colores_disponibles: r.colores_disponibles || undefined,
    extras_opcionales: arr(r.extras_opcionales).length ? arr(r.extras_opcionales) : undefined,
    imagenes: arr(r.imagenes),
    disponible: r.disponible,
    destacado: r.destacado,
    insignia: r.insignia,
    tags_busqueda: arr(r.tags_busqueda),
  }
}

/** Fila lista para insertar/actualizar (sin `id`, que lo asigna la base de datos) */
export function baseToRow(b: Omit<RamoBase, 'id'>, extra: { publicado?: boolean; orden?: number } = {}) {
  return {
    slug: b.slug,
    nombre: b.nombre,
    categoria: b.categoria,
    descripcion: b.descripcion,
    detalle: b.detalle ?? null,
    incluye: b.incluye ?? [],
    tamano_texto: b.tamanoTexto ?? null,
    precio_base: b.precio_base ?? null,
    variantes_precio: b.variantes_precio ?? [],
    colores_disponibles: b.colores_disponibles ?? null,
    extras_opcionales: b.extras_opcionales ?? [],
    imagenes: b.imagenes ?? [],
    disponible: b.disponible,
    destacado: !!b.destacado,
    insignia: !!b.insignia,
    tags_busqueda: b.tags_busqueda ?? [],
    publicado: extra.publicado ?? true,
    ...(extra.orden !== undefined ? { orden: extra.orden } : {}),
  }
}

export function rowToCategoria(c: CategoriaRow): CategoriaInfo {
  return { slug: c.slug, label: c.label, singular: c.singular || c.label, orden: c.orden }
}
