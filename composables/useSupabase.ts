import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js'

/**
 * Cliente de Supabase para el PANEL DE ADMINISTRACIÓN (solo navegador).
 * Usa la clave «anon» (pública). Lo que puede hacer cada persona lo deciden las políticas RLS
 * de supabase/setup.sql, no este código: sin ser administradora no se puede escribir nada.
 *
 * El sitio público NO usa este cliente (lee el catálogo por /api/catalogo), así que los visitantes
 * no guardan nada en su navegador. La sesión de la administradora sí se guarda en su navegador (localStorage).
 */
let client: SupabaseClient | null = null

export function useSupabase(): SupabaseClient | null {
  if (!import.meta.client) return null
  const { public: cfg } = useRuntimeConfig()
  if (!cfg.supabaseUrl || !cfg.supabaseAnonKey) return null
  client ??= createClient(String(cfg.supabaseUrl), String(cfg.supabaseAnonKey), {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  })
  return client
}

export function supabaseConfigurado(): boolean {
  const { public: cfg } = useRuntimeConfig()
  return !!(cfg.supabaseUrl && cfg.supabaseAnonKey)
}

/** Estado de sesión de la administradora */
export function useAdmin() {
  const user = useState<User | null>('admin-user', () => null)
  const esAdmin = useState<boolean>('admin-es-admin', () => false)
  const listo = useState<boolean>('admin-listo', () => false)

  /** Lee la sesión guardada y comprueba en la base de datos que sea administradora */
  async function iniciar() {
    const sb = useSupabase()
    if (!sb) { listo.value = true; return }
    const { data } = await sb.auth.getSession()
    user.value = data.session?.user ?? null
    esAdmin.value = user.value ? await verificar(sb) : false
    listo.value = true
  }

  async function verificar(sb: SupabaseClient): Promise<boolean> {
    const { data, error } = await sb.rpc('is_admin')
    return !error && data === true
  }

  async function entrar(email: string, password: string): Promise<{ ok: boolean; mensaje?: string }> {
    const sb = useSupabase()
    if (!sb) return { ok: false, mensaje: 'El sitio todavía no está conectado a Supabase.' }
    const { data, error } = await sb.auth.signInWithPassword({ email, password })
    if (error) {
      return { ok: false, mensaje: 'Correo o contraseña incorrectos.' }
    }
    if (!(await verificar(sb))) {
      await sb.auth.signOut()
      user.value = null
      esAdmin.value = false
      return { ok: false, mensaje: 'Esta cuenta no tiene permiso para administrar el catálogo.' }
    }
    user.value = data.user
    esAdmin.value = true
    return { ok: true }
  }

  async function salir() {
    await useSupabase()?.auth.signOut()
    user.value = null
    esAdmin.value = false
  }

  return { user, esAdmin, listo, iniciar, entrar, salir }
}
