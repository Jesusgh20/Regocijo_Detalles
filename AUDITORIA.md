# Auditoría y rediseño — Regocijo Floristería

Fecha: 11 de octubre de 2026. Este documento resume lo que se encontró, lo que se cambió y **lo que tú debes completar o confirmar**.

> Nota legal: las páginas de Privacidad, Cookies y Términos están redactadas conforme a la normativa colombiana vigente que conozco (Ley 1581 de 2012, Decreto 1377 de 2013 / Decreto 1074 de 2015, Ley 1480 de 2011, Ley 2300 de 2023). Son un punto de partida serio, **no sustituyen la revisión de un abogado**, sobre todo antes de vender a escala.

---

## 1. Lo primero que debes hacer (pendientes tuyos)

| # | Pendiente | Dónde | Por qué importa |
|---|-----------|-------|-----------------|
| 1 | Completar **titular / razón social, NIT o cédula y dirección** (el correo `gerencia@regocijocol.com` ya está puesto; su dominio existe y tiene correo de Google) | `data/negocio.ts` (campos `null`) | La ley de comercio electrónico exige identificar al vendedor; la ley de datos exige identificar al responsable y dar un canal para ejercer derechos. Mientras estén vacíos, las páginas legales muestran `[… — pendiente]` resaltado. |
| 2 | **No usar `hola@regocijofloristeria.co`** | (ya se quitó del sitio) | El dominio `regocijofloristeria.co` **no existe** (consulta DNS: "Non-existent domain"). Cualquier mensaje a ese correo rebotaba y, además, un tercero podría registrar ese dominio y recibir correos de tus clientes. |
| 3 | Confirmar el **horario real** | `data/negocio.ts` → `horarios` | Había 3 versiones distintas (footer, contacto y políticas). Se dejó la de las políticas de servicio. |
| 4 | Confirmar **si entregas o recoges en punto físico** | Términos §7 | Las políticas decían "preferiblemente puede recoger en punto físico" pero el sitio decía "Solo domicilio". |
| 5 | Confirmar tu situación de **IVA / régimen tributario** | Términos §4 | El texto dice "precios con los impuestos que apliquen". Si eres responsable de IVA, verifica que tus precios ya lo incluyan. |
| 6 | Definir la **política de anticipo si se cancela antes de elaborar** | Términos §8 | Es una decisión comercial; hoy solo dice "te informamos cómo proceder". |
| 7 | Confirmar que tienes **autorización de las personas que aparecen en las fotos** | `public/` | Varias fotos (p. ej. `pasioneterna7`, `ternura1`, `ternura4`, `susurroderosas1`) muestran personas. La imagen de una persona es un dato personal. Necesitas su consentimiento. |
| 8 | Revisar si debes inscribir tu base de datos en el **RNBD** (SIC) | — | Solo es obligatorio para empresas con activos totales superiores a 100.000 UVT (Decreto 090 de 2018). Un negocio pequeño normalmente está exento; confírmalo con tu contador. |
| 9 | Resolver los datos marcados `VERIFICAR` | `stores/productos.ts` | Ver §6. Un precio publicado que luego no cobres puede ser reclamado por un cliente. |
| 10 | Agregar **foto real de los 12 ramos** que hoy no la tienen (incl. el insignia "Regocijo") | `stores/productos.ts` + `public/` | Ver §6. |

---

## 2. Contenido falso o sin respaldo (eliminado)

