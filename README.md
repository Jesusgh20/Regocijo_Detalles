# Regocijo Floristería

Tienda en línea de ramos de flores artesanales (Montería, Córdoba). Hecha con **Nuxt 3**, **Tailwind CSS 4** y **Pinia**. Los pedidos y consultas se cierran por **WhatsApp**: el sitio no cobra ni guarda datos.

Revisa **[AUDITORIA.md](AUDITORIA.md)** antes de publicar: lista lo que cambió y los datos legales que debes completar.

**Panel para subir y editar ramos:** `/admin` (Supabase). Guía de instalación: **[SUPABASE.md](SUPABASE.md)**. Sin configurarlo, el sitio usa el catálogo escrito en el código.

## Inicio rápido

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # compila para producción
npm run preview    # prueba la versión compilada
```

## Dónde cambiar cada cosa

| Qué | Dónde |
|---|---|
| Teléfonos, horarios, Instagram, **titular, NIT, dirección, correo** | `data/negocio.ts` |
| Catálogo, precios, descripciones, fotos | **El panel `/admin`** (o, de respaldo, `stores/productos.ts` y `public/`) |
| Tablas y seguridad de la base de datos | `supabase/setup.sql` |
| Claves de Supabase | `.env` (ver `.env.example`) |
| Colores, tipografía, botones, campos | `assets/css/tailwind.css` (variables en `:root`) |
| Política de privacidad / cookies / términos | `pages/privacidad.vue`, `pages/cookies.vue`, `pages/terminos.vue` |

## Estructura

```
assets/css/tailwind.css     Sistema de diseño (tokens, botones, formularios, foco, movimiento reducido)
data/negocio.ts             Datos del negocio: una sola fuente
utils/format.ts             Formato de precios, fechas y enlaces de WhatsApp
composables/                useCarritoUI, useToast, useFocusTrap
plugins/reveal.ts           Directiva v-reveal (aparición al hacer scroll)
plugins/00.sanear-error.server.ts   Arregla la página 404/500 (ver comentario del archivo)
stores/productos.ts         Catálogo de respaldo + carrito (Pinia)
server/api/catalogo.get.ts  Lee el catálogo de Supabase (con caché y respaldo)
utils/catalogoDb.ts         Mapeo base de datos ↔ catálogo
composables/useSupabase.ts  Cliente y sesión del panel
middleware/admin.ts         Protege las páginas del panel
layouts/admin.vue           Diseño del panel
supabase/setup.sql          Tablas, seguridad (RLS) y bucket de fotos
layouts/default.vue         Encabezado, menú móvil y pie
components/                 CatalogCard, CarritoDrawer, ProductCarousel, RamoImagen, PageHero, LegalPage, Ornament…
pages/                      index, catalogo, producto/[slug], nosotros, contacto, privacidad, cookies, terminos
pages/admin/                Panel: inicio de sesión, ramos (lista y formulario), categorías, nueva contraseña
error.vue                   Página 404 / error
```

## Notas

- **Sin cookies ni analíticas** para quienes visitan la tienda (solo la sesión de la administradora en `/admin`). Las fuentes se alojan en el propio sitio (no se llama a Google Fonts). Si añades analíticas, publicidad o una pasarela de pago, actualiza las políticas y pide consentimiento antes de activarlas.
- **Imágenes:** optimízalas antes de subirlas (≈1.500 px de lado largo, JPEG). Los ramos sin foto muestran "Foto próximamente".
- La ruta antigua `/editar-ramo` redirige al catálogo (301).
