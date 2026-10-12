/**
 * Arregla la página 404/500 personalizada (error.vue).
 *
 * Con Nuxt 3.17 + @pinia/nuxt 0.9 / pinia 2.3, al renderizar un error Nuxt guarda en la carga de la página
 * el objeto `query` de /__nuxt_error, que no tiene prototipo (Object.create(null)). El plugin de Pinia llama
 * a `obj.hasOwnProperty` sobre cada objeto de esa carga, lanza «obj.hasOwnProperty is not a function» y el
 * servidor responde con la pantalla genérica «500 – Server Error» en vez de la página de error del sitio
 * (por ejemplo, ante cualquier URL inexistente).
 *
 * Copiar el objeto a uno normal antes de serializarlo lo resuelve. Puedes borrar este archivo cuando
 * actualices a una versión de Pinia/Nuxt que ya lo corrija.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const err = nuxtApp.payload.error
  if (err && typeof err === 'object' && Object.getPrototypeOf(err) === null) {
    nuxtApp.payload.error = { ...err } as typeof err
  }
})