| Antes (en el sitio) | Problema | Ahora |
|---|---|---|
| "**+100 clientes felices**", "**+1.200 ramos entregados**", "**+30 variedades**", "**1+ años de historia**" | Cifras sin respaldo. "+30 variedades" era falso (el catálogo tiene 26 diseños). "1+ años" contradecía "más de dos años" en la misma página. | Eliminadas. El inicio muestra datos calculables: nº de diseños, precio mínimo. |
| "**4.9★ Calificación**" | Reseña/calificación inventada: publicidad engañosa (Ley 1480, arts. 29-30). | Eliminada. |
| Fundadoras **"Valentina Ruiz" y "Sofía Morales"**, con biografías, frases y una historia ("servilleta", "peonías", "lavanda", "desde 2022") | Personas y anécdotas inventadas presentadas como reales; fotos con `src=""` (rotas). | Página "Nosotros" reescrita **solo con hechos comprobables** (catálogo y políticas). Cuando quieras, agrega tu historia real y fotos. |
| "**100% flores colombianas**", "flores cortadas el mismo día", "compramos a floricultores colombianos" | Afirmaciones de origen/frescura no demostradas. | Eliminadas. |
| "Comentarios" en cada producto (`Comments.vue`) | Parecían reseñas públicas, pero eran un `localStorage` privado de cada visitante: nadie más las veía y guardaba texto en su navegador. | Componente eliminado. |
| "Calidad garantizada", "Pago seguro", "Respuesta inmediata", "Respondemos en menos de 24 horas" | Promesas no respaldadas. | Eliminadas o reemplazadas por hechos ("el medio de pago se acuerda por WhatsApp"). |
| "Tarjeta personalizada **incluida sin costo**", "empaque regalo incluido sin costo", "sobre de nutrientes incluido" | No hay evidencia de que estén incluidos. | Eliminadas. (La dedicatoria sigue disponible como nota del pedido.) |
| "PSE, tarjeta de crédito o efectivo" (ficha) vs "efectivo o transferencia" (inicio) vs "anticipo" (políticas) | Tres versiones; el sitio **no procesa pagos**. | Un solo mensaje: el pago se acuerda por WhatsApp. |
| "Entrega al siguiente día" / "mismo día antes de las 4 pm" / "1 a 2 días de anticipación" | Contradicción con tus propias políticas. | Unificado con las políticas: 1 a 2 días; mismo día según disponibilidad. |
| "Garantizando siempre un resultado igual o mejor" | Promesa absoluta. | "Reemplazamos por flores de igual o mayor valor y estilo similar". |
| Redes: Facebook, TikTok, Pinterest con `href="#"` | Enlaces falsos. | Eliminados (solo Instagram real). |
| Ramo insignia "Regocijo" usando el **logo y la tarjeta de contacto como "fotos"** | Fotos que no son del producto. | Se muestra "Foto próximamente" hasta que subas una real. |

---

## 3. Errores de código corregidos

1. **Los pedidos del carrito se enviaban a un número equivocado** (`573004567890`, un número de ejemplo). El resto del sitio usaba `573127506785`. Ahora hay **una sola fuente** (`data/negocio.ts`). Verificado en el navegador.
2. **El formulario de contacto fingía enviar**: mostraba "¡Mensaje enviado!" pero solo hacía `console.log`; el mensaje se perdía. Ahora abre WhatsApp con el mensaje listo y lo explica con claridad.
3. **Con las versiones instaladas, cualquier URL inexistente terminaba en "500 – Server Error"** (error de Pinia 2.3 + Nuxt 3.17 con el objeto `query` de `/__nuxt_error`; está en las dependencias, no en el rediseño). Se corrigió con `plugins/00.sanear-error.server.ts` y se creó una página 404 propia.
4. La portada **no mostraba los productos destacados**: usaba un componente que no existe (`<ProductCard>`).
5. **Fecha mínima de entrega con desfase de un día** después de las 7 p. m. (usaba `toISOString()` en UTC).
6. La dedicatoria escrita en la ficha **se perdía al pulsar "Añadir al carrito"** (solo viajaba en el enlace de WhatsApp).
7. **El botón de búsqueda del encabezado no hacía nada.** Ahora lleva al catálogo con el buscador enfocado.
8. El carrusel buscaba su contenedor con `document.querySelector` global (fallaba con varias instancias) y no tenía teclado. Reescrito.
9. El catálogo no actualizaba los filtros cuando se navegaba con los enlaces del pie estando ya en la página. Ahora los filtros viven en la URL (compartibles).
10. El botón rápido "agregar" añadía en silencio la variante **más barata** de ramos con varios tamaños. Ahora lleva a elegir tamaño.
11. Información del catálogo que **nunca se mostraba**: qué incluye cada ramo, colores, opcionales (peluche, girasol adicional…) y notas ("dos colores desde 40 rosas"). Ahora aparece en la ficha.
12. Ternura decía "incluye peluche" y, a la vez, "el peluche tiene valor adicional" (contradicción). Corregido.
13. Fotos verticales recortadas en formato horizontal (se cortaban los ramos). Ahora se muestran en vertical.
14. URLs de producto por número (`/producto/4`) → por nombre (`/producto/pasion-eterna`), con redirección 301 desde las antiguas.
15. Archivo `pequeñojardin1.jpg` con "ñ" en el nombre (riesgo en Linux/Vercel) → `pequenojardin1.jpg`.

