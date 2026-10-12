# Panel de administración — guía de instalación

Con esto, la dueña de la florería podrá **subir fotos, crear, editar, ocultar y eliminar ramos, y manejar categorías** desde `tusitio.com/admin`, sin tocar código.

Los datos y las fotos viven en **Supabase** (gratis para un negocio de este tamaño). Mientras no lo conectes, **el sitio sigue funcionando igual** con el catálogo que ya tiene.

> Tiempo estimado: 20–30 minutos, una sola vez.

---

## Paso 1 — Crear el proyecto en Supabase

1. Entra a <https://supabase.com> → **Start your project** → crea una cuenta (con Google o correo). *Esta cuenta debe ser tuya o de la dueña: quien la crea es quien controla los datos.*
2. **New project**: nombre `regocijo`, una contraseña de base de datos (guárdala en un lugar seguro, no la vamos a usar en el sitio) y una región cercana (por ejemplo *East US* o *South America – São Paulo*).
3. Espera 1–2 minutos a que termine de crearse.

## Paso 2 — Crear las tablas y la seguridad

1. En el menú izquierdo: **SQL Editor** → **New query**.
2. Abre el archivo `supabase/setup.sql` de este proyecto, copia **todo** su contenido y pégalo.
3. El correo de la administradora (**gerencia@regocijocol.com**) ya está puesto en el PASO 6 al final del archivo. Si quieres otro, cámbialo ahí antes de ejecutar.
4. Pulsa **Run**. Debe decir *Success*. (Si lo ejecutas dos veces no pasa nada.)

## Paso 3 — Crear la cuenta de la administradora

1. **Authentication → Users → Add user → Create new user**.
2. Escribe el correo **gerencia@regocijocol.com** (el mismo del paso 2) y una **contraseña** (mínimo 8 caracteres).
3. Marca **Auto Confirm User** y crea el usuario.

## Paso 4 — Cerrar los registros

Para que nadie más pueda crearse una cuenta:

- **Authentication → Sign In / Providers** (o *Settings*) → desactiva **Allow new users to sign up**.

> Aunque alguien lograra crear una cuenta, no podría modificar nada: solo los correos de la tabla `admins` (paso 2) tienen permiso. Es una segunda barrera.

## Paso 5 — Copiar las dos claves

**Project Settings → API**. Copia:

- **Project URL** (algo como `https://abcdefgh.supabase.co`)
- **anon public** key (la clave larga que dice *anon / public*)

> 🚫 **Nunca uses ni compartas la clave `service_role`.** Esa clave salta toda la seguridad. El sitio solo necesita la `anon`, que es pública por diseño.

## Paso 6 — Poner las claves en el sitio

