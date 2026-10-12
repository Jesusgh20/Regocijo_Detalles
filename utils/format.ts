import { NEGOCIO } from '~/data/negocio'

const COP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export function formatPrecio(precio: number): string {
  return COP.format(precio)
}

/** Enlace wa.me con mensaje prellenado. Solo se abre cuando la persona pulsa: no se envía nada antes. */
export function whatsappUrl(mensaje?: string): string {
  const base = `https://wa.me/${NEGOCIO.whatsapp.e164}`
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
}

/**
 * Fecha local (Colombia) en formato YYYY-MM-DD, sumando `dias`.
 * Antes se usaba toISOString() (UTC): después de las 7 p. m. devolvía el día equivocado.
 */
export function fechaLocalISO(dias = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + dias)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

/** "2026-10-12" → "12 de octubre de 2026" (sin desfase de zona horaria) */
export function fechaLarga(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(y, m - 1, d),
  )
}