### Código duplicado eliminado
- Ícono de WhatsApp (SVG de ~1 KB) copiado **6 veces** → `IconWhatsApp.vue`.
- Motor de pétalos copiado en `index.vue` (y **muerto**: nunca se enlazaba al canvas) y en `PetalCanvas.vue` → uno solo.
- Avisos ("Agregado al carrito") reimplementados en 3 páginas → `useToast` + `AppToast`.
- Encabezado de página repetido en 4 páginas con estilos en línea → `PageHero.vue`.
- `formatPrecio` duplicado en 2 stores → `utils/format.ts`.
- Datos de contacto/horarios/teléfonos repetidos y contradictorios en 5 archivos → `data/negocio.ts`.
- Lógica de filtros duplicada entre el store y la página de catálogo → solo en la página.

### Código muerto eliminado
`YellowFlowersSplash.vue` (17 KB, comentado y sin uso), `tailwind.config.ts` (Tailwind 4 lo ignora), `Comments.vue`, `PolicyModal.vue` (reemplazado por páginas reales), estilos sin uso en catálogo y contacto, `agregarConFeedback`, getters/estados sin usar del store, `FLORES_ADICIONALES`, variables sin uso en la ficha.

### Página "Edita tu ramo" (eliminada a pedido tuyo)
Se borraron `pages/editar-ramo.vue`, `components/EditorLienzo.vue`, `components/EditorSelector.vue` y `stores/editor.ts`, y el enlace del menú. La ruta antigua `/editar-ramo` redirige (301) al catálogo para no dejar enlaces rotos.

---

## 4. Cookies, analíticas y terceros

- **No hay analíticas ni píxeles** (se buscó Google Analytics, Meta Pixel, Hotjar, etc.: ninguno).
- **El sitio no usa cookies ni `localStorage`/`sessionStorage`** (verificado en el navegador y en las cabeceras: sin `Set-Cookie`). El único uso de `localStorage` era el de las reseñas locales, ya eliminado. *(En desarrollo aparece una clave de las DevTools de Vue; no existe en producción.)*
- **¿Necesitas consentimiento de cookies? No.** El consentimiento se exige para cookies/almacenamiento no esenciales; como no se usa ninguno, un banner sería innecesario (e incluso engañoso). La **Política de cookies** lo explica. Si algún día añades analíticas o Meta Pixel, deberás pedir consentimiento previo **antes** de activarlas.
- **Terceros que había:** `Google Fonts` (cada visita enviaba la IP del visitante a Google) → **fuentes ahora alojadas en tu propio sitio** (paquetes `@fontsource/*`). Enlaces salientes: WhatsApp (Meta), Instagram y `maps.google.com` (este último se eliminó). Solo se abren cuando la persona pulsa.
- **Hosting:** Vercel procesa registros técnicos (IP, navegador); está declarado en la política de privacidad como encargado/tercero.
- **Cabeceras de seguridad** añadidas: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. No se activó una CSP estricta porque Vue/Nuxt inyectan estilos en línea; si agregas terceros, define una a medida.

## 5. Datos personales y formularios

- **Consentimiento:** ambos formularios tienen una casilla **no premarcada**, obligatoria, con enlace a la política (autorización previa, expresa e informada, Ley 1581).
- **Minimización de datos:** el carrito pide nombre, fecha y dirección (necesarios para entregar); ocasión, teléfono de quien recibe y nota son opcionales. El contacto pide solo **nombre y mensaje**: se eliminaron correo y teléfono (el número ya llega por WhatsApp).
- **Nada se guarda ni se envía a un servidor:** el sitio solo prepara el mensaje y abre WhatsApp; la persona decide enviarlo. Esto se explica en pantalla.
- **Tratamiento por WhatsApp:** las conversaciones y datos quedan en tu WhatsApp. Tienes que atender solicitudes de consulta, corrección y supresión (plazos: consultas 10 días hábiles, reclamos 15 días hábiles). Si en el futuro envías promociones, necesitas autorización aparte y debes respetar la Ley 2300 de 2023 (límites de horarios y frecuencia).

## 6. Datos del catálogo por verificar (marcados `VERIFICAR` en `stores/productos.ts`)

