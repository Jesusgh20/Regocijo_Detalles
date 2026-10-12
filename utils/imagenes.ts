/**
 * Preparación de fotos antes de subirlas (solo navegador).
 * Las fotos de celular pesan 3–8 MB y miden 4000+ px: se reducen a un máximo de 1500 px y se
 * guardan como JPEG (~200–400 KB). Corrige la orientación (EXIF) para que no queden de lado.
 */
export const MAX_LADO = 1500
export const TIPOS_ACEPTADOS = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_ORIGINAL_MB = 25

export async function comprimirImagen(file: File, maxLado = MAX_LADO, calidad = 0.82): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  const escala = Math.min(1, maxLado / Math.max(bitmap.width, bitmap.height))
  const w = Math.round(bitmap.width * escala)
  const h = Math.round(bitmap.height * escala)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Tu navegador no puede procesar imágenes.')
  ctx.fillStyle = '#ffffff' // los PNG con transparencia quedan sobre blanco
  ctx.fillRect(0, 0, w, h)
  ctx.drawImage(bitmap, 0, 0, w, h)
  bitmap.close()

  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('No se pudo convertir la imagen.'))), 'image/jpeg', calidad),
  )
}

const MARCA = '/storage/v1/object/public/ramos/'

/** Ruta dentro del bucket si la URL es una foto subida a Supabase; null si es una foto del sitio (/foto.jpg) */
export function rutaEnBucket(url: string): string | null {
  const i = url.indexOf(MARCA)
  return i === -1 ? null : decodeURIComponent(url.slice(i + MARCA.length).split('?')[0])
}