> Si conectaste Supabase desde Vercel (Integrations), **ya no tienes que hacer nada aquí**: el sitio lee también los nombres que esa integración crea (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`). Solo vuelve a desplegar. Nunca se usan `SUPABASE_SECRET_KEY` ni `POSTGRES_*`.

> ℹ️ **Las tablas NO se crean solas.** La integración de Vercel solo conecta el proyecto y crea las variables. Las tablas las crea el paso 2 (o un sistema de migraciones como Prisma/Drizzle/`supabase db push`, que es probablemente lo que usaste antes).

**En tu computador (para probar):**

1. Copia el archivo `.env.example` y llámalo `.env`.
2. Pega tu *Project URL* y tu *anon key*.
3. `npm run dev` y entra a <http://localhost:3000/admin>.

**En Vercel (el sitio real):**

1. Tu proyecto en Vercel → **Settings → Environment Variables**.
2. Agrega estas dos (para *Production* y *Preview*):
   - `NUXT_PUBLIC_SUPABASE_URL`
   - `NUXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Deployments → ⋯ → Redeploy** (las variables solo se leen al publicar).

## Paso 7 — Permitir recuperar la contraseña (recomendado)

**Authentication → URL Configuration**:

- **Site URL**: la dirección de tu sitio (por ejemplo `https://tusitio.com`).
- **Redirect URLs**: agrega `https://tusitio.com/admin/nueva-clave` (y `http://localhost:3000/admin/nueva-clave` si pruebas en tu computador).

Así, el botón «¿Olvidaste tu contraseña?» del panel funciona.

## Paso 8 — Primera vez en el panel

1. Entra a `tusitio.com/admin` con el correo y la contraseña del paso 3.
2. Verás «Aún no hay ramos guardados aquí». Pulsa **Importar el catálogo actual**: copia los 26 ramos y las 4 categorías actuales a la base de datos (con sus fotos).
3. ¡Listo! Desde ahora todo se edita en el panel.

---

## Uso diario

**Crear un ramo:** *Ramos → Nuevo ramo* → nombre, categoría, descripción y precio → arrastra las fotos → *Guardar ramo*.

- **Fotos:** puedes arrastrar varias a la vez, aunque pesen mucho (el panel las reduce solas). La primera es la principal; con las flechas las reordenas.
- **Precio:** «Un solo precio» o «Varias opciones» (por ejemplo, 10 rosas / 20 rosas / 40 rosas, cada una con su precio).
- **Categoría nueva:** botón «+ Nueva categoría» dentro del mismo formulario, o la sección *Categorías*.
- **Oculto vs. eliminar:** el interruptor **Visible/Oculto** guarda el ramo como borrador sin perderlo. **Eliminar** lo borra para siempre (y sus fotos).
- Los cambios aparecen en el sitio **en menos de un minuto**.

## Lo que debes saber

- **Seguridad:** la protección real está en la base de datos (políticas RLS en `supabase/setup.sql`): sin sesión de administradora, nadie puede crear, editar ni borrar nada, aunque conozca la dirección `/admin`. No compartas la contraseña.
- **Plan gratuito:** Supabase **pausa** los proyectos gratuitos que pasan varios días sin actividad. Si eso ocurre, el sitio público **no se cae** (muestra el último catálogo que vio o, si no hubo ninguno, el original), pero el panel no funcionará hasta que reactives el proyecto con un clic desde el panel de Supabase. Consulta las condiciones vigentes del plan en su web.
- **Copias de seguridad:** el plan gratuito no garantiza copias automáticas. Exporta de vez en cuando (*Table Editor → ramos → Export*), o considera el plan de pago si el negocio crece.
- **Privacidad:** las fotos subidas se sirven desde los servidores de Supabase; ya está declarado en la Política de privacidad y la de cookies. **Confirma que tienes autorización de las personas que aparezcan en las fotos.**
- **Ramos con fotos del sitio:** los ramos importados siguen usando las fotos que están dentro del proyecto (`/public`). Si les subes una foto nueva desde el panel, puedes quitar la antigua de la lista.
- **Si algo falla al guardar:** revisa la conexión; si dice que no puede subir fotos o guardar, comprueba que ejecutaste `supabase/setup.sql` completo y que el correo de la administradora está en el paso 6 del SQL.

## ¿Cómo está construido? (para quien mantenga el código)

| Pieza | Archivo |
|---|---|
| Lectura pública del catálogo (cache 20 s; si Supabase falla, usa el último catálogo bueno o el del código) | `server/api/catalogo.get.ts`, `app.vue` |
| Mapeo base de datos ↔ catálogo | `utils/catalogoDb.ts`, `stores/productos.ts` |
| Cliente y sesión del panel | `composables/useSupabase.ts`, `middleware/admin.ts` |
| Pantallas | `pages/admin/index.vue`, `pages/admin/ramos/index.vue`, `pages/admin/ramos/[id].vue`, `pages/admin/categorias.vue`, `pages/admin/nueva-clave.vue`, `layouts/admin.vue` |
| Subida y compresión de fotos | `components/AdminFotos.vue`, `utils/imagenes.ts` |
| Tablas, seguridad y bucket de fotos | `supabase/setup.sql` |

El panel no se renderiza en servidor (`routeRules: /admin/** ssr:false`) y se excluye de buscadores (`robots.txt` + `X-Robots-Tag`).