- **Susurro de Rosas:** precio de 2 colores ($90.000).
- **Royal Princess:** la "tercera flor" de la descripción.
- **Corazón Enamorado:** nombre y descripción (no tiene foto; la descripción no se pudo confirmar).
- **Lirio Individual / Trío de Lirios:** si es un producto propio.
- **RH:** nombre completo.
- **Sin foto (12 ramos):** Doble Amor, Tres Latidos, Dulce Romance, Corazón Enamorado, Destello, Resplandor, Rayo de Sol, Amanecer (los 4 de girasoles incluidos), Lirio Individual, Majestad v1, Dulzura y **Regocijo (insignia)**. Aparece "Foto próximamente". Hay una foto sin usar: `tulipan2.jpg`.
- **Precios por temporada:** tus políticas decían que "los precios pueden variar según temporada". Por el Estatuto del Consumidor, el precio publicado vincula al vendedor; se reescribió para que, si cambia, **avises antes de cobrar** y el cliente pueda desistir.

## 7. Otros riesgos señalados

1. **Garantía y devoluciones:** la política decía "no realizamos devoluciones de dinero". La garantía legal (Ley 1480) no se puede renunciar: si el ramo llega en mal estado, el consumidor tiene derecho a reposición **o devolución**. Se reescribió así. Tampoco aplica el derecho de retracto (art. 47) a flores perecederas ni a arreglos hechos a la medida; está explicado en los términos.
2. **Plazo de reclamo:** los términos piden avisar "lo antes posible, preferiblemente el mismo día". No fijé un plazo estricto para no limitar el derecho de garantía.
3. **Marcas de terceros** en los ramos (Ferrero Rocher, Atenea, Anik, Prosa): se citan solo para describir el contenido. Verifica que realmente los incluyes.
4. **Derechos de las fotos:** confirma que las fotos son tuyas o tienes permiso.
5. **Medios de pago:** el sitio no cobra. Si más adelante conectas una pasarela (Wompi, PayU, Mercado Pago…), la política de privacidad, las cookies y los términos deberán actualizarse.
6. **Suplantación por WhatsApp:** advierte en tus canales que los datos de pago solo los envía tu número oficial (ya se indica en los términos).
7. **Respaldo del dominio:** registra tu dominio propio y un correo real; hoy no hay correo de contacto.

---

## 8. Accesibilidad

Resultados medidos con **axe-core** (WCAG 2.0 A/AA, 2.1 A/AA, 2.2 AA y buenas prácticas) en inicio, catálogo, ficha (con y sin foto), contacto, nosotros, términos, privacidad, cookies, 404, cajón del carrito abierto y menú móvil abierto: **sin violaciones** tras las correcciones.

Cambios principales:
- `lang="es-CO"` (antes no había idioma declarado), enlace "Saltar al contenido", landmarks, anuncio de cambio de página, un `<h1>` por página y jerarquía de encabezados.
- **Contraste:** antes fallaba en varios puntos medidos: blanco sobre `#f25480` (**3,3:1**), blanco sobre el verde de WhatsApp (**1,98:1**), gris de apoyo `#a8a29e` sobre fondo claro (**2,38:1**), rojo de error (3,76:1). La paleta nueva cumple **AA (≥ 4,5:1) en todos los pares** usados (verificado con script).
- **Texto alternativo:** descriptivo por producto y por foto (primera foto con la descripción del catálogo, las demás "foto N de M"); decorativas con `alt=""`; iconos con `aria-hidden`. Mejóralo ramo por ramo en `altImagen()` si quieres más detalle.
- **Teclado:** foco visible en todo, carrito y menú con foco atrapado/Escape (el carrito devuelve el foco al abrir/cerrar), carrusel con flechas ← →, tamaños como botones de radio nativos, detalles con `<details>`.
- **Formularios:** etiquetas asociadas, `autocomplete` correcto, `aria-invalid`/`aria-describedby`, resumen de errores con foco, campos de 16 px (evita zoom en iOS), objetivos táctiles de 40-48 px.
- **Botones con etiquetas claras** ("Agregar Doble Amor al carrito", "Quitar una unidad de…", "Elegir tamaño de…") en vez de solo iconos.
- **Movimiento reducido:** se respeta `prefers-reduced-motion` (animaciones, pétalos, marquesina). Los pétalos se pausan fuera de pantalla.

## 9. Rediseño

