/** Protege las páginas del panel: sin sesión de administradora se vuelve al inicio de sesión. */
export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return
  const admin = useAdmin()
  if (!admin.listo.value) await admin.iniciar()
  if (!admin.esAdmin.value) return navigateTo('/admin')
})
