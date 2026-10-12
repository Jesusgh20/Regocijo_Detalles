/**
 * Catálogo público: lee los ramos visibles y las categorías de Supabase (solo lectura, con la clave anónima,
 * que por diseño es pública: la seguridad la dan las políticas RLS de supabase/setup.sql).
 *
 * - Sin configuración (variables NUXT_PUBLIC_SUPABASE_*) → responde `configurado: false` y el sitio usa
 *   el catálogo escrito en el código (stores/productos.ts).
 * - Si Supabase falla → 502 y el sitio también cae al catálogo del código (nunca queda vacío).
 * - Se cachea 20 s: los cambios hechos en el panel aparecen en el sitio en unos segundos.
 */
import { rowToBase, rowToCategoria, type CategoriaRow, type RamoRow } from '../../utils/catalogoDb'

// Último catálogo leído con éxito: si Supabase falla un momento, se sigue mostrando este (no el catálogo viejo del código)
let ultimoBueno: { configurado: boolean; ramos: unknown[]; categorias: unknown[] } | null = null

export default defineCachedEventHandler(
  async (event) => {
    const { supabaseUrl, supabaseAnonKey } = useRuntimeConfig(event).public
    if (!supabaseUrl || !supabaseAnonKey) {
      return { configurado: false, ramos: [], categorias: [] }
    }

    const base = String(supabaseUrl).replace(/\/+$/, '')
    const headers = { apikey: String(supabaseAnonKey), Authorization: `Bearer ${supabaseAnonKey}` }

    try {
      const [ramos, categorias] = await Promise.all([
        $fetch<RamoRow[]>(`${base}/rest/v1/ramos`, {
          headers,
          query: { select: '*', publicado: 'eq.true', order: 'orden.asc,id.asc' },
          timeout: 8000,
        }),
        $fetch<CategoriaRow[]>(`${base}/rest/v1/categorias`, {
          headers,
          query: { select: '*', order: 'orden.asc' },
          timeout: 8000,
        }),
      ])
      ultimoBueno = {
        configurado: true,
        ramos: ramos.map(rowToBase),
        categorias: categorias.map(rowToCategoria),
      }
      return ultimoBueno
    } catch (e) {
      console.error('[catalogo] No se pudo leer Supabase:', (e as Error).message)
      if (ultimoBueno) return ultimoBueno
      throw createError({ statusCode: 502, statusMessage: 'Catálogo no disponible' })
    }
  },
  // swr:false → cuando pasan los 20 s se vuelve a leer de verdad (los cambios del panel se ven enseguida)
  { maxAge: 20, swr: false, name: 'catalogo', getKey: () => 'v1' },
)