- Dirección: editorial botánica, con arcos, sello giratorio, tipografía serif grande, grano de papel y adornos de línea hechos en SVG. Paleta crema, vino, rosa y verde salvia con oro suave.
- **Estados vacíos:** carrito vacío, búsqueda sin resultados (con salida por WhatsApp), ramo sin foto, foto que no carga, destacados vacíos, página 404.
- **Estados de carga:** barra de progreso real al navegar, *skeleton* con brillo mientras carga cada foto, botones con spinner y `aria-busy`.
- **Hover/active/focus/disabled** en todos los controles: botones con relleno deslizante, tarjetas que se elevan y cambian de foto, enlaces con subrayado animado, píldoras, paginación, cantidad del carrito, etc.
- **Rendimiento:** las fotos pasaron de **76,4 MB a 10,7 MB** (máx. 1.500 px, JPEG optimizado, orientación corregida). Los originales siguen en el historial de git. Se generaron `favicon-32.png`, `apple-touch-icon.png` y `og-image.jpg` (antes el favicon era un PNG de 900 KB).
- Si cambias fotos, optimízalas antes (idealmente ≤ 1.500 px de lado largo).

## 10. Cómo mantener el sitio

- Datos del negocio (teléfono, horarios, titular, NIT…): `data/negocio.ts`.
- Catálogo, precios y fotos: `stores/productos.ts` y `public/`.
- Páginas legales: `pages/privacidad.vue`, `pages/cookies.vue`, `pages/terminos.vue`. Actualiza `legalActualizado` en `data/negocio.ts` cada vez que las cambies.
- Antes de publicar: `npm run build` y revisa que no queden `[… — pendiente]` en las páginas legales.

---

## 11. Panel de administración (`/admin`) — añadido el 12 de octubre de 2026

Permite a la dueña subir fotos, crear/editar/ocultar/eliminar ramos y manejar categorías. Instalación: **SUPABASE.md**.

**Seguridad (lo importante)**
- La protección real está en la base de datos (**RLS** de `supabase/setup.sql`): el público solo lee ramos publicados; solo los correos de la tabla `admins` pueden escribir en las tablas y en el almacenamiento de fotos. Ocultar la ruta `/admin` no sería suficiente y no se depende de eso.
- La clave que va al navegador es la **anon** (pública por diseño). **Nunca uses la `service_role`**; se comprobó que no aparece en el código publicado.
- Se recomienda desactivar los registros de usuarios en Supabase (paso 4 de la guía) y usar una contraseña única y fuerte.
- El panel no se renderiza en servidor, no se indexa (`robots.txt` + `X-Robots-Tag`) y no se guarda en caché.
- Las fotos se comprimen en el navegador (máx. 1.500 px) y el bucket solo acepta JPG/PNG/WebP de hasta 5 MB.
- Si Supabase falla o se pausa (plan gratuito), el sitio público **no se rompe**: muestra el último catálogo bueno o el del código.

**Privacidad:** el catálogo no contiene datos personales de clientes. Las fotos subidas se sirven desde servidores de Supabase (el navegador del visitante los contacta) y la sesión de la administradora usa `localStorage` en su navegador. Ambos puntos ya están declarados en las páginas de Privacidad y Cookies. Confirma que tienes autorización de las personas que aparezcan en fotos.

**Qué se probó y qué no**
- ✅ Probado en el navegador contra un **simulador local** de Supabase (autenticación, PostgREST y almacenamiento): inicio de sesión (correcto e incorrecto), acceso sin sesión (redirige), importar los 26 ramos, crear (con categoría nueva y precios por opciones), editar (precio, nota y foto), validaciones, nombre duplicado, ocultar/mostrar, eliminar (borra también la foto), categorías (crear y bloqueo al borrar con ramos), compresión de una foto de 4000×5000 px a 1200×1500 px (129 KB), lectura pública desde la base de datos, borradores ocultos y respaldo cuando Supabase no responde. Accesibilidad (axe) sin violaciones en las pantallas del panel. Compilación de producción y de Vercel correctas.
- ⚠️ **No probado contra un proyecto real de Supabase** (no se pueden crear cuentas desde aquí). Dependen de Supabase real: que `setup.sql` se ejecute sin errores en tu proyecto, las políticas RLS y el envío del correo de «olvidé mi contraseña». **Haz la prueba completa de la guía (crear un ramo con foto y verlo en el sitio) antes de entregárselo.**
- No se probó el aviso de «cambios sin guardar» al salir del formulario (diálogo nativo del navegador).
- Pendiente a futuro si lo piden: reordenar ramos arrastrando, duplicar un ramo, texto alternativo editable por foto, historial de cambios.
